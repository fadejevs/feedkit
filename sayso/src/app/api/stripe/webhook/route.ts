import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServiceRoleClient } from '@/lib/supabaseClient'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-09-30.clover',
    })
  : null

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  if (!stripe || !webhookSecret) {
    console.error('❌ Stripe or webhook secret not configured')
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 500 }
    )
  }

  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('⚠️ Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  console.log('✅ Stripe webhook received:', event.type)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutSessionCompleted(session)
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('❌ Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error.message },
      { status: 500 }
    )
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const supabase = createServiceRoleClient()
  
  const customerEmail = session.customer_email
  const customerId = session.customer as string
  const subscriptionId = session.subscription as string
  const isLifetimeDeal = session.mode === 'payment' || session.metadata?.type === 'lifetime_deal'

  if (!customerEmail) {
    console.error('❌ No customer email in checkout session')
    return
  }

  console.log('🔍 Looking up user for email:', customerEmail)
  if (isLifetimeDeal) {
    console.log('💰 Processing lifetime deal purchase')
  }

  // Get user by email
  const { data: userData, error: userError } = await supabase.auth.admin.listUsers()
  
  if (userError) {
    console.error('❌ Error fetching users:', userError)
    return
  }

  const user = userData?.users?.find((u: any) => u.email === customerEmail)

  if (!user) {
    console.error('❌ User not found for email:', customerEmail)
    return
  }

  console.log('✅ Found user:', user.id, customerEmail)

  if (!stripe) return

  if (isLifetimeDeal) {
    // Handle lifetime deal (one-time payment)
    const paymentIntentId = session.payment_intent as string
    let priceId = null
    
    if (session.line_items) {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
      priceId = lineItems.data[0]?.price?.id || null
    }

    // Insert or update subscription with lifetime status
    const { error: subError } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: user.id,
        stripe_customer_id: customerId,
        stripe_subscription_id: null, // No subscription for lifetime deals
        stripe_price_id: priceId,
        status: 'lifetime', // Special status for lifetime deals
        current_period_start: new Date().toISOString(),
        current_period_end: null, // Lifetime = no end date
        cancel_at_period_end: false,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id',
      })

    if (subError) {
      console.error('❌ Error upserting lifetime subscription:', subError)
    } else {
      console.log('✅ Lifetime deal saved to Supabase for user:', user.id)
    }
  } else {
    // Handle subscription payment
    if (!subscriptionId) {
      console.error('❌ No subscription ID in checkout session')
      return
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    // Insert or update subscription in Supabase
    const { error: subError } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: user.id,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        stripe_price_id: subscription.items.data[0]?.price.id || null,
        status: subscription.status,
        current_period_start: subscription.billing_cycle_anchor ? new Date(subscription.billing_cycle_anchor * 1000).toISOString() : null,
        current_period_end: (subscription as any).current_period_end ? new Date((subscription as any).current_period_end * 1000).toISOString() : null,
        cancel_at_period_end: subscription.cancel_at_period_end || false,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id',
      })

    if (subError) {
      console.error('❌ Error upserting subscription:', subError)
    } else {
      console.log('✅ Subscription saved to Supabase for user:', user.id)
    }
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const supabase = createServiceRoleClient()
  const customerId = subscription.customer as string

  console.log('🔄 Updating subscription for customer:', customerId)

  // Find user by stripe_customer_id
  const { data: existingSub, error: findError } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (findError || !existingSub) {
    console.log('⚠️ Subscription not found for customer (may not be created yet):', customerId)
    return
  }

  const { error: updateError } = await supabase
    .from('subscriptions')
    .update({
      stripe_subscription_id: subscription.id,
      stripe_price_id: subscription.items.data[0]?.price.id || null,
      status: subscription.status,
      current_period_start: subscription.billing_cycle_anchor ? new Date(subscription.billing_cycle_anchor * 1000).toISOString() : null,
      current_period_end: (subscription as any).current_period_end ? new Date((subscription as any).current_period_end * 1000).toISOString() : null,
      cancel_at_period_end: subscription.cancel_at_period_end || false,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', existingSub.user_id)

  if (updateError) {
    console.error('❌ Error updating subscription:', updateError)
  } else {
    console.log('✅ Subscription updated for user:', existingSub.user_id, 'status:', subscription.status)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const supabase = createServiceRoleClient()
  const customerId = subscription.customer as string

  console.log('🗑️ Marking subscription as canceled for customer:', customerId)

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId)

  if (error) {
    console.error('❌ Error marking subscription as canceled:', error)
  } else {
    console.log('✅ Subscription marked as canceled for customer:', customerId)
  }
}

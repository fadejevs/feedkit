import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  if (!stripe) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  
  const { email } = await req.json().catch(() => ({}))
  const priceId = process.env.STRIPE_LIFETIME_PRICE_ID
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  if (!priceId) {
    return NextResponse.json({ 
      error: 'Missing STRIPE_LIFETIME_PRICE_ID. Please set this environment variable with your Stripe one-time payment price ID.' 
    }, { status: 500 })
  }

  try {
    // Verify the price exists and is accessible
    try {
      const price = await stripe.prices.retrieve(priceId)
      console.log('✅ Price found:', price.id, 'Mode:', price.livemode ? 'LIVE' : 'TEST')
      
      // Check if price mode matches Stripe key mode
      const isLiveKey = process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_')
      if (price.livemode !== isLiveKey) {
        console.warn(`⚠️ Price mode mismatch: Price is ${price.livemode ? 'LIVE' : 'TEST'}, but key is ${isLiveKey ? 'LIVE' : 'TEST'}`)
      }
    } catch (priceError: any) {
      console.error('❌ Error retrieving price:', priceError)
      const isLiveKey = process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_')
      return NextResponse.json({ 
        error: `Price not found. The price ID "${priceId}" doesn't exist in ${isLiveKey ? 'LIVE' : 'TEST'} mode. Please check that your STRIPE_SECRET_KEY and STRIPE_LIFETIME_PRICE_ID are both in the same mode (test or live).`,
        details: priceError.message
      }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment', // One-time payment instead of subscription
      payment_method_types: ['card'],
      line_items: [{ 
        price: priceId, 
        quantity: 1 
      }],
      success_url: `${siteUrl}/auth/callback?lifetime=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#pricing?cancelled=1`,
      customer_email: email || undefined, // Pre-fill email if provided, otherwise let Stripe collect it
      customer_creation: 'if_required', // Create customer in Stripe if needed
      allow_promotion_codes: true,
      metadata: {
        type: 'lifetime_deal',
        ...(email && { user_email: email }), // Store email in metadata for webhook
      },
    })
    
    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    console.error('Price ID used:', priceId)
    console.error('Stripe key mode:', process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ? 'LIVE' : 'TEST')
    
    // Provide more helpful error message
    if (error.message?.includes('No such price')) {
      const isLiveKey = process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_')
      return NextResponse.json({ 
        error: `Price "${priceId}" not found in ${isLiveKey ? 'LIVE' : 'TEST'} mode. Make sure your STRIPE_SECRET_KEY and STRIPE_LIFETIME_PRICE_ID are both in the same mode.`,
        details: error.message
      }, { status: 400 })
    }
    
    return NextResponse.json({ 
      error: error.message || 'Failed to create checkout session' 
    }, { status: 500 })
  }
}


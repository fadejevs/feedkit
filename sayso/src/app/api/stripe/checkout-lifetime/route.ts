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
    const session = await stripe.checkout.sessions.create({
      mode: 'payment', // One-time payment instead of subscription
      payment_method_types: ['card'],
      line_items: [{ 
        price: priceId, 
        quantity: 1 
      }],
      success_url: `${siteUrl}/auth/callback?lifetime=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#pricing?cancelled=1`,
      customer_email: email,
      allow_promotion_codes: true,
      metadata: {
        type: 'lifetime_deal',
      },
    })
    
    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to create checkout session' 
    }, { status: 500 })
  }
}


import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      console.error('Stripe not configured - STRIPE_SECRET_KEY missing')
      return NextResponse.json({ error: 'Stripe not configured. Please check your environment variables.' }, { status: 500 })
    }
    
    const { email } = await req.json().catch(() => ({}))
    const priceId = process.env.STRIPE_PRICE_ID
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    if (!priceId) {
      console.error('STRIPE_PRICE_ID is missing from environment variables')
      return NextResponse.json({ error: 'Missing STRIPE_PRICE_ID. Please set STRIPE_PRICE_ID in your environment variables.' }, { status: 500 })
    }

    console.log('Creating Stripe checkout session:', { priceId, email, siteUrl })

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/auth/callback?upgraded=1`,
      cancel_url: `${siteUrl}/pricing?cancelled=1`,
      customer_email: email,
      allow_promotion_codes: true,
    })
    
    console.log('Stripe checkout session created:', session.id)
    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to create checkout session',
      details: error.type || 'Unknown error'
    }, { status: 500 })
  }
}




import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  if (!stripe) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  const { email } = await req.json().catch(() => ({}))
  const priceId = process.env.STRIPE_PRICE_ID
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  if (!priceId) return NextResponse.json({ error: 'Missing STRIPE_PRICE_ID' }, { status: 500 })

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteUrl}/dashboard?upgraded=1`,
    cancel_url: `${siteUrl}/pricing?cancelled=1`,
    customer_email: email,
    allow_promotion_codes: true,
  })
  return NextResponse.json({ url: session.url })
}




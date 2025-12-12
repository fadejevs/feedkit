import Stripe from 'stripe'

const apiKey = process.env.STRIPE_SECRET_KEY

export const stripe = apiKey
  ? new Stripe(apiKey, { apiVersion: '2024-06-20' as any })
  : null




#!/bin/bash
echo "🚀 Starting Stripe webhook forwarding..."
echo ""
echo "This will forward Stripe webhooks to: http://localhost:3000/api/stripe/webhook"
echo ""
echo "📋 Copy the webhook signing secret (whsec_...) and update your .env.local:"
echo "   STRIPE_WEBHOOK_SECRET=whsec_xxxxx"
echo ""
echo "Press Ctrl+C to stop"
echo ""
stripe listen --forward-to localhost:3000/api/stripe/webhook

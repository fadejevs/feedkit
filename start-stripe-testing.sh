#!/bin/bash

echo "🔧 Stripe Local Testing Setup"
echo "=============================="
echo ""

# Check if dev server is running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "✅ Dev server is running on port 3000"
else
    echo "⚠️  Dev server not running on port 3000"
    echo "   Start it with: cd sayso && npm run dev"
    echo ""
fi

echo ""
echo "📡 Starting Stripe webhook forwarding..."
echo "   Forwarding to: http://localhost:3000/api/stripe/webhook"
echo ""
echo "📋 IMPORTANT: Copy the webhook signing secret below (whsec_...)"
echo "   and update your sayso/.env.local file:"
echo "   STRIPE_WEBHOOK_SECRET=whsec_xxxxx"
echo ""
echo "Press Ctrl+C to stop webhook forwarding"
echo ""
echo "=============================="
echo ""

stripe listen --forward-to localhost:3000/api/stripe/webhook

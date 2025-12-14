# Stripe CLI Setup for Local Testing

## Why Use Stripe CLI?
- ✅ Test webhooks locally without deploying
- ✅ No need for ngrok or public URLs
- ✅ Instant webhook delivery
- ✅ See webhook events in real-time
- ✅ Much faster development cycle

## Step 1: Install Stripe CLI

### macOS:
```bash
brew install stripe/stripe-cli/stripe
```

### Or download from:
https://stripe.com/docs/stripe-cli

## Step 2: Login to Stripe CLI

```bash
stripe login
```

This will open your browser to authorize the CLI with your Stripe account.

## Step 3: Forward Webhooks to Local Server

In a separate terminal, run:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This will:
- Create a webhook endpoint in your Stripe account
- Forward all events to your local server
- Show you a **webhook signing secret** (starts with `whsec_`)

## Step 4: Update .env.local

Use the webhook signing secret from Step 3:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxx  # Copy from stripe listen output
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Back to localhost
```

## Step 5: Test!

1. Start your Next.js dev server: `npm run dev`
2. Keep `stripe listen` running in another terminal
3. Make a test payment
4. Watch webhook events come through in real-time!

## Useful Stripe CLI Commands

```bash
# Listen to webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Trigger test events manually
stripe trigger checkout.session.completed

# See all events
stripe events list

# See specific event
stripe events retrieve evt_xxxxx
```

## Quick Test Script

Create a file `test-stripe.sh`:

```bash
#!/bin/bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Forward webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Pro Tips

- The `stripe listen` command shows you the webhook secret immediately
- You can filter events: `stripe listen --events checkout.session.completed`
- Use `stripe trigger` to simulate events without making payments
- All events are logged - great for debugging!


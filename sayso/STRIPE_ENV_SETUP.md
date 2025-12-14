# Stripe Environment Variables Setup

Add these environment variables to your `.env.local` file (or your deployment platform's environment variables):

## Required Stripe Variables

```bash
# Stripe Secret Key (from Stripe Dashboard → Developers → API keys)
# Use "Secret key" (starts with sk_test_ for test mode, sk_live_ for production)
STRIPE_SECRET_KEY=sk_test_xxxxx

# Stripe Webhook Secret (from Stripe Dashboard → Developers → Webhooks)
# After creating a webhook endpoint, copy the "Signing secret"
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Subscription Price ID (for Pro subscription)
# From Stripe Dashboard → Products → Your Pro Product → Pricing
# Copy the Price ID (starts with price_)
STRIPE_PRICE_ID=price_xxxxx

# Lifetime Deal Price ID (for one-time payment)
# From Stripe Dashboard → Products → Create a new product for Lifetime Deal
# Set it as a one-time payment (not recurring)
# Copy the Price ID (starts with price_)
STRIPE_LIFETIME_PRICE_ID=price_xxxxx

# Your site URL (for redirects after payment)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## How to Get Each Value:

### 1. STRIPE_SECRET_KEY
- Go to [Stripe Dashboard](https://dashboard.stripe.com) → Developers → API keys
- Copy the **Secret key** (starts with `sk_test_` for test mode or `sk_live_` for production)
- ⚠️ Never commit this to git!

### 2. STRIPE_WEBHOOK_SECRET
- Go to Stripe Dashboard → Developers → Webhooks
- Click "Add endpoint" or edit existing endpoint
- Set endpoint URL to: `https://yourdomain.com/api/stripe/webhook`
- Select events to listen to:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- After creating, click on the webhook and copy the **Signing secret** (starts with `whsec_`)

### 3. STRIPE_PRICE_ID (for Pro subscription)
- Go to Stripe Dashboard → Products
- Find or create your "Pro" subscription product
- Make sure it's set as **Recurring** (subscription)
- Copy the **Price ID** (starts with `price_`)

### 4. STRIPE_LIFETIME_PRICE_ID (for lifetime deal)
- Go to Stripe Dashboard → Products
- Click "Add product"
- Name: "Lifetime Deal" or "Feedkit Lifetime"
- Description: "Lifetime access to all Pro features"
- Pricing model: Select **One time** (NOT recurring)
- Price: €59.00 (or your desired amount)
- Currency: EUR
- After creating, copy the **Price ID** (starts with `price_`)

### 5. NEXT_PUBLIC_SITE_URL
- Your production domain: `https://feedkit.co` (or your actual domain)
- For local development: `http://localhost:3000`

## Example .env.local file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdefghijklmnopqrstuvwxyz
STRIPE_PRICE_ID=price_1234567890abcdef
STRIPE_LIFETIME_PRICE_ID=price_0987654321fedcba
NEXT_PUBLIC_SITE_URL=https://feedkit.co
```

## Testing

- Use **test mode** keys (starting with `sk_test_`) for development
- Use **live mode** keys (starting with `sk_live_`) for production
- Test payments using Stripe's test card: `4242 4242 4242 4242`


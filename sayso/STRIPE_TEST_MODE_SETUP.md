# Switching to Stripe Test Mode

## Step 1: Get Test Mode Keys from Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. **Toggle to Test mode** (switch in the top right)
3. Go to **Developers → API keys**
4. Copy:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

## Step 2: Create Test Mode Products & Prices

### For Subscription (Pro):
1. In **Test mode**, go to **Products**
2. Create a product: "Pro Subscription" (or use existing)
3. Set as **Recurring** payment
4. Set price (e.g., €10/month for testing)
5. Copy the **Price ID** (starts with `price_`)

### For Lifetime Deal:
1. In **Test mode**, go to **Products**
2. Create a product: "Lifetime Deal"
3. Set as **One time** payment (NOT recurring)
4. Set price: €59.00
5. Copy the **Price ID** (starts with `price_`)

## Step 3: Set Up Test Webhook

1. In **Test mode**, go to **Developers → Webhooks**
2. Click "Add endpoint"
3. Endpoint URL: `http://localhost:3000/api/stripe/webhook` (for local testing)
   - Or use ngrok: `https://your-ngrok-url.ngrok.io/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the **Signing secret** (starts with `whsec_`)

## Step 4: Update .env.local

Replace your live keys with test keys:

```bash
# Test Mode Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PRICE_ID=price_test_xxxxx  # Test subscription price
STRIPE_LIFETIME_PRICE_ID=price_test_xxxxx  # Test lifetime price
STRIPE_WEBHOOK_SECRET=whsec_test_xxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 5: Test Cards

Use these test card numbers in Stripe Checkout:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires 3D Secure**: `4000 0025 0000 3155`

Use any:
- Future expiry date (e.g., 12/34)
- Any 3-digit CVC
- Any ZIP code

## Quick Switch Script

You can comment/uncomment sections in `.env.local`:

```bash
# ===== TEST MODE =====
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PRICE_ID=price_test_xxxxx
STRIPE_LIFETIME_PRICE_ID=price_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_test_xxxxx

# ===== LIVE MODE (commented out) =====
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
# STRIPE_SECRET_KEY=sk_live_xxxxx
# STRIPE_PRICE_ID=price_live_xxxxx
# STRIPE_LIFETIME_PRICE_ID=price_live_xxxxx
# STRIPE_WEBHOOK_SECRET=whsec_live_xxxxx
```

## Important Notes

- ⚠️ **Test mode and Live mode are completely separate** - products, prices, and webhooks need to be created in each mode
- 🔄 **Restart your dev server** after changing environment variables
- 🧪 **Test webhooks locally** using Stripe CLI or ngrok
- 💳 **Test cards never charge real money** - safe to use


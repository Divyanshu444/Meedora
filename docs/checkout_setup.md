# Meedora — End-to-End Shopify & Razorpay Checkout Setup Guide

This document outlines the exact steps to connect your Shopify store, configure Indian payment methods (Razorpay, UPI, COD), and verify test transactions before opening the site to real customer traffic.

---

## 1. Shopify Storefront API Access

1. Log in to your **Shopify Admin** (`https://admin.shopify.com`).
2. Navigate to **Settings** (bottom left) → **Apps and sales channels** → **Develop apps**.
3. Click **Create an app** and name it `Meedora Headless Storefront`.
4. Click **Configure Storefront API scopes** and enable:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_content` (for policies and pages)
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_customers`
5. Click **Save** → **Install app**.
6. Reveal and copy the **Storefront API access token** (starts with `shpat_` or public token).
7. In your local `.env.local` (and Vercel Environment Variables):
   ```env
   SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_copied_token_here
   ```

---

## 2. Setting Up Razorpay for India Payments (UPI, Cards, Netbanking)

1. Log into your **Shopify Admin** → **Settings** → **Payments**.
2. Under **Supported payment methods**, search for **Razorpay**.
3. Click **Activate Razorpay**.
4. Log into your **Razorpay Dashboard** (`https://dashboard.razorpay.com`).
5. Go to **Settings** → **API Keys** → Generate **Key ID** and **Key Secret**.
6. Paste the Key ID and Key Secret into the Shopify Razorpay app settings.
7. Under Razorpay settings, ensure the following are enabled:
   - **UPI / QR** (Google Pay, PhonePe, Paytm, BHIM)
   - **Credit / Debit Cards** (Visa, Mastercard, RuPay, Amex)
   - **Netbanking** (All major Indian banks)
   - **Wallets**

---

## 3. Setting Up Cash on Delivery (COD)

1. In **Shopify Admin** → **Settings** → **Payments**.
2. Scroll to **Manual payment methods**.
3. Select **Cash on Delivery (COD)**.
4. Set customer instructions:
   > *"Pay with cash or UPI on delivery to the courier partner. Please keep the exact amount ready."*
5. (Optional) Under **Settings** → **Shipping and delivery**, set a COD convenience fee (e.g. ₹49 or free above ₹1,499).

---

## 4. End-to-End Test Checkout Flow

Before launching, perform a test order:

1. In Razorpay settings, switch **Test Mode** to **ON**.
2. Open `https://meedora-sigma.vercel.app` (or your local dev build at `http://localhost:3000`).
3. Browse to any product (e.g. Aira Hammered Gold Hoops).
4. Click **Add to bag**.
5. Open your shopping bag and click **Continue to checkout**.
6. You will be redirected to the secure Shopify checkout URL (`https://your-store.myshopify.com/checkouts/...`).
7. Enter a test Indian address and PIN code (e.g. `110001` - New Delhi).
8. Select **Razorpay** and use Razorpay's test UPI/Card details to simulate a successful payment.
9. Verify the **Order Confirmation** page loads with the Meedora branding.
10. Check **Shopify Admin → Orders** to confirm the test order appears with paid status.
11. Switch Razorpay to **Live Mode** once verified!

---

## 5. WhatsApp & Support Verification

1. Set `NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX` in `.env.local` and in Vercel settings.
2. Click **Chat on WhatsApp** in the footer or contact page.
3. Confirm WhatsApp opens with the pre-filled text:
   > *"Hi Meedora! I have a question about your handcrafted jewelry."*

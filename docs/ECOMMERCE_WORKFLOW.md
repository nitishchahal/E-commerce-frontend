# E-commerce Data Workflow

## Customer lifecycle

1. Customer registers with Supabase Auth.
2. A database trigger creates or updates the matching `profiles` row.
3. After authentication, the frontend loads the customer's profile, cart, wishlist, addresses, and order history.
4. Logging out clears all customer state from memory.

## Persistent customer data

- `profiles` — customer profile details.
- `addresses` — customer-owned shipping addresses with one optional default address.
- `carts` — one cart per customer.
- `cart_items` — persisted quantities and sizes.
- `wishlist_items` — persisted favourites.
- `orders` and `order_items` — immutable checkout snapshots.

## Secure checkout

The browser does **not** calculate the authoritative order total. It calls the authenticated `checkout_cart` database function.

The function:

1. Validates the authenticated user.
2. Verifies the selected address belongs to that user.
3. Reads active products and prices from the database.
4. Calculates subtotal, delivery, and total server-side.
5. Creates the order and item snapshots.
6. Clears the customer's cart.

This prevents a browser from changing a product price before checkout.

## RLS ownership model

Customer-owned rows are restricted with `auth.uid()`:

- A customer can only read/update their own profile.
- A customer can only manage their own addresses.
- A customer can only read their own cart and manage items inside it.
- A customer can only manage their own wishlist.
- A customer can only read their own orders and order items.
- Direct customer inserts/updates/deletes on orders are disabled; checkout is RPC-only.

## Product catalog

The existing frontend catalog was seeded into Supabase with stable `legacy_id` values so current product pages can map existing product IDs to persistent database product rows.

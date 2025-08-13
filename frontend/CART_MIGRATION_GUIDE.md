# Cart Migration Guide: Context to Redux

## Overview

This document outlines the complete migration from a context-based cart system to a Redux-based cart system with backend persistence.

## What Was Changed

### 1. Removed Context-Based Cart

- ❌ Deleted `frontend/src/Context/CartContext.tsx`
- ❌ Removed `CartProvider` from `App.tsx`
- ❌ Removed all context imports from components

### 2. Updated Components to Use Redux

- ✅ Updated `CartSidebar.tsx` to use Redux
- ✅ Updated `NavBar.tsx` to use Redux
- ✅ Updated `ProductModal.tsx` to use Redux
- ✅ Updated `ProductsGrid.tsx` to use Redux
- ✅ Updated `CheckoutPage.tsx` to use Redux
- ✅ Updated `PaymentForm.tsx` to use Redux

### 3. Created Redux Integration Layer

- ✅ Created `frontend/src/hooks/useCart.ts` - Provides same interface as old context
- ✅ Created `frontend/src/Components/Common/Cart/CartInitializer.tsx` - Auto-loads cart on auth
- ✅ Enhanced logging in `cartApi.tsx` and `cartThunks.tsx`

### 4. Enhanced Logging System

- ✅ Added comprehensive logging to all cart API calls
- ✅ Added logging to all Redux thunks
- ✅ Added user authentication checks

## How the New System Works

### 1. Cart Initialization

```typescript
// CartInitializer.tsx automatically loads cart when user is authenticated
useEffect(() => {
  if (isAuthenticated && user?.id && !cart) {
    dispatch(fetchCart(user.id));
  }
}, [dispatch, isAuthenticated, user?.id, cart]);
```

### 2. Cart Hook Interface

```typescript
// hooks/useCart.ts provides the same interface as the old context
const { items, addItem, removeItem, updateQuantity, clearCart } = useCart();
```

### 3. Backend Integration

All cart actions now make API calls to persist data:

- `addItem()` → `addToCart(userId, productId, quantity)`
- `removeItem()` → `removeFromCart(userId, productId)`
- `updateQuantity()` → `updateCartItem(userId, productId, quantity)`
- `clearCart()` → `clearCart(userId)`

## Debugging the Cart System

### 1. Console Logs

The system now provides detailed logging with emojis for easy identification:

```
🔄 [Cart Thunk] addToCart { userId: "123", productId: "456", quantity: 1 }
🛒 [Cart API] POST http://localhost:5000/api/cart/123/add { data: { productId: "456", quantity: 1 } }
✅ [Cart API] POST http://localhost:5000/api/cart/123/add - Success: { success: true, data: {...} }
✅ [Cart Thunk] addToCart - Success: { userId: "123", items: [...], total: 99.99 }
```

### 2. Network Tab

Check the Network tab in browser DevTools to see:

- Request URLs (should go to API Gateway)
- Request headers (should include auth tokens)
- Response data (should show success/error messages)

### 3. Redux DevTools

Install Redux DevTools extension to monitor:

- State changes in real-time
- Action dispatches
- Cart state structure

### 4. Step-by-Step Debugging

#### Step 1: Check User Authentication

```javascript
// In browser console
console.log("User state:", store.getState().user);
console.log("Is authenticated:", store.getState().user.isAuthenticated);
console.log("User ID:", store.getState().user.user?.id);
```

#### Step 2: Check Cart State

```javascript
// In browser console
console.log("Cart state:", store.getState().cart);
console.log("Cart items:", store.getState().cart.currentCart?.items);
console.log("Cart loading:", store.getState().cart.loading);
console.log("Cart error:", store.getState().cart.error);
```

#### Step 3: Monitor API Calls

1. Open Network tab in DevTools
2. Add item to cart
3. Look for requests to `/api/cart/{userId}/add`
4. Check request payload and response

#### Step 4: Check API Gateway Routing

1. Verify requests reach the API Gateway
2. Check gateway logs for routing decisions
3. Verify requests are forwarded to Cart microservice
4. Check Cart microservice logs for database operations

## Common Issues and Solutions

### Issue 1: Cart Not Loading

**Symptoms:** Cart appears empty even after adding items
**Debug Steps:**

1. Check if user is authenticated: `store.getState().user.isAuthenticated`
2. Check if cart was fetched: `store.getState().cart.currentCart`
3. Check for errors: `store.getState().cart.error`
4. Check network requests in DevTools

**Solutions:**

- Ensure user is logged in
- Check API Gateway is running
- Check Cart microservice is running
- Verify database connection

### Issue 2: Items Not Persisting

**Symptoms:** Items appear in UI but disappear on refresh
**Debug Steps:**

1. Check console logs for API call success/failure
2. Check Network tab for failed requests
3. Check Redux state for optimistic updates
4. Verify backend database writes

**Solutions:**

- Check authentication headers
- Verify API endpoints are correct
- Check CORS configuration
- Verify database permissions

### Issue 3: Authentication Issues

**Symptoms:** "User not authenticated" errors in console
**Debug Steps:**

1. Check if user is logged in
2. Check if auth token is valid
3. Check if token is being sent with requests
4. Verify auth middleware in API Gateway

**Solutions:**

- Re-login user
- Check token expiration
- Verify auth headers are being sent
- Check API Gateway auth configuration

## API Endpoints

The cart system uses these endpoints through the API Gateway:

```
GET    /api/cart/{userId}              - Get full cart
GET    /api/cart/{userId}/summary      - Get cart summary
GET    /api/cart/{userId}/count        - Get item count
POST   /api/cart/{userId}/add          - Add item to cart
PUT    /api/cart/{userId}/item/{id}    - Update item quantity
DELETE /api/cart/{userId}/item/{id}    - Remove item from cart
DELETE /api/cart/{userId}/clear        - Clear entire cart
PUT    /api/cart/{userId}/shipping     - Update shipping cost
POST   /api/cart/{userId}/validate     - Validate cart items
```

## Environment Variables

Ensure these environment variables are set:

```env
VITE_API_URL=http://localhost:5000
VITE_CART_API_URL=http://localhost:5000/api/cart
```

## Testing the Migration

### 1. Manual Testing

1. Login to the application
2. Add items to cart
3. Check cart sidebar shows items
4. Refresh page - items should persist
5. Check browser console for logs
6. Check Network tab for API calls

### 2. Automated Testing

```bash
# Run the development server
npm run dev

# Check for TypeScript errors
npm run build

# Run tests (if available)
npm test
```

## Troubleshooting Checklist

- [ ] User is authenticated (`store.getState().user.isAuthenticated === true`)
- [ ] User has valid ID (`store.getState().user.user?.id` exists)
- [ ] Cart is being fetched on login (check console logs)
- [ ] API Gateway is running and accessible
- [ ] Cart microservice is running and connected to database
- [ ] CORS is properly configured
- [ ] Authentication headers are being sent
- [ ] Network requests are successful (200 status)
- [ ] Redux state is being updated correctly
- [ ] UI is reflecting Redux state changes

## Support

If you encounter issues:

1. Check the console logs first
2. Use the debugging steps above
3. Check the Network tab for failed requests
4. Verify all services are running
5. Check the API Gateway logs
6. Check the Cart microservice logs

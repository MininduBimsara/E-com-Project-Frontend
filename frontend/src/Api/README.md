# API Configuration with Axios

This directory contains a centralized Axios configuration that ensures all HTTP requests include `withCredentials: true` for proper cookie handling in authentication.

## Centralized Configuration

### `axiosConfig.ts`

The main configuration file that provides:

- **Global `withCredentials: true`**: Ensures cookies are sent with every request
- **Automatic token management**: Adds Authorization headers from localStorage/sessionStorage
- **Global error handling**: Handles 401 errors and redirects to login
- **Request/Response interceptors**: Centralized logging and error handling

## Usage Examples

### 1. Using the Factory Function

```typescript
import { createAxiosInstance } from "./axiosConfig";

// Create a configured instance for a specific API
const apiClient = createAxiosInstance("http://localhost:5000/api/products");

// All requests will automatically include:
// - withCredentials: true
// - Authorization header (if token exists)
// - Global error handling
```

### 2. Using the Default Instance

```typescript
import { defaultAxiosInstance } from "./axiosConfig";

// For one-off requests
const response = await defaultAxiosInstance.get("/api/users/current");
```

### 3. Making API Calls

```typescript
// GET request
const getProducts = async () => {
  try {
    const response = await apiClient.get("/products");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

// POST request with data
const createProduct = async (productData: ProductData) => {
  try {
    const response = await apiClient.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
};

// POST request with FormData (file upload)
const uploadProductImage = async (productId: string, imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await apiClient.post(
      `/products/${productId}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to upload image:", error);
    throw error;
  }
};
```

## Features

### Automatic Cookie Handling

All requests automatically include `withCredentials: true`, ensuring:

- Session cookies are sent with requests
- Authentication cookies are properly handled
- CSRF tokens are included

### Token Management

The configuration automatically:

- Checks for tokens in localStorage and sessionStorage
- Adds `Authorization: Bearer <token>` headers
- Clears tokens on 401 errors
- Redirects to login on authentication failures

### Error Handling

Global error handling includes:

- 401 Unauthorized → Clear tokens and redirect to login
- Console logging for debugging
- Proper error propagation

### Environment Variables

Configure API URLs using environment variables:

```env
VITE_AUTH_API_URL=http://localhost:5000/api/auth
VITE_PRODUCT_API_URL=http://localhost:5000/api/products
VITE_CART_API_URL=http://localhost:5000/api/cart
VITE_ORDER_API_URL=http://localhost:5000/api/orders
VITE_PAYMENT_API_URL=http://localhost:5000/api/payments
VITE_USER_API_URL=http://localhost:5000/api/users
VITE_ADMIN_API_URL=http://localhost:5000/api/admin
VITE_GOOGLE_AUTH_API_URL=http://localhost:5000/api/googleauth
```

## Best Practices

### 1. Use the Factory Function

Always use `createAxiosInstance()` for new API modules:

```typescript
// ✅ Good
const userApi = createAxiosInstance(API_URL);

// ❌ Avoid
const userApi = axios.create({ baseURL: API_URL });
```

### 2. Handle Errors Properly

```typescript
// ✅ Good
try {
  const data = await apiClient.get("/endpoint");
  return data;
} catch (error) {
  // Handle specific error cases
  if (error.response?.status === 404) {
    throw new Error("Resource not found");
  }
  throw error;
}
```

### 3. Use TypeScript Types

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const response = await apiClient.get<ApiResponse<User>>("/user");
return response.data.data; // Type-safe access
```

### 4. File Uploads

```typescript
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return await apiClient.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
```

## Migration Guide

If you have existing Axios instances, replace them:

```typescript
// Before
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// After
import { createAxiosInstance } from "./axiosConfig";
const api = createAxiosInstance("http://localhost:5000/api");
```

## Testing

The configuration works seamlessly with testing frameworks:

```typescript
// In your tests
import { createAxiosInstance } from "./axiosConfig";

const testApi = createAxiosInstance("http://localhost:3000/api");
// All requests will still include withCredentials: true
```

## Troubleshooting

### Cookies Not Being Sent

1. Ensure your backend sets proper CORS headers:

   ```javascript
   app.use(
     cors({
       origin: "http://localhost:5173", // Your frontend URL
       credentials: true,
     })
   );
   ```

2. Check that your API calls use the configured instances

### 401 Errors Not Redirecting

1. Verify the error handling in `axiosConfig.ts`
2. Check that your login routes are correct
3. Ensure tokens are being cleared properly

### CORS Issues

1. Backend must allow credentials
2. Frontend and backend origins must match
3. Use the configured Axios instances

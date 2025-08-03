// Example usage of the centralized Axios configuration
import { createAxiosInstance, defaultAxiosInstance } from "./axiosConfig";

// Example 1: Creating a configured instance for a specific API
const productApi = createAxiosInstance("http://localhost:5000/api/products");

// Example 2: Using the default instance for one-off requests
const userApi = createAxiosInstance("http://localhost:5000/api/users");

// Example 3: Basic GET request
export const getProducts = async () => {
  try {
    const response = await productApi.get("/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

// Example 4: GET request with query parameters
export const searchProducts = async (query: string, category?: string) => {
  try {
    const params = new URLSearchParams();
    params.append("q", query);
    if (category) {
      params.append("category", category);
    }

    const response = await productApi.get(`/search?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Failed to search products:", error);
    throw error;
  }
};

// Example 5: POST request with JSON data
export const createProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  category: string;
}) => {
  try {
    const response = await productApi.post("/", productData);
    return response.data;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
};

// Example 6: POST request with FormData (file upload)
export const uploadProductImage = async (
  productId: string,
  imageFile: File
) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await productApi.post(`/${productId}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to upload image:", error);
    throw error;
  }
};

// Example 7: PUT request for updating
export const updateProduct = async (
  productId: string,
  updateData: Partial<{
    name: string;
    description: string;
    price: number;
    category: string;
  }>
) => {
  try {
    const response = await productApi.put(`/${productId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
};

// Example 8: DELETE request
export const deleteProduct = async (productId: string) => {
  try {
    const response = await productApi.delete(`/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
};

// Example 9: Using the default instance for cross-service requests
export const getUserWithProducts = async (userId: string) => {
  try {
    // Get user data
    const userResponse = await defaultAxiosInstance.get(`/api/users/${userId}`);
    const user = userResponse.data;

    // Get user's products
    const productsResponse = await productApi.get(`/user/${userId}`);
    const products = productsResponse.data;

    return {
      user,
      products,
    };
  } catch (error) {
    console.error("Failed to fetch user with products:", error);
    throw error;
  }
};

// Example 10: Error handling with specific status codes
export const getProductWithErrorHandling = async (productId: string) => {
  try {
    const response = await productApi.get(`/${productId}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Product not found");
    } else if (error.response?.status === 403) {
      throw new Error("Access denied");
    } else if (error.response?.status === 401) {
      // This will be handled automatically by the interceptor
      throw new Error("Authentication required");
    } else {
      throw new Error("Failed to fetch product");
    }
  }
};

// Example 11: TypeScript interfaces for type safety
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const getProductTyped = async (productId: string): Promise<Product> => {
  try {
    const response = await productApi.get<ApiResponse<Product>>(
      `/${productId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error;
  }
};

// Example 12: Batch requests
export const getMultipleProducts = async (productIds: string[]) => {
  try {
    const promises = productIds.map((id) =>
      productApi.get(`/${id}`).then((response) => response.data)
    );

    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error("Failed to fetch multiple products:", error);
    throw error;
  }
};

// Example 13: Conditional requests based on authentication
export const getCurrentUserProducts = async () => {
  try {
    // Check if user is authenticated by trying to get current user
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await productApi.get("/my");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch current user products:", error);
    throw error;
  }
};

// Example 14: Using with custom headers
export const createProductWithCustomHeaders = async (
  productData: any,
  customHeaders?: Record<string, string>
) => {
  try {
    const response = await productApi.post("/", productData, {
      headers: {
        ...customHeaders,
        "X-Custom-Header": "custom-value",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create product with custom headers:", error);
    throw error;
  }
};

// Example 15: Timeout configuration
export const getProductsWithTimeout = async (timeoutMs: number = 5000) => {
  try {
    const response = await productApi.get("/", {
      timeout: timeoutMs,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products with timeout:", error);
    throw error;
  }
};

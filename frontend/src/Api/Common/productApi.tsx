// productApi.tsx - Updated with correct Vite environment variables
import axios, { AxiosInstance, AxiosResponse } from "axios";

// Product interfaces
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  ecoRating: number;
  carbonFootprint: number;
  category: "Kitchen" | "Accessories" | "Cloths";
  stock: number;
  imageUrl: string | null;
  createdBy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  ecoRating?: number;
  carbonFootprint?: number;
  category: "Kitchen" | "Accessories" | "Cloths";
  stock?: number;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  ecoRating?: number;
  carbonFootprint?: number;
  category?: "Kitchen" | "Accessories" | "Cloths";
  stock?: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  limit?: number;
  skip?: number;
}

export interface SearchFilters extends ProductFilters {
  q?: string;
}

// Base URL using Vite environment variable - directly points to product API through gateway
const API_URL =
  import.meta.env.VITE_PRODUCT_API_URL || "http://localhost:4005/api/products";

// Create axios instance with default config
const productApiClient: AxiosInstance = axios.create({
  baseURL: API_URL, // This already includes /api/products path
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests automatically
productApiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
productApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Product API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Product API functions
export const productApi = {
  // Get all public products (no auth required)
  // Full URL: http://localhost:4005/api/products/public
  getPublicProducts: async (filters?: ProductFilters): Promise<Product[]> => {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const response: AxiosResponse<Product[]> = await productApiClient.get(
        `/public${params.toString() ? `?${params.toString()}` : ""}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch public products"
      );
    }
  },

  // Get all products (optional auth)
  // Full URL: http://localhost:4005/api/products/
  getProducts: async (filters?: ProductFilters): Promise<Product[]> => {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const response: AxiosResponse<Product[]> = await productApiClient.get(
        `/${params.toString() ? `?${params.toString()}` : ""}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  },

  // Get product by ID (requires auth)
  // Full URL: http://localhost:4005/api/products/details/{productId}
  getProductById: async (productId: string): Promise<Product> => {
    try {
      const response: AxiosResponse<Product> = await productApiClient.get(
        `/details/${productId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch product details"
      );
    }
  },

  // Create product (requires auth)
  // Full URL: http://localhost:4005/api/products/
  createProduct: async (
    productData: CreateProductData | FormData
  ): Promise<Product> => {
    try {
      let response: AxiosResponse<{ product: Product }>;

      if (productData instanceof FormData) {
        // If FormData is provided (with file upload)
        response = await productApiClient.post("/", productData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // For data without file upload
        response = await productApiClient.post("/", productData);
      }

      return response.data.product;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create product"
      );
    }
  },

  // Update product (requires auth)
  // Full URL: http://localhost:4005/api/products/{productId}
  updateProduct: async (
    productId: string,
    updateData: UpdateProductData | FormData
  ): Promise<Product> => {
    try {
      let response: AxiosResponse<{ product: Product }>;

      if (updateData instanceof FormData) {
        // If FormData is provided (with file upload)
        response = await productApiClient.put(`/${productId}`, updateData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // For data without file upload
        response = await productApiClient.put(`/${productId}`, updateData);
      }

      return response.data.product;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update product"
      );
    }
  },

  // Delete product (requires auth)
  // Full URL: http://localhost:4005/api/products/{productId}
  deleteProduct: async (productId: string): Promise<{ message: string }> => {
    try {
      const response: AxiosResponse<{ message: string }> =
        await productApiClient.delete(`/${productId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  },

  // Get products by category
  // Full URL: http://localhost:4005/api/products/category/{category}
  getProductsByCategory: async (
    category: string,
    options?: { limit?: number; skip?: number }
  ): Promise<Product[]> => {
    try {
      const params = new URLSearchParams();
      if (options) {
        Object.entries(options).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const response: AxiosResponse<Product[]> = await productApiClient.get(
        `/category/${category}${
          params.toString() ? `?${params.toString()}` : ""
        }`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products by category"
      );
    }
  },

  // Search products
  // Full URL: http://localhost:4005/api/products/search
  searchProducts: async (
    searchQuery: string,
    filters?: SearchFilters
  ): Promise<Product[]> => {
    try {
      const params = new URLSearchParams();
      params.append("q", searchQuery);

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && key !== "q") {
            params.append(key, value.toString());
          }
        });
      }

      const response: AxiosResponse<Product[]> = await productApiClient.get(
        `/search?${params.toString()}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to search products"
      );
    }
  },

  // Get featured products
  // Full URL: http://localhost:4005/api/products/featured
  getFeaturedProducts: async (limit?: number): Promise<Product[]> => {
    try {
      const params = limit ? `?limit=${limit}` : "";
      const response: AxiosResponse<Product[]> = await productApiClient.get(
        `/featured${params}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch featured products"
      );
    }
  },

  // Get user's products (requires auth)
  // Full URL: http://localhost:4005/api/products/my
  getUserProducts: async (): Promise<Product[]> => {
    try {
      const response: AxiosResponse<Product[]> = await productApiClient.get(
        "/my"
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user products"
      );
    }
  },

  // Update product stock (requires auth)
  // Full URL: http://localhost:4005/api/products/{productId}/stock
  updateProductStock: async (
    productId: string,
    quantity: number
  ): Promise<Product> => {
    try {
      const response: AxiosResponse<{ product: Product }> =
        await productApiClient.patch(`/${productId}/stock`, { quantity });
      return response.data.product;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update product stock"
      );
    }
  },

  // Test API connection
  // Full URL: http://localhost:4005/api/products/test
  testConnection: async (): Promise<{ message: string }> => {
    try {
      const response: AxiosResponse<{ message: string }> =
        await productApiClient.get("/test");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "API connection test failed"
      );
    }
  },
};

export default productApi;

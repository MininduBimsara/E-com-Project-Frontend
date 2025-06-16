import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  productApi,
  Product,
  CreateProductData,
  UpdateProductData,
  ProductFilters,
  SearchFilters,
} from "../../Api/Common/productApi";

// Thunk for getting all public products
export const getPublicProducts = createAsyncThunk<
  Product[],
  ProductFilters | undefined,
  { rejectValue: string }
>("products/getPublicProducts", async (filters, { rejectWithValue }) => {
  try {
    const products = await productApi.getPublicProducts(filters);
    return products;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Thunk for getting all products (with optional auth)
export const getProducts = createAsyncThunk<
  Product[],
  ProductFilters | undefined,
  { rejectValue: string }
>("products/getProducts", async (filters, { rejectWithValue }) => {
  try {
    const products = await productApi.getProducts(filters);
    return products;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Thunk for getting product by ID
export const getProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("products/getProductById", async (productId, { rejectWithValue }) => {
  try {
    const product = await productApi.getProductById(productId);
    return product;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Thunk for creating a product
export const createProduct = createAsyncThunk<
  Product,
  CreateProductData | FormData,
  { rejectValue: string }
>("products/createProduct", async (productData, { rejectWithValue }) => {
  try {
    const product = await productApi.createProduct(productData);
    return product;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Thunk for updating a product
export const updateProduct = createAsyncThunk<
  Product,
  { productId: string; updateData: UpdateProductData | FormData },
  { rejectValue: string }
>(
  "products/updateProduct",
  async ({ productId, updateData }, { rejectWithValue }) => {
    try {
      const product = await productApi.updateProduct(productId, updateData);
      return product;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a product
export const deleteProduct = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("products/deleteProduct", async (productId, { rejectWithValue }) => {
  try {
    await productApi.deleteProduct(productId);
    return productId;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Thunk for getting products by category
export const getProductsByCategory = createAsyncThunk<
  Product[],
  { category: string; options?: { limit?: number; skip?: number } },
  { rejectValue: string }
>(
  "products/getProductsByCategory",
  async ({ category, options }, { rejectWithValue }) => {
    try {
      const products = await productApi.getProductsByCategory(
        category,
        options
      );
      return products;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for searching products
export const searchProducts = createAsyncThunk<
  Product[],
  { searchQuery: string; filters?: SearchFilters },
  { rejectValue: string }
>(
  "products/searchProducts",
  async ({ searchQuery, filters }, { rejectWithValue }) => {
    try {
      const products = await productApi.searchProducts(searchQuery, filters);
      return products;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for getting featured products
export const getFeaturedProducts = createAsyncThunk<
  Product[],
  number | undefined,
  { rejectValue: string }
>("products/getFeaturedProducts", async (limit, { rejectWithValue }) => {
  try {
    const products = await productApi.getFeaturedProducts(limit);
    return products;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Thunk for getting user's products
export const getUserProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/getUserProducts", async (_, { rejectWithValue }) => {
  try {
    const products = await productApi.getUserProducts();
    return products;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Thunk for updating product stock
export const updateProductStock = createAsyncThunk<
  Product,
  { productId: string; quantity: number },
  { rejectValue: string }
>(
  "products/updateProductStock",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const product = await productApi.updateProductStock(productId, quantity);
      return product;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for testing API connection
export const testProductApi = createAsyncThunk<
  { message: string },
  void,
  { rejectValue: string }
>("products/testApi", async (_, { rejectWithValue }) => {
  try {
    const result = await productApi.testConnection();
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

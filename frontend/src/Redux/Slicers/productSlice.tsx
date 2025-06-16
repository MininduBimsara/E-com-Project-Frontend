import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getPublicProducts,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
  getFeaturedProducts,
  getUserProducts,
  updateProductStock,
  testProductApi,
} from "../Thunks/productThunks";
import { Product } from "../api/productApi";

interface ProductState {
  // Product lists
  products: Product[];
  featuredProducts: Product[];
  userProducts: Product[];
  categoryProducts: Product[];
  searchResults: Product[];

  // Current selected product
  currentProduct: Product | null;

  // Loading states
  loading: boolean;
  featuredLoading: boolean;
  userProductsLoading: boolean;
  categoryLoading: boolean;
  searchLoading: boolean;
  productDetailsLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  // Error states
  error: string | null;
  featuredError: string | null;
  userProductsError: string | null;
  categoryError: string | null;
  searchError: string | null;
  productDetailsError: string | null;
  createError: string | null;
  updateError: string | null;
  deleteError: string | null;

  // UI states
  currentCategory: string;
  currentSearchQuery: string;
  hasMore: boolean; // For pagination
  totalProducts: number;

  // Filters
  activeFilters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  };
}

const initialState: ProductState = {
  // Product lists
  products: [],
  featuredProducts: [],
  userProducts: [],
  categoryProducts: [],
  searchResults: [],

  // Current selected product
  currentProduct: null,

  // Loading states
  loading: false,
  featuredLoading: false,
  userProductsLoading: false,
  categoryLoading: false,
  searchLoading: false,
  productDetailsLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  // Error states
  error: null,
  featuredError: null,
  userProductsError: null,
  categoryError: null,
  searchError: null,
  productDetailsError: null,
  createError: null,
  updateError: null,
  deleteError: null,

  // UI states
  currentCategory: "all",
  currentSearchQuery: "",
  hasMore: true,
  totalProducts: 0,

  // Filters
  activeFilters: {},
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Clear errors
    clearErrors: (state) => {
      state.error = null;
      state.featuredError = null;
      state.userProductsError = null;
      state.categoryError = null;
      state.searchError = null;
      state.productDetailsError = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },

    // Clear current product
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.productDetailsError = null;
    },

    // Set current category
    setCurrentCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = action.payload;
    },

    // Set current search query
    setCurrentSearchQuery: (state, action: PayloadAction<string>) => {
      state.currentSearchQuery = action.payload;
    },

    // Set active filters
    setActiveFilters: (
      state,
      action: PayloadAction<ProductState["activeFilters"]>
    ) => {
      state.activeFilters = action.payload;
    },

    // Clear active filters
    clearActiveFilters: (state) => {
      state.activeFilters = {};
      state.currentCategory = "all";
      state.currentSearchQuery = "";
    },

    // Clear search results
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchError = null;
      state.currentSearchQuery = "";
    },

    // Reset products list (for pagination reset)
    resetProducts: (state) => {
      state.products = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle get public products
      .addCase(getPublicProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPublicProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
          state.totalProducts = action.payload.length;
          state.hasMore = action.payload.length >= 50; // Assuming default limit is 50
        }
      )
      .addCase(getPublicProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle get products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
          state.totalProducts = action.payload.length;
          state.hasMore = action.payload.length >= 50;
        }
      )
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle get product by ID
      .addCase(getProductById.pending, (state) => {
        state.productDetailsLoading = true;
        state.productDetailsError = null;
      })
      .addCase(
        getProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.productDetailsLoading = false;
          state.currentProduct = action.payload;
        }
      )
      .addCase(getProductById.rejected, (state, action) => {
        state.productDetailsLoading = false;
        state.productDetailsError = action.payload as string;
      })

      // Handle create product
      .addCase(createProduct.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.createLoading = false;
          state.products.unshift(action.payload); // Add to beginning of list
          state.userProducts.unshift(action.payload);
          state.totalProducts += 1;
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as string;
      })

      // Handle update product
      .addCase(updateProduct.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.updateLoading = false;
          const updatedProduct = action.payload;

          // Update in products list
          const productIndex = state.products.findIndex(
            (p) => p._id === updatedProduct._id
          );
          if (productIndex !== -1) {
            state.products[productIndex] = updatedProduct;
          }

          // Update in user products list
          const userProductIndex = state.userProducts.findIndex(
            (p) => p._id === updatedProduct._id
          );
          if (userProductIndex !== -1) {
            state.userProducts[userProductIndex] = updatedProduct;
          }

          // Update current product if it's the same
          if (state.currentProduct?._id === updatedProduct._id) {
            state.currentProduct = updatedProduct;
          }
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string;
      })

      // Handle delete product
      .addCase(deleteProduct.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.deleteLoading = false;
          const deletedProductId = action.payload;

          // Remove from products list
          state.products = state.products.filter(
            (p) => p._id !== deletedProductId
          );

          // Remove from user products list
          state.userProducts = state.userProducts.filter(
            (p) => p._id !== deletedProductId
          );

          // Clear current product if it's the deleted one
          if (state.currentProduct?._id === deletedProductId) {
            state.currentProduct = null;
          }

          state.totalProducts -= 1;
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload as string;
      })

      // Handle get products by category
      .addCase(getProductsByCategory.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
      })
      .addCase(
        getProductsByCategory.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.categoryLoading = false;
          state.categoryProducts = action.payload;
        }
      )
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.categoryLoading = false;
        state.categoryError = action.payload as string;
      })

      // Handle search products
      .addCase(searchProducts.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(
        searchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.searchLoading = false;
          state.searchResults = action.payload;
        }
      )
      .addCase(searchProducts.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload as string;
      })

      // Handle get featured products
      .addCase(getFeaturedProducts.pending, (state) => {
        state.featuredLoading = true;
        state.featuredError = null;
      })
      .addCase(
        getFeaturedProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.featuredLoading = false;
          state.featuredProducts = action.payload;
        }
      )
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.featuredLoading = false;
        state.featuredError = action.payload as string;
      })

      // Handle get user products
      .addCase(getUserProducts.pending, (state) => {
        state.userProductsLoading = true;
        state.userProductsError = null;
      })
      .addCase(
        getUserProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.userProductsLoading = false;
          state.userProducts = action.payload;
        }
      )
      .addCase(getUserProducts.rejected, (state, action) => {
        state.userProductsLoading = false;
        state.userProductsError = action.payload as string;
      })

      // Handle update product stock
      .addCase(updateProductStock.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(
        updateProductStock.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.updateLoading = false;
          const updatedProduct = action.payload;

          // Update in products list
          const productIndex = state.products.findIndex(
            (p) => p._id === updatedProduct._id
          );
          if (productIndex !== -1) {
            state.products[productIndex] = updatedProduct;
          }

          // Update in user products list
          const userProductIndex = state.userProducts.findIndex(
            (p) => p._id === updatedProduct._id
          );
          if (userProductIndex !== -1) {
            state.userProducts[userProductIndex] = updatedProduct;
          }

          // Update current product if it's the same
          if (state.currentProduct?._id === updatedProduct._id) {
            state.currentProduct = updatedProduct;
          }
        }
      )
      .addCase(updateProductStock.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string;
      })

      // Handle test API
      .addCase(testProductApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(testProductApi.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(testProductApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearErrors,
  clearCurrentProduct,
  setCurrentCategory,
  setCurrentSearchQuery,
  setActiveFilters,
  clearActiveFilters,
  clearSearchResults,
  resetProducts,
} = productSlice.actions;

export default productSlice.reducer;

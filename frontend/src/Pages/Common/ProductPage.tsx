import React, { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/hook";
import {
  getPublicProducts,
  getProducts,
  getProductById,
  searchProducts,
  getFeaturedProducts,
} from "../../Redux/Thunks/productThunks";
import {
  setCurrentCategory,
  setCurrentSearchQuery,
  setActiveFilters,
  clearCurrentProduct,
  clearErrors,
} from "../../Redux/Slicers/productSlice";
import ProductsHero from "../../Components/Common/Product/ProductsHero";
import ProductsFilter from "../../Components/Common/Product/ProductsFilter";
import ProductsGrid from "../../Components/Common/Product/ProductsGrid";
import ProductModal from "../../Components/Common/Product/ProductModal";

// Frontend Product interface (for UI components)
interface FrontendProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  features?: string[];
  inStock: boolean;
  rating: string;
  ecoLabel: string;
  carbonFootprint: number;
  isNew?: boolean;
  isPopular?: boolean;
  isBestseller?: boolean;
  specifications?: { [key: string]: string };
  sustainability?: string[];
}

// Transform backend product to frontend product interface
const transformBackendProduct = (backendProduct: any): FrontendProduct => {
  // Image URL construction - FIXED
  const getImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return [];

    // If imageUrl starts with '/', it's already a relative path from backend
    if (imageUrl.startsWith("/")) {
      return [`${import.meta.env.VITE_PRODUCT_API_URL}${imageUrl}`];
    }

    // If it's already a full URL, use as is
    if (imageUrl.startsWith("http")) {
      return [imageUrl];
    }

    // If it's just a filename, construct the full URL
    return [
      `${import.meta.env.VITE_PRODUCT_API_URL}/product-images/${imageUrl}`,
    ];
  };

  return {
    id: backendProduct._id,
    name: backendProduct.name,
    category: backendProduct.category.toLowerCase(),
    description: backendProduct.description,
    price: backendProduct.price,
    originalPrice: undefined,
    images: getImageUrl(backendProduct.imageUrl),
    features: [],
    inStock: backendProduct.stock > 0,
    rating:
      backendProduct.ecoRating >= 4.5
        ? "A+"
        : backendProduct.ecoRating >= 4
        ? "A"
        : "B",
    ecoLabel: getEcoLabel(backendProduct.category),
    carbonFootprint: backendProduct.carbonFootprint,
    isNew: isNewProduct(backendProduct.createdAt),
    isPopular: backendProduct.ecoRating >= 4.5,
    isBestseller: backendProduct.ecoRating >= 4.8,
    specifications: {
      category: backendProduct.category,
      ecoRating: backendProduct.ecoRating.toString(),
      stock: backendProduct.stock.toString(),
    },
    sustainability: getSustainabilityInfo(backendProduct.category),
  };
};

// Helper functions
const getEcoLabel = (category: string): string => {
  switch (category) {
    case "Kitchen":
      return "Zero Waste";
    case "Cloths":
      return "Organic Cotton";
    case "Accessories":
      return "Recycled Materials";
    default:
      return "Eco-Friendly";
  }
};

const isNewProduct = (createdAt: string): boolean => {
  const created = new Date(createdAt);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return created > thirtyDaysAgo;
};

const getSustainabilityInfo = (category: string): string[] => {
  const baseInfo = [
    "Carbon neutral shipping",
    "Plastic-free packaging",
    "Ethically sourced materials",
  ];

  switch (category) {
    case "Kitchen":
      return [...baseInfo, "Biodegradable materials", "Zero waste production"];
    case "Cloths":
      return [...baseInfo, "Organic certified", "Fair trade approved"];
    case "Accessories":
      return [...baseInfo, "Recycled content", "Circular design"];
    default:
      return baseInfo;
  }
};

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  // Redux state
  const {
    products,
    featuredProducts,
    searchResults,
    currentProduct,
    loading,
    featuredLoading,
    searchLoading,
    productDetailsLoading,
    error,
    currentCategory,
    currentSearchQuery,
    activeFilters,
  } = useAppSelector((state) => state.products);

  const { isAuthenticated } = useAppSelector((state) => state.user);

  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState<FrontendProduct[]>(
    []
  );
  const [selectedProductForModal, setSelectedProductForModal] =
    useState<FrontendProduct | null>(null);

  // Load initial data
  useEffect(() => {
    dispatch(clearErrors());

    // Load featured products
    dispatch(getFeaturedProducts(6));

    // Load main products based on authentication
    if (isAuthenticated) {
      dispatch(getProducts());
    } else {
      dispatch(getPublicProducts());
    }
  }, [dispatch, isAuthenticated]);

  // Transform and set displayed products
  useEffect(() => {
    let sourceProducts = products;

    // Use search results if there's an active search
    if (currentSearchQuery && searchResults.length > 0) {
      sourceProducts = searchResults;
    }

    // Transform backend products to frontend format
    const transformedProducts = sourceProducts.map(transformBackendProduct);
    setDisplayedProducts(transformedProducts);
  }, [products, searchResults, currentSearchQuery]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    dispatch(setCurrentCategory(category));
    dispatch(clearCurrentProduct());

    const filters = {
      ...activeFilters,
      category: category === "all" ? undefined : category,
    };

    dispatch(setActiveFilters(filters));

    // Fetch products with new filters
    if (isAuthenticated) {
      dispatch(getProducts(filters));
    } else {
      dispatch(getPublicProducts(filters));
    }
  };

  // Handle search
  const handleSearchChange = (searchTerm: string) => {
    dispatch(setCurrentSearchQuery(searchTerm));

    if (searchTerm.trim()) {
      const filters = {
        category: currentCategory === "all" ? undefined : currentCategory,
        ...activeFilters,
      };

      dispatch(searchProducts({ searchQuery: searchTerm, filters }));
    } else {
      // Clear search and reload products
      const filters = {
        category: currentCategory === "all" ? undefined : currentCategory,
        ...activeFilters,
      };

      if (isAuthenticated) {
        dispatch(getProducts(filters));
      } else {
        dispatch(getPublicProducts(filters));
      }
    }
  };

  // Handle product view - FIXED
  const handleProductView = (product: FrontendProduct) => {
    console.log("Product clicked:", product);

    // Set the selected product for modal immediately
    setSelectedProductForModal(product);
    setIsModalOpen(true);

    // If authenticated, try to fetch detailed product info
    if (isAuthenticated) {
      console.log("Fetching product details for:", product.id);
      dispatch(getProductById(product.id));
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductForModal(null);
    dispatch(clearCurrentProduct());
  };

  // Transform current product for modal - FIXED
  const modalProduct = useMemo(() => {
    // If we have detailed product from API, use it
    if (currentProduct && isModalOpen) {
      return transformBackendProduct(currentProduct);
    }

    // Otherwise use the selected product
    return selectedProductForModal;
  }, [currentProduct, selectedProductForModal, isModalOpen]);

  // Filter products for display
  const filteredProducts = useMemo(() => {
    let filtered = displayedProducts;

    // Apply category filter
    if (currentCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === currentCategory
      );
    }

    // Apply search filter (client-side backup)
    if (currentSearchQuery && !searchLoading) {
      const searchLower = currentSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.ecoLabel.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [displayedProducts, currentCategory, currentSearchQuery, searchLoading]);

  return (
    <div className="min-h-screen bg-white">
      <ProductsHero />

      <ProductsFilter
        activeCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
        searchTerm={currentSearchQuery}
        onSearchChange={handleSearchChange}
      />

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-light">{error}</p>
            <button
              onClick={() => dispatch(clearErrors())}
              className="text-red-600 hover:text-red-800 text-sm mt-2 underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <ProductsGrid
        products={filteredProducts}
        onProductView={handleProductView}
        loading={loading || searchLoading}
      />

      <ProductModal
        product={modalProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        loading={productDetailsLoading}
      />
    </div>
  );
};

export default ProductsPage;

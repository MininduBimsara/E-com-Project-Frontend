import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Search, Package, Eye, Edit, Trash2, Star } from "lucide-react";
import StatusBadge from "./StatusBadge";
import ProductModal from "./ProductModal";
import { getProducts } from "../../../Redux/Thunks/adminThunks";
import { type Product } from "../../../Api/Admin/adminApi";
import { type AppDispatch, type RootState } from "../../../Redux/Store/store";

interface ProductsSectionProps {
  products: Product[];
  loading?: boolean;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  products = [],
  loading = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading: reduxLoading } = useSelector(
    (state: RootState) => state.admin
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const isLoading = loading || reduxLoading.products;

  // Get unique categories from products
  const categories = [...new Set(products.map((product) => product.category))];

  // Filter products based on search and category
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

  // Debounced search function
  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      if (term.length > 2 || term.length === 0) {
        dispatch(
          getProducts({
            page: 1,
            limit: 50,
            search: term,
            category: selectedCategory,
          })
        );
        setCurrentPage(1);
      }
    },
    [dispatch, selectedCategory]
  );

  const handleCategoryFilter = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      dispatch(
        getProducts({
          page: 1,
          limit: 50,
          search: searchTerm,
          category: category,
        })
      );
      setCurrentPage(1);
    },
    [dispatch, searchTerm]
  );

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleCloseModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  const handleExportProducts = () => {
    // Convert products data to CSV
    const csvContent = [
      ["Product Name", "Category", "Price", "Stock", "Status", "Created"],
      ...filteredProducts.map((product) => [
        product.name,
        product.category,
        product.price.toString(),
        product.stock.toString(),
        product.status,
        new Date(product.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `products_export_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Stock status helper
  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: "text-red-600", status: "Out of Stock" };
    if (stock < 10) return { color: "text-yellow-600", status: "Low Stock" };
    return { color: "text-green-600", status: "In Stock" };
  };

  return (
    <>
      <motion.div
        key="products"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        {/* Products Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-sm border border-green-100/50 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-light text-gray-900 tracking-wide">
                Product Management
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage product catalog and inventory
              </p>
              {products.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Showing {filteredProducts.length} of {products.length}{" "}
                  products
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:outline-none w-full sm:w-auto"
                  disabled={isLoading}
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                disabled={isLoading}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="capitalize"
                  >
                    {category}
                  </option>
                ))}
              </select>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleExportProducts}
                disabled={isLoading || filteredProducts.length === 0}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-light tracking-wide hover:bg-blue-700 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Export Products
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-light tracking-wide hover:bg-green-700 transition-colors whitespace-nowrap"
                disabled={isLoading}
              >
                Add Product
              </motion.button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600">Total Products</p>
              <p className="text-2xl font-light text-green-700">
                {products.length}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-yellow-600">Low Stock</p>
              <p className="text-2xl font-light text-yellow-700">
                {products.filter((p) => p.stock > 0 && p.stock < 10).length}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-red-600">Out of Stock</p>
              <p className="text-2xl font-light text-red-700">
                {products.filter((p) => p.stock === 0).length}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600">Categories</p>
              <p className="text-2xl font-light text-blue-700">
                {categories.length}
              </p>
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full"
              />
              <span className="ml-3 text-gray-600">Loading products...</span>
            </div>
          )}

          {/* Products Table */}
          {!isLoading && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      PRODUCT
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      PRICE
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      CATEGORY
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      STOCK
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      STATUS
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      CREATED
                    </th>
                    <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => {
                    const stockStatus = getStockStatus(product.stock);
                    return (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                              <Package className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ID: {product.id.slice(-8)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700 font-medium">
                          Rs. {product.price.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-gray-700 capitalize">
                          {product.category}
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <span
                              className={`font-medium ${stockStatus.color}`}
                            >
                              {product.stock}
                            </span>
                            <p className={`text-xs ${stockStatus.color}`}>
                              {stockStatus.status}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <StatusBadge status={product.status} />
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={() => handleProductClick(product)}
                              className="p-1 text-gray-500 hover:text-blue-600"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              className="p-1 text-gray-500 hover:text-green-600"
                              title="Edit Product"
                            >
                              <Edit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              className="p-1 text-gray-500 hover:text-red-600"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchTerm || selectedCategory
                  ? "No products found matching your criteria"
                  : "No products available"}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Product Modal */}
      <AnimatePresence>
        {showProductModal && selectedProduct && (
          <ProductModal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductsSection;

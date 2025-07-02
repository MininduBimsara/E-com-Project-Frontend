import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Eye, Edit, Trash2, Star } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import ProductModal from "../modals/ProductModal";
import { Product, SectionProps } from "../types/AdminTypes";

const ProductsSection: React.FC<SectionProps> = ({
  products = [],
  setProducts,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products based on search and category
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleCloseModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
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
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:outline-none w-full sm:w-auto"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
              >
                <option value="">All Categories</option>
                <option value="clothing">Clothing</option>
                <option value="kitchen">Kitchen</option>
                <option value="accessories">Accessories</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-light tracking-wide hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                Add Product
              </motion.button>
            </div>
          </div>

          {/* Products Table */}
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
                    SOLD
                  </th>
                  <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                    STATUS
                  </th>
                  <th className="text-left py-3 px-4 font-light text-gray-600 tracking-wide">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product._id}
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
                          <div className="flex items-center mt-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">
                              {product.rating || "N/A"}
                            </span>
                          </div>
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
                      <span
                        className={`font-medium ${
                          product.stock === 0
                            ? "text-red-600"
                            : product.stock < 10
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {product.sold || 0}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleProductClick(product)}
                          className="p-1 text-gray-500 hover:text-blue-600"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-1 text-gray-500 hover:text-green-600"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-1 text-gray-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No products found matching your criteria
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

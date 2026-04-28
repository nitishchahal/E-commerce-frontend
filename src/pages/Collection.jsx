import React, { useContext, useMemo, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiSliders,
  FiRefreshCw,
  FiSearch
} from "react-icons/fi";

const Collection = () => {
  const { products = [], search = "", showSearch = false } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortType, setSortType] = useState("relevant");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const productsPerPage = 12;

  // Calculate price range from products
  const { minPrice, maxPrice } = useMemo(() => {
    if (!products.length) return { minPrice: 0, maxPrice: 5000 };
    const prices = products.map(p => typeof p.price === 'object' ? p.price.current : p.price);
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices))
    };
  }, [products]);

  // Initialize price range
  useEffect(() => {
    if (minPrice !== 0 || maxPrice !== 5000) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

  // Toggle helpers
  const toggleSelection = (setter, value) => {
    setter((prev) => prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setPriceRange([minPrice, maxPrice]);
    setSortType("relevant");
    setCurrentPage(1);
  };

  // Get active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategories.length > 0) count++;
    if (selectedSubcategories.length > 0) count++;
    if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) count++;
    return count;
  }, [selectedCategories, selectedSubcategories, priceRange, minPrice, maxPrice]);

  // ✅ ENHANCED FILTER & SORT LOGIC
  const { totalProducts, currentProducts } = useMemo(() => {
    setIsLoading(true);

    let list = [...products];

    // Search filter
    if (search && showSearch) {
      list = list.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase()) ||
        item.subCategory?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      list = list.filter((item) => selectedCategories.includes(item.category));
    }

    // Subcategory filter
    if (selectedSubcategories.length > 0) {
      list = list.filter((item) => selectedSubcategories.includes(item.subCategory));
    }

    // Price range filter
    list = list.filter((item) => {
      const price = typeof item.price === 'object' ? item.price.current : item.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sorting
    switch (sortType) {
      case "low-high":
        list.sort((a, b) => {
          const priceA = typeof a.price === 'object' ? a.price.current : a.price;
          const priceB = typeof b.price === 'object' ? b.price.current : b.price;
          return priceA - priceB;
        });
        break;
      case "high-low":
        list.sort((a, b) => {
          const priceA = typeof a.price === 'object' ? a.price.current : a.price;
          const priceB = typeof b.price === 'object' ? b.price.current : b.price;
          return priceB - priceA;
        });
        break;
      case "newest":
        list.sort((a, b) => (b.date || 0) - (a.date || 0));
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default: // relevant
        // Keep original order or implement relevance scoring
        break;
    }

    const totalProducts = list.length;
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = list.slice(startIndex, startIndex + productsPerPage);

    setTimeout(() => setIsLoading(false), 300); // Simulate loading

    return { totalProducts, currentProducts };
  }, [products, search, showSearch, selectedCategories, selectedSubcategories, priceRange, sortType, currentPage]);

  // Price Range Component
  const PriceRangeFilter = () => {
  // 🧠 safe handlers (no invalid ranges)
  const handleMinChange = (value) => {
    const newMin = Math.min(value, priceRange[1] - 1);
    setPriceRange([newMin, priceRange[1]]);
  };

  const handleMaxChange = (value) => {
    const newMax = Math.max(value, priceRange[0] + 1);
    setPriceRange([priceRange[0], newMax]);
  };

  // 🎯 percentage for active range
  const minPercent =
    ((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100;
  const maxPercent =
    ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100;

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 shadow-sm">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Price Range</h3>
        <button
          onClick={() => setPriceRange([minPrice, maxPrice])}
          className="text-xs text-gray-500 hover:text-black transition"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">

        {/* VALUES */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>

        {/* 🎯 SLIDER */}
        <div className="relative h-2">

          {/* base track */}
          <div className="absolute w-full h-2 bg-gray-200 rounded-full" />

          {/* active range */}
          <div
            className="absolute h-2 bg-black rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />

          {/* MIN */}
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[0]}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer"
          />

          {/* MAX */}
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer"
          />
        </div>

        {/* INPUTS */}
        <div className="flex gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            placeholder="Min"
          />

          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
};

  // Filter Group Component
  const FilterGroup = ({ title, options, selected, setter, type = "checkbox" }) => (
    <div className="bg-white/70 backdrop-blur-xl border border-gray-100 rounded-2xl p-5 shadow-sm">
      <h3 className="font-semibold mb-3 text-gray-800 flex items-center justify-between">
        {title}
        {selected.length > 0 && (
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            {selected.length}
          </span>
        )}
      </h3>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-3 cursor-pointer text-sm hover:text-blue-600 transition group">
            <input
              type={type}
              checked={selected.includes(opt)}
              onChange={() => toggleSelection(setter, opt)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="group-hover:text-blue-600">{opt}</span>
            <span className="text-xs text-gray-400 ml-auto">
              ({products.filter(p => p[title.toLowerCase()] === opt).length})
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  // Pagination Component
  const Pagination = () => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i);
      }

      if (currentPage - delta > 2) rangeWithDots.push(1, '...');
      else rangeWithDots.push(1);

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) rangeWithDots.push('...', totalPages);
      else if (totalPages > 1) rangeWithDots.push(totalPages);

      return rangeWithDots;
    };

    return (
      <div className="flex items-center justify-center gap-2 mt-12">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiChevronLeft className="w-4 h-4" />
        </button>

        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            className={`px-4 py-2 rounded-lg border transition ${
              page === currentPage
                ? 'bg-black text-white border-black'
                : page === '...'
                ? 'cursor-default'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  // Loading Skeleton
  const ProductSkeleton = () => (
    <div className="min-w-[280px] animate-pulse">
      <div className="bg-gray-200 rounded-2xl h-[260px] mb-4"></div>
      <div className="space-y-2">
        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
        <div className="bg-gray-200 h-4 rounded w-1/2"></div>
        <div className="bg-gray-200 h-6 rounded w-1/4"></div>
      </div>
    </div>
  );

  return (
    <div className="px-4 sm:px-10 py-12 bg-gradient-to-br from-white to-gray-50 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <Title text1="ALL" text2="COLLECTION" />
          <p className="text-gray-600 mt-2">
            {totalProducts} {totalProducts === 1 ? 'product' : 'products'} found
            {search && showSearch && ` for "${search}"`}
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* View Toggle */}
          <div className="flex bg-white rounded-full p-1 border border-gray-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition ${viewMode === "grid" ? "bg-black text-white" : "text-gray-600"}`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition ${viewMode === "list" ? "bg-black text-white" : "text-gray-600"}`}
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="newest">Sort by: Newest</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm hover:bg-red-100 transition"
            >
              <FiRefreshCw className="w-4 h-4" />
              Clear ({activeFiltersCount})
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-8">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex flex-col w-64 gap-4 sticky top-24 h-fit">
          <PriceRangeFilter />
          <FilterGroup
            title="Categories"
            options={["Men", "Women", "Kids"]}
            selected={selectedCategories}
            setter={setSelectedCategories}
          />
          <FilterGroup
            title="Type"
            options={["Topwear", "Bottomwear", "Winterwear"]}
            selected={selectedSubcategories}
            setter={setSelectedSubcategories}
          />
        </aside>

        {/* PRODUCTS GRID */}
        <main className="flex-1">
          {isLoading ? (
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : currentProducts.length > 0 ? (
            <>
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                {currentProducts.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <ProductItem
                      id={item._id}
                      name={item.name}
                      price={item.price}
                      image={item.images}
                    />
                  </motion.div>
                ))}
              </div>
              <Pagination />
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                <FiSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-black text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <button
        onClick={() => setShowFilter(true)}
        className="lg:hidden fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition"
      >
        <FiSliders className="w-5 h-5" />
        {activeFiltersCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <PriceRangeFilter />
              <FilterGroup
                title="Categories"
                options={["Men", "Women", "Kids"]}
                selected={selectedCategories}
                setter={setSelectedCategories}
              />
              <FilterGroup
                title="Type"
                options={["Topwear", "Bottomwear", "Winterwear"]}
                selected={selectedSubcategories}
                setter={setSelectedSubcategories}
              />

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-200 transition"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilter(false)}
                  className="flex-1 bg-black text-white py-3 rounded-full font-medium hover:scale-105 transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collection;
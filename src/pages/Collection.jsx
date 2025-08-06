import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState('Relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubcategory = (e) => {
    const value = e.target.value;
    setSelectedSubcategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilters = () => {
    let productscopy = [...products];

    if (search && showSearch) {
      productscopy = productscopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      productscopy = productscopy.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    if (selectedSubcategories.length > 0) {
      productscopy = productscopy.filter((item) =>
        selectedSubcategories.some(
          (sub) => sub.toLowerCase() === item.subCategory?.toLowerCase()
        )
      );
    }

    setFilteredProducts(productscopy);
  };

  const sortProduct = () => {
    let sorted = [...filteredProducts];

    switch (sortType) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilters(); // Relevant
        return;
    }

    setFilteredProducts(sorted);
  };

  useEffect(() => {
    if (products?.length) {
      applyFilters();
    }
  }, [selectedCategories, selectedSubcategories, products, search, showSearch]);

  useEffect(() => {
    sortType !== 'Relevant' ? sortProduct() : applyFilters();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-6 pt-10 border-t px-4 sm:px-10'>

      {/* Sidebar Filters */}
      <div className='sm:w-64'>
        <button
          className='sm:hidden flex items-center gap-2 text-red-600 font-medium mb-4'
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTER
          <img
            src={assets.dropdown_icon}
            alt='toggle'
            className={`w-4 h-4 transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
          />
        </button>

        <div className={`${showFilter ? 'block' : 'hidden'} sm:block space-y-6`}>

          {/* Category Filter */}
          <div className='border border-gray-200 rounded-md p-4 shadow-sm'>
            <p className='text-sm font-semibold text-blue-700 mb-2'>CATEGORIES</p>
            <div className='space-y-2 text-sm text-gray-700'>
              {['Men', 'Women', 'Kids'].map((cat) => (
                <label key={cat} className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    value={cat}
                    onChange={toggleCategory}
                    className='accent-red-600'
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory Filter */}
          <div className='border border-gray-200 rounded-md p-4 shadow-sm'>
            <p className='text-sm font-semibold text-blue-700 mb-2'>TYPE</p>
            <div className='space-y-2 text-sm text-gray-700'>
              {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                <label key={type} className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    value={type}
                    onChange={toggleSubcategory}
                    className='accent-red-600'
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid + Sorting */}
      <div className='flex-1'>
        <div className='flex justify-between items-center flex-wrap gap-2 mb-6'>
          <Title text1='ALL' text2='COLLECTION' />
          <select
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
            className='text-sm border border-gray-300 px-3 py-1 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value="Relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className='col-span-full text-center text-gray-500 text-sm'>No products found or still loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;

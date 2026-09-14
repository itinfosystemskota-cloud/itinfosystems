import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  Grid,
  List,
  MessageCircle,
  Phone,
  Eye,
  SlidersHorizontal,
  X,
  CheckCircle,
  Tag,
  Sparkles,
  ArrowUpDown,
  ShoppingBag,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { CategoryIcon } from '../components/common/CategoryIcon';

interface ProductsPageProps {
  setCurrentTab: (tab: string) => void;
  selectedCategorySlug?: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ setCurrentTab, selectedCategorySlug }) => {
  const { products, categories, getWhatsAppUrl, openInquiryModal } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync selectedCategory when selectedCategorySlug changes
  useEffect(() => {
    if (selectedCategorySlug) {
      const match = categories.find(
        c => c.id === selectedCategorySlug || c.slug === selectedCategorySlug || c.name.toLowerCase() === selectedCategorySlug.toLowerCase()
      );
      if (match) {
        setSelectedCategory(match.name);
      } else {
        setSelectedCategory('all');
      }
    } else {
      setSelectedCategory('all');
    }
  }, [selectedCategorySlug, categories]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchModel = p.model.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchDesc = p.shortDescription.toLowerCase().includes(q);
          const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
          if (!matchName && !matchModel && !matchSku && !matchCat && !matchDesc && !matchTags) {
            return false;
          }
        }

        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // In stock
        if (inStockOnly && !p.isAvailable) {
          return false;
        }

        // Featured
        if (featuredOnly && !p.isFeatured) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, searchQuery, selectedCategory, inStockOnly, featuredOnly, sortBy]);

  const handleProductClick = (productId: string) => {
    setCurrentTab(`product-${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setInStockOnly(false);
    setFeaturedOnly(false);
    setSortBy('featured');
  };

  const activeCategoryObj = categories.find(c => c.name === selectedCategory);

  return (
    <div className="space-y-8 py-6 max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      {/* Category Pills Header Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Equipment Catalog</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {selectedCategory === 'all' ? 'Hardware & IT Catalog' : selectedCategory}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {activeCategoryObj
                ? activeCategoryObj.description
                : 'Browse security surveillance, networking infrastructure, and software solutions in Kota'}
            </p>
          </div>

          {/* View Mode & Count */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Showing <strong className="text-white">{filteredProducts.length}</strong> of {products.length} items
            </span>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-1 flex items-center gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg border border-slate-700"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Quick Category Windows Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`p-3 rounded-2xl text-xs font-bold text-left transition flex flex-col justify-between border ${
              selectedCategory === 'all'
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40'
                : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <Layers className="w-4 h-4 text-cyan-300" />
              <span className="text-[10px] opacity-75">{products.length}</span>
            </div>
            <span className="truncate text-[11px] uppercase tracking-wide font-bold">All Products</span>
          </button>

          {categories.map(cat => {
            const count = products.filter(p => p.category === cat.name).length;
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`p-3 rounded-2xl text-xs font-bold text-left transition flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40'
                    : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <CategoryIcon name={cat.iconName} className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-blue-400'}`} />
                  <span className="text-[10px] opacity-75">{count}</span>
                </div>
                <span className="truncate text-[11px] uppercase tracking-wide font-bold">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Sidebar Filters (Desktop) */}
        <div className="hidden md:block md:col-span-3 space-y-6">
          {/* Search Box */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">
              Search Products
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search name, model, SKU..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Categories Sidebar */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white uppercase tracking-wider">
                Categories
              </label>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-[11px] text-blue-400 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left text-xs px-2.5 py-2 rounded-xl transition flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[10px] opacity-75">{products.length}</span>
              </button>
              {categories.map(cat => {
                const count = products.filter(p => p.category === cat.name).length;
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left text-xs px-2.5 py-2 rounded-xl transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] opacity-75">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional Filter Checkboxes */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 text-xs">
            <label className="block font-bold text-white uppercase tracking-wider mb-2">
              Status & Options
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 hover:text-white">
              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={e => setFeaturedOnly(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 bg-slate-800 border-slate-700"
              />
              <span>Featured Products Only</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 hover:text-white">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 bg-slate-800 border-slate-700"
              />
              <span>In Stock Available Only</span>
            </label>

            {(selectedCategory !== 'all' || featuredOnly || inStockOnly || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="w-full mt-2 text-center text-xs text-rose-400 hover:underline py-1"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* Right Content Area: Products Grid / List */}
        <div className="md:col-span-9 space-y-6">
          {/* Top Sort & Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Sort By:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="featured">Featured First</option>
                <option value="name">Product Name (A-Z)</option>
              </select>
            </div>

            {/* Quick Active Filter Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-blue-900/60 text-blue-300 px-2.5 py-1 rounded-full text-[11px] border border-blue-700/60">
                  <span>Category: {selectedCategory}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                </span>
              )}
            </div>
          </div>

          {/* Products Render */}
          {filteredProducts.length === 0 ? (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No products found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We could not find any items matching your selected criteria in this category.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-blue-600 text-white text-xs px-4 py-2 rounded-xl font-semibold hover:bg-blue-500 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/40 transition flex flex-col justify-between group shadow-md hover:-translate-y-1"
                >
                  <div>
                    {/* Image */}
                    <div
                      onClick={() => handleProductClick(product.id)}
                      className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow uppercase tracking-wide">
                        {product.category}
                      </span>
                      {product.isFeatured && (
                        <span className="absolute top-2.5 right-2.5 bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded shadow flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-mono text-[10px] text-blue-400">Model: {product.model}</span>
                        <span className="text-[10px] font-mono">SKU: {product.sku}</span>
                      </div>

                      <h3
                        onClick={() => handleProductClick(product.id)}
                        className="text-xs sm:text-sm font-bold text-white hover:text-blue-300 cursor-pointer transition line-clamp-2"
                      >
                        {product.name}
                      </h3>

                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="p-4 pt-0">
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                          Get Best Quote
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <a
                          href={getWhatsAppUrl(`Hello IT-INFOSYSTEMS, I am interested in ${product.name} (Model: ${product.model}, SKU: ${product.sku}). Please share quotation and details.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition"
                          title="WhatsApp Inquiry"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleProductClick(product.id)}
                          className="text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-3">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 hover:border-blue-500/40 transition"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl bg-slate-950 shrink-0 cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  />

                  <div className="flex-1 min-w-0 space-y-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px]">
                      <span className="bg-blue-600/30 text-blue-300 font-bold px-2 py-0.5 rounded uppercase text-[10px]">
                        {product.category}
                      </span>
                      <span className="text-slate-400">Model: {product.model}</span>
                      <span className="text-slate-500">• SKU: {product.sku}</span>
                    </div>

                    <h3
                      onClick={() => handleProductClick(product.id)}
                      className="text-sm font-bold text-white hover:text-blue-300 cursor-pointer transition truncate"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    <div className="text-left sm:text-right">
                      <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                        Get Best Quote
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={getWhatsAppUrl(`Hello IT-INFOSYSTEMS, I am interested in ${product.name} (Model: ${product.model}). Please share quotation and details.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleProductClick(product.id)}
                        className="text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 backdrop-blur-sm md:hidden">
          <div className="bg-slate-900 border-t border-slate-700 rounded-t-2xl w-full max-h-[80vh] overflow-y-auto p-6 space-y-5 animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Filter Products</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="text-slate-400 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Category */}
            <div>
              <label className="block text-xs font-bold text-white mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-2.5"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={featuredOnly}
                  onChange={e => setFeaturedOnly(e.target.checked)}
                />
                <span>Featured Only</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                />
                <span>In Stock Only</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={handleResetFilters}
                className="bg-slate-800 text-slate-300 text-xs py-2.5 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="bg-blue-600 text-white text-xs font-bold py-2.5 rounded-xl"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

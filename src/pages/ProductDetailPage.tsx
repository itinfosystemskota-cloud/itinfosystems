import React, { useState } from 'react';
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Send,
  Shield,
  CheckCircle2,
  Tag,
  Share2,
  Layers,
  Sparkles,
  Truck,
  Wrench,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

interface ProductDetailPageProps {
  productId: string;
  setCurrentTab: (tab: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, setCurrentTab }) => {
  const { products, openInquiryModal, getWhatsAppUrl, getCallUrl, settings, showToast } = useApp();

  const product = products.find(p => p.id === productId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => setCurrentTab('products')}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-xl"
        >
          Back to Product Catalog
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const waMessage = `Hello IT-INFOSYSTEMS, I am interested in ${product.name} (Model: ${product.model}, SKU: ${product.sku}). Please share best price and installation details.`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at IT-INFOSYSTEMS Kota`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <button onClick={() => setCurrentTab('home')} className="hover:text-white transition">
          Home
        </button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => setCurrentTab('products')} className="hover:text-white transition">
          Products
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-blue-400 font-medium truncate max-w-xs">{product.category}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-300 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Col: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-4/3 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />

            <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded shadow uppercase tracking-wide">
              {product.category}
            </span>

            {product.isAvailable ? (
              <span className="absolute top-4 right-4 bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded shadow flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>In Stock (Kota Ready)</span>
              </span>
            ) : (
              <span className="absolute top-4 right-4 bg-rose-950/80 border border-rose-500/50 text-rose-400 text-xs font-bold px-2.5 py-1 rounded shadow">
                Available on Order
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden bg-slate-900 border-2 transition shrink-0 ${
                    activeImageIndex === idx ? 'border-blue-500 shadow-md' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Value Highlights */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-center space-y-1">
              <Shield className="w-4 h-4 text-blue-400 mx-auto" />
              <p className="text-[11px] font-bold text-white">Genuine OEM</p>
              <p className="text-[10px] text-slate-400">100% Original</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-center space-y-1">
              <Wrench className="w-4 h-4 text-indigo-400 mx-auto" />
              <p className="text-[11px] font-bold text-white">Installation</p>
              <p className="text-[10px] text-slate-400">On-Site in Kota</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-center space-y-1">
              <Truck className="w-4 h-4 text-emerald-400 mx-auto" />
              <p className="text-[11px] font-bold text-white">Fast Delivery</p>
              <p className="text-[10px] text-slate-400">Same Day / 24h</p>
            </div>
          </div>
        </div>

        {/* Right Col: Product Info, Price & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                {product.category}
              </span>
              <button
                onClick={handleShare}
                className="text-slate-400 hover:text-white p-1 rounded-lg flex items-center gap-1 text-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span><strong>Model:</strong> {product.model}</span>
              <span>•</span>
              <span><strong>SKU:</strong> {product.sku}</span>
              <span>•</span>
              <span><strong>Category:</strong> {product.category}</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider">Pricing / Quotation</p>
                <div className="pt-1">
                  <span className="text-2xl font-black text-blue-400">Get Official Wholesale / Project Quote</span>
                  <p className="text-xs text-slate-400 mt-0.5">Contact us for institutional, corporate & dealer pricing in Kota & Rajasthan</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 border-t border-slate-800 pt-3">
              GST billing available. On-site installation, structured cabling, and warranty support provided.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* WhatsApp Button (Requirement: Automatically include product name) */}
              <a
                href={getWhatsAppUrl(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-950/40 transition active:scale-95 text-center"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Inquiry</span>
              </a>

              {/* Send Inquiry Modal */}
              <button
                onClick={() =>
                  openInquiryModal({
                    id: product.id,
                    name: `${product.name} (Model: ${product.model})`,
                    type: 'CCTV Camera'
                  })
                }
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-blue-900/40 transition active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Send Online Inquiry</span>
              </button>
            </div>

            <a
              href={getCallUrl()}
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs py-3 rounded-xl border border-slate-700 transition"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Call Us: {settings.phone}</span>
            </a>
          </div>

          {/* Short Description */}
          <div className="space-y-2 pt-2 text-xs text-slate-300 leading-relaxed border-t border-slate-800">
            <p>{product.shortDescription}</p>
          </div>
        </div>
      </div>

      {/* Full Description & Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-slate-800 pt-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              <span>Product Overview & Description</span>
            </h2>
            <div className="text-xs text-slate-300 leading-relaxed space-y-3">
              <p>{product.fullDescription}</p>
            </div>
          </div>

          {/* Features List */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Key Features & Highlights</h3>
              <ul className="grid grid-cols-1 gap-2.5">
                {product.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Technical Specifications Table */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg font-bold text-white">Technical Specifications</h2>
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800 text-xs">
            {product.specifications && product.specifications.length > 0 ? (
              product.specifications.map((spec, idx) => (
                <div key={idx} className="grid grid-cols-2 p-3 hover:bg-slate-800/40 transition">
                  <span className="font-semibold text-slate-400">{spec.key}</span>
                  <span className="text-white font-medium">{spec.value}</span>
                </div>
              ))
            ) : (
              <div className="p-4 text-slate-500 text-center">Specifications available upon request</div>
            )}
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Related Tags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-800 text-slate-300 text-[10px] px-2.5 py-1 rounded-full border border-slate-700"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-slate-800 pt-10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Related In {product.category}</h3>
            <button
              onClick={() => setCurrentTab('products')}
              className="text-xs text-blue-400 hover:underline"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <div
                key={rel.id}
                onClick={() => {
                  setCurrentTab(`product-${rel.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-4 cursor-pointer hover:border-slate-700 transition space-y-3 group"
              >
                <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden">
                  <img
                    src={rel.images[0]}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div>
                  <p className="text-[11px] text-blue-400 font-medium">{rel.brand}</p>
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-blue-300">{rel.name}</h4>
                  <p className="text-xs font-bold text-blue-400 mt-1">
                    Get Quote
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

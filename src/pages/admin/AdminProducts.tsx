import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  Eye,
  Sparkles,
  CheckCircle,
  X,
  Upload,
  Image as ImageIcon,
  Tag,
  Sliders,
  DollarSign,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import * as dataService from '../../services/dataService';

export const AdminProducts: React.FC = () => {
  const { products, categories, saveProduct, deleteProduct, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Specifications & Features local states for the active edit form
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newTag, setNewTag] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCat === 'all' || p.category === selectedCat;
    return matchSearch && matchCat;
  });

  const handleAddNew = () => {
    setCurrentProduct({
      name: '',
      slug: '',
      brand: 'Hikvision',
      category: categories[0]?.name || 'CCTV Cameras',
      model: '',
      sku: `IT-${Math.floor(1000 + Math.random() * 9000)}`,
      shortDescription: '',
      fullDescription: '',
      specifications: [
        { key: 'Resolution', value: '1080p Full HD' },
        { key: 'Lens', value: '2.8mm fixed' },
        { key: 'Night Vision', value: '30 Meters IR' }
      ],
      features: ['24/7 Monitoring', 'IP67 Weatherproof'],
      images: ['https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'],
      tags: ['CCTV', 'Security', 'Surveillance'],
      isFeatured: false,
      isAvailable: true,
      isPublished: true,
      hidePrice: false,
      price: 2500,
      mrp: 3500,
      discountPercentage: 28
    });
    setIsEditing(true);
  };

  const handleEdit = (prod: Product) => {
    setCurrentProduct({ ...prod });
    setIsEditing(true);
  };

  const handleDuplicate = (prod: Product) => {
    const duplicated: Partial<Product> = {
      ...prod,
      name: `${prod.name} (Copy)`,
      sku: `IT-${Math.floor(1000 + Math.random() * 9000)}`,
      slug: `${prod.slug}-copy-${Date.now()}`
    };
    delete duplicated.id;
    setCurrentProduct(duplicated);
    setIsEditing(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct(id);
      } catch (err: any) {
        showToast(err.message, 'error');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct?.name?.trim()) {
      showToast('Product name is required.', 'error');
      return;
    }

    try {
      const prodToSave = {
        ...currentProduct,
        slug: currentProduct.slug || currentProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };
      await saveProduct(prodToSave);
      setIsEditing(false);
      setCurrentProduct(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleAddSpec = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return;
    setCurrentProduct(prev => ({
      ...prev,
      specifications: [...(prev?.specifications || []), { key: newSpecKey.trim(), value: newSpecValue.trim() }]
    }));
    setNewSpecKey('');
    setNewSpecValue('');
  };

  const handleRemoveSpec = (idx: number) => {
    setCurrentProduct(prev => ({
      ...prev,
      specifications: (prev?.specifications || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setCurrentProduct(prev => ({
      ...prev,
      features: [...(prev?.features || []), newFeature.trim()]
    }));
    setNewFeature('');
  };

  const handleRemoveFeature = (idx: number) => {
    setCurrentProduct(prev => ({
      ...prev,
      features: (prev?.features || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    setCurrentProduct(prev => ({
      ...prev,
      tags: [...(prev?.tags || []), newTag.trim()]
    }));
    setNewTag('');
  };

  const handleRemoveTag = (idx: number) => {
    setCurrentProduct(prev => ({
      ...prev,
      tags: (prev?.tags || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setCurrentProduct(prev => ({
      ...prev,
      images: [...(prev?.images || []), imageUrlInput.trim()]
    }));
    setImageUrlInput('');
  };

  const handleRemoveImage = (idx: number) => {
    if ((currentProduct?.images || []).length <= 1) {
      showToast('Product must have at least one image.', 'info');
      return;
    }
    setCurrentProduct(prev => ({
      ...prev,
      images: (prev?.images || []).filter((_, i) => i !== idx)
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await dataService.uploadImage(file, 'products');
      setCurrentProduct(prev => ({
        ...prev,
        images: [...(prev?.images || []), url]
      }));
      showToast('Image uploaded successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Product Catalog Management</h2>
          <p className="text-xs text-slate-400">Add, edit pricing, manage technical specifications & gallery</p>
        </div>

        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, model, SKU, or brand..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedCat}
            onChange={e => setSelectedCat(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Brand / Category</th>
                <th className="py-3 px-4">Model & SKU</th>
                <th className="py-3 px-4">Pricing</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProducts.map(prod => (
                <tr key={prod.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-950 shrink-0"
                      />
                      <div className="min-w-0 max-w-xs">
                        <p className="font-bold text-white truncate">{prod.name}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{prod.shortDescription}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-bold text-blue-400">{prod.brand}</span>
                    <p className="text-[11px] text-slate-400">{prod.category}</p>
                  </td>

                  <td className="py-3 px-4">
                    <p className="text-slate-200 font-mono">{prod.model}</p>
                    <p className="text-[10px] text-slate-500">SKU: {prod.sku}</p>
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      Quote Model
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {prod.isFeatured && (
                        <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
                          Featured
                        </span>
                      )}
                      {prod.isAvailable ? (
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30">
                          Out
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleDuplicate(prod)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                        title="Duplicate Product"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleEdit(prod)}
                        className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        className="p-1.5 rounded-lg bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white border border-rose-500/30 transition"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isEditing && currentProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                {currentProduct.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => { setIsEditing(false); setCurrentProduct(null); }}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-300">
              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={currentProduct.name || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Category
                  </label>
                  <select
                    value={currentProduct.category || categories[0]?.name}
                    onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={currentProduct.brand || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, brand: e.target.value })}
                    placeholder="e.g. Hikvision, CP PLUS, TP-Link"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Model Number
                  </label>
                  <input
                    type="text"
                    value={currentProduct.model || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, model: e.target.value })}
                    placeholder="e.g. DS-2CD2143G2-I"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={currentProduct.sku || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, sku: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Pricing Section */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white uppercase tracking-wider">
                    Pricing Settings
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-amber-400">
                    <input
                      type="checkbox"
                      checked={!!currentProduct.hidePrice}
                      onChange={e => setCurrentProduct({ ...currentProduct, hidePrice: e.target.checked })}
                    />
                    <span>"Get Best Price" Mode (Hide Numeric Price)</span>
                  </label>
                </div>

                {!currentProduct.hidePrice && (
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Selling Price (₹)</label>
                      <input
                        type="number"
                        value={currentProduct.price || 0}
                        onChange={e => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-emerald-400 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">MRP (₹)</label>
                      <input
                        type="number"
                        value={currentProduct.mrp || 0}
                        onChange={e => setCurrentProduct({ ...currentProduct, mrp: Number(e.target.value) })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Discount (%)</label>
                      <input
                        type="number"
                        value={currentProduct.discountPercentage || 0}
                        onChange={e => setCurrentProduct({ ...currentProduct, discountPercentage: Number(e.target.value) })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-3 gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!currentProduct.isFeatured}
                    onChange={e => setCurrentProduct({ ...currentProduct, isFeatured: e.target.checked })}
                  />
                  <span>Featured Product</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!currentProduct.isAvailable}
                    onChange={e => setCurrentProduct({ ...currentProduct, isAvailable: e.target.checked })}
                  />
                  <span>In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!currentProduct.isPublished}
                    onChange={e => setCurrentProduct({ ...currentProduct, isPublished: e.target.checked })}
                  />
                  <span>Published Online</span>
                </label>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Short Summary
                  </label>
                  <input
                    type="text"
                    value={currentProduct.shortDescription || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, shortDescription: e.target.value })}
                    placeholder="Brief 1-sentence highlight for cards"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Full Detailed Description
                  </label>
                  <textarea
                    rows={3}
                    value={currentProduct.fullDescription || ''}
                    onChange={e => setCurrentProduct({ ...currentProduct, fullDescription: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Image Management */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Product Images Gallery
                </label>

                {/* Thumbnails */}
                <div className="flex flex-wrap gap-2">
                  {(currentProduct.images || []).map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 group">
                      <img src={img} alt="preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-0 right-0 bg-rose-600 text-white p-0.5 rounded-bl opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Upload or Add URL */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Paste image web URL..."
                    value={imageUrlInput}
                    onChange={e => setImageUrlInput(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs"
                  >
                    Add URL
                  </button>

                  <label className="bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5 transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Technical Specifications Table
                </label>

                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {(currentProduct.specifications || []).map((spec, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-900 p-2 rounded-lg text-xs">
                      <span className="text-slate-400 font-semibold">{spec.key}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white">{spec.value}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSpec(idx)}
                          className="text-rose-400 hover:text-rose-300"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Spec Name (e.g. Resolution)"
                    value={newSpecKey}
                    onChange={e => setNewSpecKey(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Spec Value (e.g. 4MP 2K)"
                    value={newSpecValue}
                    onChange={e => setNewSpecValue(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Features List */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Key Features Bullet Points
                </label>

                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {(currentProduct.features || []).map((feat, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-900 p-2 rounded-lg text-xs text-white">
                      <span>• {feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Smart AI Human & Vehicle Motion Detection"
                    value={newFeature}
                    onChange={e => setNewFeature(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsEditing(false); setCurrentProduct(null); }}
                  className="bg-slate-800 text-slate-300 px-4 py-2.5 rounded-xl text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-lg"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Category } from '../../types';
import { CategoryIcon } from '../../components/common/CategoryIcon';

export const AdminCategories: React.FC = () => {
  const { categories, products, saveCategory, deleteCategory, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Partial<Category> | null>(null);

  const handleAddNew = () => {
    setCurrentCategory({
      name: '',
      slug: '',
      iconName: 'Camera',
      description: '',
      order: categories.length + 1
    });
    setIsEditing(true);
  };

  const handleEdit = (cat: Category) => {
    setCurrentCategory({ ...cat });
    setIsEditing(true);
  };

  const handleDelete = async (id: string, name: string) => {
    const productsInCat = products.filter(p => p.category === name).length;
    if (productsInCat > 0) {
      alert(`Cannot delete category "${name}" because it still contains ${productsInCat} products.`);
      return;
    }

    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
      try {
        await deleteCategory(id);
      } catch (err: any) {
        showToast(err.message, 'error');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCategory?.name?.trim()) {
      showToast('Category name is required.', 'error');
      return;
    }

    try {
      const catToSave = {
        ...currentCategory,
        slug: currentCategory.slug || currentCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };
      await saveCategory(catToSave);
      setIsEditing(false);
      setCurrentCategory(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const availableIcons = [
    'Camera', 'Video', 'HardDrive', 'Network', 'Router', 'Wifi', 'Cable',
    'Server', 'Sliders', 'Fingerprint', 'Lock', 'Bell', 'Package', 'Wrench', 'Shield'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Product Categories</h2>
          <p className="text-xs text-slate-400">Organize hardware into intuitive navigation groups</p>
        </div>

        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => {
          const count = products.filter(p => p.category === cat.name).length;
          return (
            <div
              key={cat.id}
              className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between group hover:border-slate-700 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                  <CategoryIcon name={cat.iconName} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{cat.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{count} Products linked</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition">
                <button
                  onClick={() => handleEdit(cat)}
                  className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition"
                  title="Edit Category"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-1.5 rounded-lg bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white border border-rose-500/30 transition"
                  title="Delete Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {isEditing && currentCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {currentCategory.id ? 'Edit Category' : 'New Category'}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={currentCategory.name || ''}
                  onChange={e => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                  placeholder="e.g. IP Cameras"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                  Description
                </label>
                <input
                  type="text"
                  value={currentCategory.description || ''}
                  onChange={e => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                  placeholder="Short 1-line description"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-2 text-[11px]">
                  Select Icon
                </label>
                <div className="grid grid-cols-5 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {availableIcons.map(ic => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setCurrentCategory({ ...currentCategory, iconName: ic })}
                      className={`p-2 rounded-lg border flex items-center justify-center transition ${
                        currentCategory.iconName === ic
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <CategoryIcon name={ic} className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2 rounded-xl"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Image as ImageIcon, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Sparkles,
  CheckCircle,
  FileText
} from 'lucide-react';

export const BlogTab = () => {
  const { data, addBlogArticle, updateBlogArticle, deleteBlogArticle } = useCms();
  const articles = data?.blogArticles || [];

  const [filterCat, setFilterCat] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const initialForm = {
    title: '',
    category: 'Architecture',
    readTime: '5 min read',
    date: new Date().toISOString().slice(0, 10),
    author: 'Er. Mohammad Khaja Osman',
    authorRole: 'Founder & Chief Structural Consultant',
    excerpt: '',
    content: '',
    image: '/assets/images/hero1.jpg',
    tags: 'Architecture, Telangana, Construction',
    keyTakeaways: '',
    featured: false
  };

  const [formData, setFormData] = useState(initialForm);

  const showToast = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const handleStartEdit = (article) => {
    setEditingId(article.id);
    setIsCreating(false);
    setFormData({
      ...article,
      tags: Array.isArray(article.tags) ? article.tags.join(', ') : (article.tags || ''),
      keyTakeaways: Array.isArray(article.keyTakeaways) ? article.keyTakeaways.join('\n') : (article.keyTakeaways || '')
    });
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData(initialForm);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('error', 'Article Title is required');
      return;
    }

    const processedData = {
      ...formData,
      tags: typeof formData.tags === 'string'
        ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : formData.tags,
      keyTakeaways: typeof formData.keyTakeaways === 'string'
        ? formData.keyTakeaways.split('\n').map(t => t.trim()).filter(Boolean)
        : formData.keyTakeaways
    };

    if (isCreating) {
      addBlogArticle(processedData);
      showToast('success', 'New blog article published successfully!');
    } else if (editingId) {
      updateBlogArticle(editingId, processedData);
      showToast('success', 'Blog article updated successfully!');
    }
    handleCancel();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}" from the blog?`)) {
      deleteBlogArticle(id);
      showToast('success', 'Article deleted from blog');
    }
  };

  const categories = ['all', 'Architecture', 'Engineering', 'Interiors', 'Vastu & Approvals', 'Sustainability'];

  const filteredArticles = filterCat === 'all'
    ? articles
    : articles.filter(item => item.category === filterCat);

  return (
    <div className="admin-tab-pane">
      <div className="tab-pane-header flex-between">
        <div>
          <h2 className="tab-pane-title">Architectural Blog & Articles Manager</h2>
          <p className="tab-pane-subtitle">
            Publish educational articles, structural advisories, design guides, and regulatory insights for clients and investors.
          </p>
        </div>
        {!isCreating && !editingId && (
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleStartCreate}
          >
            <Plus size={16} />
            <span>Write New Article</span>
          </button>
        )}
      </div>

      {message.text && (
        <div className={`admin-alert ${message.type === 'success' ? 'admin-alert-success' : 'admin-alert-error'}`}>
          <CheckCircle size={16} />
          <span>{message.text}</span>
        </div>
      )}

      {/* CREATE / EDIT FORM */}
      {(isCreating || editingId) && (
        <form onSubmit={handleSave} className="admin-card mb-8 border border-amber-500/40">
          <div className="flex-between mb-6 border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen size={18} className="text-amber-400" />
              <span>{isCreating ? 'Write New Architectural Article' : 'Edit Article Content'}</span>
            </h3>
            <button 
              type="button" 
              onClick={handleCancel}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="admin-grid-2">
            <div className="form-group sm:col-span-2">
              <label className="form-label">Article Headline / Title *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Structural Engineering Demystified: Safe Soil Testing for RCC Foundations"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Architecture">Architecture</option>
                <option value="Engineering">Engineering</option>
                <option value="Interiors">Interiors</option>
                <option value="Vastu & Approvals">Vastu & Approvals</option>
                <option value="Sustainability">Sustainability</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Read Time</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., 5 min read"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Author Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Author Role / Credential</label>
              <input
                type="text"
                className="form-control"
                value={formData.authorRole}
                onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
              />
            </div>

            <div className="form-group sm:col-span-2">
              <label className="form-label">Cover Image Path / URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="/assets/images/hero1.jpg or https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group sm:col-span-2">
              <label className="form-label">Brief Summary / Excerpt *</label>
              <textarea
                rows={2}
                className="form-control"
                placeholder="A compelling 2-line preview displayed on article cards..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
              />
            </div>

            <div className="form-group sm:col-span-2">
              <label className="form-label">Full Article Content (Markdown or Paragraphs)</label>
              <textarea
                rows={6}
                className="form-control font-mono text-xs"
                placeholder="Enter detailed article paragraphs, technical steps, or architectural guidelines..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <div className="form-group sm:col-span-2">
              <label className="form-label">Key Takeaways for Property Owners (1 per line)</label>
              <textarea
                rows={3}
                className="form-control text-xs"
                placeholder="Always insist on SBC soil test results before footing design.&#10;Never compromise on minimum M25 grade concrete for footings."
                value={formData.keyTakeaways}
                onChange={(e) => setFormData({ ...formData, keyTakeaways: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tags (comma separated)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Architecture, SoilTesting, Shadnagar"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            <div className="form-group flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="isFeaturedArticle"
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-800 border-slate-700 cursor-pointer"
                checked={!!formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <label htmlFor="isFeaturedArticle" className="text-sm text-slate-200 cursor-pointer flex items-center gap-1.5 font-medium">
                <Sparkles size={16} className="text-amber-400" />
                <span>Mark as Featured Spotlight Article</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Save size={16} />
              <span>{isCreating ? 'Publish Article' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* FILTER BUTTONS */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCat(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filterCat === cat
                ? 'bg-amber-500 text-black font-semibold'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ARTICLES LIST / CARDS */}
      <div className="grid gap-4">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="admin-card flex flex-col md:flex-row gap-4 justify-between items-start md:items-center hover:border-amber-500/30 transition-colors"
          >
            <div className="flex gap-4 items-center">
              <img
                src={article.image}
                alt={article.title}
                className="w-20 h-14 object-cover rounded-lg border border-white/10 shrink-0 bg-slate-800"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {article.category}
                  </span>
                  {article.featured && (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-500 text-black flex items-center gap-1">
                      <Sparkles size={10} />
                      Featured
                    </span>
                  )}
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar size={12} />
                    {article.date}
                  </span>
                  <span className="text-xs text-slate-400">• {article.readTime}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                  {article.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => handleStartEdit(article)}
                title="Edit Article"
              >
                <Edit3 size={16} />
              </button>
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => handleDelete(article.id, article.title)}
                title="Delete Article"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {filteredArticles.length === 0 && (
          <div className="admin-card text-center py-12 text-slate-400">
            <BookOpen size={32} className="mx-auto text-slate-600 mb-2" />
            <p>No articles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

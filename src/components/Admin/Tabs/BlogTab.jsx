import React, { useState, useRef } from 'react';
import { useCms } from '../../../context/CmsContext';
import { MediaPickerModal } from '../MediaPickerModal';
import { optimizeImageFile } from '../../../utils/imageOptimizer';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Image as ImageIcon, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  CheckCircle,
  FileText,
  Upload,
  FolderOpen,
  Check
} from 'lucide-react';

export const BlogTab = () => {
  const { data, addBlogArticle, updateBlogArticle, deleteBlogArticle } = useCms();
  const articles = data?.blogArticles || [];

  const [filterCat, setFilterCat] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const fileInputRef = useRef(null);

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

  const handleDeviceUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    try {
      const dataUrl = await optimizeImageFile(file);
      setFormData(prev => ({ ...prev, image: dataUrl }));
      showToast('success', 'Cover photo uploaded from device!');
    } catch (err) {
      showToast('error', 'Failed to upload photo: ' + err.message);
    }
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
    <div className="admin-tab-content">
      {/* Header Bar */}
      <div className="tab-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="tab-title">Architectural Blog & Articles Manager</h3>
          <p className="tab-subtitle">
            Publish educational articles, structural advisories, design guides, and regulatory insights for clients and investors.
          </p>
        </div>
        {!isCreating && !editingId && (
          <button 
            type="button" 
            className="admin-btn-save"
            onClick={handleStartCreate}
          >
            <Plus size={16} />
            <span>Write New Article</span>
          </button>
        )}
      </div>

      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}>
          <CheckCircle size={16} />
          <span>{message.text}</span>
        </div>
      )}

      {/* CREATE / EDIT FORM */}
      {(isCreating || editingId) && (
        <form onSubmit={handleSave} className="admin-card mb-4 border-warning">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="admin-card-title text-warning m-0">
              <BookOpen size={18} className="me-2" />
              <span>{isCreating ? 'Write New Architectural Article' : `Editing Article: ${formData.title}`}</span>
            </div>
            <button type="button" onClick={handleCancel} className="btn-cancel-admin p-1">
              <X size={18} />
            </button>
          </div>

          <div className="row">
            <div className="col-md-8 form-group mb-3">
              <label className="admin-label">Article Headline / Title *</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g., Structural Engineering Demystified: Safe Soil Testing for RCC Foundations"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="col-md-4 form-group mb-3">
              <label className="admin-label">Category</label>
              <select
                className="admin-input"
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

            <div className="col-md-4 form-group mb-3">
              <label className="admin-label">Read Time</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g., 5 min read"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              />
            </div>

            <div className="col-md-4 form-group mb-3">
              <label className="admin-label">Author Name</label>
              <input
                type="text"
                className="admin-input"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>

            <div className="col-md-4 form-group mb-3">
              <label className="admin-label">Author Role / Credential</label>
              <input
                type="text"
                className="admin-input"
                value={formData.authorRole}
                onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
              />
            </div>

            {/* COVER PHOTO SELECTION */}
            <div className="col-12 form-group mb-3">
              <label className="admin-label d-flex justify-content-between">
                <span>Article Cover Photo</span>
                <span className="text-muted" style={{ fontSize: 11 }}>Shown on blog grid card & header</span>
              </label>

              <div className="d-flex gap-2 align-items-center flex-wrap">
                <input
                  type="text"
                  className="admin-input flex-grow-1"
                  placeholder="/assets/images/hero1.jpg or data:image/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
                  style={{ height: 38, whiteSpace: 'nowrap' }}
                  title="Upload from computer / phone"
                >
                  <Upload size={14} />
                  <span>Choose from Device</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsMediaModalOpen(true)}
                  className="btn btn-warning text-dark btn-sm d-flex align-items-center gap-1 font-bold"
                  style={{ height: 38, whiteSpace: 'nowrap' }}
                  title="Pick from website photo library"
                >
                  <FolderOpen size={14} />
                  <span>Choose from Gallery</span>
                </button>
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{ width: 50, height: 38, objectFit: 'cover', borderRadius: 4, border: '1px solid #d4af37' }}
                  />
                )}
              </div>
            </div>

            <div className="col-12 form-group mb-3">
              <label className="admin-label">Brief Summary / Excerpt *</label>
              <textarea
                rows={2}
                className="admin-textarea"
                placeholder="A compelling 2-line preview displayed on article cards..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
              />
            </div>

            <div className="col-12 form-group mb-3">
              <label className="admin-label">Full Article Content (Markdown or Paragraphs)</label>
              <textarea
                rows={5}
                className="admin-textarea font-mono"
                placeholder="Enter detailed article paragraphs, technical steps, or architectural guidelines..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <div className="col-md-8 form-group mb-3">
              <label className="admin-label">Key Takeaways for Property Owners (1 per line)</label>
              <textarea
                rows={3}
                className="admin-textarea"
                placeholder="Always insist on SBC soil test results before footing design.&#10;Never compromise on minimum M25 grade concrete for footings."
                value={formData.keyTakeaways}
                onChange={(e) => setFormData({ ...formData, keyTakeaways: e.target.value })}
              />
            </div>

            <div className="col-md-4 form-group mb-3">
              <label className="admin-label">Tags (comma separated)</label>
              <input
                type="text"
                className="admin-input"
                placeholder="Architecture, SoilTesting, Shadnagar"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <div className="mt-3 form-check">
                <input
                  type="checkbox"
                  id="isFeaturedArticle"
                  className="form-check-input"
                  checked={!!formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  style={{ cursor: 'pointer' }}
                />
                <label htmlFor="isFeaturedArticle" className="form-check-label text-white" style={{ fontSize: 13, cursor: 'pointer' }}>
                  <span>Feature as Spotlight</span>
                </label>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top border-secondary">
            <button
              type="button"
              className="btn-cancel-admin"
              onClick={handleCancel}
            >
              <X size={15} className="me-1" /> Cancel
            </button>
            <button
              type="submit"
              className="admin-btn-save"
            >
              <Check size={15} className="me-1" />
              <span>{isCreating ? 'Publish Article' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* FILTER BUTTONS */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCat(cat)}
            className={`admin-category-pill-btn ${filterCat === cat ? 'active' : ''}`}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 12,
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: 1,
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: 'pointer',
              border: filterCat === cat ? '1px solid #d4af37' : '1px solid rgba(255,255,255,0.1)',
              background: filterCat === cat ? '#d4af37' : 'rgba(255,255,255,0.05)',
              color: filterCat === cat ? '#0b0f17' : '#cbd5e1',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ARTICLES LIST / CARDS */}
      <div className="row">
        {filteredArticles.map((article) => (
          <div key={article.id} className="col-lg-6 col-12 mb-3">
            <div className="admin-card d-flex flex-column flex-sm-row gap-3 justify-content-between align-items-start p-3 h-100">
              <div className="d-flex gap-3 align-items-center">
                <img
                  src={article.image || '/assets/images/hero1.jpg'}
                  alt={article.title}
                  style={{ width: 95, height: 75, objectFit: 'cover', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }}
                />
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                    <span className="badge bg-warning text-dark" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {article.category}
                    </span>
                    {article.featured && (
                      <span className="badge bg-warning text-dark font-bold" style={{ fontSize: 9 }}>
                        Spotlight
                      </span>
                    )}
                    <span className="text-muted" style={{ fontSize: 11 }}>
                      <Calendar size={11} className="me-1 inline-block text-warning" />
                      {article.date}
                    </span>
                    <span className="text-muted" style={{ fontSize: 11 }}>
                      • {article.readTime}
                    </span>
                  </div>
                  <h5 className="text-white mb-1" style={{ fontSize: 15, fontWeight: 700 }}>
                    {article.title}
                  </h5>
                  <p className="text-muted mb-0" style={{ fontSize: 12, lineClamp: 2, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="d-flex gap-2 align-self-end align-self-sm-center flex-shrink-0">
                <button
                  type="button"
                  className="admin-btn-edit"
                  onClick={() => handleStartEdit(article)}
                  title="Edit Article"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  className="admin-btn-delete"
                  onClick={() => handleDelete(article.id, article.title)}
                  title="Delete Article"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredArticles.length === 0 && (
          <div className="col-12">
            <div className="admin-card text-center py-5 text-muted">
              <BookOpen size={32} className="mb-2 opacity-50 text-warning" />
              <p className="mb-0">No articles found in this category.</p>
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input for Device Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleDeviceUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaModalOpen}
        isMulti={false}
        title="Select Blog Article Cover Photo"
        onClose={() => setIsMediaModalOpen(false)}
        onSelectImage={(url) => {
          setFormData(prev => ({ ...prev, image: url }));
          showToast('success', 'Cover photo selected from gallery.');
        }}
      />
    </div>
  );
};

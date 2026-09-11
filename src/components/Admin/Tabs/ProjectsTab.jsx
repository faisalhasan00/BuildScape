import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { 
  Building2, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Image as ImageIcon, 
  MapPin, 
  User, 
  Calendar,
  Check,
  CheckCircle,
  FolderKanban
} from 'lucide-react';

export const ProjectsTab = () => {
  const { data, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useCms();
  const rawGallery = data?.projectsGallery;
  const galleryCategories = (rawGallery && Array.isArray(rawGallery.categories) && rawGallery.categories.length > 0)
    ? rawGallery.categories
    : [
        { id: "all", label: "All Works" },
        { id: "villas", label: "Luxury Villas" },
        { id: "commercial", label: "Commercial Hubs" },
        { id: "interiors", label: "Interior Architecture" },
        { id: "farmhouses", label: "Country Farmhouses" },
        { id: "turnkey", label: "Turnkey EPC" }
      ];

  const galleryItems = Array.isArray(rawGallery) 
    ? rawGallery 
    : ((rawGallery && Array.isArray(rawGallery.items)) ? rawGallery.items : []);

  const [filterCat, setFilterCat] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const initialForm = {
    title: '',
    category: 'villas',
    area: '4,500 sq.ft',
    location: 'Hyderabad, Telangana',
    client: 'Private Client',
    year: '2024',
    status: 'Completed / Handed Over',
    image: '/assets/images/hero1.jpg',
    shortDesc: 'Luxury residential architecture with sustainable micro-climate courtyards.',
    description: 'Comprehensive architectural planning, structural analysis, interior curation, and turnkey civil execution.'
  };

  const [formData, setFormData] = useState(initialForm);

  const showToast = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const handleStartEdit = (project) => {
    setEditingId(project.id);
    setIsCreating(false);
    setFormData({ ...project });
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
      showToast('error', 'Project Title is required');
      return;
    }

    if (isCreating) {
      addGalleryItem(formData);
      showToast('success', 'New portfolio project created successfully!');
    } else if (editingId) {
      updateGalleryItem(editingId, formData);
      showToast('success', 'Project updated successfully!');
    }
    handleCancel();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}" from the portfolio?`)) {
      deleteGalleryItem(id);
      showToast('success', 'Project removed from portfolio');
    }
  };

  const filteredItems = filterCat === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filterCat);

  return (
    <div className="admin-tab-content">
      {/* Header Bar */}
      <div className="tab-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="tab-title">Projects & Portfolio Showcase CMS</h3>
          <p className="tab-subtitle">
            Manage live architectural showcase projects, assign typologies, update square footage, and upload visuals.
          </p>
        </div>
        {!isCreating && !editingId && (
          <button onClick={handleStartCreate} className="admin-btn-save">
            <Plus size={16} />
            <span>Add New Project</span>
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
              <FolderKanban size={18} className="me-2" />
              <span>{isCreating ? 'Create New Architectural Project' : `Editing Project: ${formData.title}`}</span>
            </div>
            <button type="button" onClick={handleCancel} className="btn-cancel-admin p-1">
              <X size={18} />
            </button>
          </div>

          <div className="row">
            <div className="col-md-8 form-group mb-3">
              <label className="admin-label">Project Title *</label>
              <input
                type="text"
                className="admin-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. The Grand Courtyard Villa"
                required
              />
            </div>

            <div className="col-md-4 form-group mb-3">
              <label className="admin-label">Typology / Category</label>
              <select
                className="admin-input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {galleryCategories.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4 form-group mb-3">
              <label className="admin-label">Built-up Area</label>
              <input
                type="text"
                className="admin-input"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="e.g. 6,800 sq.ft"
              />
            </div>

            <div className="col-md-4 form-group mb-3">
              <label className="admin-label">Location</label>
              <input
                type="text"
                className="admin-input"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Jubilee Hills, Hyderabad"
              />
            </div>

            <div className="col-md-4 form-group mb-3">
              <label className="admin-label">Client / Patron</label>
              <input
                type="text"
                className="admin-input"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="e.g. Private Residence / Corporate"
              />
            </div>

            <div className="col-md-4 form-group mb-3">
              <label className="admin-label">Execution Status</label>
              <input
                type="text"
                className="admin-input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                placeholder="e.g. Completed / In Progress"
              />
            </div>

            <div className="col-md-8 form-group mb-3">
              <label className="admin-label">Project Image URL or Path</label>
              <div className="d-flex gap-2 align-items-center">
                <input
                  type="text"
                  className="admin-input flex-grow-1"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/assets/images/hero1.jpg"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{ width: 44, height: 38, objectFit: 'cover', borderRadius: 4, border: '1px solid rgba(255,255,255,0.2)' }}
                  />
                )}
              </div>
            </div>

            <div className="col-12 form-group mb-3">
              <label className="admin-label">Short Summary (Shown on grid card)</label>
              <input
                type="text"
                className="admin-input"
                value={formData.shortDesc}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                placeholder="Brief 1-sentence architectural summary"
              />
            </div>

            <div className="col-12 form-group mb-3">
              <label className="admin-label">Full Project Narrative (Shown in Lightbox Modal)</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed architectural concept, materials used, engineering milestones..."
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top border-secondary">
            <button type="button" onClick={handleCancel} className="btn-cancel-admin">
              <X size={15} className="me-1" /> Cancel
            </button>
            <button type="submit" className="admin-btn-save">
              <Check size={15} className="me-1" />
              <span>{isCreating ? 'Publish Project' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Category Filter Tabs */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {galleryCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setFilterCat(cat.id)}
            className={`admin-category-pill-btn ${filterCat === cat.id ? 'active' : ''}`}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 12,
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: 1,
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: 'pointer',
              border: filterCat === cat.id ? '1px solid #d4af37' : '1px solid rgba(255,255,255,0.1)',
              background: filterCat === cat.id ? '#d4af37' : 'rgba(255,255,255,0.05)',
              color: filterCat === cat.id ? '#0b0f17' : '#cbd5e1',
              transition: 'all 0.2s ease'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="row">
        {filteredItems.map((project) => (
          <div key={project.id} className="col-lg-6 col-12 mb-3">
            <div className="admin-card d-flex flex-column flex-sm-row gap-3 justify-content-between align-items-start p-3 h-100">
              <div className="d-flex gap-3 align-items-center">
                <img
                  src={project.image || '/assets/images/hero1.jpg'}
                  alt={project.title}
                  style={{ width: 85, height: 65, objectFit: 'cover', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }}
                />
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                    <span className="badge bg-warning text-dark" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {project.category}
                    </span>
                    {project.area && (
                      <span className="text-muted" style={{ fontSize: 11 }}>
                        <Building2 size={11} className="me-1 inline-block" />
                        {project.area}
                      </span>
                    )}
                    {project.location && (
                      <span className="text-muted" style={{ fontSize: 11 }}>
                        <MapPin size={11} className="me-1 inline-block" />
                        {project.location}
                      </span>
                    )}
                  </div>
                  <h5 className="text-white mb-1" style={{ fontSize: 15, fontWeight: 700 }}>
                    {project.title}
                  </h5>
                  <p className="text-muted mb-0" style={{ fontSize: 12, lineClamp: 2, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {project.shortDesc || project.description}
                  </p>
                </div>
              </div>

              <div className="d-flex gap-2 align-self-end align-self-sm-center flex-shrink-0">
                <button 
                  onClick={() => handleStartEdit(project)} 
                  className="admin-btn-edit"
                  title="Edit Project"
                >
                  <Edit2 size={14} />
                </button>
                <button 
                  onClick={() => handleDelete(project.id, project.title)} 
                  className="admin-btn-delete"
                  title="Delete Project"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-12">
            <div className="admin-card text-center py-5 text-muted">
              <FolderKanban size={32} className="mb-2 opacity-50" />
              <p className="mb-0">No portfolio projects found in this category.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

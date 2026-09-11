import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { 
  Building2, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Image as ImageIcon, 
  MapPin, 
  User, 
  Calendar,
  CheckCircle,
  Eye
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
    <div className="admin-tab-pane">
      <div className="tab-pane-header flex-between">
        <div>
          <h2 className="tab-pane-title">Projects & Portfolio Manager</h2>
          <p className="tab-pane-subtitle">
            Manage your live architectural showcase, assign typologies, update square footage, and showcase new projects.
          </p>
        </div>
        {!isCreating && !editingId && (
          <button onClick={handleStartCreate} className="btn-primary-cms flex-center gap-2">
            <Plus size={16} />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {message.text && (
        <div className={`toast-cms ${message.type === 'success' ? 'toast-success' : 'toast-error'}`}>
          <CheckCircle size={16} />
          <span>{message.text}</span>
        </div>
      )}

      {/* Editor / Creator Form */}
      {(isCreating || editingId) && (
        <form onSubmit={handleSave} className="cms-card form-card mb-6">
          <div className="form-card-header flex-between">
            <h3 className="card-heading">
              {isCreating ? 'Create New Architectural Project' : `Editing Project: ${formData.title}`}
            </h3>
            <button type="button" onClick={handleCancel} className="btn-icon-close">
              <X size={18} />
            </button>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="cms-label">Project Title *</label>
              <input
                type="text"
                className="cms-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. The Grand Courtyard Villa"
                required
              />
            </div>

            <div className="form-group">
              <label className="cms-label">Typology / Category</label>
              <select
                className="cms-input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {galleryCategories.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="cms-label">Built-up Area</label>
              <input
                type="text"
                className="cms-input"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="e.g. 6,800 sq.ft"
              />
            </div>

            <div className="form-group">
              <label className="cms-label">Location</label>
              <input
                type="text"
                className="cms-input"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Jubilee Hills, Hyderabad"
              />
            </div>

            <div className="form-group">
              <label className="cms-label">Client / Patron</label>
              <input
                type="text"
                className="cms-input"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="e.g. Private Residence / Corporate"
              />
            </div>

            <div className="form-group">
              <label className="cms-label">Execution Status</label>
              <input
                type="text"
                className="cms-input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                placeholder="e.g. Completed / In Progress"
              />
            </div>

            <div className="form-group col-span-2">
              <label className="cms-label">Project Image (URL or /assets/images/...)</label>
              <div className="image-input-wrap">
                <input
                  type="text"
                  className="cms-input"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/assets/images/hero1.jpg"
                />
                {formData.image && (
                  <div className="image-thumb-preview">
                    <img src={formData.image} alt="Preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-group col-span-2">
              <label className="cms-label">Short Summary (Shown on grid card)</label>
              <input
                type="text"
                className="cms-input"
                value={formData.shortDesc}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                placeholder="Brief 1-sentence architectural summary"
              />
            </div>

            <div className="form-group col-span-2">
              <label className="cms-label">Full Project Narrative (Shown in Lightbox Modal)</label>
              <textarea
                className="cms-textarea"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed architectural concept, materials used, engineering milestones..."
              />
            </div>
          </div>

          <div className="form-actions flex-end gap-3 mt-4">
            <button type="button" onClick={handleCancel} className="btn-secondary-cms">
              Cancel
            </button>
            <button type="submit" className="btn-primary-cms flex-center gap-2">
              <Save size={16} />
              <span>{isCreating ? 'Publish Project' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Category Tabs Filter */}
      <div className="admin-filter-bar mb-4">
        {galleryCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCat(cat.id)}
            className={`admin-filter-btn ${filterCat === cat.id ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="admin-projects-grid">
        {filteredItems.map((project) => (
          <div key={project.id} className="admin-project-card">
            <div className="admin-proj-img-wrap">
              <img src={project.image} alt={project.title} />
              <span className="admin-proj-cat-tag">{project.category}</span>
            </div>
            
            <div className="admin-proj-body">
              <h4 className="admin-proj-title">{project.title}</h4>
              <div className="admin-proj-meta">
                <span><MapPin size={12} /> {project.location}</span>
                <span><Building2 size={12} /> {project.area}</span>
              </div>
              <p className="admin-proj-desc">{project.shortDesc}</p>

              <div className="admin-proj-actions">
                <button 
                  onClick={() => handleStartEdit(project)} 
                  className="btn-action-edit"
                  title="Edit Project"
                >
                  <Edit3 size={15} />
                  <span>Edit</span>
                </button>
                <button 
                  onClick={() => handleDelete(project.id, project.title)} 
                  className="btn-action-delete"
                  title="Delete Project"
                >
                  <Trash2 size={15} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

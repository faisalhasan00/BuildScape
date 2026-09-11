import React, { useState, useRef } from 'react';
import { useCms } from '../../../context/CmsContext';
import { MediaPickerModal } from '../MediaPickerModal';
import { optimizeImageFile } from '../../../utils/imageOptimizer';
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
  FolderKanban,
  Upload,
  FolderOpen
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
  const [newGalleryInput, setNewGalleryInput] = useState('');

  // Media Picker Modal State
  const [mediaPickerState, setMediaPickerState] = useState({
    isOpen: false,
    isMulti: false,
    target: 'cover' // 'cover' | 'gallery'
  });

  const coverFileInputRef = useRef(null);
  const galleryMultiFileInputRef = useRef(null);

  const initialForm = {
    title: '',
    category: 'villas',
    area: '4,500 sq.ft',
    location: 'Hyderabad, Telangana',
    client: 'Private Client',
    year: '2024',
    status: 'Completed / Handed Over',
    image: '/assets/images/hero1.jpg',
    gallery: [
      '/assets/images/hero1.jpg',
      '/assets/images/hero2.jpg',
      '/assets/images/capability_architecture.jpg'
    ],
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
    const existingGallery = Array.isArray(project.gallery) && project.gallery.length > 0
      ? project.gallery
      : (project.image ? [project.image] : ['/assets/images/hero1.jpg']);

    setFormData({
      ...project,
      gallery: existingGallery
    });
    setNewGalleryInput('');
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData(initialForm);
    setNewGalleryInput('');
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData(initialForm);
    setNewGalleryInput('');
  };

  // Direct Device Upload for Cover Photo
  const handleCoverDeviceUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    try {
      const optimized = await optimizeImageFile(file);
      setFormData(prev => {
        const currentGallery = Array.isArray(prev.gallery) ? prev.gallery : [];
        return {
          ...prev,
          image: optimized,
          gallery: currentGallery.includes(optimized) ? currentGallery : [optimized, ...currentGallery]
        };
      });
      showToast('success', 'Cover photo uploaded from device!');
    } catch (err) {
      showToast('error', 'Failed to upload photo: ' + err.message);
    }
  };

  // Direct Device Upload for Multiple Gallery Photos
  const handleGalleryDeviceUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      const optimizedList = [];
      for (const file of files) {
        const optimized = await optimizeImageFile(file);
        optimizedList.push(optimized);
      }

      setFormData(prev => {
        const currentGallery = Array.isArray(prev.gallery) ? prev.gallery : [];
        const combined = [...currentGallery];
        optimizedList.forEach(url => {
          if (!combined.includes(url)) {
            combined.push(url);
          }
        });
        return {
          ...prev,
          gallery: combined,
          image: prev.image || combined[0]
        };
      });
      showToast('success', `${optimizedList.length} photo(s) uploaded from device!`);
    } catch (err) {
      showToast('error', 'Failed to upload photos: ' + err.message);
    }
  };

  // URL / manual add
  const handleAddGalleryImage = (e) => {
    if (e) e.preventDefault();
    if (!newGalleryInput.trim()) return;

    const urlsToAdd = newGalleryInput
      .split(/[\n,]+/)
      .map(u => u.trim())
      .filter(Boolean);

    if (urlsToAdd.length === 0) return;

    const currentGallery = Array.isArray(formData.gallery) ? formData.gallery : [];
    const combined = [...currentGallery];

    urlsToAdd.forEach(url => {
      if (!combined.includes(url)) {
        combined.push(url);
      }
    });

    setFormData({
      ...formData,
      gallery: combined,
      image: formData.image || combined[0]
    });

    setNewGalleryInput('');
    showToast('success', `${urlsToAdd.length} image(s) added.`);
  };

  const handleRemoveGalleryImage = (idxToRemove) => {
    const currentGallery = Array.isArray(formData.gallery) ? formData.gallery : [];
    const updated = currentGallery.filter((_, idx) => idx !== idxToRemove);
    const removedImg = currentGallery[idxToRemove];

    setFormData({
      ...formData,
      gallery: updated,
      image: (formData.image === removedImg && updated.length > 0) ? updated[0] : formData.image
    });
  };

  const handleSetCover = (imgUrl) => {
    setFormData({
      ...formData,
      image: imgUrl
    });
    showToast('success', 'Cover photo selected!');
  };

  // Callback from MediaPickerModal
  const handleMediaModalSelect = (url) => {
    if (mediaPickerState.target === 'cover') {
      setFormData(prev => {
        const currentGallery = Array.isArray(prev.gallery) ? prev.gallery : [];
        return {
          ...prev,
          image: url,
          gallery: currentGallery.includes(url) ? currentGallery : [url, ...currentGallery]
        };
      });
      showToast('success', 'Cover photo selected from gallery.');
    }
  };

  const handleMediaModalSelectMultiple = (urls) => {
    if (mediaPickerState.target === 'gallery') {
      setFormData(prev => {
        const currentGallery = Array.isArray(prev.gallery) ? prev.gallery : [];
        const combined = [...currentGallery];
        urls.forEach(u => {
          if (!combined.includes(u)) combined.push(u);
        });
        return {
          ...prev,
          gallery: combined,
          image: prev.image || combined[0]
        };
      });
      showToast('success', `${urls.length} photo(s) added to gallery.`);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('error', 'Project Title is required');
      return;
    }

    const currentGallery = Array.isArray(formData.gallery) && formData.gallery.length > 0
      ? formData.gallery
      : (formData.image ? [formData.image] : ['/assets/images/hero1.jpg']);

    const finalProjectData = {
      ...formData,
      gallery: currentGallery,
      image: formData.image || currentGallery[0]
    };

    if (isCreating) {
      addGalleryItem(finalProjectData);
      showToast('success', 'New portfolio project created with multi-image gallery!');
    } else if (editingId) {
      updateGalleryItem(editingId, finalProjectData);
      showToast('success', 'Project details and gallery images updated!');
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
      {/* Hidden File Inputs for Device Upload */}
      <input
        type="file"
        ref={coverFileInputRef}
        onChange={handleCoverDeviceUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={galleryMultiFileInputRef}
        onChange={handleGalleryDeviceUpload}
        accept="image/*"
        multiple
        style={{ display: 'none' }}
      />

      {/* Header Bar */}
      <div className="tab-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="tab-title">Projects & Portfolio Showcase CMS</h3>
          <p className="tab-subtitle">
            Manage live architectural showcase projects, upload multiple high-res photos from device or media library.
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

            {/* PRIMARY COVER PHOTO SELECTION */}
            <div className="col-12 form-group mb-3">
              <label className="admin-label d-flex justify-content-between">
                <span>Primary Card Cover Photo</span>
                <span className="text-muted" style={{ fontSize: 11 }}>Shown on public portfolio cards</span>
              </label>

              <div className="d-flex gap-2 align-items-center flex-wrap">
                <input
                  type="text"
                  className="admin-input flex-grow-1"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/assets/images/hero1.jpg or data:image/..."
                />

                {/* Device Upload Button */}
                <button
                  type="button"
                  onClick={() => coverFileInputRef.current && coverFileInputRef.current.click()}
                  className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
                  style={{ height: 38, whiteSpace: 'nowrap' }}
                  title="Upload cover photo from your device"
                >
                  <Upload size={14} />
                  <span>Choose from Device</span>
                </button>

                {/* Media Library Button */}
                <button
                  type="button"
                  onClick={() => setMediaPickerState({ isOpen: true, isMulti: false, target: 'cover' })}
                  className="btn btn-warning text-dark btn-sm d-flex align-items-center gap-1 font-bold"
                  style={{ height: 38, whiteSpace: 'nowrap' }}
                  title="Pick cover photo from website gallery library"
                >
                  <FolderOpen size={14} />
                  <span>Choose from Gallery</span>
                </button>

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Cover Preview"
                    style={{ width: 50, height: 38, objectFit: 'cover', borderRadius: 4, border: '1px solid #d4af37' }}
                  />
                )}
              </div>
            </div>

            {/* MULTIPLE GALLERY IMAGES MANAGER */}
            <div className="col-12 form-group mb-4">
              <div className="p-3 rounded border border-warning" style={{ background: 'rgba(212, 175, 55, 0.04)' }}>
                <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                  <label className="admin-label m-0 text-warning d-flex align-items-center gap-2">
                    <ImageIcon size={16} />
                    <span>Multiple Gallery Photos & Lightbox Carousel</span>
                  </label>
                  <span className="badge bg-dark text-warning border border-warning" style={{ fontSize: 11 }}>
                    {formData.gallery ? formData.gallery.length : 0} Photos Attached
                  </span>
                </div>
                <p className="text-muted mb-3" style={{ fontSize: 12 }}>
                  Add elevations, blueprints, 3D renders, and room views. You can upload multiple files from your device or select from the gallery library.
                </p>

                {/* Action Toolbar for Gallery Photos */}
                <div className="d-flex gap-2 mb-3 flex-wrap">
                  {/* Upload from device (Multiple) */}
                  <button
                    type="button"
                    onClick={() => galleryMultiFileInputRef.current && galleryMultiFileInputRef.current.click()}
                    className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
                    style={{ padding: '6px 14px' }}
                  >
                    <Upload size={14} />
                    <span>Upload Photos from Device</span>
                  </button>

                  {/* Choose from Media Library */}
                  <button
                    type="button"
                    onClick={() => setMediaPickerState({ isOpen: true, isMulti: true, target: 'gallery' })}
                    className="btn btn-warning text-dark btn-sm d-flex align-items-center gap-1 font-bold"
                    style={{ padding: '6px 14px' }}
                  >
                    <FolderOpen size={14} />
                    <span>Choose from Media Gallery</span>
                  </button>
                </div>

                {/* URL input bar */}
                <div className="d-flex gap-2 mb-3">
                  <input
                    type="text"
                    className="admin-input flex-grow-1"
                    value={newGalleryInput}
                    onChange={(e) => setNewGalleryInput(e.target.value)}
                    placeholder="Or enter image URL / path (e.g. /assets/images/hero2.jpg)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddGalleryImage();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="admin-btn-save d-flex align-items-center gap-1"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <Plus size={15} />
                    <span>Add URL</span>
                  </button>
                </div>

                {/* Gallery Images Thumbnail Grid */}
                <div className="row g-2">
                  {formData.gallery && formData.gallery.map((imgUrl, gIdx) => {
                    const isCover = formData.image === imgUrl;
                    return (
                      <div key={gIdx} className="col-lg-3 col-md-4 col-6">
                        <div 
                          className="position-relative p-1 rounded overflow-hidden" 
                          style={{
                            border: isCover ? '2px solid #d4af37' : '1px solid rgba(255,255,255,0.15)',
                            background: '#111622'
                          }}
                        >
                          <img
                            src={imgUrl}
                            alt={`Gallery ${gIdx + 1}`}
                            style={{ width: '100%', height: 95, objectFit: 'cover', borderRadius: 4 }}
                          />

                          {/* Cover Badge */}
                          {isCover && (
                            <span 
                              className="position-absolute top-2 start-2 badge bg-warning text-dark font-bold"
                              style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.5, zIndex: 2 }}
                            >
                              ★ Cover
                            </span>
                          )}

                          {/* Image Action Buttons */}
                          <div className="d-flex justify-content-between align-items-center mt-1 px-1">
                            {!isCover ? (
                              <button
                                type="button"
                                onClick={() => handleSetCover(imgUrl)}
                                className="btn btn-sm text-warning p-0"
                                style={{ fontSize: 11, background: 'transparent', border: 'none' }}
                                title="Set as primary card cover"
                              >
                                Set Cover
                              </button>
                            ) : (
                              <span className="text-warning" style={{ fontSize: 11 }}>Cover Active</span>
                            )}

                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(gIdx)}
                              className="btn btn-sm text-danger p-0"
                              style={{ fontSize: 11, background: 'transparent', border: 'none' }}
                              title="Remove photo from gallery"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
              <span>{isCreating ? 'Publish Project with Gallery' : 'Save Changes'}</span>
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
        {filteredItems.map((project) => {
          const photoCount = (project.gallery && project.gallery.length) || (project.image ? 1 : 0);
          return (
            <div key={project.id} className="col-lg-6 col-12 mb-3">
              <div className="admin-card d-flex flex-column flex-sm-row gap-3 justify-content-between align-items-start p-3 h-100">
                <div className="d-flex gap-3 align-items-center">
                  <div className="position-relative flex-shrink-0">
                    <img
                      src={project.image || '/assets/images/hero1.jpg'}
                      alt={project.title}
                      style={{ width: 95, height: 75, objectFit: 'cover', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)' }}
                    />
                    <span 
                      className="position-absolute bottom-1 end-1 badge bg-dark text-warning border border-warning"
                      style={{ fontSize: 9, padding: '2px 5px' }}
                    >
                      <ImageIcon size={9} className="me-1 inline-block" />
                      {photoCount} {photoCount === 1 ? 'Photo' : 'Photos'}
                    </span>
                  </div>

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
                    title="Edit Project & Photos"
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
          );
        })}

        {filteredItems.length === 0 && (
          <div className="col-12">
            <div className="admin-card text-center py-5 text-muted">
              <FolderKanban size={32} className="mb-2 opacity-50" />
              <p className="mb-0">No portfolio projects found in this category.</p>
            </div>
          </div>
        )}
      </div>

      {/* Reusable Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerState.isOpen}
        isMulti={mediaPickerState.isMulti}
        title={mediaPickerState.target === 'cover' ? 'Select Primary Cover Photo' : 'Select Gallery Photos'}
        onClose={() => setMediaPickerState({ ...mediaPickerState, isOpen: false })}
        onSelectImage={handleMediaModalSelect}
        onSelectMultipleImages={handleMediaModalSelectMultiple}
      />
    </div>
  );
};

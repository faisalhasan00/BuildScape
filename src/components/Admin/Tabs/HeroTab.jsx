import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { Plus, Trash2, Edit2, Image as ImageIcon, Check, X } from 'lucide-react';

export const HeroTab = () => {
  const { cmsData, addHeroSlide, updateHeroSlide, deleteHeroSlide } = useCms();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', subtitle: '', image: '' });

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newForm, setNewForm] = useState({
    title: '',
    subtitle: '',
    image: '/assets/images/hero1.jpg'
  });

  const handleStartEdit = (slide) => {
    setEditingId(slide.id);
    setEditForm({
      title: slide.title,
      subtitle: slide.subtitle,
      image: slide.image
    });
  };

  const handleSaveEdit = (id) => {
    updateHeroSlide(id, editForm);
    setEditingId(null);
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    if (!newForm.title) return;
    addHeroSlide(newForm);
    setNewForm({ title: '', subtitle: '', image: '/assets/images/hero1.jpg' });
    setIsAddingNew(false);
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="tab-title">Hero Carousel Slider</h3>
          <p className="tab-subtitle">Manage showcase slides, headings, subtitles, and background imagery.</p>
        </div>
        {!isAddingNew && (
          <button className="admin-btn-save" onClick={() => setIsAddingNew(true)}>
            <Plus size={16} /> Add New Slide
          </button>
        )}
      </div>

      {/* Add New Slide Form */}
      {isAddingNew && (
        <form onSubmit={handleAddNew} className="admin-card mb-4 border-warning">
          <div className="admin-card-title text-warning">
            <Plus size={16} /> Create New Hero Slide
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Slide Main Title</label>
            <input
              type="text"
              className="admin-input"
              value={newForm.title}
              onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
              placeholder="e.g. Masterful Architecture in Shadnagar"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Subtitle / Description</label>
            <textarea
              className="admin-textarea"
              rows={2}
              value={newForm.subtitle}
              onChange={(e) => setNewForm({ ...newForm, subtitle: e.target.value })}
              placeholder="e.g. High-performance residential and commercial developments."
              required
            />
          </div>

          <div className="form-group mb-4">
            <label className="admin-label">Image Path or URL</label>
            <input
              type="text"
              className="admin-input"
              value={newForm.image}
              onChange={(e) => setNewForm({ ...newForm, image: e.target.value })}
              placeholder="/assets/images/hero1.jpg or https://..."
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="admin-btn-save">
              <Check size={16} /> Publish Slide
            </button>
            <button type="button" className="btn-cancel-admin" onClick={() => setIsAddingNew(false)}>
              <X size={16} /> Cancel
            </button>
          </div>
        </form>
      )}

      {/* Existing Slides List */}
      <div className="admin-slides-list">
        {cmsData.heroSlides.map((slide, index) => {
          const isEditing = editingId === slide.id;

          return (
            <div key={slide.id} className="admin-slide-card admin-card mb-3">
              <div className="row align-items-center">
                <div className="col-md-3 mb-3 mb-md-0">
                  <div className="admin-slide-thumb">
                    <img
                      src={isEditing ? editForm.image : slide.image}
                      alt={slide.title}
                      onError={(e) => {
                        e.target.src = '/assets/images/hero1.jpg';
                      }}
                    />
                    <span className="slide-order-badge">Slide {index + 1}</span>
                  </div>
                </div>

                <div className="col-md-7">
                  {isEditing ? (
                    <div>
                      <div className="form-group mb-2">
                        <label className="admin-label">Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label className="admin-label">Subtitle</label>
                        <textarea
                          className="admin-textarea"
                          rows={2}
                          value={editForm.subtitle}
                          onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label className="admin-label">Image URL</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editForm.image}
                          onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="slide-title-preview">{slide.title}</h4>
                      <p className="slide-subtitle-preview">{slide.subtitle}</p>
                      <span className="slide-image-path">
                        <ImageIcon size={12} className="me-1" /> {slide.image}
                      </span>
                    </div>
                  )}
                </div>

                <div className="col-md-2 text-md-end mt-3 mt-md-0">
                  {isEditing ? (
                    <div className="d-flex flex-md-column gap-2 justify-content-end">
                      <button className="admin-btn-save w-100" onClick={() => handleSaveEdit(slide.id)}>
                        <Check size={14} /> Save
                      </button>
                      <button className="btn-cancel-admin w-100" onClick={() => setEditingId(null)}>
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex flex-md-column gap-2 justify-content-end">
                      <button className="admin-btn-action edit" onClick={() => handleStartEdit(slide)}>
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        className="admin-btn-action delete"
                        onClick={() => {
                          if (window.confirm('Delete this slide?')) {
                            deleteHeroSlide(slide.id);
                          }
                        }}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { Plus, Trash2, Edit2, Star, Check, X, MessageSquareQuote } from 'lucide-react';

export const TestimonialsTab = () => {
  const { cmsData, addTestimonial, updateTestimonial, deleteTestimonial } = useCms();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    clientName: '',
    clientTitle: '',
    projectType: '',
    location: '',
    rating: 5,
    quote: '',
    highlight: ''
  });

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newForm, setNewForm] = useState({
    clientName: '',
    clientTitle: '',
    projectType: '',
    location: 'Shadnagar, Telangana',
    rating: 5,
    quote: '',
    highlight: 'Verified Turnkey Quality'
  });

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleSaveEdit = (id) => {
    updateTestimonial(id, editForm);
    setEditingId(null);
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    if (!newForm.clientName || !newForm.quote) return;
    addTestimonial(newForm);
    setNewForm({
      clientName: '',
      clientTitle: '',
      projectType: '',
      location: 'Shadnagar, Telangana',
      rating: 5,
      quote: '',
      highlight: 'Verified Turnkey Quality'
    });
    setIsAddingNew(false);
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="tab-title">Client Testimonials & Endorsements</h3>
          <p className="tab-subtitle">Add, edit, or remove verified client reviews and star ratings.</p>
        </div>
        {!isAddingNew && (
          <button className="admin-btn-save" onClick={() => setIsAddingNew(true)}>
            <Plus size={16} /> Add Testimonial
          </button>
        )}
      </div>

      {/* Add New Form */}
      {isAddingNew && (
        <form onSubmit={handleAddNew} className="admin-card mb-4 border-warning">
          <div className="admin-card-title text-warning">
            <Plus size={16} /> Create Client Testimonial
          </div>

          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label className="admin-label">Client Name</label>
              <input
                type="text"
                className="admin-input"
                value={newForm.clientName}
                onChange={(e) => setNewForm({ ...newForm, clientName: e.target.value })}
                placeholder="e.g. Dr. K. Raghavendra Rao"
                required
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label className="admin-label">Client Designation / Role</label>
              <input
                type="text"
                className="admin-input"
                value={newForm.clientTitle}
                onChange={(e) => setNewForm({ ...newForm, clientTitle: e.target.value })}
                placeholder="e.g. Managing Director / Homeowner"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label className="admin-label">Project Type & Area</label>
              <input
                type="text"
                className="admin-input"
                value={newForm.projectType}
                onChange={(e) => setNewForm({ ...newForm, projectType: e.target.value })}
                placeholder="e.g. Luxury Villa (5,500 sq.ft)"
                required
              />
            </div>
            <div className="col-md-3 form-group mb-3">
              <label className="admin-label">Location</label>
              <input
                type="text"
                className="admin-input"
                value={newForm.location}
                onChange={(e) => setNewForm({ ...newForm, location: e.target.value })}
              />
            </div>
            <div className="col-md-3 form-group mb-3">
              <label className="admin-label">Rating (1 to 5 Stars)</label>
              <select
                className="admin-input"
                value={newForm.rating}
                onChange={(e) => setNewForm({ ...newForm, rating: Number(e.target.value) })}
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★☆</option>
                <option value={3}>3 Stars ★★★☆☆</option>
              </select>
            </div>
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Review Quote</label>
            <textarea
              className="admin-textarea"
              rows={3}
              value={newForm.quote}
              onChange={(e) => setNewForm({ ...newForm, quote: e.target.value })}
              placeholder="What did the client say about Buildscape?"
              required
            />
          </div>

          <div className="form-group mb-4">
            <label className="admin-label">Deliverable Highlight Badge</label>
            <input
              type="text"
              className="admin-input"
              value={newForm.highlight}
              onChange={(e) => setNewForm({ ...newForm, highlight: e.target.value })}
              placeholder="e.g. Flawless Turnkey Execution & Transparency"
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="admin-btn-save">
              <Check size={16} /> Publish Review
            </button>
            <button type="button" className="btn-cancel-admin" onClick={() => setIsAddingNew(false)}>
              <X size={16} /> Cancel
            </button>
          </div>
        </form>
      )}

      {/* List of Testimonials */}
      <div className="admin-testimonials-list">
        {cmsData.testimonials.map((t) => {
          const isEditing = editingId === t.id;

          return (
            <div key={t.id} className="admin-card mb-3">
              {isEditing ? (
                <div>
                  <div className="row">
                    <div className="col-md-6 form-group mb-2">
                      <label className="admin-label">Client Name</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={editForm.clientName}
                        onChange={(e) => setEditForm({ ...editForm, clientName: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6 form-group mb-2">
                      <label className="admin-label">Designation</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={editForm.clientTitle}
                        onChange={(e) => setEditForm({ ...editForm, clientTitle: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mb-2">
                      <label className="admin-label">Project Type</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={editForm.projectType}
                        onChange={(e) => setEditForm({ ...editForm, projectType: e.target.value })}
                      />
                    </div>
                    <div className="col-md-3 form-group mb-2">
                      <label className="admin-label">Location</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      />
                    </div>
                    <div className="col-md-3 form-group mb-2">
                      <label className="admin-label">Rating</label>
                      <select
                        className="admin-input"
                        value={editForm.rating}
                        onChange={(e) => setEditForm({ ...editForm, rating: Number(e.target.value) })}
                      >
                        <option value={5}>5 Stars ★★★★★</option>
                        <option value={4}>4 Stars ★★★★☆</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group mb-2">
                    <label className="admin-label">Quote</label>
                    <textarea
                      className="admin-textarea"
                      rows={3}
                      value={editForm.quote}
                      onChange={(e) => setEditForm({ ...editForm, quote: e.target.value })}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="admin-label">Highlight Tag</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={editForm.highlight}
                      onChange={(e) => setEditForm({ ...editForm, highlight: e.target.value })}
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button className="admin-btn-save" onClick={() => handleSaveEdit(t.id)}>
                      <Check size={14} /> Save
                    </button>
                    <button className="btn-cancel-admin" onClick={() => setEditingId(null)}>
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-start">
                  <div className="pe-3">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h5 className="m-0 text-dark font-weight-bold">{t.clientName}</h5>
                      <span className="text-muted small">({t.clientTitle})</span>
                      <div className="d-flex gap-1 ms-2">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} size={12} fill="#d4af37" color="#d4af37" />
                        ))}
                      </div>
                    </div>
                    <div className="text-warning small font-weight-bold mb-2">
                      {t.projectType} • {t.location}
                    </div>
                    <p className="text-secondary mb-2 fst-italic">"{t.quote}"</p>
                    <span className="badge bg-light text-dark border">Tag: {t.highlight}</span>
                  </div>

                  <div className="d-flex gap-2 flex-shrink-0">
                    <button className="admin-btn-action edit" onClick={() => handleStartEdit(t)}>
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      className="admin-btn-action delete"
                      onClick={() => {
                        if (window.confirm(`Delete review from ${t.clientName}?`)) {
                          deleteTestimonial(t.id);
                        }
                      }}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

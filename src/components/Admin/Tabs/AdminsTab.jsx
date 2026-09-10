import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { UserPlus, Shield, ShieldCheck, UserCheck, Trash2, Edit2, Check, X, Key, Mail, User } from 'lucide-react';

export const AdminsTab = () => {
  const { cmsData, addSubAdmin, updateSubAdmin, deleteSubAdmin, currentAdmin } = useCms();
  const admins = cmsData.admins || [];

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newAdminForm, setNewAdminForm] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    role: 'Content & Lead Manager',
    permissions: 'editor',
    status: 'Active'
  });

  const [editAdminForm, setEditAdminForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    status: 'Active'
  });

  const handleStartEdit = (admin) => {
    setEditingId(admin.id);
    setEditAdminForm({
      name: admin.name,
      email: admin.email,
      password: admin.password,
      role: admin.role,
      status: admin.status
    });
  };

  const handleSaveEdit = (id) => {
    updateSubAdmin(id, editAdminForm);
    setEditingId(null);
  };

  const handleCreateSubAdmin = (e) => {
    e.preventDefault();
    if (!newAdminForm.username || !newAdminForm.password || !newAdminForm.name) return;

    // Check if username already exists
    if (admins.some((a) => a.username.toLowerCase() === newAdminForm.username.trim().toLowerCase())) {
      alert('Username already exists. Please pick a unique username.');
      return;
    }

    addSubAdmin(newAdminForm);
    setNewAdminForm({
      username: '',
      name: '',
      email: '',
      password: '',
      role: 'Content & Lead Manager',
      permissions: 'editor',
      status: 'Active'
    });
    setIsAddingNew(false);
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="tab-title">Team & Sub-Admin Accounts</h3>
          <p className="tab-subtitle">Create and manage authorized administrative accounts, roles, and access credentials.</p>
        </div>
        {!isAddingNew && (
          <button className="admin-btn-save" onClick={() => setIsAddingNew(true)}>
            <UserPlus size={16} /> Create New Sub-Admin
          </button>
        )}
      </div>

      {/* Create New Sub-Admin Form */}
      {isAddingNew && (
        <form onSubmit={handleCreateSubAdmin} className="admin-card mb-4 border-warning">
          <div className="admin-card-title text-warning">
            <UserPlus size={16} /> Add New Sub-Admin Account
          </div>

          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label className="admin-label">Full Name *</label>
              <input
                type="text"
                className="admin-input"
                value={newAdminForm.name}
                onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
                placeholder="e.g. Syed Wajeed"
                required
              />
            </div>

            <div className="col-md-6 form-group mb-3">
              <label className="admin-label">Username (Sign In ID) *</label>
              <input
                type="text"
                className="admin-input"
                value={newAdminForm.username}
                onChange={(e) => setNewAdminForm({ ...newAdminForm, username: e.target.value.toLowerCase() })}
                placeholder="e.g. wajeed"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label className="admin-label">Email Address</label>
              <input
                type="email"
                className="admin-input"
                value={newAdminForm.email}
                onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                placeholder="e.g. wajeed@buildscape.in"
              />
            </div>

            <div className="col-md-6 form-group mb-3">
              <label className="admin-label">Password *</label>
              <input
                type="text"
                className="admin-input"
                value={newAdminForm.password}
                onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
                placeholder="Enter strong password"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label className="admin-label">Assigned Role</label>
              <select
                className="admin-input"
                value={newAdminForm.role}
                onChange={(e) => setNewAdminForm({ ...newAdminForm, role: e.target.value })}
              >
                <option value="Content & Lead Manager">Content & Lead Manager</option>
                <option value="Site Operations Manager">Site Operations Manager</option>
                <option value="Architectural Lead">Architectural Lead</option>
                <option value="Client Relations Coordinator">Client Relations Coordinator</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>

            <div className="col-md-6 form-group mb-4">
              <label className="admin-label">Account Status</label>
              <select
                className="admin-input"
                value={newAdminForm.status}
                onChange={(e) => setNewAdminForm({ ...newAdminForm, status: e.target.value })}
              >
                <option value="Active">Active (Can Sign In)</option>
                <option value="Inactive">Inactive (Access Suspended)</option>
              </select>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="admin-btn-save">
              <Check size={16} /> Create Sub-Admin Account
            </button>
            <button type="button" className="btn-cancel-admin" onClick={() => setIsAddingNew(false)}>
              <X size={16} /> Cancel
            </button>
          </div>
        </form>
      )}

      {/* Sub-Admins List */}
      <div className="admin-users-list">
        {admins.map((user) => {
          const isEditing = editingId === user.id;

          return (
            <div key={user.id} className="admin-card mb-3">
              {isEditing ? (
                <div>
                  <h5 className="mb-3 text-dark font-weight-bold">Edit Sub-Admin: {user.username}</h5>
                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label className="admin-label">Full Name</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={editAdminForm.name}
                        onChange={(e) => setEditAdminForm({ ...editAdminForm, name: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="admin-label">Email</label>
                      <input
                        type="email"
                        className="admin-input"
                        value={editAdminForm.email}
                        onChange={(e) => setEditAdminForm({ ...editAdminForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label className="admin-label">Change Password</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={editAdminForm.password}
                        onChange={(e) => setEditAdminForm({ ...editAdminForm, password: e.target.value })}
                      />
                    </div>
                    <div className="col-md-3 form-group mb-3">
                      <label className="admin-label">Role</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={editAdminForm.role}
                        onChange={(e) => setEditAdminForm({ ...editAdminForm, role: e.target.value })}
                      />
                    </div>
                    <div className="col-md-3 form-group mb-3">
                      <label className="admin-label">Status</label>
                      <select
                        className="admin-input"
                        value={editAdminForm.status}
                        onChange={(e) => setEditAdminForm({ ...editAdminForm, status: e.target.value })}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button className="admin-btn-save" onClick={() => handleSaveEdit(user.id)}>
                      <Check size={14} /> Save Changes
                    </button>
                    <button className="btn-cancel-admin" onClick={() => setEditingId(null)}>
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <div className={`admin-user-avatar ${user.isSuperAdmin ? 'bg-dark text-warning' : 'bg-secondary text-white'}`}>
                      {user.isSuperAdmin ? <ShieldCheck size={20} /> : <UserCheck size={20} />}
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <h5 className="m-0 text-dark font-weight-bold">{user.name}</h5>
                        {user.isSuperAdmin && (
                          <span className="badge bg-dark text-warning">Super Admin</span>
                        )}
                        <span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                          {user.status}
                        </span>
                      </div>
                      <div className="text-muted small mt-1">
                        <User size={12} className="me-1" /> Username: <code>{user.username}</code>
                        {user.email && (
                          <>
                            <span className="mx-2">•</span>
                            <Mail size={12} className="me-1" /> {user.email}
                          </>
                        )}
                        <span className="mx-2">•</span>
                        <span>Role: <strong>{user.role}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                    <button className="admin-btn-action edit" onClick={() => handleStartEdit(user)}>
                      <Edit2 size={14} /> Edit
                    </button>
                    {!user.isSuperAdmin && (
                      <button
                        className="admin-btn-action delete"
                        onClick={() => {
                          if (window.confirm(`Delete sub-admin account for ${user.name}?`)) {
                            deleteSubAdmin(user.id);
                          }
                        }}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    )}
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

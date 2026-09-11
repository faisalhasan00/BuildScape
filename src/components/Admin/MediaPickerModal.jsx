import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Check, Sparkles, Folder, Plus, Link as LinkIcon } from 'lucide-react';
import { optimizeImageFile } from '../../utils/imageOptimizer';

export const websiteMediaLibrary = [
  { id: 'h1', title: 'Grand Courtyard Villa', url: '/assets/images/hero1.jpg', category: 'villas' },
  { id: 'h2', title: 'Twilight Luxury Estate', url: '/assets/images/hero2.jpg', category: 'villas' },
  { id: 'h3', title: 'Corporate Commercial Hub', url: '/assets/images/hero3.jpg', category: 'commercial' },
  { id: 'h4', title: 'Modern Facade Architecture', url: '/assets/images/hero4.jpg', category: 'commercial' },
  { id: 'ab', title: 'Architectural Studio Leadership', url: '/assets/images/about_hero.jpg', category: 'studio' },
  { id: 'c1', title: 'Architectural Blueprints & 3D', url: '/assets/images/capability_architecture.jpg', category: 'blueprints' },
  { id: 'c2', title: 'RCC Civil Construction Rigor', url: '/assets/images/capability_construction.jpg', category: 'construction' },
  { id: 'c3', title: 'Luxury Penthouse Living Interiors', url: '/assets/images/capability_interior_design.jpg', category: 'interiors' },
  { id: 'c4', title: 'Turnkey EPC Project Handover', url: '/assets/images/capability_turnkey.jpg', category: 'turnkey' },
  { id: 'p1', title: 'Cantilever Villa Elevation', url: '/assets/images/First.png', category: 'villas' },
  { id: 'p2', title: 'Structural Footing Analysis', url: '/assets/images/Second.png', category: 'blueprints' },
  { id: 'p3', title: 'Commercial Glass Atrium', url: '/assets/images/Third.png', category: 'commercial' },
  { id: 'p4', title: 'Bespoke Joinery & Lighting', url: '/assets/images/Fourth.png', category: 'interiors' }
];

export const MediaPickerModal = ({ isOpen, onClose, onSelectImage, onSelectMultipleImages, isMulti = false, title = "Select Image" }) => {
  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'device' | 'url'
  const [selectedUrls, setSelectedUrls] = useState([]);
  const [filterCat, setFilterCat] = useState('all');
  const [customUrl, setCustomUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleToggleSelect = (url) => {
    if (isMulti) {
      if (selectedUrls.includes(url)) {
        setSelectedUrls(selectedUrls.filter(u => u !== url));
      } else {
        setSelectedUrls([...selectedUrls, url]);
      }
    } else {
      setSelectedUrls([url]);
    }
  };

  const handleConfirmSelection = () => {
    if (isMulti) {
      if (onSelectMultipleImages && selectedUrls.length > 0) {
        onSelectMultipleImages(selectedUrls);
      }
    } else {
      if (onSelectImage && selectedUrls.length > 0) {
        onSelectImage(selectedUrls[0]);
      }
    }
    onClose();
  };

  const handleDeviceFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsProcessing(true);
    try {
      const optimizedUrls = [];
      for (const file of files) {
        const dataUrl = await optimizeImageFile(file);
        optimizedUrls.push(dataUrl);
      }

      if (isMulti) {
        if (onSelectMultipleImages) {
          onSelectMultipleImages(optimizedUrls);
        }
      } else {
        if (onSelectImage && optimizedUrls.length > 0) {
          onSelectImage(optimizedUrls[0]);
        }
      }
      onClose();
    } catch (err) {
      alert('Error processing image: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddCustomUrl = (e) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    if (isMulti) {
      if (onSelectMultipleImages) {
        onSelectMultipleImages([customUrl.trim()]);
      }
    } else {
      if (onSelectImage) {
        onSelectImage(customUrl.trim());
      }
    }
    onClose();
  };

  const filteredLibrary = filterCat === 'all'
    ? websiteMediaLibrary
    : websiteMediaLibrary.filter(item => item.category === filterCat);

  return (
    <div className="blog-modal-backdrop" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="blog-modal-dialog" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: 780, maxHeight: '88vh' }}
      >
        {/* Header */}
        <div className="blog-modal-header">
          <div className="blog-modal-brand">
            <ImageIcon size={17} className="text-gold me-2" />
            <span>{title}</span>
          </div>
          <button onClick={onClose} className="blog-modal-icon-btn close">
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="d-flex border-bottom border-secondary px-4 pt-3 gap-3 bg-dark">
          <button
            type="button"
            onClick={() => setActiveTab('library')}
            className={`btn btn-sm ${activeTab === 'library' ? 'btn-warning text-dark font-bold' : 'btn-outline-secondary'}`}
            style={{ fontSize: 12, borderRadius: '6px 6px 0 0' }}
          >
            <Folder size={14} className="me-1" />
            <span>Website Media Gallery</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('device')}
            className={`btn btn-sm ${activeTab === 'device' ? 'btn-warning text-dark font-bold' : 'btn-outline-secondary'}`}
            style={{ fontSize: 12, borderRadius: '6px 6px 0 0' }}
          >
            <Upload size={14} className="me-1" />
            <span>Upload from Computer / Device</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`btn btn-sm ${activeTab === 'url' ? 'btn-warning text-dark font-bold' : 'btn-outline-secondary'}`}
            style={{ fontSize: 12, borderRadius: '6px 6px 0 0' }}
          >
            <LinkIcon size={14} className="me-1" />
            <span>External Image URL</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="blog-modal-body p-4" style={{ minHeight: 380 }}>
          {/* TAB 1: WEBSITE MEDIA GALLERY */}
          {activeTab === 'library' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div className="d-flex gap-1 flex-wrap">
                  {['all', 'villas', 'commercial', 'interiors', 'blueprints', 'construction'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFilterCat(cat)}
                      className={`btn btn-sm ${filterCat === cat ? 'btn-warning text-dark' : 'btn-dark text-muted border-secondary'}`}
                      style={{ fontSize: 11, textTransform: 'capitalize', padding: '3px 10px', borderRadius: 15 }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {isMulti && (
                  <span className="text-warning font-bold" style={{ fontSize: 12 }}>
                    {selectedUrls.length} image(s) selected
                  </span>
                )}
              </div>

              {/* Media Thumbnails Grid */}
              <div className="row g-3" style={{ maxHeight: 340, overflowY: 'auto' }}>
                {filteredLibrary.map((item) => {
                  const isSelected = selectedUrls.includes(item.url);
                  return (
                    <div key={item.id} className="col-md-3 col-sm-4 col-6">
                      <div
                        onClick={() => handleToggleSelect(item.url)}
                        className="position-relative rounded overflow-hidden cursor-pointer"
                        style={{
                          border: isSelected ? '2px solid #d4af37' : '1px solid rgba(255,255,255,0.15)',
                          background: '#111622',
                          cursor: 'pointer',
                          transform: isSelected ? 'scale(0.97)' : 'scale(1)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <img
                          src={item.url}
                          alt={item.title}
                          style={{ width: '100%', height: 95, objectFit: 'cover' }}
                        />
                        {isSelected && (
                          <div
                            className="position-absolute top-1 end-1 bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: 22, height: 22, zIndex: 3 }}
                          >
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                        <div className="p-1 text-truncate text-muted text-center" style={{ fontSize: 10 }}>
                          {item.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD FROM DEVICE */}
          {activeTab === 'device' && (
            <div className="text-center py-5">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleDeviceFileUpload}
                accept="image/*"
                multiple={isMulti}
                style={{ display: 'none' }}
              />

              <div 
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="p-5 rounded border border-warning border-dashed d-flex flex-column align-items-center justify-content-center cursor-pointer"
                style={{
                  background: 'rgba(212, 175, 55, 0.04)',
                  cursor: 'pointer',
                  borderStyle: 'dashed',
                  borderWidth: 2
                }}
              >
                <Upload size={40} className="text-warning mb-3" />
                <h5 className="text-white mb-2">Click to Browse Files from Your Computer / Phone</h5>
                <p className="text-muted mb-3" style={{ fontSize: 13 }}>
                  Supports JPG, PNG, WEBP. {isMulti ? 'You can select multiple photos at once.' : 'Single image will be set as cover.'}
                </p>
                <button type="button" className="admin-btn-save d-inline-flex align-items-center gap-2">
                  <Upload size={15} />
                  <span>{isMulti ? 'Select Photos from Device' : 'Select Photo from Device'}</span>
                </button>
              </div>

              {isProcessing && (
                <div className="mt-3 text-warning font-bold">
                  Optimizing and preparing image(s)...
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EXTERNAL IMAGE URL */}
          {activeTab === 'url' && (
            <form onSubmit={handleAddCustomUrl} className="py-4">
              <label className="admin-label mb-2">Paste Image URL / Path</label>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="admin-input flex-grow-1"
                  placeholder="https://images.unsplash.com/... or /assets/images/hero1.jpg"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  required
                />
                <button type="submit" className="admin-btn-save">
                  Apply URL
                </button>
              </div>
              <p className="text-muted mt-2" style={{ fontSize: 12 }}>
                You can paste direct image URLs from anywhere on the web or local asset paths.
              </p>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        {activeTab === 'library' && (
          <div className="p-3 border-top border-secondary d-flex justify-content-between align-items-center bg-dark">
            <span className="text-muted" style={{ fontSize: 12 }}>
              Click any photo to select. {isMulti ? 'Multiple photos can be selected.' : ''}
            </span>
            <div className="d-flex gap-2">
              <button type="button" onClick={onClose} className="btn-cancel-admin">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSelection}
                disabled={selectedUrls.length === 0}
                className="admin-btn-save"
              >
                <Check size={15} className="me-1" />
                <span>{isMulti ? `Add ${selectedUrls.length} Selected Photo(s)` : 'Select Cover Photo'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

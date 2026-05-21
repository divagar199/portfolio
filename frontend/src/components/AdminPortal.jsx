import React, { useState, useEffect, useRef } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://portfolio-backend-dru5.onrender.com';

const AdminPortal = ({ isOpen, onClose, projects, onRefresh, onNotify }) => {
  const [activeScreen, setActiveScreen] = useState('login'); // 'login' | 'dashboard' | 'form'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [shaking, setShaking] = useState(false);

  // Form states for project CRUD
  const [editId, setEditId] = useState(null); // null if Create Mode, ID if Edit Mode
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');
  const [link, setLink] = useState('');
  const [base64Image, setBase64Image] = useState(null);
  
  // Drag and drop states
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Synchronize authentication status with session storage
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (token === 'active_session') {
      setIsAuthenticated(true);
      setActiveScreen('dashboard');
    } else {
      setIsAuthenticated(false);
      setActiveScreen('login');
    }
  }, [isOpen]);

  // Auth Handler: Login verifying details on the backend
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim().toLowerCase();

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        sessionStorage.setItem('admin_token', 'active_session');
        setIsAuthenticated(true);
        setActiveScreen('dashboard');
        onNotify(true); // Alert main app of admin status
      } else {
        setLoginError(data.message || 'Invalid security credentials.');
        triggerFormShake();
      }
    } catch (err) {
      console.error("Login verification network error:", err);
      // Client-side fallback if backend server is booting/offline
      if (cleanEmail === 'divagar.m.msc.cs@gmail.com' && cleanPassword === 'diva755034') {
        sessionStorage.setItem('admin_token', 'active_session');
        setIsAuthenticated(true);
        setActiveScreen('dashboard');
        onNotify(true);
      } else {
        setLoginError('Invalid credentials or authentication server is offline.');
        triggerFormShake();
      }
    }
  };

  const triggerFormShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 450);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setActiveScreen('login');
    onNotify(false);
    setEmail('');
    setPassword('');
  };

  // Base64 Photo Resizing & Compression pipeline
  const processImageFile = (file) => {
    if (!file || !file.type.match('image.*')) {
      alert('Selected file must be an image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 500;
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio boundaries
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to JPEG at 75% quality to save space
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
        setBase64Image(compressedBase64);
      };
    };
    reader.readAsDataURL(file);
  };

  // Drag and Drop triggers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processImageFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) processImageFile(file);
  };

  const triggerFileBrowser = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const removePhotoPreview = (e) => {
    e.stopPropagation();
    setBase64Image(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Load Form Screen in Create Mode
  const handleAddNewClick = () => {
    setEditId(null);
    setTitle('');
    setSubtitle('');
    setDesc('');
    setTags('');
    setLink('');
    setBase64Image(null);
    setActiveScreen('form');
  };

  // Load Form Screen in Edit Mode
  const handleEditClick = (project) => {
    setEditId(project.id);
    setTitle(project.title);
    setSubtitle(project.subtitle);
    setDesc(project.desc);
    setTags(project.tags ? project.tags.join(', ') : '');
    setLink(project.link);
    setBase64Image(project.image);
    setActiveScreen('form');
  };

  // Form Submit: CRUD operations matching API hooks
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!base64Image) {
      alert('Please upload or drag a preview picture first.');
      return;
    }

    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      desc: desc.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      link: link.trim(),
      image: base64Image
    };

    try {
      let response;
      if (editId) {
        // Edit Mode: PUT Request
        response = await fetch(`${API_BASE}/api/projects/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // Create Mode: POST Request
        response = await fetch(`${API_BASE}/api/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (response.ok) {
        onRefresh(); // Refresh parent lists
        setActiveScreen('dashboard');
      } else {
        const errorData = await response.json();
        alert(`Failed to save project: ${errorData.error || 'Server error'}`);
      }
    } catch (err) {
      console.error("CRUD Syncing Network error:", err);
      alert("Error reaching portfolio database server. Changes could not be persisted.");
    }
  };

  // Delete Controller matching API hooks
  const handleDeleteClick = async (project) => {
    if (confirm(`Are you absolutely sure you want to delete "${project.title}" from your portfolio?`)) {
      try {
        const response = await fetch(`${API_BASE}/api/projects/${project.id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          onRefresh();
        } else {
          alert('Failed to delete showcase project.');
        }
      } catch (err) {
        console.error("Delete operation server error:", err);
        alert("Could not reach backend database server to delete project.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div id="admin-modal" className={`admin-modal active`}>
      <div className="admin-modal-overlay" onClick={onClose}></div>
      <div className="admin-modal-wrapper scrollbar-dark">
        
        {/* Modal close icon */}
        <button 
          className="admin-modal-close magnet" 
          onClick={onClose}
          aria-label="Close Admin Modal"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* SCREEN 1: SECURITIES GATE LOGIN */}
        {activeScreen === 'login' && (
          <div className="admin-screen active" id="admin-login-screen">
            <div className="admin-screen-header">
              <div className="admin-header-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h2 className="admin-screen-title">Administrator Portal</h2>
              <p className="admin-screen-desc">Please verify your secure access credentials.</p>
            </div>

            <form 
              className={`admin-form ${shaking ? 'active-error' : ''}`} 
              onSubmit={handleLoginSubmit}
            >
              <div className="admin-input-group">
                <label className="admin-label mono-tag">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  className="admin-input" 
                  required 
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
              <div className="admin-input-group">
                <label className="admin-label mono-tag">SECURITY PASSWORD</label>
                <input 
                  type="password" 
                  className="admin-input" 
                  required 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
              
              {loginError && (
                <div className="admin-error-msg active">{loginError}</div>
              )}
              
              <button type="submit" className="admin-submit-btn magnet">
                VERIFY ACCESS
              </button>
            </form>
          </div>
        )}

        {/* SCREEN 2: ADMIN SHOWCASES CONTROL PANEL */}
        {activeScreen === 'dashboard' && (
          <div className="admin-screen active" id="admin-dashboard-screen">
            <div className="admin-screen-header">
              <h2 className="admin-screen-title">Project Control Panel</h2>
              <p className="admin-screen-desc">Manage, edit, add, or delete your portfolio showcase projects.</p>
              
              <div className="admin-dashboard-actions">
                <button 
                  className="admin-action-btn primary magnet"
                  onClick={handleAddNewClick}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>Add New Project</span>
                </button>
                <button 
                  className="admin-action-btn secondary magnet"
                  onClick={handleLogout}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <span>Exit Admin</span>
                </button>
              </div>
            </div>

            <div className="admin-projects-list-wrapper">
              <div className="admin-projects-list">
                {projects.length === 0 ? (
                  <div className="project-loading-placeholder mono-tag">// NO SHOWCASES RECORDED. ADD NEW ENTRIES.</div>
                ) : (
                  projects.map((project, idx) => (
                    <div className="admin-project-item" key={project.id || idx}>
                      <div className="admin-proj-info">
                        <img 
                          src={project.image || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a1a17"/></svg>'} 
                          alt="" 
                          className="admin-proj-thumb"
                        />
                        <div className="admin-proj-details">
                          <span className="admin-proj-name">{project.title}</span>
                          <span className="admin-proj-sub">{project.subtitle}</span>
                        </div>
                      </div>
                      <div className="admin-proj-controls">
                        <button 
                          type="button" 
                          className="admin-ctrl-btn edit-btn magnet"
                          onClick={() => handleEditClick(project)}
                          title="Edit Project"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                          </svg>
                        </button>
                        <button 
                          type="button" 
                          className="admin-ctrl-btn delete-btn magnet"
                          onClick={() => handleDeleteClick(project)}
                          title="Delete Project"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 3: DETAILED SHOWCASE EDITOR FORM */}
        {activeScreen === 'form' && (
          <div className="admin-screen active" id="admin-form-screen">
            <div className="admin-screen-header">
              <h2 className="admin-screen-title">
                {editId ? 'Modify Showcase Project' : 'Create New Project'}
              </h2>
              <p className="admin-screen-desc">Fill out showcase data. Photos are resized offline for instant local responses.</p>
            </div>

            <form className="admin-form" onSubmit={handleFormSubmit}>
              <div className="admin-input-row">
                <div className="admin-input-group">
                  <label className="admin-label mono-tag">PROJECT TITLE</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    required 
                    placeholder="e.g. Kuviyal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="admin-input-group">
                  <label className="admin-label mono-tag">SUBTITLE DETAIL</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    required 
                    placeholder="e.g. Full-Stack Bookstore"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-input-group">
                <label className="admin-label mono-tag">DESCRIPTION BRIEF</label>
                <textarea 
                  className="admin-input text-area" 
                  required 
                  placeholder="Provide a rich summary of core features and integrations..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>

              <div className="admin-input-row">
                <div className="admin-input-group">
                  <label className="admin-label mono-tag">TECH STACK (COMMA SEPARATED)</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    required 
                    placeholder="React.js, Node.js, Express, MongoDB"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
                <div className="admin-input-group">
                  <label className="admin-label mono-tag">SOURCE CODE / LIVE LINK</label>
                  <input 
                    type="url" 
                    className="admin-input" 
                    required 
                    placeholder="https://github.com/... or https://..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
              </div>

              {/* Photo Upload Zone supporting drag & drop */}
              <div className="admin-input-group">
                <label className="admin-label mono-tag">PROJECT PREVIEW PICTURE</label>
                <div 
                  className={`admin-photo-upload-zone ${isDragging ? 'dragging' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileBrowser}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="photo-file-input" 
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  
                  {!base64Image ? (
                    <div className="upload-zone-prompt">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="upload-icon">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <p className="upload-prompt-text">Drag & drop your preview image here or <span className="accent-text">browse files</span></p>
                      <p className="upload-subtext">Supports PNG, JPG, JPEG. Image will be compressed & saved natively.</p>
                    </div>
                  ) : (
                    <div className="upload-zone-preview active">
                      <img src={base64Image} alt="Project image preview" />
                      <button 
                        type="button" 
                        className="remove-preview-btn magnet"
                        onClick={removePhotoPreview}
                        aria-label="Remove photo"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="admin-form-actions">
                <button type="submit" className="admin-submit-btn inline magnet">
                  SAVE SHOWCASE
                </button>
                <button 
                  type="button" 
                  className="admin-cancel-btn magnet"
                  onClick={() => setActiveScreen('dashboard')}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPortal;

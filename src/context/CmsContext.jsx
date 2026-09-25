import React, { createContext, useContext, useState, useEffect } from 'react';
import * as defaultData from '../data/siteData';

const CMS_STORAGE_KEY = 'buildscape_cms_data_v1';
const CMS_AUTH_KEY = 'buildscape_cms_auth_v1';
const CMS_CURRENT_USER_KEY = 'buildscape_cms_current_user_v1';

const defaultAdmins = [
  {
    id: 1,
    username: "admin",
    name: "Mohammad Khaja Osman",
    email: "osman@buildscape.in",
    password: "buildscape2009",
    role: "Super Administrator",
    isSuperAdmin: true,
    permissions: "all",
    status: "Active",
    createdAt: "2026-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    username: "editor",
    name: "Syed Wajeed",
    email: "wajeed@buildscape.in",
    password: "wajeed2009",
    role: "Content & Lead Manager",
    isSuperAdmin: false,
    permissions: "editor",
    status: "Active",
    createdAt: "2026-03-15T00:00:00.000Z"
  }
];

const defaultInquiries = [
  {
    id: 1,
    name: "Vikram R. Varma",
    email: "vikram.varma@gmail.com",
    phone: "+91-9848012345",
    projectType: "Luxury Villa (4BHK)",
    location: "Shadnagar",
    budget: "₹1.5 - ₹2.5 Cr",
    message: "Looking for complete architectural design and turnkey construction for our 600 sq.yard plot in Shadnagar.",
    date: "2026-09-08T10:30:00.000Z",
    status: "New"
  },
  {
    id: 2,
    name: "Kavitha Reddy",
    email: "kavitha.reddy@techcorp.in",
    phone: "+91-9701198765",
    projectType: "Corporate Office Interiors",
    location: "Ranga Reddy District",
    budget: "₹50 - ₹75 Lakhs",
    message: "Need bespoke corporate office fit-outs and acoustic layout for 5,000 sq.ft commercial space.",
    date: "2026-09-07T14:15:00.000Z",
    status: "Contacted"
  }
];

const getInitialCmsData = () => {
  const defaults = {
    siteConfig: defaultData.siteConfig,
    heroSlides: defaultData.heroSlides,
    disciplines: defaultData.disciplines,
    servicePillars: defaultData.servicePillars,
    capabilities: defaultData.capabilities,
    projectTypologies: defaultData.projectTypologies,
    deliveryWorkflow: defaultData.deliveryWorkflow,
    designMatrix: defaultData.designMatrix,
    operationalStandards: defaultData.operationalStandards,
    technicalDeliverables: defaultData.technicalDeliverables,
    whyUsItems: defaultData.whyUsItems,
    testimonials: defaultData.testimonials,
    inquiries: defaultInquiries,
    admins: defaultAdmins,
    projectsGallery: defaultData.projectsGallery,
    technicalBlueprints: defaultData.technicalBlueprints,
    estimatorConfig: defaultData.estimatorConfig,
    blogArticles: defaultData.blogArticles || []
  };

  try {
    const saved = localStorage.getItem(CMS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // Normalize projectsGallery
      let normGallery = defaultData.projectsGallery;
      if (parsed.projectsGallery) {
        if (Array.isArray(parsed.projectsGallery) && parsed.projectsGallery.length > 0) {
          // If user hasn't added customized projects, update with latest defaults
          normGallery = parsed.projectsGallery.length >= defaultData.projectsGallery.length
            ? parsed.projectsGallery
            : defaultData.projectsGallery;
        } else if (parsed.projectsGallery.items && parsed.projectsGallery.items.length > 0) {
          normGallery = parsed.projectsGallery.items;
        }
      }

      let normBlog = defaultData.blogArticles;
      if (parsed.blogArticles && Array.isArray(parsed.blogArticles) && parsed.blogArticles.length > 0) {
        normBlog = parsed.blogArticles.map((art, idx) => {
          let img = art.image;
          if (!img || img.includes('architecture_luxury_villa') || img.includes('commercial_office_complex') || img.includes('interior_penthouse_living')) {
            img = defaultData.blogArticles[idx % defaultData.blogArticles.length]?.image || '/assets/images/hero1.jpg';
          }
          return { ...art, image: img };
        });
      }

      let normSiteConfig = { ...defaultData.siteConfig, ...(parsed.siteConfig || {}) };
      if (
        normSiteConfig.phoneNumbers &&
        normSiteConfig.phoneNumbers.some((p) => p.includes('999999999'))
      ) {
        normSiteConfig.phoneNumbers = defaultData.siteConfig.phoneNumbers;
      }
      if (
        !normSiteConfig.whatsappNumber ||
        normSiteConfig.whatsappNumber.includes('999999999')
      ) {
        normSiteConfig.whatsappNumber = defaultData.siteConfig.whatsappNumber;
      }

      return {
        ...defaults,
        ...parsed,
        siteConfig: normSiteConfig,
        projectsGallery: normGallery,
        blogArticles: normBlog,
        technicalBlueprints: (parsed.technicalBlueprints && parsed.technicalBlueprints.length > 0)
          ? parsed.technicalBlueprints
          : defaultData.technicalBlueprints,
        estimatorConfig: parsed.estimatorConfig || defaultData.estimatorConfig,
        admins: (parsed.admins && parsed.admins.length > 0) ? parsed.admins : defaultAdmins,
        inquiries: parsed.inquiries || defaultInquiries
      };
    }
  } catch (err) {
    console.error('Failed to parse CMS data from localStorage:', err);
  }

  return defaults;
};

const CmsContext = createContext(null);

export const CmsProvider = ({ children }) => {
  const [cmsData, setCmsData] = useState(getInitialCmsData);
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return localStorage.getItem(CMS_AUTH_KEY) === 'true';
  });

  const [currentAdmin, setCurrentAdmin] = useState(() => {
    try {
      const savedUser = localStorage.getItem(CMS_CURRENT_USER_KEY);
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {}
    return defaultAdmins[0];
  });

  // Check if user navigated directly to /admin, #admin, or ?admin
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      return path.includes('/admin') || hash.includes('admin') || search.includes('admin');
    }
    return false;
  });
  
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage whenever cmsData changes
  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(cmsData));
    } catch (err) {
      console.error('Failed to save CMS data to localStorage:', err);
    }
  }, [cmsData]);

  // Listen to browser URL changes
  useEffect(() => {
    const handleUrlCheck = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path.includes('/admin') || hash.includes('admin') || search.includes('admin')) {
        setIsAdminModalOpen(true);
      }
    };

    window.addEventListener('popstate', handleUrlCheck);
    window.addEventListener('hashchange', handleUrlCheck);
    return () => {
      window.removeEventListener('popstate', handleUrlCheck);
      window.removeEventListener('hashchange', handleUrlCheck);
    };
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // --- ADMIN AUTH & SUB-ADMINS ---
  const loginAdmin = (username, password) => {
    const adminsList = cmsData.admins || defaultAdmins;
    const foundAdmin = adminsList.find(
      (a) => (a.username.toLowerCase() === username.trim().toLowerCase() || a.email.toLowerCase() === username.trim().toLowerCase()) && a.password === password
    );

    if (foundAdmin) {
      if (foundAdmin.status === 'Inactive') {
        return { success: false, error: 'This sub-admin account is currently deactivated. Contact Super Admin.' };
      }

      setIsAdminAuth(true);
      setCurrentAdmin(foundAdmin);
      localStorage.setItem(CMS_AUTH_KEY, 'true');
      localStorage.setItem(CMS_CURRENT_USER_KEY, JSON.stringify(foundAdmin));
      showToast(`Welcome back, ${foundAdmin.name} (${foundAdmin.role})!`);
      return { success: true };
    }

    if ((username === 'admin' || username === 'osman') && password === 'buildscape2009') {
      const defaultUser = defaultAdmins[0];
      setIsAdminAuth(true);
      setCurrentAdmin(defaultUser);
      localStorage.setItem(CMS_AUTH_KEY, 'true');
      localStorage.setItem(CMS_CURRENT_USER_KEY, JSON.stringify(defaultUser));
      showToast('Admin login successful! Welcome back.');
      return { success: true };
    }

    return { success: false, error: 'Invalid username or password.' };
  };

  const logoutAdmin = () => {
    setIsAdminAuth(false);
    localStorage.removeItem(CMS_AUTH_KEY);
    localStorage.removeItem(CMS_CURRENT_USER_KEY);
    showToast('Logged out of Admin Dashboard.');
  };

  const openAdminDashboard = () => {
    setIsAdminModalOpen(true);
    if (window.location.pathname !== '/admin') {
      window.history.pushState(null, '', '/admin');
    }
  };

  const closeAdminDashboard = () => {
    setIsAdminModalOpen(false);
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      window.history.pushState(null, '', '/');
    }
  };

  // Sub-Admin Management Methods
  const addSubAdmin = (newAdmin) => {
    const adminObj = {
      ...newAdmin,
      id: Date.now(),
      isSuperAdmin: false,
      status: newAdmin.status || 'Active',
      createdAt: new Date().toISOString()
    };
    setCmsData((prev) => ({
      ...prev,
      admins: [...(prev.admins || defaultAdmins), adminObj]
    }));
    showToast(`Sub-admin ${adminObj.name} created successfully.`);
  };

  const updateSubAdmin = (id, updatedFields) => {
    setCmsData((prev) => ({
      ...prev,
      admins: (prev.admins || defaultAdmins).map((a) => (a.id === id ? { ...a, ...updatedFields } : a))
    }));
    showToast('Sub-admin account updated.');
  };

  const deleteSubAdmin = (id) => {
    const target = (cmsData.admins || []).find((a) => a.id === id);
    if (target && target.isSuperAdmin) {
      showToast('Cannot delete the primary Super Administrator account.', 'error');
      return;
    }

    setCmsData((prev) => ({
      ...prev,
      admins: (prev.admins || defaultAdmins).filter((a) => a.id !== id)
    }));
    showToast('Sub-admin account removed.');
  };

  // --- PROJECTS GALLERY CRUD METHODS ---
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
      gallery: project.gallery || [project.image || '/assets/images/hero1.jpg']
    };
    setCmsData((prev) => {
      const cur = prev.projectsGallery || defaultData.projectsGallery;
      const items = Array.isArray(cur) ? cur : (cur.items || defaultData.projectsGallery);
      return {
        ...prev,
        projectsGallery: [newProject, ...items]
      };
    });
    showToast('New project published to gallery.');
  };

  const updateProject = (id, updatedProject) => {
    setCmsData((prev) => {
      const cur = prev.projectsGallery || defaultData.projectsGallery;
      const items = Array.isArray(cur) ? cur : (cur.items || defaultData.projectsGallery);
      return {
        ...prev,
        projectsGallery: items.map((p) => p.id === id ? { ...p, ...updatedProject } : p)
      };
    });
    showToast('Project details updated.');
  };

  const deleteProject = (id) => {
    setCmsData((prev) => {
      const cur = prev.projectsGallery || defaultData.projectsGallery;
      const items = Array.isArray(cur) ? cur : (cur.items || defaultData.projectsGallery);
      return {
        ...prev,
        projectsGallery: items.filter((p) => p.id !== id)
      };
    });
    showToast('Project removed from portfolio.');
  };

  const addGalleryItem = addProject;
  const updateGalleryItem = updateProject;
  const deleteGalleryItem = deleteProject;

  // --- CONTENT CRUD METHODS ---
  const updateSiteConfig = (updatedFields) => {
    setCmsData((prev) => ({
      ...prev,
      siteConfig: { ...prev.siteConfig, ...updatedFields }
    }));
    showToast('Company Profile updated successfully.');
  };

  const setHeroSlides = (slides) => {
    setCmsData((prev) => ({ ...prev, heroSlides: slides }));
    showToast('Hero slides updated.');
  };

  const addHeroSlide = (slide) => {
    const newSlide = { ...slide, id: Date.now() };
    setCmsData((prev) => ({
      ...prev,
      heroSlides: [...prev.heroSlides, newSlide]
    }));
    showToast('New hero slide added.');
  };

  const updateHeroSlide = (id, updatedSlide) => {
    setCmsData((prev) => ({
      ...prev,
      heroSlides: prev.heroSlides.map((s) => (s.id === id ? { ...s, ...updatedSlide } : s))
    }));
    showToast('Hero slide updated.');
  };

  const deleteHeroSlide = (id) => {
    setCmsData((prev) => ({
      ...prev,
      heroSlides: prev.heroSlides.filter((s) => s.id !== id)
    }));
    showToast('Hero slide deleted.');
  };

  const updateServicePillars = (pillars) => {
    setCmsData((prev) => ({ ...prev, servicePillars: pillars }));
    showToast('Service pillars updated.');
  };

  const updateCapabilities = (caps) => {
    setCmsData((prev) => ({ ...prev, capabilities: caps }));
    showToast('Core capabilities updated.');
  };

  const updateProjectTypologies = (typologies) => {
    setCmsData((prev) => ({ ...prev, projectTypologies: typologies }));
    showToast('Project typologies updated.');
  };

  const updateDeliveryWorkflow = (workflow) => {
    setCmsData((prev) => ({ ...prev, deliveryWorkflow: workflow }));
    showToast('Delivery workflow stages updated.');
  };

  const setTestimonials = (testimonials) => {
    setCmsData((prev) => ({ ...prev, testimonials }));
    showToast('Testimonials list updated.');
  };

  const addTestimonial = (testimonial) => {
    const newT = { ...testimonial, id: Date.now() };
    setCmsData((prev) => ({
      ...prev,
      testimonials: [newT, ...prev.testimonials]
    }));
    showToast('New client testimonial published.');
  };

  const updateTestimonial = (id, updatedT) => {
    setCmsData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...updatedT } : t))
    }));
    showToast('Testimonial updated.');
  };

  const deleteTestimonial = (id) => {
    setCmsData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id)
    }));
    showToast('Testimonial deleted.');
  };

  const addInquiry = (inquiry) => {
    const newInquiry = {
      ...inquiry,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'New'
    };
    setCmsData((prev) => ({
      ...prev,
      inquiries: [newInquiry, ...(prev.inquiries || [])]
    }));
    showToast('Inquiry submitted successfully! Our team will contact you.');
  };

  const updateInquiryStatus = (id, status) => {
    setCmsData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    }));
    showToast(`Inquiry marked as ${status}.`);
  };

  const deleteInquiry = (id) => {
    setCmsData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.filter((inq) => inq.id !== id)
    }));
    showToast('Inquiry removed from inbox.');
  };

  const addBlogArticle = (article) => {
    const newArticle = {
      ...article,
      id: Date.now(),
      date: article.date || new Date().toISOString().slice(0, 10),
      status: article.status || 'Published'
    };
    setCmsData((prev) => ({
      ...prev,
      blogArticles: [newArticle, ...(prev.blogArticles || [])]
    }));
    showToast(`Article "${newArticle.title}" published successfully!`);
    return newArticle;
  };

  const updateBlogArticle = (id, updatedFields) => {
    setCmsData((prev) => ({
      ...prev,
      blogArticles: (prev.blogArticles || []).map((art) =>
        art.id === id ? { ...art, ...updatedFields } : art
      )
    }));
    showToast('Article updated successfully.');
  };

  const deleteBlogArticle = (id) => {
    setCmsData((prev) => ({
      ...prev,
      blogArticles: (prev.blogArticles || []).filter((art) => art.id !== id)
    }));
    showToast('Article deleted from blog.');
  };

  const resetToFactoryDefaults = () => {
    const resetData = {
      siteConfig: defaultData.siteConfig,
      heroSlides: defaultData.heroSlides,
      disciplines: defaultData.disciplines,
      servicePillars: defaultData.servicePillars,
      capabilities: defaultData.capabilities,
      projectTypologies: defaultData.projectTypologies,
      deliveryWorkflow: defaultData.deliveryWorkflow,
      designMatrix: defaultData.designMatrix,
      operationalStandards: defaultData.operationalStandards,
      technicalDeliverables: defaultData.technicalDeliverables,
      whyUsItems: defaultData.whyUsItems,
      testimonials: defaultData.testimonials,
      inquiries: defaultInquiries,
      admins: defaultAdmins,
      projectsGallery: defaultData.projectsGallery,
      technicalBlueprints: defaultData.technicalBlueprints,
      estimatorConfig: defaultData.estimatorConfig,
      blogArticles: defaultData.blogArticles
    };
    setCmsData(resetData);
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(resetData));
    showToast('CMS reset to initial factory brochure defaults.');
  };

  const exportBackupJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cmsData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `buildscape_cms_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('CMS backup JSON exported successfully.');
  };

  const importBackupJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.siteConfig && parsed.heroSlides) {
        setCmsData(parsed);
        showToast('CMS backup imported and restored successfully!');
        return { success: true };
      } else {
        return { success: false, error: 'Invalid backup file structure.' };
      }
    } catch (err) {
      return { success: false, error: 'Failed to parse JSON file: ' + err.message };
    }
  };

  return (
    <CmsContext.Provider
      value={{
        cmsData,
        isAdminAuth,
        currentAdmin,
        isAdminModalOpen,
        toastMessage,
        loginAdmin,
        logoutAdmin,
        openAdminDashboard,
        closeAdminDashboard,
        addSubAdmin,
        updateSubAdmin,
        deleteSubAdmin,
        addProject,
        updateProject,
        deleteProject,
        updateSiteConfig,
        setHeroSlides,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        updateServicePillars,
        updateCapabilities,
        updateProjectTypologies,
        updateDeliveryWorkflow,
        setTestimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addBlogArticle,
        updateBlogArticle,
        deleteBlogArticle,
        data: cmsData,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        resetToFactoryDefaults,
        exportBackupJson,
        importBackupJson,
        showToast
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};

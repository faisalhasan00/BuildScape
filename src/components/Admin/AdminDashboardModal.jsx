import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { AdminLogin } from './AdminLogin';
import { OverviewTab } from './Tabs/OverviewTab';
import { ProfileTab } from './Tabs/ProfileTab';
import { HeroTab } from './Tabs/HeroTab';
import { PillarsTab } from './Tabs/PillarsTab';
import { TypologiesTab } from './Tabs/TypologiesTab';
import { WorkflowTab } from './Tabs/WorkflowTab';
import { ProjectsTab } from './Tabs/ProjectsTab';
import { TestimonialsTab } from './Tabs/TestimonialsTab';
import { InquiriesTab } from './Tabs/InquiriesTab';
import { AdminsTab } from './Tabs/AdminsTab';
import { SettingsTab } from './Tabs/SettingsTab';
import { 
  LayoutDashboard,
  Building, 
  Image as ImageIcon, 
  Layers, 
  Home, 
  GitCommit, 
  Star, 
  Mail, 
  Users, 
  Settings, 
  LogOut, 
  X, 
  ExternalLink,
  Shield,
  CheckCircle2,
  Menu,
  Bell,
  Search,
  FolderKanban
} from 'lucide-react';
import { Logo } from '../Navbar/Logo';

export const AdminDashboardModal = () => {
  const { isAdminAuth, currentAdmin, isAdminModalOpen, closeAdminDashboard, logoutAdmin, cmsData, toastMessage } = useCms();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (!isAdminModalOpen) return null;

  const adminsList = cmsData.admins || [];
  const inquiriesList = cmsData.inquiries || [];
  const galleryItems = (cmsData.projectsGallery && cmsData.projectsGallery.items) || [];
  const newInquiries = inquiriesList.filter((i) => i.status === 'New').length;

  const tabTitles = {
    overview: 'Executive Analytics & KPI Overview',
    projects: 'Projects & Portfolio Showcase CMS',
    profile: 'Company Profile & Official Statements',
    hero: 'Hero Carousel Showcase Slides',
    pillars: 'Core Integrated Solution Pillars',
    typologies: 'Project Typologies & Sectors',
    workflow: '6-Stage Delivery Framework',
    testimonials: 'Client Reviews & Endorsements',
    inquiries: 'Consultation Leads Inbox',
    admins: 'Team & Sub-Admin Accounts',
    settings: 'CMS System Backup & Settings'
  };

  return (
    <div className="admin-modal-backdrop standalone-admin-view">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className={`admin-toast-banner ${toastMessage.type}`}>
          <CheckCircle2 size={18} />
          <span>{toastMessage.text}</span>
        </div>
      )}

      <div className="admin-modal-window standalone-window">
        {!isAdminAuth ? (
          <AdminLogin onClose={closeAdminDashboard} />
        ) : (
          <div className="admin-dashboard-layout">
            {/* Executive Sidebar */}
            <aside className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
              <div className="admin-sidebar-brand">
                <Logo variant="light" height={isSidebarCollapsed ? 32 : 42} />
                {!isSidebarCollapsed && <span className="admin-pill">ADMIN CONSOLE</span>}
              </div>

              <div className="admin-user-info">
                <div className="admin-user-avatar">
                  <Shield size={16} />
                </div>
                {!isSidebarCollapsed && (
                  <div className="admin-user-text">
                    <div className="admin-user-name">{(currentAdmin && currentAdmin.name) || 'Mohammad Khaja Osman'}</div>
                    <div className="admin-user-role">{(currentAdmin && currentAdmin.role) || 'Super Administrator'}</div>
                  </div>
                )}
              </div>

              <nav className="admin-nav-menu">
                <button
                  className={`admin-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                  title="Overview"
                >
                  <LayoutDashboard size={17} />
                  {!isSidebarCollapsed && <span>Dashboard Overview</span>}
                </button>

                <button
                  className={`admin-nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
                  onClick={() => setActiveTab('projects')}
                  title="Projects Gallery"
                >
                  <FolderKanban size={17} />
                  {!isSidebarCollapsed && <span>Projects Portfolio</span>}
                  {!isSidebarCollapsed && <span className="nav-badge text-gold">{galleryItems.length}</span>}
                </button>

                <button
                  className={`admin-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                  title="Company Profile"
                >
                  <Building size={17} />
                  {!isSidebarCollapsed && <span>Company Profile</span>}
                </button>

                <button
                  className={`admin-nav-btn ${activeTab === 'hero' ? 'active' : ''}`}
                  onClick={() => setActiveTab('hero')}
                  title="Hero Carousel"
                >
                  <ImageIcon size={17} />
                  {!isSidebarCollapsed && <span>Hero Carousel</span>}
                  {!isSidebarCollapsed && <span className="nav-badge">{cmsData.heroSlides ? cmsData.heroSlides.length : 0}</span>}
                </button>

                <button
                  className={`admin-nav-btn ${activeTab === 'pillars' ? 'active' : ''}`}
                  onClick={() => setActiveTab('pillars')}
                  title="Core Pillars"
                >
                  <Layers size={17} />
                  {!isSidebarCollapsed && <span>Core Pillars</span>}
                  {!isSidebarCollapsed && <span className="nav-badge">{cmsData.servicePillars ? cmsData.servicePillars.length : 0}</span>}
                </button>

                <button
                  className={`admin-nav-btn ${activeTab === 'typologies' ? 'active' : ''}`}
                  onClick={() => setActiveTab('typologies')}
                  title="Project Typologies"
                >
                  <Home size={17} />
                  {!isSidebarCollapsed && <span>Project Typologies</span>}
                </button>

                <button
                  className={`admin-nav-btn ${activeTab === 'workflow' ? 'active' : ''}`}
                  onClick={() => setActiveTab('workflow')}
                  title="Delivery Workflow"
                >
                  <GitCommit size={17} />
                  {!isSidebarCollapsed && <span>6-Stage Workflow</span>}
                </button>

                <button
                  className={`admin-nav-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
                  onClick={() => setActiveTab('testimonials')}
                  title="Testimonials"
                >
                  <Star size={17} />
                  {!isSidebarCollapsed && <span>Testimonials</span>}
                  {!isSidebarCollapsed && <span className="nav-badge">{cmsData.testimonials ? cmsData.testimonials.length : 0}</span>}
                </button>

                <button
                  className={`admin-nav-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
                  onClick={() => setActiveTab('inquiries')}
                  title="Leads Inbox"
                >
                  <Mail size={17} />
                  {!isSidebarCollapsed && <span>Leads Inbox</span>}
                  {newInquiries > 0 && (
                    <span className="nav-badge-alert">
                      {newInquiries} New
                    </span>
                  )}
                </button>

                <button
                  className={`admin-nav-btn ${activeTab === 'admins' ? 'active' : ''}`}
                  onClick={() => setActiveTab('admins')}
                  title="Team & Sub-Admins"
                >
                  <Users size={17} />
                  {!isSidebarCollapsed && <span>Team & Sub-Admins</span>}
                  {!isSidebarCollapsed && <span className="nav-badge">{adminsList.length}</span>}
                </button>

                <button
                  className={`admin-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                  title="Backup & Settings"
                >
                  <Settings size={17} />
                  {!isSidebarCollapsed && <span>Backup & Settings</span>}
                </button>
              </nav>

              <div className="admin-sidebar-footer">
                <button className="admin-nav-btn text-danger w-100" onClick={logoutAdmin}>
                  <LogOut size={16} />
                  {!isSidebarCollapsed && <span>Sign Out</span>}
                </button>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="admin-main-viewport">
              <header className="admin-topbar">
                <div className="d-flex align-items-center gap-3">
                  <button
                    className="admin-toggle-sidebar-btn"
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    title="Toggle Sidebar"
                  >
                    <Menu size={18} />
                  </button>

                  <div className="admin-topbar-breadcrumb">
                    <span className="breadcrumb-root">Admin Portal</span>
                    <span className="breadcrumb-sep">/</span>
                    <strong className="breadcrumb-active">{tabTitles[activeTab] || 'Dashboard'}</strong>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="admin-status-pill d-none d-md-flex align-items-center gap-2">
                    <span className="status-indicator-dot"></span>
                    <span>Live CMS Connected</span>
                  </div>

                  <button
                    className="admin-preview-btn"
                    onClick={closeAdminDashboard}
                    title="Switch to Public Website View"
                  >
                    <ExternalLink size={14} />
                    <span>View Public Website</span>
                  </button>

                  <button className="admin-close-modal-btn" onClick={closeAdminDashboard} aria-label="Close Admin Dashboard">
                    <X size={20} />
                  </button>
                </div>
              </header>

              <div className="admin-body-content">
                {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab} />}
                {activeTab === 'projects' && <ProjectsTab />}
                {activeTab === 'profile' && <ProfileTab />}
                {activeTab === 'hero' && <HeroTab />}
                {activeTab === 'pillars' && <PillarsTab />}
                {activeTab === 'typologies' && <TypologiesTab />}
                {activeTab === 'workflow' && <WorkflowTab />}
                {activeTab === 'testimonials' && <TestimonialsTab />}
                {activeTab === 'inquiries' && <InquiriesTab />}
                {activeTab === 'admins' && <AdminsTab />}
                {activeTab === 'settings' && <SettingsTab />}
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

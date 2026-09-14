import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingActions } from './components/common/FloatingActions';
import { InquiryModal } from './components/common/InquiryModal';
import { ToastContainer } from './components/common/ToastContainer';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AMCPage } from './pages/AMCPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPages } from './pages/LegalPages';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';

function MainApp() {
  const { adminSession } = useApp();
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Sync hash routing for shareable URLs and browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentTab(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminRoute = currentTab === 'admin' || currentTab.startsWith('admin-');

  // Render proper view based on current tab
  const renderContent = () => {
    // Admin Route
    if (isAdminRoute) {
      if (adminSession) {
        return <AdminLayout setCurrentTab={handleTabChange} />;
      }
      return (
        <div className="py-12 max-w-7xl mx-auto px-4">
          <AdminLogin
            onSuccess={() => handleTabChange('admin')}
            onCancel={() => handleTabChange('home')}
          />
        </div>
      );
    }

    // Product Detail Route (e.g. product-cctv-1)
    if (currentTab.startsWith('product-')) {
      const productId = currentTab.replace('product-', '');
      return <ProductDetailPage productId={productId} setCurrentTab={handleTabChange} />;
    }

    // Category Filter Route (e.g. category-cat-1)
    if (currentTab.startsWith('category-')) {
      const categorySlug = currentTab.replace('category-', '');
      return <ProductsPage setCurrentTab={handleTabChange} selectedCategorySlug={categorySlug} />;
    }

    // Standard Routes
    switch (currentTab) {
      case 'home':
        return <HomePage setCurrentTab={handleTabChange} />;
      case 'about':
        return <AboutPage setCurrentTab={handleTabChange} />;
      case 'products':
        return <ProductsPage setCurrentTab={handleTabChange} />;
      case 'services':
        return <ServicesPage setCurrentTab={handleTabChange} />;
      case 'solutions':
        return <SolutionsPage setCurrentTab={handleTabChange} />;
      case 'projects':
        return <ProjectsPage setCurrentTab={handleTabChange} />;
      case 'amc':
        return <AMCPage setCurrentTab={handleTabChange} />;
      case 'contact':
        return <ContactPage />;
      case 'privacy-policy':
        return <LegalPages page="privacy-policy" setCurrentTab={handleTabChange} />;
      case 'terms':
        return <LegalPages page="terms" setCurrentTab={handleTabChange} />;
      case 'disclaimer':
        return <LegalPages page="disclaimer" setCurrentTab={handleTabChange} />;
      default:
        return <HomePage setCurrentTab={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030b1c] text-slate-200 flex flex-col selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Show header on public pages */}
      {!isAdminRoute && (
        <Header
          currentTab={currentTab}
          setCurrentTab={handleTabChange}
        />
      )}

      {/* Main Page Canvas */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Show footer on public pages */}
      {!isAdminRoute && (
        <Footer
          setCurrentTab={handleTabChange}
        />
      )}

      {/* Floating Action buttons (WhatsApp, Call, Scroll to top) */}
      {!isAdminRoute && (
        <FloatingActions />
      )}

      {/* Online Inquiry Modal */}
      <InquiryModal />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

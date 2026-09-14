import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Product,
  Category,
  ServiceItem,
  ProjectItem,
  AMCPlan,
  SiteSettings,
  Inquiry,
  UserSession
} from '../types';
import * as dataService from '../services/dataService';
import { INITIAL_SETTINGS } from '../data/initialData';

interface ToastInfo {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface InquiryModalState {
  isOpen: boolean;
  prefillName: string;
  prefillType: string;
  prefillId?: string;
}

interface AppContextType {
  settings: SiteSettings;
  categories: Category[];
  products: Product[];
  services: ServiceItem[];
  projects: ProjectItem[];
  amcPlans: AMCPlan[];
  inquiries: Inquiry[];
  adminSession: UserSession | null;
  isLoading: boolean;
  inquiryModalState: InquiryModalState;
  toasts: ToastInfo[];
  
  // Actions
  refreshData: () => Promise<void>;
  reloadAllData: () => Promise<void>;
  updateSettings: (newSettings: SiteSettings) => Promise<void>;
  saveSettings: (newSettings: SiteSettings) => Promise<void>;
  openInquiryModal: (prefill?: { name?: string; type?: string; id?: string }) => void;
  closeInquiryModal: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  setAdminSession: (session: UserSession | null) => void;
  logoutAdmin: () => Promise<void>;
  getWhatsAppUrl: (messageText?: string) => string;
  getCallUrl: () => string;
  
  // Product actions
  saveProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  
  // Category actions
  saveCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  // Service actions
  saveService: (service: ServiceItem) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  // Project actions
  saveProject: (project: ProjectItem) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // AMC actions
  saveAMCPlan: (plan: AMCPlan) => Promise<void>;
  deleteAMCPlan: (id: string) => Promise<void>;

  // Inquiries actions
  submitNewInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateInquiryStatus: (id: string, status: Inquiry['status'], adminNotes?: string) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [amcPlans, setAmcPlans] = useState<AMCPlan[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [adminSession, setAdminSessionState] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);
  const [inquiryModalState, setInquiryModalState] = useState<InquiryModalState>({
    isOpen: false,
    prefillName: '',
    prefillType: 'General Inquiry'
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [s, cats, prods, servs, projs, amc, inqs] = await Promise.all([
        dataService.getSiteSettings(),
        dataService.getCategories(),
        dataService.getProducts(),
        dataService.getServices(),
        dataService.getProjects(),
        dataService.getAMCPlans(),
        dataService.getInquiries()
      ]);
      setSettings(s);
      setCategories(cats);
      setProducts(prods);
      setServices(servs);
      setProjects(projs);
      setAmcPlans(amc);
      setInquiries(inqs);
    } catch (err) {
      console.error('Error loading data:', err);
      showToast('Error refreshing data', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    const session = dataService.getCurrentAdminSession();
    setAdminSessionState(session);
    refreshData();
  }, [refreshData]);

  const setAdminSession = (session: UserSession | null) => {
    setAdminSessionState(session);
  };

  const logoutAdmin = async () => {
    try {
      await dataService.adminLogout();
    } catch (err) {
      console.warn('Logout warning:', err);
    }
    setAdminSessionState(null);
    showToast('Admin session logged out successfully.', 'info');
  };

  const updateSettings = async (newSettings: SiteSettings) => {
    await dataService.saveSiteSettings(newSettings);
    setSettings(newSettings);
    showToast('Settings saved successfully', 'success');
  };

  const openInquiryModal = (prefill?: { name?: string; type?: string; id?: string }) => {
    setInquiryModalState({
      isOpen: true,
      prefillName: prefill?.name || '',
      prefillType: prefill?.type || 'General Inquiry',
      prefillId: prefill?.id
    });
  };

  const closeInquiryModal = () => {
    setInquiryModalState({
      isOpen: false,
      prefillName: '',
      prefillType: 'General Inquiry'
    });
  };

  const getWhatsAppUrl = (customMessage?: string): string => {
    const phone = (settings.whatsapp || '917014391772').replace(/[^0-9]/g, '');
    const defaultMsg = `Hello ${settings.businessName}, I am visiting your website and would like to inquire about your CCTV & Networking services.`;
    const text = encodeURIComponent(customMessage || defaultMsg);
    return `https://wa.me/${phone}?text=${text}`;
  };

  const getCallUrl = (): string => {
    const cleanPhone = (settings.phone || '+917014391772').replace(/[^0-9+]/g, '');
    return `tel:${cleanPhone}`;
  };

  // Product CRUD
  const saveProduct = async (product: Product) => {
    await dataService.saveProduct(product);
    const updated = await dataService.getProducts();
    setProducts(updated);
    showToast('Product saved successfully', 'success');
  };

  const deleteProduct = async (id: string) => {
    await dataService.deleteProduct(id);
    const updated = await dataService.getProducts();
    setProducts(updated);
    showToast('Product deleted', 'info');
  };

  // Category CRUD
  const saveCategory = async (category: Category) => {
    await dataService.saveCategory(category);
    const updated = await dataService.getCategories();
    setCategories(updated);
    showToast('Category saved successfully', 'success');
  };

  const deleteCategory = async (id: string) => {
    await dataService.deleteCategory(id);
    const updated = await dataService.getCategories();
    setCategories(updated);
    showToast('Category deleted', 'info');
  };

  // Service CRUD
  const saveService = async (service: ServiceItem) => {
    await dataService.saveService(service);
    const updated = await dataService.getServices();
    setServices(updated);
    showToast('Service updated successfully', 'success');
  };

  const deleteService = async (id: string) => {
    await dataService.deleteService(id);
    const updated = await dataService.getServices();
    setServices(updated);
    showToast('Service deleted', 'info');
  };

  // Project CRUD
  const saveProject = async (project: ProjectItem) => {
    await dataService.saveProject(project);
    const updated = await dataService.getProjects();
    setProjects(updated);
    showToast('Project updated successfully', 'success');
  };

  const deleteProject = async (id: string) => {
    await dataService.deleteProject(id);
    const updated = await dataService.getProjects();
    setProjects(updated);
    showToast('Project deleted', 'info');
  };

  // AMC CRUD
  const saveAMCPlan = async (plan: AMCPlan) => {
    await dataService.saveAMCPlan(plan);
    const updated = await dataService.getAMCPlans();
    setAmcPlans(updated);
    showToast('AMC plan updated', 'success');
  };

  const deleteAMCPlan = async (id: string) => {
    await dataService.deleteAMCPlan(id);
    const updated = await dataService.getAMCPlans();
    setAmcPlans(updated);
    showToast('AMC plan deleted', 'info');
  };

  // Inquiry CRUD
  const submitNewInquiry = async (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    await dataService.submitInquiry(inquiry);
    const updated = await dataService.getInquiries();
    setInquiries(updated);
    showToast('Inquiry submitted successfully! Our team in Kota will reach out shortly.', 'success');
  };

  const updateInquiryStatus = async (id: string, status: Inquiry['status'], adminNotes?: string) => {
    await dataService.updateInquiryStatus(id, status, adminNotes);
    const updated = await dataService.getInquiries();
    setInquiries(updated);
    showToast(`Inquiry status updated to ${status}`, 'success');
  };

  const deleteInquiry = async (id: string) => {
    await dataService.deleteInquiry(id);
    const updated = await dataService.getInquiries();
    setInquiries(updated);
    showToast('Inquiry removed', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        categories,
        products,
        services,
        projects,
        amcPlans,
        inquiries,
        adminSession,
        isLoading,
        inquiryModalState,
        toasts,
        refreshData,
        reloadAllData: refreshData,
        updateSettings,
        saveSettings: updateSettings,
        openInquiryModal,
        closeInquiryModal,
        showToast,
        setAdminSession,
        logoutAdmin,
        getWhatsAppUrl,
        getCallUrl,
        saveProduct,
        deleteProduct,
        saveCategory,
        deleteCategory,
        saveService,
        deleteService,
        saveProject,
        deleteProject,
        saveAMCPlan,
        deleteAMCPlan,
        submitNewInquiry,
        updateInquiryStatus,
        deleteInquiry
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

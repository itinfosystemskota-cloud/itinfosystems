export interface Product {
  id: string;
  name: string;
  slug?: string;
  category: string;
  brand: string;
  model: string;
  sku: string;
  shortDescription: string;
  fullDescription: string;
  specifications: { key: string; value: string }[];
  features: string[];
  price?: number;
  mrp?: number;
  discountPercentage?: number;
  hidePrice?: boolean; // When true, shows "Get Best Price"
  isAvailable: boolean;
  isPublished?: boolean;
  images: string[];
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  imageUrl?: string;
  order: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug?: string;
  category: 'cctv' | 'networking' | 'it-support' | 'security';
  shortDesc: string;
  fullDesc?: string;
  iconName: string;
  features: string[];
  isPublished: boolean;
  image?: string;
  order?: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug?: string;
  location: string;
  clientType: 'Industrial / Factory' | 'Commercial / Retail' | 'Office / Corporate' | 'Residential / Villa' | 'Institutional / School';
  description: string;
  images: string[];
  camerasCount?: number;
  nvrsCount?: number;
  networkingDetails?: string;
  completionDate: string;
  featured?: boolean;
}

export interface AMCPlan {
  id: string;
  name: string;
  slug?: string;
  duration: string; // e.g. "1 Year"
  price: string; // e.g. "Starting ₹4,999/yr" or custom quote
  billingPeriod?: string;
  servicesIncluded: string[];
  responseTime: string; // e.g. "Within 4 Hours"
  visitFrequency: string; // e.g. "Quarterly Preventive (4 visits/yr) + Unlimited Breakdown"
  terms: string[];
  isPopular?: boolean;
  order?: number;
}

export interface Inquiry {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email?: string;
  location?: string;
  requirementType: 'CCTV Camera' | 'Networking / LAN / Fiber' | 'IT Support & Hardware' | 'Biometric / Access Control' | 'AMC Contract' | 'Complete Project / Quotation' | 'Other';
  productId?: string;
  productName?: string;
  message: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'closed';
  createdAt: string;
  adminNotes?: string;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  city: string;
  state: string;
  country: string;
  fullAddress: string;
  phone: string;
  alternatePhone?: string;
  whatsapp: string; // Numbers only e.g. 919829012345
  email: string;
  supportEmail: string;
  workingHours: string;
  googleMapsEmbedUrl: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
  };
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  announcementText?: string;
  showAnnouncement?: boolean;
  logoUrl?: string;
}

export interface UserSession {
  email: string;
  role: 'admin' | 'guest';
  isFirebaseUser?: boolean;
}

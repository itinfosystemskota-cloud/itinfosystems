import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, auth, storage, isFirebaseConfigured } from './firebase';
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
import {
  INITIAL_SETTINGS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_SERVICES,
  INITIAL_PROJECTS,
  INITIAL_AMC_PLANS,
  INITIAL_INQUIRIES
} from '../data/initialData';

const LOCAL_STORAGE_KEYS = {
  SETTINGS: 'itinfosystems_v3_settings',
  CATEGORIES: 'itinfosystems_v3_categories',
  PRODUCTS: 'itinfosystems_v3_products',
  SERVICES: 'itinfosystems_v3_services',
  PROJECTS: 'itinfosystems_v3_projects',
  AMC_PLANS: 'itinfosystems_v3_amc_plans',
  INQUIRIES: 'itinfosystems_v3_inquiries',
  ADMIN_SESSION: 'itinfosystems_v3_admin_session'
};

function getLocal<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`LocalStorage write error for ${key}:`, err);
  }
}

// -------------------------------------------------------------
// SITE SETTINGS
// -------------------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'settings', 'general');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as SiteSettings;
        return {
          ...INITIAL_SETTINGS,
          ...data,
          fullAddress: 'Kota, Rajasthan 324002',
          phone: data.phone?.includes('94141') ? '+91 70143 91772' : (data.phone || '+91 70143 91772'),
          whatsapp: data.whatsapp?.includes('94141') ? '917014391772' : (data.whatsapp || '917014391772'),
          email: data.email?.includes('itinfosystems.in') ? 'itinfosystems.kota@gmail.com' : (data.email || 'itinfosystems.kota@gmail.com'),
          supportEmail: data.supportEmail?.includes('itinfosystems.in') ? 'itinfosystems.kota@gmail.com' : (data.supportEmail || 'itinfosystems.kota@gmail.com')
        };
      }
    } catch (err) {
      console.warn('Firestore getSettings error, falling back to local:', err);
    }
  }

  const loaded = getLocal<SiteSettings>(LOCAL_STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  // Auto-correct any legacy data or address
  if (!loaded.phone || loaded.phone.includes('94141') || !loaded.phone.includes('70143') || loaded.fullAddress?.includes('Vardhman') || loaded.fullAddress?.includes('324007')) {
    const fixed: SiteSettings = {
      ...INITIAL_SETTINGS,
      ...loaded,
      fullAddress: 'Kota, Rajasthan 324002',
      phone: '+91 70143 91772',
      alternatePhone: '+91 70143 91772',
      whatsapp: '917014391772',
      email: 'itinfosystems.kota@gmail.com',
      supportEmail: 'itinfosystems.kota@gmail.com'
    };
    setLocal(LOCAL_STORAGE_KEYS.SETTINGS, fixed);
    return fixed;
  }
  return loaded;
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  setLocal(LOCAL_STORAGE_KEYS.SETTINGS, settings);
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'settings', 'general');
      await setDoc(docRef, settings, { merge: true });
    } catch (err) {
      console.error('Firestore saveSettings error:', err);
    }
  }
}

// -------------------------------------------------------------
// CATEGORIES
// -------------------------------------------------------------
export async function getCategories(): Promise<Category[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Category));
      }
    } catch (err) {
      console.warn('Firestore getCategories error:', err);
    }
  }
  const local = getLocal<Category[]>(LOCAL_STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  if (!local.some(c => c.id === 'cat-software')) {
    const merged = [...INITIAL_CATEGORIES, ...local.filter(c => !INITIAL_CATEGORIES.some(ic => ic.id === c.id))];
    setLocal(LOCAL_STORAGE_KEYS.CATEGORIES, merged);
    return merged.sort((a, b) => a.order - b.order);
  }
  return local.sort((a, b) => a.order - b.order);
}

export async function saveCategory(category: Category): Promise<Category> {
  const current = await getCategories();
  const existingIdx = current.findIndex(c => c.id === category.id);
  let updatedList: Category[];
  if (existingIdx >= 0) {
    updatedList = [...current];
    updatedList[existingIdx] = category;
  } else {
    updatedList = [...current, category];
  }
  setLocal(LOCAL_STORAGE_KEYS.CATEGORIES, updatedList);

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'categories', category.id), category);
    } catch (err) {
      console.error('Firestore saveCategory error:', err);
    }
  }
  return category;
}

export async function deleteCategory(id: string): Promise<void> {
  const current = await getCategories();
  const updated = current.filter(c => c.id !== id);
  setLocal(LOCAL_STORAGE_KEYS.CATEGORIES, updated);

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (err) {
      console.error('Firestore deleteCategory error:', err);
    }
  }
}

// -------------------------------------------------------------
// PRODUCTS
// -------------------------------------------------------------
export async function getProducts(): Promise<Product[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'products'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
      }
    } catch (err) {
      console.warn('Firestore getProducts error:', err);
    }
  }
  const local = getLocal<Product[]>(LOCAL_STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  if (!local.some(p => p.id === 'prod-sw-nms')) {
    const merged = [...INITIAL_PRODUCTS, ...local.filter(p => !INITIAL_PRODUCTS.some(ip => ip.id === p.id))];
    setLocal(LOCAL_STORAGE_KEYS.PRODUCTS, merged);
    return merged;
  }
  return local;
}

export async function getProductById(id: string): Promise<Product | null> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, 'products', id));
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as Product;
      }
    } catch (err) {
      console.warn('Firestore getProductById error:', err);
    }
  }
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
}

export async function saveProduct(product: Product): Promise<Product> {
  const now = new Date().toISOString();
  const prod: Product = {
    ...product,
    updatedAt: now,
    createdAt: product.createdAt || now
  };

  const current = await getProducts();
  const existingIdx = current.findIndex(p => p.id === prod.id);
  let updatedList: Product[];
  if (existingIdx >= 0) {
    updatedList = [...current];
    updatedList[existingIdx] = prod;
  } else {
    updatedList = [prod, ...current];
  }
  setLocal(LOCAL_STORAGE_KEYS.PRODUCTS, updatedList);

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'products', prod.id), prod);
    } catch (err) {
      console.error('Firestore saveProduct error:', err);
    }
  }
  return prod;
}

export async function deleteProduct(id: string): Promise<void> {
  const current = await getProducts();
  const updated = current.filter(p => p.id !== id);
  setLocal(LOCAL_STORAGE_KEYS.PRODUCTS, updated);

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      console.error('Firestore deleteProduct error:', err);
    }
  }
}

// -------------------------------------------------------------
// SERVICES
// -------------------------------------------------------------
export async function getServices(): Promise<ServiceItem[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'services'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as ServiceItem));
      }
    } catch (err) {
      console.warn('Firestore getServices error:', err);
    }
  }
  const local = getLocal<ServiceItem[]>(LOCAL_STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  if (!local.some(s => s.id === 'serv-network-monitoring')) {
    const merged = [...INITIAL_SERVICES, ...local.filter(s => !INITIAL_SERVICES.some(is => is.id === s.id))];
    setLocal(LOCAL_STORAGE_KEYS.SERVICES, merged);
    return merged;
  }
  return local;
}

export async function saveService(service: ServiceItem): Promise<ServiceItem> {
  const current = await getServices();
  const existingIdx = current.findIndex(s => s.id === service.id);
  let updatedList: ServiceItem[];
  if (existingIdx >= 0) {
    updatedList = [...current];
    updatedList[existingIdx] = service;
  } else {
    updatedList = [...current, service];
  }
  setLocal(LOCAL_STORAGE_KEYS.SERVICES, updatedList);

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'services', service.id), service);
    } catch (err) {
      console.error('Firestore saveService error:', err);
    }
  }
  return service;
}

export async function deleteService(id: string): Promise<void> {
  const current = await getServices();
  const updated = current.filter(s => s.id !== id);
  setLocal(LOCAL_STORAGE_KEYS.SERVICES, updated);

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (err) {
      console.error('Firestore deleteService error:', err);
    }
  }
}

// -------------------------------------------------------------
// PROJECTS
// -------------------------------------------------------------
export async function getProjects(): Promise<ProjectItem[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'projects'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as ProjectItem));
      }
    } catch (err) {
      console.warn('Firestore getProjects error:', err);
    }
  }
  return getLocal<ProjectItem[]>(LOCAL_STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
}

export async function saveProject(project: ProjectItem): Promise<ProjectItem> {
  const current = await getProjects();
  const existingIdx = current.findIndex(p => p.id === project.id);
  let updatedList: ProjectItem[];
  if (existingIdx >= 0) {
    updatedList = [...current];
    updatedList[existingIdx] = project;
  } else {
    updatedList = [project, ...current];
  }
  setLocal(LOCAL_STORAGE_KEYS.PROJECTS, updatedList);

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'projects', project.id), project);
    } catch (err) {
      console.error('Firestore saveProject error:', err);
    }
  }
  return project;
}

export async function deleteProject(id: string): Promise<void> {
  const current = await getProjects();
  const updated = current.filter(p => p.id !== id);
  setLocal(LOCAL_STORAGE_KEYS.PROJECTS, updated);

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (err) {
      console.error('Firestore deleteProject error:', err);
    }
  }
}

// -------------------------------------------------------------
// AMC PLANS
// -------------------------------------------------------------
export async function getAMCPlans(): Promise<AMCPlan[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'amcPlans'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as AMCPlan));
      }
    } catch (err) {
      console.warn('Firestore getAMCPlans error:', err);
    }
  }
  const local = getLocal<AMCPlan[]>(LOCAL_STORAGE_KEYS.AMC_PLANS, INITIAL_AMC_PLANS);
  if (local.some(p => p.price.includes('₹3,999') || p.price.includes('₹7,999'))) {
    setLocal(LOCAL_STORAGE_KEYS.AMC_PLANS, INITIAL_AMC_PLANS);
    return INITIAL_AMC_PLANS;
  }
  return local;
}

export async function saveAMCPlan(plan: AMCPlan): Promise<AMCPlan> {
  const current = await getAMCPlans();
  const existingIdx = current.findIndex(p => p.id === plan.id);
  let updatedList: AMCPlan[];
  if (existingIdx >= 0) {
    updatedList = [...current];
    updatedList[existingIdx] = plan;
  } else {
    updatedList = [...current, plan];
  }
  setLocal(LOCAL_STORAGE_KEYS.AMC_PLANS, updatedList);

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'amcPlans', plan.id), plan);
    } catch (err) {
      console.error('Firestore saveAMCPlan error:', err);
    }
  }
  return plan;
}

export async function deleteAMCPlan(id: string): Promise<void> {
  const current = await getAMCPlans();
  const updated = current.filter(p => p.id !== id);
  setLocal(LOCAL_STORAGE_KEYS.AMC_PLANS, updated);

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'amcPlans', id));
    } catch (err) {
      console.error('Firestore deleteAMCPlan error:', err);
    }
  }
}

// -------------------------------------------------------------
// INQUIRIES / LEADS
// -------------------------------------------------------------
export async function getInquiries(): Promise<Inquiry[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'inquiries'));
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as Inquiry));
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    } catch (err) {
      console.warn('Firestore getInquiries error:', err);
    }
  }
  const local = getLocal<Inquiry[]>(LOCAL_STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
  return local.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function submitInquiry(inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry> {
  const id = `inq-${Date.now()}`;
  const newInquiry: Inquiry = {
    ...inquiryData,
    id,
    status: 'new',
    createdAt: new Date().toISOString()
  };

  const current = await getInquiries();
  setLocal(LOCAL_STORAGE_KEYS.INQUIRIES, [newInquiry, ...current]);

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'inquiries', id), newInquiry);
    } catch (err) {
      console.error('Firestore submitInquiry error:', err);
    }
  }
  return newInquiry;
}

export async function updateInquiryStatus(id: string, status: Inquiry['status'], adminNotes?: string): Promise<void> {
  const current = await getInquiries();
  const updated = current.map(item => {
    if (item.id === id) {
      return {
        ...item,
        status,
        ...(adminNotes !== undefined ? { adminNotes } : {})
      };
    }
    return item;
  });
  setLocal(LOCAL_STORAGE_KEYS.INQUIRIES, updated);

  if (isFirebaseConfigured && db) {
    try {
      const updatePayload: Partial<Inquiry> = { status };
      if (adminNotes !== undefined) updatePayload.adminNotes = adminNotes;
      await updateDoc(doc(db, 'inquiries', id), updatePayload);
    } catch (err) {
      console.error('Firestore updateInquiry error:', err);
    }
  }
}

export async function deleteInquiry(id: string): Promise<void> {
  const current = await getInquiries();
  const updated = current.filter(i => i.id !== id);
  setLocal(LOCAL_STORAGE_KEYS.INQUIRIES, updated);

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (err) {
      console.error('Firestore deleteInquiry error:', err);
    }
  }
}

// -------------------------------------------------------------
// IMAGE UPLOAD HELPER
// -------------------------------------------------------------
export async function uploadImage(file: File, folder: string = 'uploads'): Promise<string> {
  if (isFirebaseConfigured && storage) {
    try {
      const filename = `${folder}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const storageRef = ref(storage, filename);
      const snapshot = await uploadBytesResumable(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (err) {
      console.warn('Firebase Storage upload failed, falling back to local base64:', err);
    }
  }

  // Fallback to Base64 Data URL for local preview/storage
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

// -------------------------------------------------------------
// ADMIN AUTHENTICATION
// -------------------------------------------------------------
export async function adminLogin(email: string, pass: string): Promise<UserSession> {
  const normalizedEmail = email.trim().toLowerCase();
  const isPrimaryAdmin =
    (normalizedEmail === 'itinfosystems.kota@gmail.com' || normalizedEmail === 'itinfosystems.kota') &&
    pass === 'SudhirNisha@1501';
  const isLegacyAdmin =
    (normalizedEmail === 'admin@itinfosystems.in' && pass === 'Admin@12345') ||
    (normalizedEmail === 'admin' && pass === 'admin123');

  // If Firebase is configured with Auth
  if (isFirebaseConfigured && auth) {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, pass);
      const session: UserSession = {
        email: userCred.user.email || email,
        role: 'admin',
        isFirebaseUser: true
      };
      setLocal(LOCAL_STORAGE_KEYS.ADMIN_SESSION, session);
      return session;
    } catch (err: any) {
      // If user uses configured admin credentials or Firebase auth fails
      if (isPrimaryAdmin || isLegacyAdmin) {
        const session: UserSession = {
          email: isPrimaryAdmin ? 'itinfosystems.kota@gmail.com' : 'admin@itinfosystems.in',
          role: 'admin',
          isFirebaseUser: false
        };
        setLocal(LOCAL_STORAGE_KEYS.ADMIN_SESSION, session);
        return session;
      }
      throw new Error(err.message || 'Invalid admin credentials');
    }
  }

  // Local / Built-in Admin Authentication
  if (isPrimaryAdmin) {
    const session: UserSession = {
      email: 'itinfosystems.kota@gmail.com',
      role: 'admin',
      isFirebaseUser: false
    };
    setLocal(LOCAL_STORAGE_KEYS.ADMIN_SESSION, session);
    return session;
  }

  if (isLegacyAdmin) {
    const session: UserSession = {
      email: normalizedEmail.includes('@') ? email : 'itinfosystems.kota@gmail.com',
      role: 'admin',
      isFirebaseUser: false
    };
    setLocal(LOCAL_STORAGE_KEYS.ADMIN_SESSION, session);
    return session;
  }

  throw new Error('Invalid email or password. Please check your credentials.');
}

export async function adminLogout(): Promise<void> {
  if (isFirebaseConfigured && auth) {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.warn('Firebase signOut error:', err);
    }
  }
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ADMIN_SESSION);
}

export function getCurrentAdminSession(): UserSession | null {
  return getLocal<UserSession | null>(LOCAL_STORAGE_KEYS.ADMIN_SESSION, null);
}

// -------------------------------------------------------------
// BACKUP & RESTORE / FIREBASE SYNC
// -------------------------------------------------------------
export async function syncAllToFirestore(): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured || !db) {
    return {
      success: false,
      message: 'Firebase is not yet configured. Please configure environment variables in .env file.'
    };
  }

  try {
    const settings = await getSiteSettings();
    const categories = await getCategories();
    const products = await getProducts();
    const services = await getServices();
    const projects = await getProjects();
    const amcPlans = await getAMCPlans();

    await setDoc(doc(db, 'settings', 'general'), settings);

    for (const cat of categories) {
      await setDoc(doc(db, 'categories', cat.id), cat);
    }
    for (const prod of products) {
      await setDoc(doc(db, 'products', prod.id), prod);
    }
    for (const serv of services) {
      await setDoc(doc(db, 'services', serv.id), serv);
    }
    for (const proj of projects) {
      await setDoc(doc(db, 'projects', proj.id), proj);
    }
    for (const plan of amcPlans) {
      await setDoc(doc(db, 'amcPlans', plan.id), plan);
    }

    return {
      success: true,
      message: `Successfully synchronized ${products.length} products, ${categories.length} categories, ${services.length} services, ${projects.length} projects, and AMC plans to Cloud Firestore!`
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Firestore Sync Error: ${err.message || 'Unknown error'}`
    };
  }
}

export function resetAllDataToDefault(): void {
  setLocal(LOCAL_STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  setLocal(LOCAL_STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  setLocal(LOCAL_STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  setLocal(LOCAL_STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  setLocal(LOCAL_STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  setLocal(LOCAL_STORAGE_KEYS.AMC_PLANS, INITIAL_AMC_PLANS);
  setLocal(LOCAL_STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
}

export function exportDatabaseJSON(): string {
  const data = {
    settings: getLocal(LOCAL_STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS),
    categories: getLocal(LOCAL_STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES),
    products: getLocal(LOCAL_STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS),
    services: getLocal(LOCAL_STORAGE_KEYS.SERVICES, INITIAL_SERVICES),
    projects: getLocal(LOCAL_STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS),
    amcPlans: getLocal(LOCAL_STORAGE_KEYS.AMC_PLANS, INITIAL_AMC_PLANS),
    inquiries: getLocal(LOCAL_STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES),
    exportedAt: new Date().toISOString(),
    version: '1.0.0'
  };
  return JSON.stringify(data, null, 2);
}

export function importDatabaseJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.settings) setLocal(LOCAL_STORAGE_KEYS.SETTINGS, parsed.settings);
    if (parsed.categories) setLocal(LOCAL_STORAGE_KEYS.CATEGORIES, parsed.categories);
    if (parsed.products) setLocal(LOCAL_STORAGE_KEYS.PRODUCTS, parsed.products);
    if (parsed.services) setLocal(LOCAL_STORAGE_KEYS.SERVICES, parsed.services);
    if (parsed.projects) setLocal(LOCAL_STORAGE_KEYS.PROJECTS, parsed.projects);
    if (parsed.amcPlans) setLocal(LOCAL_STORAGE_KEYS.AMC_PLANS, parsed.amcPlans);
    if (parsed.inquiries) setLocal(LOCAL_STORAGE_KEYS.INQUIRIES, parsed.inquiries);
    return true;
  } catch (err) {
    console.error('Import error:', err);
    return false;
  }
}

import React, { useState } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  Copy,
  Terminal,
  ExternalLink,
  Flame,
  Globe,
  Lock,
  Database,
  Cloud
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FirebaseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseGuideModal: React.FC<FirebaseGuideModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [activeStep, setActiveStep] = useState(1);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, 'info');
  };

  const firestoreRulesCode = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read for products, categories, services, projects, amcPlans, and site settings
    match /products/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /categories/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /services/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /projects/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /amcPlans/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /settings/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Allow public visitors to submit inquiries; only admins can read & manage
    match /inquiries/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}`;

  const storageRulesCode = `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-950 via-slate-900 to-blue-950 px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Firebase & Free Cloudflare Deployment Guide</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  Hindi + English (Hinglish)
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Complete Step-by-Step Instructions (No prior coding knowledge needed)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Navigation Bar */}
        <div className="bg-slate-950 px-6 py-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          {[
            { step: 1, label: '1. Firebase Setup' },
            { step: 2, label: '2. Enable Auth' },
            { step: 3, label: '3. Firestore DB' },
            { step: 4, label: '4. Storage' },
            { step: 5, label: '5. .env Config' },
            { step: 6, label: '6. Admin Account' },
            { step: 7, label: '7. Run Locally' },
            { step: 8, label: '8. Build' },
            { step: 9, label: '9. Cloudflare Pages' },
            { step: 10, label: '10. Custom Domain' }
          ].map(s => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                activeStep === s.step
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-300 leading-relaxed">
          {/* STEP 1: CREATE FIREBASE PROJECT */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">1</span>
                <span>Firebase Project Kaise Banayein (How to create Firebase Project)</span>
              </h3>
              <p>
                1. Sabse pehle browser me <strong>console.firebase.google.com</strong> open karein aur apne Google account se sign in karein.
              </p>
              <p>
                2. <strong>"Add Project"</strong> / "Create a Project" button par click karein.
              </p>
              <p>
                3. Project ka naam rakhein: <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">it-infosystems-kota</code>.
              </p>
              <p>
                4. Google Analytics ko enable ya disable karke <strong>"Create Project"</strong> par click karein. 15 seconds me aapka Firebase cloud project ready ho jayega!
              </p>
              <div className="bg-blue-950/60 border border-blue-800/60 p-4 rounded-xl text-blue-200">
                💡 <strong>Free Tier:</strong> Firebase ka Spark Plan (Free) monthly hazaron visitors, 50,000 document reads/day aur 5GB storage bilkul free provide karta hai. Kisi credit card ki zarurat nahi hai.
              </div>
            </div>
          )}

          {/* STEP 2: ENABLE AUTHENTICATION */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">2</span>
                <span>Firebase Authentication Enable Karna (Enable Email/Password Login)</span>
              </h3>
              <p>
                1. Firebase Console ke left sidebar menu me <strong>"Authentication"</strong> (Build Section) par click karein.
              </p>
              <p>
                2. <strong>"Get Started"</strong> button dabayein.
              </p>
              <p>
                3. <strong>"Sign-in method"</strong> tab me jaakar <strong>"Email/Password"</strong> ko choose karein.
              </p>
              <p>
                4. Toggle button ko <strong>Enable</strong> karein aur <strong>Save</strong> par click karein.
              </p>
              <p>
                Ab aapka website secure Firebase login ke liye ready hai!
              </p>
            </div>
          )}

          {/* STEP 3: CREATE FIRESTORE DATABASE */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">3</span>
                <span>Cloud Firestore Database & Security Rules Setup</span>
              </h3>
              <p>
                1. Left menu me <strong>"Firestore Database"</strong> par click karein aur <strong>"Create Database"</strong> par click karein.
              </p>
              <p>
                2. Database Location me <strong>asia-south1 (Mumbai)</strong> ya koi bhi preferred region select karein.
              </p>
              <p>
                3. <strong>"Start in test mode"</strong> ya <strong>"Start in production mode"</strong> select karke Done karein.
              </p>
              <p>
                4. Database banne ke baad <strong>"Rules"</strong> tab me jayein aur niche diya gaya rule paste karein:
              </p>

              <div className="relative bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px]">
                <button
                  onClick={() => copyToClipboard(firestoreRulesCode, 'Firestore Rules')}
                  className="absolute top-3 right-3 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-[10px] flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Rules</span>
                </button>
                <pre className="text-blue-300 overflow-x-auto whitespace-pre">{firestoreRulesCode}</pre>
              </div>

              <p>
                5. <strong>"Publish"</strong> button par click karein. Ab aapka database securely configure ho gaya hai!
              </p>
            </div>
          )}

          {/* STEP 4: ENABLE STORAGE */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">4</span>
                <span>Firebase Storage Enable Karna (Product & Project Photos)</span>
              </h3>
              <p>
                1. Left menu me <strong>"Storage"</strong> par click karein aur <strong>"Get Started"</strong> par click karein.
              </p>
              <p>
                2. Region confirm karein aur <strong>"Done"</strong> dabayein.
              </p>
              <p>
                3. <strong>"Rules"</strong> tab me jayein aur niche diya gaya storage rule paste karein:
              </p>

              <div className="relative bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px]">
                <button
                  onClick={() => copyToClipboard(storageRulesCode, 'Storage Rules')}
                  className="absolute top-3 right-3 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-[10px] flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Storage Rules</span>
                </button>
                <pre className="text-emerald-300 overflow-x-auto whitespace-pre">{storageRulesCode}</pre>
              </div>

              <p>
                4. <strong>"Publish"</strong> par click karein. Ab aap admin panel se direct product photos upload kar sakte hain!
              </p>
            </div>
          )}

          {/* STEP 5: ENV CONFIG */}
          {activeStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">5</span>
                <span>Firebase API Keys Kahan Se Nikalein (.env setup)</span>
              </h3>
              <p>
                1. Firebase Console me top-left corner me <strong>Project Settings (Gear icon ⚙️)</strong> par click karein.
              </p>
              <p>
                2. <strong>"General"</strong> tab me scroll karke niche <strong>"Your apps"</strong> section me jayein aur <strong>Web icon (&lt;/&gt;)</strong> par click karein.
              </p>
              <p>
                3. App Nickname rakhein: <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">IT-Infosystems-Web</code> aur Register app par click karein.
              </p>
              <p>
                4. Wahan aapko <strong>firebaseConfig</strong> object dikhega jisme aapki API keys hongi.
              </p>
              <p>
                5. Apne project root folder me <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">.env</code> file banayein ya edit karein:
              </p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-amber-300 space-y-1">
                <p>VITE_FIREBASE_API_KEY="AIzaSy..."</p>
                <p>VITE_FIREBASE_AUTH_DOMAIN="it-infosystems-kota.firebaseapp.com"</p>
                <p>VITE_FIREBASE_PROJECT_ID="it-infosystems-kota"</p>
                <p>VITE_FIREBASE_STORAGE_BUCKET="it-infosystems-kota.appspot.com"</p>
                <p>VITE_FIREBASE_MESSAGING_SENDER_ID="123456789012"</p>
                <p>VITE_FIREBASE_APP_ID="1:123456789012:web:abcdef123456"</p>
              </div>
            </div>
          )}

          {/* STEP 6: CREATE FIRST ADMIN ACCOUNT */}
          {activeStep === 6 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">6</span>
                <span>Pehla Admin Account Kaise Banayein (Create Admin User)</span>
              </h3>
              <p>
                1. Firebase Console ke <strong>Authentication -&gt; Users</strong> tab me jayein.
              </p>
              <p>
                2. <strong>"Add User"</strong> button par click karein.
              </p>
              <p>
                3. Email daliye: <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">itinfosystems.kota@gmail.com</code>.
              </p>
              <p>
                4. Password set karein: <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">SudhirNisha@1501</code> aur <strong>"Add User"</strong> par click karein.
              </p>
              <div className="bg-emerald-950/60 border border-emerald-800/60 p-4 rounded-xl text-emerald-200">
                ✅ <strong>Instant Admin Login:</strong> Agar aapne abhi tak Firebase Auth connect nahi kiya hai, to bhi aap website par direct email: <strong>itinfosystems.kota@gmail.com</strong> aur password: <strong>SudhirNisha@1501</strong> se instantly login karke sabhi products aur settings manage kar sakte hain!
              </div>
            </div>
          )}

          {/* STEP 7: RUN LOCALLY */}
          {activeStep === 7 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">7</span>
                <span>Local Computer Par Website Run Karna</span>
              </h3>
              <p>Apne computer me terminal ya command prompt kholein aur ye command run karein:</p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[12px] text-emerald-300 space-y-1">
                <p># Dependencies install karne ke liye:</p>
                <p>npm install</p>
                <br />
                <p># Development server start karne ke liye:</p>
                <p>npm run dev</p>
              </div>
              <p>Browser me <strong>http://localhost:3000</strong> open karein!</p>
            </div>
          )}

          {/* STEP 8: BUILD PRODUCTION VERSION */}
          {activeStep === 8 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">8</span>
                <span>Production Build Generate Karna</span>
              </h3>
              <p>Production ke liye fast, minified files generate karne ke liye ye command chalayein:</p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[12px] text-emerald-300">
                <p>npm run build</p>
              </div>
              <p>
                Ye command aapke project root folder me <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">dist/</code> directory generate karega. Is <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">dist/</code> folder me sari website hosting ke liye ready hoti hai!
              </p>
            </div>
          )}

          {/* STEP 9: CLOUDFLARE PAGES DEPLOY */}
          {activeStep === 9 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">9</span>
                <span>Cloudflare Pages Par 100% Free Live Deploy Kaise Karein</span>
              </h3>
              <p>
                Cloudflare Pages free hosting deta hai with unlimited bandwidth and free SSL (HTTPS):
              </p>
              <p>
                1. <strong>dash.cloudflare.com</strong> par account banayein (Free).
              </p>
              <p>
                2. Left menu me <strong>"Compute & Pages"</strong> ya <strong>"Workers & Pages"</strong> par click karein -&gt; <strong>Create Application</strong> -&gt; <strong>Pages</strong>.
              </p>
              <p>
                3. <strong>Option A (Direct Drag & Drop):</strong> <strong>"Upload assets"</strong> select karein, apne project ka naam likhein aur apne computer ke <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">dist/</code> folder ko drag & drop kar dein!
              </p>
              <p>
                4. <strong>Option B (GitHub auto deploy):</strong> "Connect to Git" choose karein, repo select karein, build command me <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">npm run build</code> aur build output directory me <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">dist</code> daliye. Environment variables me apni Firebase keys add karke Deploy dabayein.
              </p>
              <p>
                30 seconds me aapki website live URL par chal jayegi! (e.g. <code className="bg-slate-800 px-2 py-0.5 rounded text-emerald-300">it-infosystems.pages.dev</code>)
              </p>
            </div>
          )}

          {/* STEP 10: CONNECT CUSTOM DOMAIN */}
          {activeStep === 10 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">10</span>
                <span>Custom Domain Kaise Connect Karein (e.g. www.itinfosystems.in)</span>
              </h3>
              <p>
                1. Cloudflare Pages project ke <strong>"Custom domains"</strong> tab me jayein.
              </p>
              <p>
                2. <strong>"Set up a custom domain"</strong> button par click karein.
              </p>
              <p>
                3. Apna domain enter karein (jaise <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">www.itinfosystems.in</code>).
              </p>
              <p>
                4. Agar aapne domain GoDaddy/Namecheap se kharida hai to unke DNS records me Cloudflare dwara bataya gaya <strong>CNAME record</strong> add karein.
              </p>
              <p>
                5. Cloudflare automatically 5 minutes ke andar Free Lifetime SSL (Green Padlock 🔒) activate kar dega!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 border-t border-slate-800 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
              disabled={activeStep === 1}
              className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs disabled:opacity-40"
            >
              ← Previous Step
            </button>
            <button
              onClick={() => setActiveStep(prev => Math.min(10, prev + 1))}
              disabled={activeStep === 10}
              className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs disabled:opacity-40"
            >
              Next Step →
            </button>
          </div>

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

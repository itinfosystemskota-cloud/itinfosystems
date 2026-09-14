import { Product, Category, ServiceItem, ProjectItem, AMCPlan, SiteSettings, Inquiry } from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  businessName: 'IT-INFOSYSTEMS',
  tagline: 'CCTV • Networking • IT Infrastructure • Security Solutions',
  city: 'Kota',
  state: 'Rajasthan',
  country: 'India',
  fullAddress: 'Kota, Rajasthan 324002',
  phone: '+91 70143 91772',
  alternatePhone: '+91 70143 91772',
  whatsapp: '917014391772',
  email: 'itinfosystems.kota@gmail.com',
  supportEmail: 'itinfosystems.kota@gmail.com',
  workingHours: 'Monday - Saturday: 9:30 AM - 8:00 PM (Sunday On-Call)',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115664.83688537617!2d75.76632488812678!3d25.176043135965415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f9b30c410efb5%3A0x861005797543cfac!2sKota%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  socialLinks: {
    facebook: 'https://facebook.com/itinfosystems.kota',
    instagram: 'https://instagram.com/itinfosystems.kota',
    linkedin: 'https://linkedin.com/company/itinfosystems',
    youtube: 'https://youtube.com',
    twitter: 'https://twitter.com'
  },
  heroTitle: 'Complete CCTV, Networking & Security Solutions',
  heroSubtitle: 'Professional surveillance, fiber optic networking, server infrastructure and biometric security solutions for homes, offices, factories and enterprises in Kota & across Rajasthan.',
  metaTitle: 'IT-INFOSYSTEMS | CCTV, Networking & Security Solutions in Kota, Rajasthan',
  metaDescription: 'IT-INFOSYSTEMS provides professional CCTV camera installation, fiber networking, IT infrastructure, server setup, biometric attendance and security solutions in Kota, Rajasthan.',
  announcementText: '⚡ Now providing High-Speed Fiber Optic Splicing & Enterprise Network Rack Cabling in Kota & Hadoti Region!',
  showAnnouncement: true,
  logoUrl: ''
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-software',
    name: 'IT & Network Software',
    slug: 'it-network-software',
    description: 'Live network monitoring NMS, centralized CCTV VMS, biometric cloud payroll, UTM firewall and automated backup software.',
    iconName: 'Monitor',
    order: 1,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-surveillance',
    name: 'CCTV & Video Surveillance',
    slug: 'cctv-surveillance',
    description: '4K ColorVu IP cameras, bullet/dome cameras, NVR/DVR multi-channel systems and 24/7 surveillance hard drives.',
    iconName: 'Camera',
    order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-networking',
    name: 'Networking & Switching',
    slug: 'networking-switching',
    description: 'Gigabit PoE switches, enterprise Wi-Fi 6 access points, routers, server racks and Cat6 pure copper cabling.',
    iconName: 'Cpu',
    order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-fiber',
    name: 'Fiber Optic Solutions',
    slug: 'fiber-optic-solutions',
    description: 'Single-mode & armored fiber cables, media converters, patch panels (LIU), SFP modules and fusion splicing.',
    iconName: 'Cable',
    order: 4,
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-biometric',
    name: 'Biometrics & Access Control',
    slug: 'biometrics-access-control',
    description: 'Contactless face recognition, fingerprint attendance devices, electromagnetic door locks and RFID access systems.',
    iconName: 'Fingerprint',
    order: 5,
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-intercom',
    name: 'Video Door Phones & Intercom',
    slug: 'video-door-phones',
    description: 'Smart 7-inch touch video intercoms with remote smartphone unlock, multi-apartment systems and HD night door stations.',
    iconName: 'ShieldCheck',
    order: 6,
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-sw-nms',
    name: 'Live Network Monitoring & Topology NMS Software',
    category: 'IT & Network Software',
    brand: 'IT-INFOSYSTEMS Enterprise',
    model: 'NMS-PRO-2026',
    sku: 'SW-NMS-LIVE-MONITOR',
    shortDescription: 'Real-time bandwidth utilization, switch port SNMP tracking, ping latency graphs, downtime alarms and visual topology map.',
    fullDescription: 'Comprehensive Network Management System (NMS) providing 24/7 real-time monitoring of all switches, routers, access points, servers, and IP cameras across single or multi-branch architectures. Features automated WhatsApp/SMS/Email notifications the instant any device or fiber link goes down.',
    specifications: [
      { key: 'Protocols Supported', value: 'SNMP v1/v2c/v3, ICMP Ping, WMI, SSH, NetFlow, Syslog' },
      { key: 'Live Visualization', value: 'Auto-Discovered Layer-2/Layer-3 Visual Network Topology Map' },
      { key: 'Alert Channels', value: 'Instant WhatsApp Alerts, Telegram Bot, SMS Gateway & Email' },
      { key: 'Metrics Tracked', value: 'Port Traffic (In/Out Mbps), Packet Drop %, CPU/RAM Usage, Uptime SLA' },
      { key: 'Deployment Options', value: 'On-Premise Windows/Linux VM or Private Cloud Container' },
      { key: 'Reporting', value: 'Automated Daily/Monthly PDF Uptime & Bandwidth Bottleneck Reports' }
    ],
    features: [
      'Live dynamic color-coded topology graph (Green: Healthy, Yellow: Warning, Red: Down)',
      'Instant breakdown alert sent to IT engineer before clients notice downtime',
      'Port-level traffic bandwidth analysis to detect internet choke points and unauthorized downloads',
      'CCTV IP camera offline detector with camera image preview diagnostic',
      'Multi-site central dashboard for coaching institutes, factories and hotel chains'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['Network Monitoring', 'NMS', 'SNMP', 'Live Topology', 'Software'],
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-20T10:00:00Z'
  },
  {
    id: 'prod-sw-vms',
    name: 'Centralized VMS & AI Video Analytics Management Software',
    category: 'IT & Network Software',
    brand: 'Enterprise VMS Suite',
    model: 'VMS-ENTERPRISE-AI',
    sku: 'SW-VMS-CENTRAL-AI',
    shortDescription: 'Multi-location CCTV aggregation, ANPR automatic number plate recognition, face recognition database, and live video wall control.',
    fullDescription: 'Enterprise Video Management Software (VMS) engineered for centralizing hundreds of CCTV cameras from multiple branch offices, factories, retail outlets, or school campuses into a single centralized command center screen. Built-in AI analytics for perimeter intrusion, loitering, headcount and heatmaps.',
    specifications: [
      { key: 'Camera Capacity', value: 'Supports 16 to 10,000+ IP Cameras and NVRs' },
      { key: 'AI Analytics', value: 'ANPR (Number Plates), Facial Recognition, Line Crossing, Crowd Density' },
      { key: 'Video Wall', value: 'Multi-Monitor Matrix layout with automated camera tour sequences' },
      { key: 'Storage Integration', value: 'Centralized NAS, SAN storage backup, and encrypted Cloud archiving' },
      { key: 'Mobile Access', value: 'Dedicated iOS/Android app with sub-stream bandwidth optimization' },
      { key: 'Audit & Compliance', value: 'Full operator log, watermarking, tamper protection, and compliance' }
    ],
    features: [
      'Unified single screen for viewing cameras from Kota, Jaipur, and regional branches',
      'Automatic vehicle number plate logging for society and factory entry gates',
      'VIP & Blacklist facial recognition instant popup alerts in security room',
      'Smart forensic search: Find a specific person or vehicle across 30 days in seconds',
      'E-Map integration: Pin cameras on building floor plans for 1-click view'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['VMS', 'Video Management', 'AI Analytics', 'Video Wall', 'Software'],
    createdAt: '2026-02-02T11:00:00Z',
    updatedAt: '2026-02-20T10:00:00Z'
  },
  {
    id: 'prod-sw-bio',
    name: 'Cloud Biometric Attendance, Geofencing & Payroll HR Software',
    category: 'IT & Network Software',
    brand: 'Cloud HR Suite',
    model: 'BIOTIME-CLOUD-HR',
    sku: 'SW-BIO-ATTEND-PAYROLL',
    shortDescription: 'Multi-branch biometric sync, mobile selfie punch-in with GPS geofencing, shift roster, leave management and salary slip generation.',
    fullDescription: 'Comprehensive Web & Cloud-based Time-Attendance and Payroll Management suite that seamlessly connects face recognition machines, fingerprint devices, and mobile smartphones. Automatically calculates late marks, overtime, shift rotations, PF/ESI deductions, and exports bank payment files.',
    specifications: [
      { key: 'Device Compatibility', value: 'Multi-brand Face recognition & Fingerprint Biometric Devices' },
      { key: 'Mobile App', value: 'Employee self-service app with GPS geofencing & selfie verification' },
      { key: 'Shift Scheduling', value: 'Multi-shift, rotational shifts, auto-shift detection, night shifts' },
      { key: 'Payroll Engine', value: '1-Click salary generation with PF, ESI, TDS, allowances & advances' },
      { key: 'Integration', value: 'Direct sync with Tally ERP, SAP, Excel & WhatsApp pay slips' },
      { key: 'Cloud Architecture', value: 'Real-time biometric push data with zero data loss during internet outage' }
    ],
    features: [
      'Real-time punch sync from all factory gates and branches to cloud dashboard',
      'GPS Geofenced mobile punch for on-field sales and marketing staff',
      'Automated daily attendance summary sent to management on WhatsApp at 10:30 AM',
      'Employee leave application, approval workflow, and holiday calendar',
      'Custom salary slip PDF generation and direct email dispatch to staff'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['Biometric Software', 'Payroll Software', 'Attendance', 'Geo-fencing', 'HR Suite'],
    createdAt: '2026-02-03T09:00:00Z',
    updatedAt: '2026-02-20T10:00:00Z'
  },
  {
    id: 'prod-sw-utm',
    name: 'Next-Gen UTM Gateway Firewall & Endpoint Cyber Security Suite',
    category: 'IT & Network Software',
    brand: 'Cyber Security Suite',
    model: 'XGS-CYBER-SEC-2026',
    sku: 'SW-UTM-FIREWALL-SEC',
    shortDescription: 'Enterprise gateway firewall, site-to-site IPsec VPN, web content filter, bandwidth throttling and anti-ransomware protection.',
    fullDescription: 'Complete cyber security management software and UTM firewall licenses providing deep packet inspection, web content filtering (blocking unproductive websites, gaming & social media during office hours), secure encrypted VPN for remote staff, and synchronized endpoint virus protection.',
    specifications: [
      { key: 'Firewall Throughput', value: 'Deep Packet Inspection (DPI) & TLS 1.3 Decryption' },
      { key: 'Security Modules', value: 'Gateway Antivirus, Intrusion Prevention (IPS), Anti-Bot, Anti-Spam' },
      { key: 'VPN Capabilities', value: 'Site-to-Site IPsec VPN + SSL Client VPN for remote laptop work' },
      { key: 'Web Filtering', value: 'URL category filtering, bandwidth limits per user, video streaming control' },
      { key: 'User Authentication', value: 'Active Directory / LDAP, Captive Portal, MAC-based login' },
      { key: 'Ransomware Shield', value: 'Zero-day exploit defense and crypto-ransomware rollback' }
    ],
    features: [
      'Eliminate office bandwidth wastage by blocking unauthorized video streaming and downloads',
      'Securely connect branch offices directly to head office ERP & Tally server via VPN',
      'Protects corporate network from external hacker brute-force attempts & malware',
      'Detailed employee internet browsing history and high-bandwidth consumer reports'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    tags: ['Firewall', 'UTM', 'Cyber Security', 'VPN', 'Security Software'],
    createdAt: '2026-02-04T12:00:00Z',
    updatedAt: '2026-02-20T10:00:00Z'
  },
  {
    id: 'prod-sw-backup',
    name: 'Automated Hybrid Cloud & NAS Disaster Recovery Backup Software',
    category: 'IT & Network Software',
    brand: 'Disaster Recovery Suite',
    model: 'DISASTER-RECOVERY-PRO',
    sku: 'SW-BACKUP-AUTO-DR',
    shortDescription: 'Automated daily backup for Tally, SQL databases, NVR footage, Windows servers and cloud storage with ransomware immutability.',
    fullDescription: 'Enterprise backup and business continuity software designed to protect mission-critical business data from hard disk crashes, fire, theft, and ransomware attacks. Backs up multiple physical servers, virtual machines, and office PCs to a centralized on-premise NAS and off-site cloud storage automatically.',
    specifications: [
      { key: 'Backup Targets', value: 'On-premise NAS, Local USB Storage, and Encrypted Cloud' },
      { key: 'Workloads Supported', value: 'Tally Data, MS SQL, MySQL, VMware, Hyper-V, Windows / Mac PCs' },
      { key: 'Deduplication', value: 'Global block-level deduplication saves up to 75% storage space' },
      { key: 'Ransomware Defense', value: 'Write-Once-Read-Many (WORM) immutable snapshot retention' },
      { key: 'Recovery Time (RTO)', value: 'Instant bare-metal VM restore within 15 minutes of server crash' }
    ],
    features: [
      'Automated daily scheduled backup without requiring any manual human intervention',
      'Daily WhatsApp/Email backup success confirmation report sent to owner',
      'Historical point-in-time versioning: Recover deleted or altered files from any day in the past',
      'Complete disaster recovery plan designed and tested by IT-INFOSYSTEMS engineers'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1597852074816-d933c4d2b988?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    tags: ['Backup Software', 'Disaster Recovery', 'Tally Backup', 'NAS', 'Cloud Backup'],
    createdAt: '2026-02-05T14:00:00Z',
    updatedAt: '2026-02-20T10:00:00Z'
  },
  {
    id: 'prod-sw-asset',
    name: 'IT Asset Tracking & Helpdesk Ticketing Management Software',
    category: 'IT & Network Software',
    brand: 'IT Management Suite',
    model: 'ASSET-HELPDESK-2026',
    sku: 'SW-ASSET-DESK-TICKETS',
    shortDescription: 'QR code hardware inventory tracking, warranty AMC renewal alerts, and staff IT complaint ticketing portal.',
    fullDescription: 'All-in-one IT Asset Lifecycle and Helpdesk Ticketing solution for educational institutes, hospitals, coaching centers, and corporate offices. Track every computer, monitor, CCTV camera, printer, switch, and software license with unique QR code tags.',
    specifications: [
      { key: 'Asset Modules', value: 'Hardware Inventory, Software Licenses, AMC & Warranty Tracker' },
      { key: 'Ticketing System', value: 'Email-to-ticket, WhatsApp ticket creation, SLA escalation workflow' },
      { key: 'Tagging System', value: 'QR code generation & barcode scanner mobile app' },
      { key: 'Reports', value: 'Depreciation calculation, scrap management & maintenance cost history' }
    ],
    features: [
      'Scan QR code on any CPU or CCTV camera with mobile to view purchase date, warranty & past repairs',
      'Staff can lodge IT issues in 10 seconds with automatic ticket assignment to technical engineers',
      'Automated reminder 30 days before AMC or antivirus licenses expire',
      'Prevents asset theft, misplaced accessories, and duplicate hardware purchasing'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    tags: ['IT Asset Management', 'Helpdesk Software', 'Ticketing', 'QR Code', 'Inventory'],
    createdAt: '2026-02-06T15:00:00Z',
    updatedAt: '2026-02-20T10:00:00Z'
  },
  {
    id: 'prod-1',
    name: '4MP ColorVu Night-Vision PoE Bullet IP Camera',
    category: 'CCTV & Video Surveillance',
    brand: 'Ultra HD Surveillance',
    model: 'CV-4MP-BULLET-PRO',
    sku: 'SEC-4MP-CV-BULLET',
    shortDescription: '4MP high-resolution full-time color imaging day and night with F1.0 aperture, warm light and IP67 weather resistance.',
    fullDescription: 'Provides 24/7 vivid colorful images with advanced F1.0 lenses and high-performance sensors. F1.0 super-aperture collects more light to produce brighter images in pitch dark environments. Features smart human and vehicle classification.',
    specifications: [
      { key: 'Resolution', value: '4 Megapixel Ultra HD (2560 × 1440)' },
      { key: 'Lens', value: '2.8 mm / 4.0 mm Fixed High-Aperture Lens' },
      { key: 'Night Vision', value: '24/7 Full ColorVu (Up to 30m warm light)' },
      { key: 'Water & Dust Resistance', value: 'IP67 Weatherproof All-Metal Housing' },
      { key: 'Compression', value: 'H.265+ / H.265 / H.264+ / H.264' },
      { key: 'Power Supply', value: 'PoE (802.3af) or 12 VDC' },
      { key: 'WDR', value: '120 dB True WDR for clear backlight image' }
    ],
    features: [
      '24/7 Full Time Color Video in complete darkness',
      'Smart Motion Detection & Human/Vehicle Classification',
      'IP67 Rugged Metal Body Weatherproof for outdoor use',
      'Built-in Microphone for audio recording',
      'H.265+ Ultra low bandwidth and storage consumption'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['ColorVu', '4MP', 'IP Camera', 'Night Color', 'PoE', 'CCTV'],
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-02-15T14:30:00Z'
  },
  {
    id: 'prod-cctv-dome',
    name: '2MP Full HD Smart Dual-Light Audio Dome Camera',
    category: 'CCTV & Video Surveillance',
    brand: 'Indoor/Outdoor Dome Series',
    model: 'DM-2MP-AUDIO-IR',
    sku: 'SEC-2MP-DOME-AUD',
    shortDescription: '2MP 1080P dome camera with built-in high-sensitivity mic, smart IR and warm light illumination.',
    fullDescription: 'High-definition dome surveillance camera engineered for office ceilings, shops, classrooms, and hotel corridors. Built-in noise-cancelling audio microphone and smart dual-light technology that switches to full color upon motion detection.',
    specifications: [
      { key: 'Resolution', value: '2 Megapixel 1080P Full HD' },
      { key: 'Audio', value: 'Integrated High-Gain Noise Reduction Mic' },
      { key: 'Illumination', value: 'Smart Dual-Light (IR 30m + Warm Light 20m)' },
      { key: 'Body Design', value: 'Compact Anti-Vandal Turret Dome' }
    ],
    features: [
      'Crystal-clear audio monitoring alongside full HD video',
      'Smart dual-light: discreet IR night vision until motion triggers white light',
      'Ceiling and wall mount friendly compact aesthetics',
      'Wide viewing angle ideal for indoor halls & reception counters'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    tags: ['Dome Camera', 'Audio CCTV', 'Full HD', '2MP', 'Surveillance'],
    createdAt: '2026-01-11T10:00:00Z',
    updatedAt: '2026-02-15T14:30:00Z'
  },
  {
    id: 'prod-2',
    name: '16-Channel 4K Ultra HD Network Video Recorder (NVR)',
    category: 'CCTV & Video Surveillance',
    brand: 'Pro Ultra NVR Series',
    model: 'NVR-4K-16CH-PRO',
    sku: 'SEC-NVR-16CH-4K',
    shortDescription: '16 Channel 4K H.265+ Network Video Recorder with dual SATA ports supporting up to 20TB storage.',
    fullDescription: 'High-performance 16-channel IP video recorder that delivers 4K live preview and playback with smart search. Equipped with H.265+ video encoding for 70% bandwidth and storage reduction. Supports HDMI 4K and VGA simultaneous video output.',
    specifications: [
      { key: 'Channels', value: '16 IP Camera Channels' },
      { key: 'Decoding Resolution', value: 'Up to 4K / 8MP, 6MP, 5MP, 4MP, 2MP' },
      { key: 'HDD Interface', value: '2 SATA Ports (Up to 10TB per disk, total 20TB)' },
      { key: 'Video Output', value: '1 HDMI (4K UHD) + 1 VGA (Full HD)' },
      { key: 'Network Interface', value: '1 RJ-45 Gigabit 10/100/1000 Mbps Ethernet' },
      { key: 'Mobile App', value: 'Remote Smartphone Live View for iOS & Android' }
    ],
    features: [
      'Real-time 4K Display on HDMI TV / Monitors',
      'Dual SATA support for extended CCTV footage retention',
      'Smart AI Motion detection event search',
      'Instant mobile viewing anywhere with P2P Cloud QR scan',
      'Auto-search and plug & play IP camera pairing'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['NVR', '16 Channel', '4K', 'Surveillance Recorder', 'CCTV Storage'],
    createdAt: '2026-01-12T11:00:00Z',
    updatedAt: '2026-02-14T10:00:00Z'
  },
  {
    id: 'prod-4',
    name: '4TB Enterprise 24/7 Surveillance Internal Storage Drive',
    category: 'CCTV & Video Surveillance',
    brand: 'Surveillance Grade Storage',
    model: 'HDD-SURV-4TB-64CH',
    sku: 'SEC-SURV-4TB-HDD',
    shortDescription: 'Engineered specifically for 24/7 continuous high-definition security surveillance systems with anti-frame-loss firmware.',
    fullDescription: 'Drives engineered specifically for surveillance to withstand elevated heat fluctuations and equipment vibrations within NVR and DVR environments. Optimized for write-intensive multi-camera recording streams.',
    specifications: [
      { key: 'Capacity', value: '4 TB' },
      { key: 'Form Factor', value: '3.5 Inch Standard Internal Drive' },
      { key: 'Interface', value: 'SATA 6 Gb/s' },
      { key: 'Cache', value: '256 MB High-Speed Buffer' },
      { key: 'Workload Rating', value: 'Up to 180 TB/year' },
      { key: 'Cameras Supported', value: 'Up to 64 HD Single-Stream cameras simultaneously' }
    ],
    features: [
      'Firmware tuned to eliminate dropped frames and pixel degradation',
      'Tarnish-resistant components for harsh DVR/NVR conditions',
      'Optimized for write-intensive low bit-rate multi-stream operations',
      'Low power consumption for continuous 24/7/365 operations'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1597852074816-d933c4d2b988?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    tags: ['4TB', 'Surveillance HDD', 'CCTV Storage', 'Hard Drive'],
    createdAt: '2026-01-18T14:00:00Z',
    updatedAt: '2026-02-10T12:00:00Z'
  },
  {
    id: 'prod-3',
    name: '8-Port Gigabit Smart PoE+ Managed Cloud Switch (62W)',
    category: 'Networking & Switching',
    brand: 'Enterprise Networking',
    model: 'SW-8POE-GIGA-PRO',
    sku: 'NET-SW-8POE-GIGA',
    shortDescription: '8-Port Gigabit Smart Switch with 4-Port PoE+ (62W Total Budget), VLAN tagging and Cloud Controller integration.',
    fullDescription: 'Equipped with 4 802.3af/at PoE+ ports delivering up to 62W total power budget. Easily power IP cameras, access points, and IP phones while managing network traffic, VLANs, and QoS via centralized cloud management dashboard.',
    specifications: [
      { key: 'Total Ports', value: '8 × 10/100/1000 Mbps RJ45 Gigabit Ports' },
      { key: 'PoE Ports', value: '4 Ports PoE+ (802.3af/at compliant)' },
      { key: 'PoE Power Budget', value: '62 Watts Total' },
      { key: 'Switching Capacity', value: '16 Gbps non-blocking' },
      { key: 'VLAN Support', value: '802.1Q VLAN, Port-based VLAN, Voice VLAN' }
    ],
    features: [
      'Centralized Cloud Controller & Web GUI management',
      'Intelligent PoE power distribution with auto priority and power reset',
      'Robust security: IP-MAC-Port Binding, ACL, Port Security',
      'L2/L3/L4 QoS traffic optimization for voice & video surveillance',
      'Fanless silent design in compact metal chassis'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['PoE Switch', 'Gigabit', 'Managed Switch', 'Networking'],
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-02-18T16:00:00Z'
  },
  {
    id: 'prod-switch-24p',
    name: '24-Port Gigabit L2+ Managed Enterprise PoE+ Switch (370W)',
    category: 'Networking & Switching',
    brand: 'Enterprise Switching',
    model: 'SW-24POE-370W-GIGA',
    sku: 'NET-SW-24POE-370W',
    shortDescription: '24 Gigabit PoE+ ports with 4 Gigabit SFP slots, 370W high power budget and Layer-2+ routing.',
    fullDescription: 'High-density 24-Port Gigabit Managed PoE+ switch engineered for multi-camera CCTV backbones, office floor LAN distribution, and wireless access point clusters. Equipped with 4 dedicated optical SFP uplinks.',
    specifications: [
      { key: 'Port Count', value: '24x Gigabit PoE+ RJ45 Ports + 4x Gigabit SFP Slots' },
      { key: 'PoE Budget', value: '370 Watts Total PoE Power' },
      { key: 'Switching Bandwidth', value: '56 Gbps switching fabric' },
      { key: 'Form Factor', value: '19-Inch 1U Standard Rackmount' }
    ],
    features: [
      'Powers up to 24 ColorVu cameras or Wi-Fi 6 APs simultaneously',
      'Dedicated SFP fiber uplink ports for long-distance building connectivity',
      'Static routing, IGMP snooping & advanced VLAN segmentation',
      'Smart thermal cooling with auto speed regulation'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    tags: ['24 Port PoE', 'Enterprise Switch', 'Gigabit', 'SFP Uplink'],
    createdAt: '2026-01-16T10:00:00Z',
    updatedAt: '2026-02-18T16:00:00Z'
  },
  {
    id: 'prod-9',
    name: 'High-Performance Ceiling/Wall Mount Dual-Band Wi-Fi 6 Access Point',
    category: 'Networking & Switching',
    brand: 'Enterprise Wireless',
    model: 'AP-WIFI6-AX3000',
    sku: 'NET-AP-WIFI6-AX3K',
    shortDescription: 'Dual-band Wi-Fi 6 access point delivering up to 3.0 Gbps aggregate throughput with 300+ client capacity and mesh roaming.',
    fullDescription: 'High-density Wi-Fi 6 access point designed for colleges, coaching classrooms, banquet halls, and multi-floor luxury homes. Features seamless zero-handoff roaming and captive portal voucher authentication.',
    specifications: [
      { key: 'Wi-Fi Standard', value: 'Wi-Fi 6 (802.11ax/ac/n/g/b/a)' },
      { key: 'Speed', value: '2402 Mbps (5GHz) + 574 Mbps (2.4GHz)' },
      { key: 'Concurrent Clients', value: '300+ connected clients without latency' },
      { key: 'Coverage', value: 'Up to 140 m² (1,500 ft²)' },
      { key: 'Power Method', value: '802.3at PoE+ (PoE Injector or PoE Switch)' }
    ],
    features: [
      'Zero handoff seamless roaming across multiple access points',
      'Multi-SSID guest portal with bandwidth limits and vouchers',
      'Sleek aesthetic ceiling mount fits modern corporate and villa interiors',
      'Advanced RF performance with automated channel optimization'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['WiFi 6', 'Access Point', 'Enterprise Wireless', 'Mesh Wi-Fi'],
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-17T11:00:00Z'
  },
  {
    id: 'prod-6',
    name: '9U Wall Mount Server & CCTV Equipment Rack with Glass Door',
    category: 'Networking & Switching',
    brand: 'Industrial Enclosures',
    model: 'RACK-9U-550D-PRO',
    sku: 'NET-RACK-9U-550D',
    shortDescription: 'Sturdy 9U 550mm depth wall mount network enclosure with toughened glass door, cooling fan, PDU and cable tray.',
    fullDescription: 'Wall mount enclosure specifically designed for CCTV NVRs, DVRs, network switches, patch panels, and routers. High-grade cold-rolled steel structure with powder coated anti-rust finish, lockable front glass door, top exhaust cooling fan, and 6-socket power distribution unit.',
    specifications: [
      { key: 'Rack Units', value: '9U standard 19-inch mounting' },
      { key: 'Depth', value: '550 mm (Accommodates deep NVRs & PoE switches)' },
      { key: 'Material', value: 'High grade SPCC Cold Rolled Steel' },
      { key: 'Front Door', value: 'Toughened Glass with Key Lock' },
      { key: 'Accessories Included', value: '1x Cooling Fan, 1x 6-Socket PDU, 1x Fixed Shelf, Hardware kit' }
    ],
    features: [
      'Provides neat, tidy, and dust-free protection for security equipment',
      'Lockable door protects NVR and recorded footage from tampering',
      'Top and bottom cable entry knockouts with rubber grommets',
      'Heavy load capacity up to 60 kg'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    tags: ['Network Rack', '9U', 'Server Enclosure', 'CCTV Rack'],
    createdAt: '2026-01-22T13:00:00Z',
    updatedAt: '2026-02-15T09:00:00Z'
  },
  {
    id: 'prod-8',
    name: 'Cat6 305M Pure Copper Solid UTP High-Speed LAN Cable Box',
    category: 'Networking & Switching',
    brand: 'Structured Cabling',
    model: 'CAT6-305M-COPPER-UTP',
    sku: 'NET-CAT6-305M-CU',
    shortDescription: '100% Solid Bare Copper 23 AWG 4-Pair Cat6 Gigabit Ethernet Network Cable (305 Meter / 1000 Ft Box).',
    fullDescription: 'Cat6 solid copper unshielded twisted pair cable certified for high-speed Gigabit Ethernet networks, IP CCTV camera installations, and enterprise structured cabling. Built with 23 AWG 100% solid electrolytic bare copper conductors with high-density polyethelene insulation.',
    specifications: [
      { key: 'Cable Length', value: '305 Meters (1000 Feet) Pull Box' },
      { key: 'Conductor', value: '23 AWG 100% Solid Electrolytic Bare Copper' },
      { key: 'Bandwidth', value: 'Up to 250 MHz' },
      { key: 'Jacket', value: 'Flame Retardant PVC (Grey/Blue)' }
    ],
    features: [
      '100% Pure solid copper ensures zero voltage drop on long PoE runs',
      'Supports Gigabit 1000BASE-T and PoE+ (802.3at) without overheating',
      'Internal PE spline cross separator prevents crosstalk',
      'Ideal for heavy commercial CCTV & office LAN installations'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    tags: ['Cat6', 'LAN Cable', 'Pure Copper', 'Networking Cable'],
    createdAt: '2026-01-28T09:00:00Z',
    updatedAt: '2026-02-11T12:00:00Z'
  },
  {
    id: 'prod-10',
    name: 'Industrial 4-Core Armored Single-Mode Optical Fiber Cable (Per Km)',
    category: 'Fiber Optic Solutions',
    brand: 'Fiber Infrastructure',
    model: 'FIBER-4C-ARM-SM-HD',
    sku: 'FBR-4C-ARMD-SM',
    shortDescription: 'Direct-buried steel armored single-mode 9/125 optical fiber cable for long-distance factory & campus backbone.',
    fullDescription: 'Heavy-duty steel tape armored outdoor optical fiber cable designed for harsh industrial environments, underground trenches, and overhead pole runs. Resistant to rodent bites, water ingress, and mechanical crushing.',
    specifications: [
      { key: 'Fiber Type', value: 'Single-mode ITU-T G.652.D (9/125 μm)' },
      { key: 'Core Count', value: '4 Fiber Cores (Color Coded)' },
      { key: 'Armoring', value: 'Corrugated Steel Tape (CSTA) Armored' },
      { key: 'Jacket', value: 'UV Resistant HDPE Outer Sheath' },
      { key: 'Transmission Distance', value: 'Up to 20 Km+ without signal repeater' }
    ],
    features: [
      'Immune to lightning strikes, power line electrical interference, and RF noise',
      'Crush-resistant steel armor prevents cable cuts by rodents or heavy machinery',
      'Ideal for factory boundary CCTV transmission and multi-building campus LAN',
      'Splicing & OTDR testing services available by IT-INFOSYSTEMS engineers'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    tags: ['Fiber Cable', 'Armored Fiber', '4 Core', 'Single Mode', 'Industrial Networking'],
    createdAt: '2026-02-02T12:00:00Z',
    updatedAt: '2026-02-18T10:00:00Z'
  },
  {
    id: 'prod-fiber-media',
    name: 'Gigabit Single-Mode Optical Fiber Media Converter Pair (SC/RJ45)',
    category: 'Fiber Optic Solutions',
    brand: 'Optical Transmission',
    model: 'MC-GIGA-SM-20KM',
    sku: 'FBR-MC-GIGA-PAIR',
    shortDescription: 'Gigabit 10/100/1000M Ethernet to single-mode fiber transceiver pair with up to 20Km transmission reach.',
    fullDescription: 'High-speed optical fiber media converter pair designed to seamlessly link long distance IP camera clusters, remote gate booths, and distant warehouse switches over single-mode optical fiber with zero latency.',
    specifications: [
      { key: 'Data Rate', value: '10/100/1000 Mbps Gigabit auto-negotiation' },
      { key: 'Fiber Connector', value: 'SC Simplex / Duplex' },
      { key: 'Distance', value: 'Up to 20 Kilometers' },
      { key: 'Wavelength', value: '1310nm / 1550nm WDM' }
    ],
    features: [
      'Extends network connectivity over 20 kilometers without signal loss',
      'Plug and play: requires no software configuration',
      'Built-in lightning and surge protection',
      'LED indicators for power, fiber link, and LAN traffic status'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['Media Converter', 'Fiber Optic', 'Gigabit', 'Optical Transceiver'],
    createdAt: '2026-02-03T10:00:00Z',
    updatedAt: '2026-02-18T10:00:00Z'
  },
  {
    id: 'prod-5',
    name: 'Dynamic Face & Fingerprint Time Attendance System with Access Control',
    category: 'Biometrics & Access Control',
    brand: 'Access Control Systems',
    model: 'BIO-FACE-FP-PRO',
    sku: 'BIO-FACE-FP-ATTEND',
    shortDescription: 'Dual-camera dynamic face recognition and optical fingerprint attendance system with Wi-Fi & battery backup.',
    fullDescription: 'Advanced biometric attendance system featuring 0.5s high-speed facial recognition with anti-spoofing algorithm, biometric fingerprint sensor, RFID card reader, and EM-Lock relay output. Complete with automated payroll & attendance integration.',
    specifications: [
      { key: 'Face Capacity', value: '1,500 Faces' },
      { key: 'Fingerprint Capacity', value: '5,000 Fingerprints' },
      { key: 'Card Capacity', value: '5,000 RFID Cards' },
      { key: 'Record Log Capacity', value: '100,000 Attendance Records' },
      { key: 'Display', value: '2.8 Inch Color TFT Screen' },
      { key: 'Communication', value: 'TCP/IP, Wi-Fi, USB Flash Drive' },
      { key: 'Access Control', value: 'Direct Relay output for Magnetic Door Locks / Turnstiles' },
      { key: 'Battery', value: 'Built-in 2-Hour Li-ion Battery Backup' }
    ],
    features: [
      'Touchless high-speed facial recognition up to 1.5 meters',
      'Built-in Wi-Fi and Cloud Server Push technology for multi-branch sync',
      'Direct WhatsApp and SMS punch notifications',
      'Free Windows Software + Mobile Employee Attendance App',
      'Supports door lock integration for server rooms and director cabins'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['Biometric', 'Face Attendance', 'Access Control', 'Door Lock', 'Time Attendance'],
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-02-12T11:00:00Z'
  },
  {
    id: 'prod-em-lock',
    name: 'Heavy-Duty 600 lbs Electromagnetic Door Lock & Exit Switch Kit',
    category: 'Biometrics & Access Control',
    brand: 'Access Security Hardware',
    model: 'EM-LOCK-600LBS-KIT',
    sku: 'BIO-EM-LOCK-600LBS',
    shortDescription: '600 lbs (280 kg) holding force magnetic lock with LED status indicator, Z&L brackets for wooden and glass doors.',
    fullDescription: 'Industrial electromagnetic door lock designed for high security server rooms, hospital OT, corporate offices, and main entrance glass doors. Seamlessly links with face and fingerprint biometric machines with instant release touch exit button.',
    specifications: [
      { key: 'Holding Force', value: '600 lbs (280 kg)' },
      { key: 'Operating Voltage', value: '12V DC' },
      { key: 'Lock Status Sensor', value: 'Built-in LED Indicator (Green/Red)' },
      { key: 'Bracket Support', value: 'Universal U, Z, and L brackets included' }
    ],
    features: [
      'Fail-safe operation: releases instantly in fire / power outage emergencies',
      'Zero residual magnetism design with anti-rust aluminum housing',
      'Includes emergency touch-release push button and 12V 2A SMPS power unit'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    tags: ['EM Lock', 'Magnetic Lock', 'Access Control', 'Door Security'],
    createdAt: '2026-01-21T10:00:00Z',
    updatedAt: '2026-02-12T11:00:00Z'
  },
  {
    id: 'prod-7',
    name: '7-Inch HD Touch Screen IP Video Door Phone & Intercom Kit with Wi-Fi',
    category: 'Video Door Phones & Intercom',
    brand: 'Smart Intercom Systems',
    model: 'VDP-IP-7IN-WIFI-HD',
    sku: 'INT-VDP-IP-7IN',
    shortDescription: 'Smart IP Video Intercom system with 7" indoor monitor, wide-angle 2MP outdoor station, and mobile app unlock.',
    fullDescription: 'Provides seamless two-way audio communication and video verification for visitors at your door or gate. Allows you to speak with visitors and unlock electric door strikes right from the indoor monitor or your smartphone anywhere in the world.',
    specifications: [
      { key: 'Indoor Monitor', value: '7-inch Capacitive Touch Screen (1024 × 600)' },
      { key: 'Door Camera', value: '2MP HD CMOS Wide-Angle Lens with IR Night Vision' },
      { key: 'Connectivity', value: 'Wi-Fi & Ethernet PoE support' },
      { key: 'Door Unlock', value: 'Electronic Lock control via Monitor, RFID Card, Mobile App' },
      { key: 'Memory', value: 'MicroSD slot for visitor snapshots and video messages' },
      { key: 'Mobile App', value: 'Remote Smartphone Intercom App for iOS & Android' }
    ],
    features: [
      'Answer the doorbell from your phone even when you are away from home',
      'High quality crystal-clear two-way noise cancelled audio',
      'Supports multiple indoor monitors for 2-floor or 3-floor bungalows',
      'Integrates directly with IP CCTV cameras for split-screen monitoring'
    ],
    price: 0,
    mrp: 0,
    discountPercentage: 0,
    hidePrice: true,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['VDP', 'Video Door Phone', 'Smart Intercom', 'Home Security', 'Video Intercom'],
    createdAt: '2026-01-25T11:00:00Z',
    updatedAt: '2026-02-16T15:00:00Z'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'serv-ip-cctv',
    title: 'IP & HD CCTV Camera Installation',
    category: 'cctv',
    shortDesc: 'End-to-end site survey, conduit routing, high-resolution IP/Analog camera mounting, and mobile app streaming setup.',
    iconName: 'Camera',
    features: [
      'Full HD & 4K Ultra HD bullet, dome, and 360° PTZ camera installation',
      'Full Color Night Vision (Hikvision ColorVu / Dahua Full-Color)',
      'Clean cable routing with heavy PVC conduits or casing-capping',
      'Live remote mobile viewing configuration on iPhone & Android with instant alerts',
      'Power backup UPS integration for zero downtime during power cuts'
    ],
    isPublished: true,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'serv-nvr-dvr-setup',
    title: 'NVR & DVR Setup and Configuration',
    category: 'cctv',
    shortDesc: 'Centralized video recording, storage dimensioning, motion detection zones, and cloud backup configuration.',
    iconName: 'HardDrive',
    features: [
      '4 to 128 Channel enterprise NVR/DVR installation & IP addressing',
      'Surveillance HDD RAID & storage optimization with H.265+ compression',
      'AI Smart Analytics: Tripwire, perimeter intrusion & human/vehicle filtering',
      'HDMI multi-display video wall integration for security control rooms'
    ],
    isPublished: true,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'serv-cctv-troubleshooting',
    title: 'CCTV Repair & Troubleshooting',
    category: 'cctv',
    shortDesc: 'Fast diagnostic and on-site repair for offline cameras, no-video errors, hard disk recording failures, and power issues.',
    iconName: 'Wrench',
    features: [
      'Diagnosis for flickering, black screens, or offline camera channels',
      'Damaged cable replacement, BNC/RJ45 connector re-crimping',
      'SMPS power supply and PoE switch replacement',
      'Corrupted hard drive recovery and firmware flashing'
    ],
    isPublished: true,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'serv-structured-cabling',
    title: 'Structured LAN Cabling & Rack Dressing',
    category: 'networking',
    shortDesc: 'Organized Cat6/Cat6A structured cabling, server rack assembly, patch panel termination, and fluke testing.',
    iconName: 'Server',
    features: [
      'Neat rack dressing with numbered cable labeling and cable management trays',
      'Cat6 / Cat6A UTP/STP high-speed network drop terminations',
      'Fluke continuity and throughput testing for enterprise speed certification',
      'Eliminates messy wires and reduces network packet loss'
    ],
    isPublished: true,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'serv-fiber-splicing',
    title: 'Fiber Optic Splicing & Termination',
    category: 'networking',
    shortDesc: 'Core-alignment fusion splicing, joint enclosure mounting, optical power meter testing, and long distance links.',
    iconName: 'Cable',
    features: [
      'High-precision optical fiber core fusion splicing with <0.02dB loss',
      'Direct buried armored fiber pulling for industrial plants and campuses',
      'Rack-mount and wall-mount LIU (Light Interface Unit) box termination',
      'Fast emergency repair for cut fiber backbone lines in Kota & Rajasthan'
    ],
    isPublished: true,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'serv-switch-vlan-router',
    title: 'Managed Switch, VLAN & Router Setup',
    category: 'networking',
    shortDesc: 'VLAN segmentation, bandwidth management, multi-WAN load balancing, and firewall rule implementation.',
    iconName: 'Network',
    features: [
      'Cisco, TP-Link Omada, MikroTik, and D-Link managed switch configuration',
      'VLAN isolation separating CCTV traffic, guest Wi-Fi, and corporate servers',
      'Dual-ISP automatic failover router configuration (Zero Internet Downtime)',
      'Quality of Service (QoS) prioritization for VoIP and surveillance streams'
    ],
    isPublished: true,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'serv-enterprise-wifi',
    title: 'Enterprise Wi-Fi & Mesh Deployment',
    category: 'networking',
    shortDesc: 'High-density Wi-Fi 6 coverage for schools, coaching institutes, hotels, hospitals, and large offices in Kota.',
    iconName: 'Wifi',
    features: [
      'Heatmap coverage analysis to eliminate dead spots and signal drop zones',
      'Seamless roaming (802.11k/v/r) as users walk between floors',
      'Captive portal login with OTP verification for hotels and retail shops',
      'Centralized cloud management across multiple branch offices'
    ],
    isPublished: true,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'serv-computer-server',
    title: 'Computer, Server & NAS Storage Setup',
    category: 'it-support',
    shortDesc: 'Workstation deployment, Windows/Linux Server installation, Network Attached Storage (NAS) and automatic backup.',
    iconName: 'Monitor',
    features: [
      'Corporate desktop PC and commercial workstation assembling and OS setup',
      'Synology / QNAP NAS storage installation for centralized office file sharing',
      'Automated scheduled cloud and on-premise daily data backup routines',
      'Hardware upgrade: NVMe SSDs, ECC RAM, and thermal paste servicing'
    ],
    isPublished: true,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'serv-network-monitoring',
    title: 'Live Network Monitoring & NMS Deployment',
    category: 'it-support',
    shortDesc: '24/7 SNMP bandwidth monitoring, ping uptime alerts, switch port load mapping and automatic WhatsApp downtime notifications.',
    iconName: 'Activity',
    features: [
      'Layer-2/Layer-3 visual network topology mapping with live device status',
      'Instant WhatsApp & SMS alerts to IT staff when any camera, router or server goes offline',
      'Traffic bottleneck detection & bandwidth utilization monitoring per department',
      'Uptime SLA reporting & packet loss diagnostic logs'
    ],
    isPublished: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'serv-software-solutions',
    title: 'Enterprise Software & Cyber Security Solutions',
    category: 'it-support',
    shortDesc: 'Centralized CCTV VMS, Cloud Biometric HR payroll, UTM firewall configuration and automated disaster recovery backup software.',
    iconName: 'Terminal',
    features: [
      'Multi-branch centralized CCTV VMS server setup & AI video analytics',
      'Cloud attendance sync, mobile GPS geofencing & automated payroll integration',
      'Next-Gen UTM firewall, web filtering & site-to-site IPsec VPN setup',
      'Automated scheduled backup for Tally, SQL databases and critical office NAS files'
    ],
    isPublished: true,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'serv-biometric-attendance',
    title: 'Biometric Attendance & Access Control',
    category: 'security',
    shortDesc: 'Contactless face recognition, biometric fingerprint punch machines, and electromagnetic door lock access.',
    iconName: 'Fingerprint',
    features: [
      'Automated staff shift management, overtime, and leave reporting software',
      'Multi-branch cloud attendance synchronization to head office in real-time',
      'EM lock & drop-bolt lock installation for server rooms, HR rooms & main gates',
      'Integration with WhatsApp automated punch alerts'
    ],
    isPublished: true,
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'serv-vdp-intercom',
    title: 'Smart Video Door Phone & Intercom',
    category: 'security',
    shortDesc: 'IP and 2-wire video door phones with remote smartphone door release and multi-apartment intercom systems.',
    iconName: 'ShieldCheck',
    features: [
      'HD color camera with night vision and two-way crystal-clear audio',
      'Remote door opening from indoor monitor or mobile phone app',
      'Multi-tenant society and villa intercom matrix cabling and setup'
    ],
    isPublished: true,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Industrial Manufacturing Unit CCTV & Fiber Backbone',
    location: 'Ranpur Industrial Area, Kota',
    clientType: 'Industrial / Factory',
    description: 'Executed complete security surveillance and fiber optic network infrastructure across a 6-acre manufacturing plant. Deployed 38 IP bullet cameras with 24/7 ColorVu, 2 Km armored fiber optic backbone linking 3 separate sheds to the central control room.',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    camerasCount: 38,
    nvrsCount: 2,
    networkingDetails: '2.1 Km 4-Core Armored Single-Mode Fiber, 4x Gigabit PoE Switches, 9U Server Racks, Optical LIU terminations.',
    completionDate: 'December 2025',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'Commercial Coaching Institute LAN & Surveillance Setup',
    location: 'Indraprastha Industrial Area (IPIA), Kota',
    clientType: 'Institutional / School',
    description: 'Designed and implemented high-density enterprise Wi-Fi 6, structured Cat6 network cabling for 120 computer lab nodes, and 24 IP cameras covering classrooms, examination halls, and corridors.',
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'
    ],
    camerasCount: 24,
    nvrsCount: 1,
    networkingDetails: 'Cat6 Structured Cabling for 120 Nodes, 6x Ubiquiti Wi-Fi 6 APs, 24-Port D-Link Managed Gigabit Switch, 15U Floor Rack.',
    completionDate: 'November 2025',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'Corporate Office IT Infrastructure & Biometric Access',
    location: 'Talwandi, Kota',
    clientType: 'Office / Corporate',
    description: 'Installed full IT network infrastructure including dual-ISP failover router, biometric facial recognition attendance with magnetic door lock access for server room, and 16 IP cameras.',
    images: [
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    camerasCount: 16,
    nvrsCount: 1,
    networkingDetails: 'Realtime Face Recognition with 600lbs EM Lock, Dual-WAN Load Balancing Router, 16-Port PoE Gigabit Switch, 9U Wall Rack.',
    completionDate: 'January 2026',
    featured: true
  },
  {
    id: 'proj-4',
    title: 'Multi-Storey Commercial Showroom & Warehouse Security',
    location: 'Gumanpura, Kota',
    clientType: 'Commercial / Retail',
    description: 'Comprehensive security installation featuring 20 Ultra HD wide-angle dome and bullet cameras, PTZ camera for perimeter monitoring, and centralized billing counter LAN drops.',
    images: [
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'
    ],
    camerasCount: 20,
    nvrsCount: 1,
    networkingDetails: '32-Channel 4K NVR with 16TB Storage (30-day retention), 24-Port PoE Switch, Dedicated Power Inverter backup.',
    completionDate: 'February 2026',
    featured: false
  },
  {
    id: 'proj-5',
    title: 'Luxury Villa Smart Security & Video Intercom',
    location: 'Mahaveer Nagar, Kota',
    clientType: 'Residential / Villa',
    description: 'Integrated smart villa security system comprising 8 4K ColorVu IP cameras, Dahua IP 7" touch video door phone with dual indoor screens, remote smartphone gate unlocking, and mesh Wi-Fi.',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
    ],
    camerasCount: 8,
    nvrsCount: 1,
    networkingDetails: 'Dahua IP Video Intercom with Smart Mobile Gate Unlock, Mesh Wi-Fi network, 8-Port PoE Switch.',
    completionDate: 'October 2025',
    featured: false
  }
];

export const INITIAL_AMC_PLANS: AMCPlan[] = [
  {
    id: 'amc-basic',
    name: 'Essential CCTV Maintenance',
    duration: '1 Year Contract',
    price: 'Custom Quote on Site Audit',
    billingPeriod: 'Annually',
    servicesIncluded: [
      'Up to 8 CCTV Cameras & 1 DVR/NVR',
      '4 Scheduled Preventive Maintenance Visits per year (Quarterly)',
      'Camera lens cleaning, focus adjustment & angle calibration',
      'Hard disk health check, recording retention audit & time sync',
      'Power supply & connector integrity testing',
      'Remote mobile app connectivity troubleshooting',
      '2 Emergency breakdown call-outs included'
    ],
    responseTime: 'Within 24 Hours',
    visitFrequency: '4 Preventive Visits (Quarterly) + 2 Emergency Visits',
    terms: [
      'Covers labor and routine maintenance checkups.',
      'Replacement hardware, cables or spare parts billed separately at special discounted AMC rates.',
      'Valid within Kota municipal limits.'
    ],
    isPopular: false
  },
  {
    id: 'amc-business',
    name: 'Business Pro CCTV & Network AMC',
    duration: '1 Year Contract',
    price: 'Custom Quote based on Setup',
    billingPeriod: 'Annually',
    servicesIncluded: [
      'Up to 16 to 32 Cameras + Complete LAN Switches & Racks',
      '6 Scheduled Preventive Maintenance Visits (Bi-Monthly)',
      'Unlimited Emergency Breakdown visits during business hours',
      'Complete network switch, router & Wi-Fi AP health monitoring',
      'Firmware upgrades & security patches for NVR/DVR & Routers',
      'Biometric attendance & door lock system testing',
      'Temporary standby backup NVR/Power Supply provided during major repairs',
      '15% Discount on all spare parts, cables & new equipment additions'
    ],
    responseTime: 'Priority 4 to 6 Hours',
    visitFrequency: '6 Bi-Monthly Visits + Unlimited Breakdown Calls',
    terms: [
      'Includes all service labor, tuning, and preventative servicing.',
      'Hardware parts replaced under warranty or charged at discounted rate.',
      'Dedicated technical support WhatsApp channel for your organization.'
    ],
    isPopular: true
  },
  {
    id: 'amc-enterprise',
    name: 'Enterprise Comprehensive IT & Security AMC',
    duration: '1 to 3 Year Custom Contract',
    price: 'Custom Quotation based on Site Audit',
    billingPeriod: 'Quarterly / Annually',
    servicesIncluded: [
      '32+ IP Cameras, Multi-building Fiber Backbone & Server Racks',
      'Monthly Scheduled Inspection & Deep Cleaning (12 Visits/year)',
      '24/7 Emergency response SLA with dedicated lead technician',
      'Optical Fiber link OTDR testing & splice maintenance',
      'Server, NAS storage & automatic backup verification',
      'Full quarterly network security & bandwidth audit report',
      'Free standby equipment (Cameras, PoE Switch, DVR) to guarantee zero downtime'
    ],
    responseTime: 'SLA: Within 2 Hours',
    visitFrequency: 'Monthly Inspections (12 Visits/yr) + 24/7 Breakdown SLA',
    terms: [
      'Custom tailored service level agreement (SLA) with guaranteed uptime.',
      'Includes free on-site survey and full infrastructure audit before contract signing.'
    ],
    isPopular: false
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-101',
    name: 'Rajesh Sharma',
    company: 'Sharma Marble & Granites',
    phone: '+91 98291 55432',
    email: 'rajesh.sharma@example.com',
    location: 'Anantpura, Kota',
    requirementType: 'Complete Project / Quotation',
    productName: 'Hikvision 4MP ColorVu PoE Bullet IP Camera',
    message: 'Need a quotation for 16 IP cameras and 1 NVR for our stone cutting yard and warehouse. Need night color vision and mobile view.',
    status: 'new',
    createdAt: '2026-02-18T11:20:00Z',
    adminNotes: 'Call back scheduled for tomorrow 11 AM.'
  },
  {
    id: 'inq-102',
    name: 'Dr. Amit Meena',
    company: 'Apex Healthcare Clinic',
    phone: '+91 94140 33211',
    email: 'dramit.meena@example.com',
    location: 'Talwandi, Kota',
    requirementType: 'Biometric / Access Control',
    productName: 'Realtime Face & Fingerprint Time Attendance Machine with Access Control',
    message: 'We require a contactless face recognition attendance machine for 25 staff members with automatic monthly report generation.',
    status: 'contacted',
    createdAt: '2026-02-17T15:45:00Z',
    adminNotes: 'Demo device shown on 18th Feb. Proposal shared via WhatsApp.'
  },
  {
    id: 'inq-103',
    name: 'Sunil Verma',
    company: 'Verma Logistics & Transport',
    phone: '+91 98298 77654',
    location: 'Transport Nagar, Kota',
    requirementType: 'AMC Contract',
    message: 'We have 24 existing Dahua cameras in our transport yard. Looking for Annual Maintenance Contract (AMC) for servicing and regular checkups.',
    status: 'in-progress',
    createdAt: '2026-02-16T09:30:00Z',
    adminNotes: 'Site visit completed. Business Pro AMC proposal submitted.'
  }
];

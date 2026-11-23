export interface Client {
  id: string;
  name: string;
  vertical: string;
  package: {
    reels: number;
    posts: number;
    stories: number;
    shoots: number;
    adBudget: number;
  };
  monthlyFee: number; // in INR
  healthStatus: 'green' | 'amber' | 'red';
  healthReason: string;
  approvalSlaHours: number;
  autoApprove: boolean;
  accountLead: string;
  backupLead: string;
  handles: { instagram: string };
  driveFolder: string;
  reportDay: number;
  evergreenCount: number;
}

export interface DecisionItem {
  id: string;
  clientName: string;
  title: string;
  urgency: 'high' | 'medium' | 'low';
  context: string;
  aiRecommendation: string;
  options: { label: string; action: string }[];
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface TaskItem {
  id: string;
  contentId: string;
  clientName: string;
  title: string;
  type: 'design' | 'edit' | 'brief' | 'qc' | 'schedule' | 'shoot' | 'ingest' | 'approval';
  assignee: 'Saakshi' | 'Riddhi' | 'Anjali' | 'Ops Lead';
  dueTime: string;
  status: 'todo' | 'in_progress' | 'done' | 'blocked';
  effortPoints: number;
  brief: {
    language: 'Hinglish' | 'Gujlish' | 'English';
    summary: string;
    hook3Sec: string;
    cta: string;
    referenceLinks: string[];
    defaultRule: string;
    sopChecklist: string[];
  };
}

export interface ContentItem {
  id: string;
  clientName: string;
  title: string;
  platform?: string;
  format: 'Reel' | 'Carousel' | 'Static' | 'Story';
  pillar: string;
  postDate: string;
  scheduledPostTime?: string;
  status: 'Idea' | 'Planned' | 'Brief ready' | 'Shoot scheduled' | 'Shot' | 'Ingested' | 'In edit' | 'QC' | 'Client approval' | 'Scheduled' | 'Posted';
  assignee: string;
  caption: string;
  firstComment: string;
  videoUrl?: string;
  thumbnailUrl: string;
  techQcPassed?: boolean;
  creativeQcPassed?: boolean;
  clientApprovalStatus: 'pending' | 'approved' | 'rework_requested';
  clientFeedback?: string;
  evergreenFallbackAvailable: boolean;
  isEvergreen?: boolean;
  proofUrl?: string;
}

export interface VendorDeliverable {
  id: string;
  vendorName: string;
  clientName: string;
  shootDate: string;
  promisedItems: number;
  deliveredItems: number;
  acceptedItems: number;
  reworkItems: number;
  rejectedItems: number;
  ratePerItem: number;
  status: 'On Track' | 'QC in Progress' | 'Overdue Upload' | 'Reconciled';
}

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Zaveri & Sons Heritage',
    vertical: 'Fine Jewellery',
    package: { reels: 12, posts: 8, stories: 30, shoots: 1, adBudget: 45000 },
    monthlyFee: 75000,
    healthStatus: 'green',
    healthReason: 'All 12 reels on schedule, D-5 clearance passed.',
    approvalSlaHours: 24,
    autoApprove: true,
    accountLead: 'Riddhi',
    backupLead: 'Ops Lead',
    handles: { instagram: '@zaveriheritage' },
    driveFolder: '01-Zaveri-Heritage',
    reportDay: 5,
    evergreenCount: 8,
  },
  {
    id: 'c2',
    name: 'Urban Chai & Co.',
    vertical: 'QSR / Cafe Chain',
    package: { reels: 16, posts: 6, stories: 40, shoots: 2, adBudget: 30000 },
    monthlyFee: 60000,
    healthStatus: 'amber',
    healthReason: 'Client approval pending for 28 hrs on Reel #8. Escalated to Ops Lead.',
    approvalSlaHours: 24,
    autoApprove: false,
    accountLead: 'Riddhi',
    backupLead: 'Anjali',
    handles: { instagram: '@urbanchai.official' },
    driveFolder: '02-Urban-Chai',
    reportDay: 5,
    evergreenCount: 6,
  },
  {
    id: 'c3',
    name: 'Kalyan Silk Studio',
    vertical: 'Ethnic Fashion',
    package: { reels: 20, posts: 10, stories: 45, shoots: 2, adBudget: 80000 },
    monthlyFee: 95000,
    healthStatus: 'red',
    healthReason: 'Raw footage upload delayed by 8 hours from yesterday shoot. Ingest Gate alert.',
    approvalSlaHours: 24,
    autoApprove: false,
    accountLead: 'Ops Lead',
    backupLead: 'Riddhi',
    handles: { instagram: '@kalyansilkstudio' },
    driveFolder: '03-Kalyan-Silks',
    reportDay: 3,
    evergreenCount: 5,
  },
  {
    id: 'c4',
    name: 'Vesu Fitness Club',
    vertical: 'Health & Gym',
    package: { reels: 10, posts: 8, stories: 20, shoots: 1, adBudget: 25000 },
    monthlyFee: 45000,
    healthStatus: 'green',
    healthReason: 'Month-end deliverables ready 6 days ahead of schedule.',
    approvalSlaHours: 48,
    autoApprove: true,
    accountLead: 'Anjali',
    backupLead: 'Saakshi',
    handles: { instagram: '@vesufitness' },
    driveFolder: '04-Vesu-Fitness',
    reportDay: 7,
    evergreenCount: 7,
  },
  {
    id: 'c5',
    name: 'Shreeji Gourmet Sweets',
    vertical: 'FMCG / Retail',
    package: { reels: 14, posts: 8, stories: 25, shoots: 1, adBudget: 50000 },
    monthlyFee: 65000,
    healthStatus: 'amber',
    healthReason: 'Festival campaign planning for Uttarayan needs Creative Lead approval.',
    approvalSlaHours: 24,
    autoApprove: true,
    accountLead: 'Riddhi',
    backupLead: 'Ops Lead',
    handles: { instagram: '@shreejigourmet' },
    driveFolder: '05-Shreeji-Gourmet',
    reportDay: 5,
    evergreenCount: 6,
  },
];

export const INITIAL_DECISIONS: DecisionItem[] = [
  {
    id: 'dec-1',
    clientName: 'Urban Chai & Co.',
    title: 'Client silent for 28 hrs on Reel #8 (Winter Kulhad Chai)',
    urgency: 'high',
    context: 'Post is scheduled for tomorrow 6:00 PM (T-18h). Client has not responded to WhatsApp or Portal link.',
    aiRecommendation: 'Activate Soft Auto-Approve: Send automated voice call ping. If no reply by T-12h, swap with pre-approved Evergreen Reel #3 (Kettle Pour).',
    options: [
      { label: 'Swap with Evergreen Post', action: 'swap_evergreen' },
      { label: 'Send WhatsApp Call Ping', action: 'send_ping' },
      { label: 'Force Post Current Draft', action: 'force_post' },
    ],
    timestamp: '25 mins ago',
    status: 'pending',
  },
  {
    id: 'dec-2',
    clientName: 'Kalyan Silk Studio',
    title: 'Vendor Shoot Delayed Ingest (Overdue 8 Hours)',
    urgency: 'high',
    context: 'Vendor Rahul Cinematics shot yesterday 4:00 PM. No upload received in Asset Vault. Edit task cannot start.',
    aiRecommendation: 'Enforce Vendor Agreement Clause 3: Hold 15% payment deduction notice unless uploaded within 2 hours. Notify standby editor Anjali.',
    options: [
      { label: 'Send SLA Penalty Warning', action: 'send_penalty' },
      { label: 'Extend Upload Window to 8 PM', action: 'extend_window' },
    ],
    timestamp: '1 hour ago',
    status: 'pending',
  },
  {
    id: 'dec-3',
    clientName: 'Saakshi (Polish Lane)',
    title: '10-Minute Decision Helper: Zaveri Motion Graphic Transition',
    urgency: 'medium',
    context: 'Saakshi has spent 45 minutes deciding between Luxury Velvet Wipe vs Gold Shimmer Dissolve for the diamond necklace reveal.',
    aiRecommendation: 'Apply Default Rule: Gold Shimmer Dissolve matches Zaveri Brand Brain (Warm Gold luxury pillar). Auto-logged and unblock task.',
    options: [
      { label: 'Apply AI Choice (Gold Shimmer)', action: 'apply_gold' },
      { label: 'Choose Velvet Wipe', action: 'apply_velvet' },
    ],
    timestamp: '12 mins ago',
    status: 'pending',
  },
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 't-101',
    contentId: 'cnt-1',
    clientName: 'Zaveri & Sons Heritage',
    title: 'Flagship Reel: Royal Polki Choker Reveal (After Effects Polish)',
    type: 'edit',
    assignee: 'Saakshi',
    dueTime: 'Today, 4:00 PM',
    status: 'in_progress',
    effortPoints: 5,
    brief: {
      language: 'Hinglish',
      summary: 'High-polish luxury reel. First 3 seconds mein macro sparkle shot aana chahiye. Slow-mo 60fps pan to the uncut emerald pendant.',
      hook3Sec: 'Text on Screen: "This isn\'t jewelry. It\'s a 200-year-old family legacy."',
      cta: 'Book your private bridal viewing at Athwa Lines showroom. Link in bio.',
      referenceLinks: ['https://instagram.com/p/luxuryref1', 'https://instagram.com/p/luxuryref2'],
      defaultRule: 'If in doubt on pacing, keep transitions at 0.4s and use warm gold color grade (LUT: GoldenHour_Rec709).',
      sopChecklist: [
        'Check HDR toggle: OFF (Rec.709 sRGB only)',
        '1080x1920 (9:16) export @ 30fps, 18 Mbps H.264',
        'Audio loudness leveled at -14 LUFS, 48 kHz AAC',
        'Ensure text is outside Instagram top/bottom safe zones',
      ],
    },
  },
  {
    id: 't-102',
    contentId: 'cnt-2',
    clientName: 'Urban Chai & Co.',
    title: 'Fast Reel Cut: 5 Secret Chai Spices (Quick Hook)',
    type: 'edit',
    assignee: 'Anjali',
    dueTime: 'Today, 2:30 PM',
    status: 'todo',
    effortPoints: 2,
    brief: {
      language: 'Hinglish',
      summary: 'Snappy pacing cut-down. Sound effects (wooshes and spice grinding sounds) on every 1.2 second cut. In-app trending beat.',
      hook3Sec: '"Stop putting cardamom first! Chai experts do this instead..."',
      cta: 'Tag that friend who drinks 4 cups a day.',
      referenceLinks: ['https://instagram.com/p/chairef3'],
      defaultRule: 'Fast jump cuts, no elaborate color grade needed, stick to clean contrast.',
      sopChecklist: [
        'Render at 1080p 30fps MP4',
        'Check captions spelling against glossary',
        'Export ready for manual trending audio attach',
      ],
    },
  },
  {
    id: 't-103',
    contentId: 'cnt-3',
    clientName: 'Shreeji Gourmet Sweets',
    title: 'Uttarayan Festival Planning Draft & 3 Trend Concepts',
    type: 'brief',
    assignee: 'Riddhi',
    dueTime: 'Today, 5:30 PM',
    status: 'in_progress',
    effortPoints: 3,
    brief: {
      language: 'Gujlish',
      summary: 'Uttarayan mate special Undhiyu & Chikki gift box campaign draft karvanu che. 2 reels + 1 carousel format.',
      hook3Sec: '"Surat na aakash ma patang, ane table par Shreeji ni Chikki."',
      cta: 'Pre-order your Uttarayan hamper with 15% early bird discount.',
      referenceLinks: ['https://instagram.com/p/festiveref1'],
      defaultRule: 'Colors must match Shreeji Brand Brain (Royal Saffron + Cream White).',
      sopChecklist: [
        'Review last year best-performing Uttarayan creative',
        'Verify offer pricing with client sales POC',
        'Draft 3 hooks in Gujlish and Hinglish',
      ],
    },
  },
];

export const INITIAL_CONTENT_ITEMS: ContentItem[] = [
  {
    id: 'cnt-1',
    clientName: 'Zaveri & Sons Heritage',
    title: 'Royal Polki Choker Reveal',
    format: 'Reel',
    pillar: 'Heritage & Craftsmanship',
    postDate: '2026-11-22T18:00:00Z',
    status: 'In edit',
    assignee: 'Saakshi',
    caption: 'Centuries of artistry, crafted for your most unforgettable day. Discover our master Polki collection at Athwa Lines, Surat. ✨ #ZaveriHeritage #SuratJewellery #PolkiBridal',
    firstComment: 'DM us "POLKI" for catalogue and pricing details.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-traditional-jewelry-41221-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    techQcPassed: true,
    creativeQcPassed: true,
    clientApprovalStatus: 'pending',
    evergreenFallbackAvailable: true,
  },
  {
    id: 'cnt-2',
    clientName: 'Urban Chai & Co.',
    title: 'Winter Kulhad Chai Pacing Cut',
    format: 'Reel',
    pillar: 'Taste & Vibe',
    postDate: '2026-11-20T17:30:00Z',
    status: 'Client approval',
    assignee: 'Anjali',
    caption: 'Thandi hawa + garma-garam kulhad chai = unmatched Surat winter vibe! ☕ Visit our VIP Road outlet today. #UrbanChai #SuratFoodies #KulhadChai',
    firstComment: 'Kaun chal raha hai chai pe? Tag below 👇',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-hot-tea-into-a-cup-43184-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    techQcPassed: true,
    creativeQcPassed: true,
    clientApprovalStatus: 'pending',
    evergreenFallbackAvailable: true,
  },
  {
    id: 'cnt-4',
    clientName: 'Vesu Fitness Club',
    title: '3 Deadlift Mistakes That Ruin Your Spine',
    format: 'Reel',
    pillar: 'Education & Authority',
    postDate: '2026-11-21T07:00:00Z',
    status: 'Scheduled',
    assignee: 'Anjali',
    caption: 'Form always beats heavy weight. Our head coach demonstrates the 3 biggest deadlift mistakes to avoid this week. 💪 #VesuFitness #SuratGym #DeadliftForm',
    firstComment: 'Save this reel for your next back day!',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-in-a-gym-41586-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    techQcPassed: true,
    creativeQcPassed: true,
    clientApprovalStatus: 'approved',
    evergreenFallbackAvailable: true,
  },
];

export const INITIAL_VENDOR_DELIVERABLES: VendorDeliverable[] = [
  {
    id: 'vd-1',
    vendorName: 'Rahul Cinematics (Surat)',
    clientName: 'Kalyan Silk Studio',
    shootDate: '18 Nov 2026',
    promisedItems: 12,
    deliveredItems: 0,
    acceptedItems: 0,
    reworkItems: 0,
    rejectedItems: 0,
    ratePerItem: 1800,
    status: 'Overdue Upload',
  },
  {
    id: 'vd-2',
    vendorName: 'VisualCraft Studios',
    clientName: 'Zaveri & Sons Heritage',
    shootDate: '15 Nov 2026',
    promisedItems: 10,
    deliveredItems: 10,
    acceptedItems: 9,
    reworkItems: 1,
    rejectedItems: 0,
    ratePerItem: 2200,
    status: 'QC in Progress',
  },
  {
    id: 'vd-3',
    vendorName: 'Apex Drone & Reels',
    clientName: 'Vesu Fitness Club',
    shootDate: '10 Nov 2026',
    promisedItems: 8,
    deliveredItems: 8,
    acceptedItems: 8,
    reworkItems: 0,
    rejectedItems: 0,
    ratePerItem: 1500,
    status: 'Reconciled',
  },
];

import {
  Client,
  DecisionItem,
  TaskItem,
  ContentItem,
  VendorDeliverable,
} from '@/data/sphere-os-mock';
import {
  getPersistentClients,
  savePersistentClients,
  getPersistentTasks,
  savePersistentTasks,
  getPersistentContent,
  savePersistentContent,
  getPersistentDecisions,
  savePersistentDecisions,
  getPersistentVendors,
  savePersistentVendors,
} from '@/lib/db';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const isAirtableConfigured = Boolean(AIRTABLE_API_KEY && AIRTABLE_BASE_ID);

// Leaky-bucket delay to honor Airtable 5 req/s rate limit
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL_MS = 250; // max 4 req/sec

async function throttleAirtable() {
  const now = Date.now();
  const timeSinceLast = now - lastRequestTime;
  if (timeSinceLast < MIN_REQUEST_INTERVAL_MS) {
    await new Promise((res) => setTimeout(res, MIN_REQUEST_INTERVAL_MS - timeSinceLast));
  }
  lastRequestTime = Date.now();
}

async function airtableFetch(tableName: string, options: RequestInit = {}) {
  if (!isAirtableConfigured) return null;
  await throttleAirtable();

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}`;
  const headers = {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Airtable API Error on ${tableName}:`, response.status, errorText);
    throw new Error(`Airtable error ${response.status}: ${errorText}`);
  }
  return response.json();
}

// ----------------------------------------------------
// CLIENTS REPOSITORY
// ----------------------------------------------------
export async function getClients(): Promise<Client[]> {
  const localClients = getPersistentClients();

  if (!isAirtableConfigured) {
    return localClients;
  }

  try {
    const data = await airtableFetch('Clients');
    if (!data?.records) return localClients;

    return data.records.map((r: any) => ({
      id: r.id,
      name: r.fields['Client Name'] || 'Untitled',
      vertical: r.fields['Vertical'] || '',
      package: {
        reels: Number(r.fields['Reels Per Month'] || 0),
        posts: Number(r.fields['Static Posts'] || 0),
        stories: Number(r.fields['Stories'] || 0),
        shoots: Number(r.fields['Shoots'] || 0),
        adBudget: Number(r.fields['Ad Budget INR'] || 0),
      },
      monthlyFee: Number(r.fields['Monthly Retainer INR'] || 0),
      healthStatus: (r.fields['Health Status'] || 'green').toLowerCase(),
      healthReason: r.fields['Health Reason'] || '',
      approvalSlaHours: Number(r.fields['Approval SLA Hours'] || 24),
      autoApprove: Boolean(r.fields['Auto Approve']),
      accountLead: r.fields['Account Lead'] || 'Ops Lead',
      backupLead: r.fields['Backup Lead'] || 'Founder',
      handles: { instagram: r.fields['Instagram Handle'] || '' },
      driveFolder: r.fields['Drive Folder'] || '',
      reportDay: Number(r.fields['Report Day'] || 5),
      evergreenCount: Number(r.fields['Evergreen Count'] || 6),
    }));
  } catch (err) {
    console.warn('Falling back to local persistent data for clients:', err);
    return localClients;
  }
}

export async function addClient(clientData: Partial<Client>): Promise<Client> {
  const current = getPersistentClients();
  const newClient: Client = {
    id: `cl-${Date.now()}`,
    name: clientData.name || 'New Client',
    vertical: clientData.vertical || 'Commercial Retail',
    package: clientData.package || {
      reels: 12,
      posts: 4,
      stories: 20,
      shoots: 1,
      adBudget: 25000,
    },
    monthlyFee: clientData.monthlyFee || 50000,
    healthStatus: 'green',
    healthReason: 'Initial onboarding sprint',
    approvalSlaHours: clientData.approvalSlaHours || 24,
    autoApprove: clientData.autoApprove ?? true,
    accountLead: clientData.accountLead || 'Saakshi',
    backupLead: clientData.backupLead || 'Founder',
    handles: clientData.handles || { instagram: `@${(clientData.name || 'brand').toLowerCase().replace(/\s+/g, '')}` },
    driveFolder: `01-Brand/${clientData.name}`,
    reportDay: 5,
    evergreenCount: 6,
  };

  const updated = [newClient, ...current];
  savePersistentClients(updated);

  if (isAirtableConfigured) {
    try {
      await airtableFetch('Clients', {
        method: 'POST',
        body: JSON.stringify({
          fields: {
            'Client Name': newClient.name,
            'Vertical': newClient.vertical,
            'Monthly Retainer INR': newClient.monthlyFee,
            'Approval SLA Hours': newClient.approvalSlaHours,
            'Auto Approve': newClient.autoApprove,
          },
        }),
      });
    } catch (err) {
      console.warn('Could not sync new client to Airtable immediately:', err);
    }
  }

  return newClient;
}

// ----------------------------------------------------
// TASKS REPOSITORY (Staff My Day)
// ----------------------------------------------------
export async function getTasks(assignee?: string): Promise<TaskItem[]> {
  const localTasks = getPersistentTasks();

  if (!isAirtableConfigured) {
    if (assignee) {
      return localTasks.filter((t) => t.assignee.toLowerCase() === assignee.toLowerCase());
    }
    return localTasks;
  }

  try {
    const data = await airtableFetch('Tasks');
    if (!data?.records) return localTasks;

    const mapped = data.records.map((r: any) => {
      const sopRaw = r.fields['SOP Checklist'] || '';
      const checklist = sopRaw ? sopRaw.split('|').map((s: string) => s.trim()) : [];

      return {
        id: r.id,
        contentId: r.fields['Content ID'] || '',
        clientName: r.fields['Client Name'] || '',
        title: r.fields['Title'] || '',
        type: (r.fields['Type'] || 'edit').toLowerCase(),
        assignee: r.fields['Assignee'] || 'Saakshi',
        dueTime: r.fields['Due Time'] || 'Today, 5:00 PM',
        status: (r.fields['Status'] || 'todo').toLowerCase(),
        effortPoints: Number(r.fields['Effort Points'] || 3),
        brief: {
          language: r.fields['Brief Language'] || 'Hinglish',
          summary: r.fields['Brief Summary'] || '',
          hook3Sec: r.fields['Hook 3 Sec'] || '',
          cta: r.fields['CTA'] || '',
          referenceLinks: r.fields['Reference Links'] ? [r.fields['Reference Links']] : [],
          defaultRule: r.fields['Default Rule'] || 'Stick to brand guidelines',
          sopChecklist: checklist.length > 0 ? checklist : ['Check 1080p 30fps export standard'],
        },
      };
    });

    if (assignee) {
      return mapped.filter((t: any) => t.assignee.toLowerCase() === assignee.toLowerCase());
    }
    return mapped;
  } catch (err) {
    console.warn('Falling back to local persistent tasks:', err);
    return localTasks;
  }
}

export async function updateTaskStatus(taskId: string, newStatus: TaskItem['status']): Promise<boolean> {
  const current = getPersistentTasks();
  const updated = current.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));
  savePersistentTasks(updated);

  if (!isAirtableConfigured) return true;

  try {
    await airtableFetch(`Tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        fields: {
          Status: newStatus,
        },
      }),
    });
    return true;
  } catch (err) {
    console.error('Failed to update task status in Airtable:', err);
    return false;
  }
}

export async function addTask(taskData: Partial<TaskItem>): Promise<TaskItem> {
  const current = getPersistentTasks();
  const newTask: TaskItem = {
    id: `t-${Date.now()}`,
    contentId: taskData.contentId || 'cnt-gen',
    clientName: taskData.clientName || 'General Agency',
    title: taskData.title || 'Untitled Task',
    type: taskData.type || 'edit',
    assignee: taskData.assignee || 'Saakshi',
    dueTime: taskData.dueTime || 'Today, 6:00 PM',
    status: taskData.status || 'todo',
    effortPoints: taskData.effortPoints || 3,
    brief: taskData.brief || {
      language: 'Hinglish',
      summary: 'Execute task according to client Brand Brain and Export standard.',
      hook3Sec: 'High-energy hook in first 3 seconds.',
      cta: 'Check bio link.',
      referenceLinks: [],
      defaultRule: 'If in doubt, follow 10-minute decision rule.',
      sopChecklist: ['Verify 1080x1920 9:16', 'Check -14 LUFS audio level', 'Safe zones cleared'],
    },
  };

  const updated = [newTask, ...current];
  savePersistentTasks(updated);
  return newTask;
}

// ----------------------------------------------------
// DECISIONS REPOSITORY (Founder Decision Queue)
// ----------------------------------------------------
export async function getDecisions(): Promise<DecisionItem[]> {
  return getPersistentDecisions();
}

export async function resolveDecision(decisionId: string, actionChosen: string): Promise<boolean> {
  const current = getPersistentDecisions();
  const updated = current.map((d) =>
    d.id === decisionId ? { ...d, status: 'approved' as const } : d
  );
  savePersistentDecisions(updated);
  return true;
}

// ----------------------------------------------------
// CONTENT ITEMS REPOSITORY (Client Review Portal)
// ----------------------------------------------------
export async function getContentItems(): Promise<ContentItem[]> {
  return getPersistentContent();
}

export async function addContentItem(contentData: Partial<ContentItem>): Promise<ContentItem> {
  const current = getPersistentContent();
  const scheduledPostTime = contentData.scheduledPostTime || new Date().toISOString();
  const newItem: ContentItem = {
    id: `cnt-${Date.now()}`,
    clientName: contentData.clientName || 'The Travelopedia',
    title: contentData.title || 'Untitled Post',
    platform: contentData.platform || 'Instagram',
    format: contentData.format || 'Reel',
    pillar: contentData.pillar || 'Travel Showcase',
    postDate: contentData.postDate || scheduledPostTime,
    scheduledPostTime,
    status: contentData.status || 'Scheduled',
    assignee: contentData.assignee || 'Unassigned',
    clientApprovalStatus: contentData.clientApprovalStatus || 'pending',
    caption: contentData.caption || '',
    firstComment: contentData.firstComment || '',
    videoUrl: contentData.videoUrl || 'https://assets.illustrativesphere.com/demo.mp4',
    thumbnailUrl: contentData.thumbnailUrl || '',
    evergreenFallbackAvailable: contentData.evergreenFallbackAvailable ?? false,
    isEvergreen: contentData.isEvergreen ?? false,
    proofUrl: contentData.proofUrl || '',
  };

  const updated = [newItem, ...current];
  savePersistentContent(updated);
  return newItem;
}

export async function updateContentApproval(
  contentId: string,
  approvalStatus: ContentItem['clientApprovalStatus'],
  feedback?: string
): Promise<boolean> {
  const current = getPersistentContent();
  const updated = current.map((c) =>
    c.id === contentId
      ? {
          ...c,
          clientApprovalStatus: approvalStatus,
          status: approvalStatus === 'approved' ? ('Scheduled' as const) : ('In edit' as const),
          clientFeedback: feedback || c.clientFeedback,
        }
      : c
  );
  savePersistentContent(updated);
  return true;
}

// ----------------------------------------------------
// VENDOR DELIVERABLES REPOSITORY (Vendor Ledger)
// ----------------------------------------------------
export async function getVendorDeliverables(): Promise<VendorDeliverable[]> {
  return getPersistentVendors();
}

export async function recordVendorIngest(data: {
  vendorId: string;
  itemsDelivered: number;
  itemsAccepted: number;
}): Promise<boolean> {
  const current = getPersistentVendors();
  const updated = current.map((v) =>
    v.id === data.vendorId
      ? {
          ...v,
          deliveredItems: v.deliveredItems + data.itemsDelivered,
          acceptedItems: v.acceptedItems + data.itemsAccepted,
        }
      : v
  );
  savePersistentVendors(updated);
  return true;
}

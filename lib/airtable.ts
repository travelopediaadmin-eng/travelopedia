import {
  INITIAL_CLIENTS,
  INITIAL_DECISIONS,
  INITIAL_TASKS,
  INITIAL_CONTENT_ITEMS,
  INITIAL_VENDOR_DELIVERABLES,
  Client,
  DecisionItem,
  TaskItem,
  ContentItem,
  VendorDeliverable,
} from '@/data/sphere-os-mock';

// In-memory fallback state to ensure the app works 100% out of the box
// Even before the user inputs their Airtable credentials.
let inMemoryClients: Client[] = [...INITIAL_CLIENTS];
let inMemoryDecisions: DecisionItem[] = [...INITIAL_DECISIONS];
let inMemoryTasks: TaskItem[] = [...INITIAL_TASKS];
let inMemoryContent: ContentItem[] = [...INITIAL_CONTENT_ITEMS];
let inMemoryVendors: VendorDeliverable[] = [...INITIAL_VENDOR_DELIVERABLES];

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
  if (!isAirtableConfigured) {
    return inMemoryClients;
  }

  try {
    const data = await airtableFetch('Clients');
    if (!data?.records) return inMemoryClients;

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
    console.warn('Falling back to local mock data for clients:', err);
    return inMemoryClients;
  }
}

// ----------------------------------------------------
// TASKS REPOSITORY (Staff My Day)
// ----------------------------------------------------
export async function getTasks(assignee?: string): Promise<TaskItem[]> {
  if (!isAirtableConfigured) {
    if (assignee) {
      return inMemoryTasks.filter((t) => t.assignee.toLowerCase() === assignee.toLowerCase());
    }
    return inMemoryTasks;
  }

  try {
    const data = await airtableFetch('Tasks');
    if (!data?.records) return inMemoryTasks;

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
    console.warn('Falling back to local mock data for tasks:', err);
    return inMemoryTasks;
  }
}

export async function updateTaskStatus(taskId: string, newStatus: TaskItem['status']): Promise<boolean> {
  // Update in-memory
  inMemoryTasks = inMemoryTasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));

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

// ----------------------------------------------------
// DECISIONS REPOSITORY (Founder Decision Queue)
// ----------------------------------------------------
export async function getDecisions(): Promise<DecisionItem[]> {
  return inMemoryDecisions;
}

export async function resolveDecision(decisionId: string, actionChosen: string): Promise<boolean> {
  inMemoryDecisions = inMemoryDecisions.map((d) =>
    d.id === decisionId ? { ...d, status: 'approved' } : d
  );
  return true;
}

// ----------------------------------------------------
// CONTENT ITEMS REPOSITORY (Client Review Portal)
// ----------------------------------------------------
export async function getContentItems(): Promise<ContentItem[]> {
  return inMemoryContent;
}

export async function updateContentApproval(
  contentId: string,
  approvalStatus: ContentItem['clientApprovalStatus'],
  feedback?: string
): Promise<boolean> {
  inMemoryContent = inMemoryContent.map((c) =>
    c.id === contentId
      ? {
          ...c,
          clientApprovalStatus: approvalStatus,
          status: approvalStatus === 'approved' ? 'Scheduled' : 'In edit',
          clientFeedback: feedback || c.clientFeedback,
        }
      : c
  );
  return true;
}

// ----------------------------------------------------
// VENDOR DELIVERABLES REPOSITORY (Vendor Ledger)
// ----------------------------------------------------
export async function getVendorDeliverables(): Promise<VendorDeliverable[]> {
  return inMemoryVendors;
}

export async function recordVendorIngest(data: {
  vendorId: string;
  itemsDelivered: number;
  itemsAccepted: number;
}): Promise<boolean> {
  inMemoryVendors = inMemoryVendors.map((v) =>
    v.id === data.vendorId
      ? {
          ...v,
          deliveredItems: v.deliveredItems + data.itemsDelivered,
          acceptedItems: v.acceptedItems + data.itemsAccepted,
        }
      : v
  );
  return true;
}

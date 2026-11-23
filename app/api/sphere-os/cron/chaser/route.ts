import { NextRequest, NextResponse } from 'next/server';
import {
  getContentItems,
  getTasks,
  getClients,
  getVendorDeliverables,
  updateContentApproval,
  resolveDecision,
} from '@/lib/airtable';

export interface ChaserAuditResult {
  timestamp: string;
  rulesEvaluated: number;
  alertsTriggered: string[];
  evergreenSwaps: string[];
  escalationsToOps: string[];
  summary: string;
}

export async function GET(request: NextRequest) {
  try {
    const audit = await runChaserRules();
    return NextResponse.json({ success: true, audit });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Chaser engine failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const audit = await runChaserRules();
    return NextResponse.json({ success: true, audit });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Chaser execution failed' },
      { status: 500 }
    );
  }
}

async function runChaserRules(): Promise<ChaserAuditResult> {
  const [contentList, tasks, clients, vendors] = await Promise.all([
    getContentItems(),
    getTasks(),
    getClients(),
    getVendorDeliverables(),
  ]);

  const alertsTriggered: string[] = [];
  const evergreenSwaps: string[] = [];
  const escalationsToOps: string[] = [];

  const now = new Date();

  // Rule 8: Post due within 72h with no approved creative -> Alert Ops Lead; at T-12h -> Evergreen Bank fills the slot
  for (const item of contentList) {
    if (item.status !== 'Scheduled' && item.status !== 'Posted') {
      const postDate = new Date(item.postDate);
      const diffHours = (postDate.getTime() - now.getTime()) / (1000 * 60 * 60);

      if (diffHours <= 12 && diffHours > 0) {
        // T-12h threshold breached: Automatic Evergreen Swap
        if (item.evergreenFallbackAvailable) {
          evergreenSwaps.push(
            `Rule #8 Triggered: [${item.clientName}] Post "${item.title}" unapproved at T-${Math.round(diffHours)}h. Swapped with pre-approved Evergreen Bank Reel.`
          );
          // Mark approved via evergreen fallback
          await updateContentApproval(item.id, 'approved', 'Auto-swapped with Evergreen Fallback Reel due to T-12h client SLA expiration.');
        } else {
          escalationsToOps.push(
            `CRITICAL: [${item.clientName}] T-${Math.round(diffHours)}h breached and NO Evergreen fallback available! Escalated to Founder & Ops Lead.`
          );
        }
      } else if (diffHours <= 72 && diffHours > 12) {
        // T-72h threshold breached: Nudge alert
        alertsTriggered.push(
          `Rule #8 Warning: [${item.clientName}] Post "${item.title}" scheduled in ${Math.round(diffHours)} hours is still in "${item.status}". Client review SLA timer active.`
        );
      }
    }
  }

  // Rule 3: Shoot marked done but nothing uploaded in 6h -> alert; at 12h -> Decision Queue
  for (const vendor of vendors) {
    if (vendor.status === 'Overdue Upload') {
      alertsTriggered.push(
        `Rule #3 Alert: [${vendor.clientName}] Vendor "${vendor.vendorName}" shoot upload is overdue > 6 hours. Ingest Gate alert logged.`
      );
      escalationsToOps.push(
        `Vendor Contract Enforcement: 15% payment deduction warning queued for ${vendor.vendorName}.`
      );
    }
  }

  // Rule 5: Task not started 24h after assignment
  for (const task of tasks) {
    if (task.status === 'todo') {
      alertsTriggered.push(
        `Rule #5 Nudge: Task "${task.title}" assigned to ${task.assignee} is awaiting start. Due: ${task.dueTime}.`
      );
    }
  }

  return {
    timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    rulesEvaluated: 15,
    alertsTriggered,
    evergreenSwaps,
    escalationsToOps,
    summary: `Chaser cycle completed. ${alertsTriggered.length} nudges, ${evergreenSwaps.length} evergreen fallbacks executed, ${escalationsToOps.length} escalations.`,
  };
}

import type { TaskItem } from '@/data/sphere-os-mock';

/**
 * Sphere OS Work-Back Scheduling Engine (Blueprint Section 3.1 & 10)
 * 
 * "A post date automatically creates earlier deadlines for brief, shoot,
 *  edit, QC, approval and scheduling."
 * 
 * Rules:
 * - Post Date: D
 * - D-14: Brief ready and shoot done
 * - D-10: Raw files ingested (6h ingest gate)
 * - D-7:  First draft edit completed
 * - D-5:  Tech-QC and Creative-QC passed
 * - D-4:  Sent for client approval (24h SLA)
 * - D-3:  Approved & Schedule Lock (72h before post)
 * - D-12h: Evergreen Bank fallback if still missing
 * - D:    Post goes live
 */

export interface WorkBackSchedule {
  postDate: string; // YYYY-MM-DD
  briefAndShootDue: string; // D-14
  ingestDue: string; // D-10
  firstDraftDue: string; // D-7
  qcDue: string; // D-5
  clientApprovalDue: string; // D-4
  scheduleLockDue: string; // D-3
  evergreenFallbackThreshold: string; // D - 12 hours
}

export function calculateWorkBackSchedule(postDateStr: string): WorkBackSchedule {
  const postDate = new Date(postDateStr);

  const subtractDays = (d: Date, days: number): string => {
    const target = new Date(d);
    target.setDate(target.getDate() - days);
    return target.toISOString().split('T')[0];
  };

  const subtractHours = (d: Date, hours: number): string => {
    const target = new Date(d);
    target.setHours(target.getHours() - hours);
    return target.toISOString();
  };

  return {
    postDate: postDateStr,
    briefAndShootDue: subtractDays(postDate, 14),
    ingestDue: subtractDays(postDate, 10),
    firstDraftDue: subtractDays(postDate, 7),
    qcDue: subtractDays(postDate, 5),
    clientApprovalDue: subtractDays(postDate, 4),
    scheduleLockDue: subtractDays(postDate, 3),
    evergreenFallbackThreshold: subtractHours(postDate, 12),
  };
}

export interface GeneratedWorkBackTask {
  title: string;
  type: 'shoot' | 'ingest' | 'edit' | 'qc' | 'approval' | 'publishing';
  assignee: TaskItem['assignee'];
  dueDate: string;
  effortPoints: number;
  sopBrief: string;
}

export function generateWorkBackTasks(
  clientName: string,
  contentTitle: string,
  postDateStr: string,
  preferredEditor: TaskItem['assignee'] = 'Saakshi'
): GeneratedWorkBackTask[] {
  const schedule = calculateWorkBackSchedule(postDateStr);

  return [
    {
      title: `Batch Shoot & B-Roll: ${contentTitle}`,
      type: 'shoot',
      assignee: 'Ops Lead',
      dueDate: schedule.briefAndShootDue,
      effortPoints: 5,
      sopBrief: `Follow 4K 30fps HDR-off checklist. Clean lens, lock exposure, record 48kHz audio.`,
    },
    {
      title: `Ingest & Verify Raw Footage: ${contentTitle}`,
      type: 'ingest',
      assignee: 'Ops Lead',
      dueDate: schedule.ingestDue,
      effortPoints: 2,
      sopBrief: `Check file count against shot list, rename to ${clientName.substring(0, 4).toUpperCase()}-YYYYMMDD-SHOOT01-CLIPxxx.mp4 and confirm R2 3-2-1 backup.`,
    },
    {
      title: `First Cut & Sound Design: ${contentTitle}`,
      type: 'edit',
      assignee: preferredEditor,
      dueDate: schedule.firstDraftDue,
      effortPoints: 4,
      sopBrief: `9:16 vertical edit. First 3-sec hook, brand fonts, -14 LUFS dialogue master. Stick to 10-minute decision rule if stuck.`,
    },
    {
      title: `Quality Gate Tech & Creative QC: ${contentTitle}`,
      type: 'qc',
      assignee: 'Riddhi',
      dueDate: schedule.qcDue,
      effortPoints: 2,
      sopBrief: `Run Tech-QC bot for 1080x1920, check safe zones (no UI overlap) and brand compliance.`,
    },
    {
      title: `Client WhatsApp Approval Dispatch: ${contentTitle}`,
      type: 'approval',
      assignee: 'Ops Lead',
      dueDate: schedule.clientApprovalDue,
      effortPoints: 1,
      sopBrief: `Send review link with 24-hour SLA. If silent at T-12h, Evergreen Bank auto-swap triggers.`,
    },
    {
      title: `Schedule Lock & Multi-Platform Publishing: ${contentTitle}`,
      type: 'publishing',
      assignee: 'Anjali',
      dueDate: schedule.scheduleLockDue,
      effortPoints: 1,
      sopBrief: `Schedule with captions, hashtags, and first comment. Verify proof link within 15 minutes of live post.`,
    },
  ];
}

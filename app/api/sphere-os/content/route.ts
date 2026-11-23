import { NextRequest, NextResponse } from 'next/server';
import { getContentItems, updateContentApproval, addContentItem, addTask } from '@/lib/airtable';
import { generateWorkBackTasks, calculateWorkBackSchedule } from '@/lib/workback';

export async function GET() {
  try {
    const content = await getContentItems();
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientName, title, platform, format, scheduledPostDate, caption, preferredEditor } = body;

    if (!title || !scheduledPostDate) {
      return NextResponse.json(
        { success: false, error: 'Title and scheduledPostDate are required' },
        { status: 400 }
      );
    }

    const editors = ['Saakshi', 'Riddhi', 'Anjali', 'Ops Lead'] as const;
    const assignedEditor = editors.find((editor) => editor === preferredEditor) || 'Saakshi';

    // 1. Save Content Item
    const newContent = await addContentItem({
      clientName: clientName || 'The Travelopedia',
      title,
      platform: platform || 'Instagram',
      format: format || 'Reel',
      scheduledPostTime: `${scheduledPostDate}T18:00:00Z`,
      caption: caption || '',
      status: 'Planned',
      clientApprovalStatus: 'pending',
    });

    // 2. Blueprint Principle 2: Automated Work-Back Scheduling Engine
    // Automatically creates tasks with D-14, D-10, D-7, D-5, D-4, D-3 dates
    const workBackTasks = generateWorkBackTasks(
      newContent.clientName,
      newContent.title,
      scheduledPostDate,
      assignedEditor
    );

    const createdTasks = [];
    for (const t of workBackTasks) {
      const created = await addTask({
        contentId: newContent.id,
        clientName: newContent.clientName,
        title: t.title,
        type: t.type === 'publishing' ? 'schedule' : t.type,
        assignee: t.assignee,
        dueTime: `${t.dueDate}, 5:00 PM`,
        effortPoints: t.effortPoints,
        brief: {
          language: 'Hinglish',
          summary: t.sopBrief,
          hook3Sec: 'High-retention 3s hook',
          cta: 'Link in bio',
          referenceLinks: [],
          defaultRule: 'If in doubt, follow the 10-minute rule.',
          sopChecklist: [
            'Follow Export Standard (1080x1920 9:16 vertical)',
            '-14 LUFS clear dialogue audio level',
            'No UI overlap safe zones cleared',
          ],
        },
      });
      createdTasks.push(created);
    }

    const schedule = calculateWorkBackSchedule(scheduledPostDate);

    return NextResponse.json({
      success: true,
      content: newContent,
      workBackSchedule: schedule,
      createdTasksCount: createdTasks.length,
      tasks: createdTasks,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create content' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentId, approvalStatus, feedback } = body;

    if (!contentId || !approvalStatus) {
      return NextResponse.json(
        { success: false, error: 'contentId and approvalStatus are required' },
        { status: 400 }
      );
    }

    const success = await updateContentApproval(contentId, approvalStatus, feedback);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update approval' },
      { status: 500 }
    );
  }
}

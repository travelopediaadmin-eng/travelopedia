import { NextRequest, NextResponse } from 'next/server';
import { getTasks, updateTaskStatus, addTask } from '@/lib/airtable';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const assignee = searchParams.get('assignee') || undefined;
    const tasks = await getTasks(assignee);
    return NextResponse.json({ success: true, tasks });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, clientName, assignee, type, dueTime, briefSummary } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    const created = await addTask({
      title,
      clientName: clientName || 'General Agency',
      assignee: assignee || 'Saakshi',
      type: type || 'edit',
      dueTime: dueTime || 'Today, 6:00 PM',
      brief: {
        language: 'Hinglish',
        summary: briefSummary || 'Execute per Brand Brain guidelines.',
        hook3Sec: 'Hook in first 3s',
        cta: 'Check bio link',
        referenceLinks: [],
        defaultRule: 'If in doubt, follow the 10-minute rule.',
        sopChecklist: ['Verify 1080x1920 9:16', 'Check -14 LUFS audio level', 'Safe zones cleared'],
      },
    });

    return NextResponse.json({ success: true, task: created });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create task' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { taskId, status } = body;

    if (!taskId || !status) {
      return NextResponse.json(
        { success: false, error: 'taskId and status are required' },
        { status: 400 }
      );
    }

    const success = await updateTaskStatus(taskId, status);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update task' },
      { status: 500 }
    );
  }
}

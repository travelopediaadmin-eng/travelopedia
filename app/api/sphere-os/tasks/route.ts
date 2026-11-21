import { NextRequest, NextResponse } from 'next/server';
import { getTasks, updateTaskStatus } from '@/lib/airtable';

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

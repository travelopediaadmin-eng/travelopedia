import { NextResponse } from 'next/server';
import { updateDestination, deleteDestination } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = updateDestination(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, destination: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update destination' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const deleted = deleteDestination(params.id);
  if (!deleted) {
    return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: 'Destination deleted' });
}

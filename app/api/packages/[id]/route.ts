import { NextResponse } from 'next/server';
import { getPackageById, updatePackage, deletePackage } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const pkg = getPackageById(params.id);
  if (!pkg) {
    return NextResponse.json({ error: 'Package not found' }, { status: 404 });
  }
  return NextResponse.json({ package: pkg });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = updatePackage(params.id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, package: updated });
  } catch (error) {
    console.error('Failed to update package:', error);
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const deleted = deletePackage(params.id);
  if (!deleted) {
    return NextResponse.json({ error: 'Package not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: 'Package deleted' });
}

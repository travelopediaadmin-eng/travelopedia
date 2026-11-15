import { NextResponse } from 'next/server';
import { getAllDestinations, saveDestination } from '@/lib/db';

export async function GET() {
  const destinations = getAllDestinations();
  return NextResponse.json({ destinations });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.countryOrState) {
      return NextResponse.json({ error: 'Name and country/state are required' }, { status: 400 });
    }

    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newDest = saveDestination({
      slug,
      name: body.name,
      countryOrState: body.countryOrState,
      category: body.category || 'international',
      coverImage: body.coverImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      tagline: body.tagline || '',
      packagesCount: Number(body.packagesCount) || 1,
      topAttractions: Array.isArray(body.topAttractions) ? body.topAttractions : (body.topAttractions ? body.topAttractions.split(',').map((s: string) => s.trim()) : []),
      featured: Boolean(body.featured)
    });

    return NextResponse.json({ success: true, destination: newDest }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 });
  }
}

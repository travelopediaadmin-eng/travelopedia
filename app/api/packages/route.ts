import { NextResponse } from 'next/server';
import { getAllPackages, savePackage } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category'); // international, domestic
    const featured = searchParams.get('featured');
    const includeInactive = searchParams.get('all') === 'true';

    let packages = getAllPackages(includeInactive);

    if (category) {
      packages = packages.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (featured === 'true') {
      packages = packages.filter(p => p.featured);
    }

    return NextResponse.json({ packages });
  } catch (error) {
    console.error('Failed to get packages:', error);
    return NextResponse.json({ error: 'Failed to retrieve packages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.destination || !body.basePrice) {
      return NextResponse.json(
        { error: 'Title, destination, and base price are required' },
        { status: 400 }
      );
    }

    // Auto-generate slug if missing
    let slug = body.slug;
    if (!slug) {
      slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const newPackage = savePackage({
      slug,
      title: body.title,
      subtitle: body.subtitle || '',
      category: body.category || 'international',
      subcategory: body.subcategory || 'General',
      destination: body.destination,
      durationNights: Number(body.durationNights) || 5,
      durationDays: Number(body.durationDays) || 6,
      tripType: body.tripType || 'Customized',
      basePrice: Number(body.basePrice) || 0,
      discountedPrice: Number(body.discountedPrice) || Number(body.basePrice) || 0,
      heroImage: body.heroImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      gallery: Array.isArray(body.gallery) && body.gallery.length > 0 ? body.gallery : [body.heroImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'],
      overview: body.overview || '',
      highlights: Array.isArray(body.highlights) ? body.highlights : (body.highlights ? body.highlights.split('\n').filter(Boolean) : []),
      inclusions: Array.isArray(body.inclusions) ? body.inclusions : (body.inclusions ? body.inclusions.split('\n').filter(Boolean) : []),
      exclusions: Array.isArray(body.exclusions) ? body.exclusions : (body.exclusions ? body.exclusions.split('\n').filter(Boolean) : []),
      itinerary: Array.isArray(body.itinerary) ? body.itinerary : [],
      hotelRating: Number(body.hotelRating) || 4,
      flightsIncluded: Boolean(body.flightsIncluded),
      mealsIncluded: Boolean(body.mealsIncluded),
      transfersIncluded: Boolean(body.transfersIncluded),
      bestTimeToVisit: body.bestTimeToVisit || 'Year-round',
      badge: body.badge || '',
      featured: Boolean(body.featured),
      active: body.active !== undefined ? Boolean(body.active) : true
    });

    return NextResponse.json({ success: true, package: newPackage }, { status: 201 });
  } catch (error) {
    console.error('Failed to create package:', error);
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}

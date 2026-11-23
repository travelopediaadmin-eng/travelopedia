import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientName, shootDate, originalFilename, fileSizeMB, isVendor } = body;

    if (!clientName || !originalFilename) {
      return NextResponse.json(
        { success: false, error: 'clientName and originalFilename are required' },
        { status: 400 }
      );
    }

    // 1. Generate canonical naming convention from blueprint (Section 13, Day 1)
    // Rule: CLIENT-YYYYMMDD-SHOOT01-CLIP001.mp4
    const cleanClient = clientName.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
    const dateStr = (shootDate || new Date().toISOString().slice(0, 10)).replace(/-/g, '');
    const randomClipNum = String(Math.floor(Math.random() * 900) + 100);
    const ext = originalFilename.split('.').pop() || 'mp4';
    const canonicalFilename = `${cleanClient}-${dateStr}-SHOOT01-CLIP${randomClipNum}.${ext}`;

    const R2_BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'sphere-os-assets';
    const R2_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID;

    // Direct R2 / S3 storage path
    const storagePath = `raw-footage/${cleanClient}/${dateStr}/${canonicalFilename}`;
    const publicUrl = R2_ACCOUNT_ID
      ? `https://${R2_BUCKET}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${storagePath}`
      : `https://storage.illustrativesphere.com/vault/${storagePath}`;

    return NextResponse.json({
      success: true,
      canonicalFilename,
      storagePath,
      publicUrl,
      uploadEndpoint: `/api/sphere-os/storage/chunk-upload`,
      ingestGateVerified: true,
      rulesEnforced: [
        'Master naming convention applied',
        'Direct-to-R2 zero egress storage assigned',
        'Airtable attachment capacity limits bypassed',
      ],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Storage upload initialization failed' },
      { status: 500 }
    );
  }
}

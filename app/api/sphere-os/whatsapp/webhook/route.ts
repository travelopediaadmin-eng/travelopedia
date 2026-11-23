import { NextRequest, NextResponse } from 'next/server';
import { updateContentApproval } from '@/lib/airtable';

// Verification endpoint for Meta WhatsApp Cloud API
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'sphere_os_webhook_secret_2026';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

// Inbound webhook event processor
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Support both direct simulation payloads and Meta Cloud API webhook formats
    const messageType = payload.type || payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.type || 'text';
    const from = payload.from || payload.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]?.wa_id || '+919876543210';
    const textBody = payload.text || payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body || '';

    let parsedAction: any = null;

    if (messageType === 'voice' || payload.isVoiceNote) {
      // 1. Voice-to-Task Pipeline (Module 5 & Section 11, Rule 9)
      // Simulates or processes Whisper transcription of Hindi/Gujarati/English voice notes
      const sampleAudioTranscript = payload.audioTranscript ||
        'Saakshi ne kaho ke Zaveri bridal choker reel ma thodu gold transition fast kare and aaj sanje 4 vage sudhi ma submit kare.';

      parsedAction = {
        type: 'voice_to_task',
        originalLanguage: 'Gujlish / Hinglish',
        transcribedText: sampleAudioTranscript,
        extractedTask: {
          client: 'Zaveri & Sons Heritage',
          assignee: 'Saakshi',
          title: 'Zaveri Bridal Choker: Fast Gold Transition Polish',
          dueTime: 'Today, 4:00 PM',
          effortPoints: 4,
          confidenceScore: 0.96,
        },
        status: 'Auto-created in Tasks & My Day',
      };
    } else if (textBody.toLowerCase().includes('approve')) {
      // 2. Client Approval via WhatsApp
      await updateContentApproval('cnt-1', 'approved', 'Approved via WhatsApp Quick Reply');
      parsedAction = {
        type: 'client_whatsapp_approval',
        contentId: 'cnt-1',
        status: 'Post Approved & Scheduled',
        source: `WhatsApp sender: ${from}`,
      };
    } else {
      // 3. Regular chat note
      parsedAction = {
        type: 'text_note',
        content: textBody,
        status: 'Logged in Activity Log',
      };
    }

    return NextResponse.json({
      success: true,
      receivedAt: new Date().toISOString(),
      action: parsedAction,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'WhatsApp webhook processing failed' },
      { status: 500 }
    );
  }
}

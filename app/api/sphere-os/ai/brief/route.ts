import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientName, ideaText, format, language } = body;

    if (!clientName || !ideaText) {
      return NextResponse.json(
        { success: false, error: 'clientName and ideaText are required' },
        { status: 400 }
      );
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    // If Gemini API Key is provided, call Google Generative AI
    if (GEMINI_API_KEY) {
      const prompt = `You are the Creative Director AI for IllustrativeSphere, a premium social media marketing agency in India.
Draft an Instagram content brief grounded in the client's Brand Brain.
Client: ${clientName}
Inspiration/Idea: ${ideaText}
Format: ${format || 'Reel (9:16)'}
Language: ${language || 'Hinglish'}

Return a valid JSON object matching this schema:
{
  "hook3Sec": "Punchy 3-second visual and on-screen text hook",
  "summary": "Step-by-step concept breakdown in conversational ${language}",
  "cta": "Specific CTA instruction",
  "caption": "Full Instagram caption with 5 relevant hashtags",
  "firstComment": "First comment to drive engagement/enquiry",
  "defaultRule": "If in doubt, do this (safe aesthetic/brand rule)",
  "shotList": ["Shot 1: description", "Shot 2: description", "Shot 3: description"]
}
Do NOT include markdown formatting or backticks around the json. Output raw JSON only.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return NextResponse.json({ success: true, brief: parsed, source: 'Gemini 1.5 Flash' });
        }
      }
    }

    // High quality offline fallback generator if GEMINI_API_KEY is not yet added
    const fallbackBrief = generateOfflineBrief(clientName, ideaText, format || 'Reel', language || 'Hinglish');
    return NextResponse.json({ success: true, brief: fallbackBrief, source: 'Brand Brain Rule Engine' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate brief' },
      { status: 500 }
    );
  }
}

function generateOfflineBrief(client: string, idea: string, format: string, lang: string) {
  const isJewellery = client.toLowerCase().includes('zaveri') || client.toLowerCase().includes('jewel');
  const isFood = client.toLowerCase().includes('chai') || client.toLowerCase().includes('gourmet');

  if (isJewellery) {
    return {
      hook3Sec: 'Text on Screen: "This isn\'t just gold. It\'s 200 years of Surat heritage."',
      summary: `High-polish luxury reel based on: "${idea}". First 3 seconds mein macro sparkle shot aana chahiye. Slow-mo 60fps pan to the master craftsmanship.`,
      cta: 'Book your private bridal viewing at Athwa Lines showroom. Link in bio.',
      caption: `Centuries of artistry, crafted for your most unforgettable day. Discover our master bridal collection in Surat. ✨ #ZaveriHeritage #SuratJewellery #BridalPolki #HandcraftedLuxury`,
      firstComment: 'DM us "BRIDAL" for exclusive catalogue & appointment.',
      defaultRule: 'If in doubt on pacing, keep transitions at 0.4s and use warm gold color grade (Rec.709 sRGB only).',
      shotList: [
        'Shot 1: Extreme macro sparkle on solitaire (0-2s)',
        'Shot 2: Artisan hands setting uncut emerald (2-5s)',
        'Shot 3: Bridal model mirror reveal with soft ambient lighting (5-12s)',
      ],
    };
  }

  if (isFood) {
    return {
      hook3Sec: '"Stop boiling tea this way! Surat cafe masters do this instead..."',
      summary: `Snappy sensory cut-down based on: "${idea}". Sound effects (wooshes and spice grinding sounds) on every 1.2 second cut. In-app trending beat.`,
      cta: 'Tag that friend who drinks 4 cups a day. VIP Road outlet open till 11 PM.',
      caption: `Thandi hawa + garma-garam kulhad chai = unmatched Surat winter vibe! ☕ Visit our VIP Road outlet today. #UrbanChai #SuratFoodies #KulhadChai #WinterVibes`,
      firstComment: 'Kaun chal raha hai chai pe? Tag below 👇',
      defaultRule: 'Fast jump cuts, no elaborate color grade needed, stick to clean contrast.',
      shotList: [
        'Shot 1: Slow-mo boiling chai bubbling into kulhad (0-2s)',
        'Shot 2: Quick cuts of cardamom, cinnamon, and fresh ginger crushing (2-6s)',
        'Shot 3: Steam rising with warm evening cafe bokeh background (6-10s)',
      ],
    };
  }

  return {
    hook3Sec: `Wait! Before you buy your next outfit, watch this...`,
    summary: `Brand authority showcase based on: "${idea}". Pacing is confident and informative with clear typography.`,
    cta: 'Explore the new collection online or visit our Surat flagship store.',
    caption: `Designed with pride, styled for celebration. Step into elegance with our latest collection. 💫 #SuratFashion #EthnicWear #NewCollection`,
    firstComment: 'Save this post for your upcoming wedding shopping checklist!',
    defaultRule: 'Keep typography within 9:16 safe zones, 1080p 30fps export standard.',
    shotList: [
      'Shot 1: High energy hook with model motion (0-2s)',
      'Shot 2: Fabric texture and embroidery close-up (2-6s)',
      'Shot 3: Full silhouette showcase with bold CTA overlay (6-12s)',
    ],
  };
}

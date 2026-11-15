'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'gu' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    gu: string;
    hi: string;
  };
}

export const DICTIONARY: Translations = {
  // Navigation
  waysToTravel: {
    en: 'Ways to Travel',
    gu: 'પ્રવાસની રીતો',
    hi: 'यात्रा के प्रकार'
  },
  destinations: {
    en: 'Destinations',
    gu: 'સ્થળો',
    hi: 'गंतव्य स्थल'
  },
  inspiration: {
    en: 'Inspiration',
    gu: 'પ્રેરણા & થીમ્સ',
    hi: 'थीम्स & प्रेरणा'
  },
  aboutUs: {
    en: 'About Us',
    gu: 'અમારા વિશે',
    hi: 'हमारे बारे में'
  },
  myTripPortal: {
    en: 'My Trip Portal',
    gu: 'મારું બુકિંગ / પોર્ટલ',
    hi: 'मेरी ट्रिप / पोर्टल'
  },
  talkToSpecialist: {
    en: 'TALK TO A SPECIALIST',
    gu: 'નિષ્ણાત સાથે વાત કરો',
    hi: 'विशेषज्ञ से बात करें'
  },
  suratOffice: {
    en: '7, E-Space, VIP Road, Vesu, Surat (Beside Domino\'s)',
    gu: '૭, ઈ-સ્પેસ, વીઆઈપી રોડ, વેસુ, સુરત (ડોમિનોઝ પાસે)',
    hi: '7, ई-स्पेस, वीआईपी रोड, वेसु, सूरत (डोमिनोज़ के पास)'
  },
  trustedPartner: {
    en: 'Surat\'s Trusted Luxury Travel Partner',
    gu: 'સુરતનો વિશ્વાસુ લક્ઝરી ટ્રાવેલ પાર્ટનર',
    hi: 'सूरत का विश्वसनीय लक्ज़री ट्रैवल पार्टनर'
  },

  // 4 Core Services
  flightTickets: {
    en: 'Flight Tickets',
    gu: 'ફ્લાઇટ ટિકિટ્સ',
    hi: 'फ़्लाइट टिकट्स'
  },
  hotelBooking: {
    en: 'Hotel Booking',
    gu: 'હોટેલ બુકિંગ',
    hi: 'होटल बुकिंग'
  },
  tourPackages: {
    en: 'Tour Packages',
    gu: 'ટૂર પેકેજીસ',
    hi: 'टूर पैकेज'
  },
  carHire: {
    en: 'Car Hire & Transfers',
    gu: 'કાર હાયર & ટ્રાન્સફર્સ',
    hi: 'कार हायर & ट्रांसफ़र'
  },

  // Hero Headline
  heroTitle1: {
    en: 'This is where your',
    gu: 'આ એ જગ્યા છે જ્યાં તમારી',
    hi: 'यहीं से शुरू होता है आपका'
  },
  heroTitle2: {
    en: 'love for travel begins.',
    gu: 'પ્રવાસ માટેનો પ્રેમ શરૂ થાય છે.',
    hi: 'सफ़र का हसीन सफ़र।'
  },
  heroSubtitle: {
    en: 'Curated international holidays, private villas, and bespoke domestic tours crafted on VIP Road, Vesu. 100% vegetarian & Jain friendly care.',
    gu: 'વીઆઈપી રોડ, વેસુથી ક્યુરેટેડ આંતરરાષ્ટ્રીય પ્રવાસો, ખાનગી વિલા અને વિશિષ્ટ પ્રવાસો. ૧૦૦% શુદ્ધ શાકાહારી અને જૈન ભોજન સુવિધા.',
    hi: 'वीआईपी रोड, वेसु से क्यूरेटेड इंटरनेशनल हॉलीडेज़, प्राइवेट विला और कस्टम टूर। 100% शुद्ध शाकाहारी और जैन भोजन व्यवस्था।'
  },

  // Search Bar
  whereTo: {
    en: 'Where to?',
    gu: 'ક્યાં જવું છે?',
    hi: 'कहाँ जाना है?'
  },
  whoTravelling: {
    en: 'Who\'s travelling?',
    gu: 'કોણ મુસાફરી કરી રહ્યું છે?',
    hi: 'कौन यात्रा कर रहा है?'
  },
  whenDates: {
    en: 'When?',
    gu: 'ક્યારે?',
    hi: 'कब जाना है?'
  },
  searchBtn: {
    en: 'Search',
    gu: 'શોધો',
    hi: 'सर्च करें'
  },
  popularNow: {
    en: 'Popular right now:',
    gu: 'અત્યારે સૌથી વધુ પસંદગીના:',
    hi: 'अभी सबसे लोकप्रिय:'
  },

  // Trust Badges
  jainFoodCare: {
    en: '100% Pure Veg & Jain Food Care',
    gu: '૧૦૦% શુદ્ધ શાકાહારી અને જૈન ફૂડ કેર',
    hi: '100% शुद्ध शाकाहारी और जैन भोजन'
  },
  vesuOffice: {
    en: 'Physical Office at VIP Road, Vesu',
    gu: 'વીઆઈપી રોડ, વેસુ ખાતે વાસ્તવિક ઓફિસ',
    hi: 'वीआईपी रोड, वेसु में ऑफिस'
  },
  travelDesk24x7: {
    en: '24x7 Dedicated Travel Desk',
    gu: '૨૪x૭ સમર્પિત ટ્રાવેલ ડેસ્ક',
    hi: '24x7 समर्पित ट्रैवल डेस्क'
  },

  // AI Assistant
  aiAssistantBtn: {
    en: 'ASK TRAVELO AI',
    gu: 'ટ્રાવેલો AI ને પૂછો',
    hi: 'ट्रैवेलो AI से पूछें'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Read from localStorage if present
    const saved = localStorage.getItem('travelopedia_lang') as Language;
    if (saved && (saved === 'en' || saved === 'gu' || saved === 'hi')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('travelopedia_lang', lang);
    } catch (e) {
      // ignore local storage error
    }
  };

  const t = (key: string): string => {
    const entry = DICTIONARY[key];
    if (!entry) return key;
    return entry[language] || entry.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

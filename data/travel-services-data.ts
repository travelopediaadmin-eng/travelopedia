import {
  FlightTicket,
  HotelProperty,
  CabOption,
  BusOption,
  TrainSchedule,
  ActivityTour,
  VisaRequirement
} from '@/types/travel';

// =================== FLIGHTS DATA ===================
export const SAMPLE_FLIGHTS: FlightTicket[] = [
  {
    id: 'fl-101',
    airline: 'Emirates',
    airlineCode: 'EK',
    flightNumber: 'EK-505',
    fromCity: 'Surat / Mumbai',
    fromCode: 'BOM',
    toCity: 'Dubai',
    toCode: 'DXB',
    departureTime: '04:30',
    arrivalTime: '06:15',
    duration: '3h 15m',
    stops: 0,
    cabinClass: 'Economy',
    price: 24500,
    baggage: '30 kg',
    cabinBaggage: '7 kg',
    refundable: true,
    jainMealAvailable: true,
    seatsLeft: 6
  },
  {
    id: 'fl-102',
    airline: 'Air India',
    airlineCode: 'AI',
    flightNumber: 'AI-983',
    fromCity: 'Surat / Ahmedabad',
    fromCode: 'AMD',
    toCity: 'London Heathrow',
    toCode: 'LHR',
    departureTime: '06:45',
    arrivalTime: '11:30',
    duration: '9h 15m',
    stops: 0,
    cabinClass: 'Economy',
    price: 52000,
    baggage: '2 x 23 kg',
    cabinBaggage: '8 kg',
    refundable: true,
    jainMealAvailable: true,
    seatsLeft: 4
  },
  {
    id: 'fl-103',
    airline: 'Singapore Airlines',
    airlineCode: 'SQ',
    flightNumber: 'SQ-423',
    fromCity: 'Surat / Mumbai',
    fromCode: 'BOM',
    toCity: 'Bali (Denpasar)',
    toCode: 'DPS',
    departureTime: '23:35',
    arrivalTime: '10:45',
    duration: '8h 40m',
    stops: 1,
    layoverCity: 'Singapore (SIN)',
    cabinClass: 'Economy',
    price: 38900,
    baggage: '25 kg',
    cabinBaggage: '7 kg',
    refundable: true,
    jainMealAvailable: true,
    seatsLeft: 9
  },
  {
    id: 'fl-104',
    airline: 'IndiGo',
    airlineCode: '6E',
    flightNumber: '6E-7241',
    fromCity: 'Surat',
    fromCode: 'STV',
    toCity: 'Delhi',
    toCode: 'DEL',
    departureTime: '08:50',
    arrivalTime: '10:35',
    duration: '1h 45m',
    stops: 0,
    cabinClass: 'Economy',
    price: 5400,
    baggage: '15 kg',
    cabinBaggage: '7 kg',
    refundable: true,
    jainMealAvailable: true,
    seatsLeft: 14
  },
  {
    id: 'fl-105',
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    flightNumber: 'QR-557',
    fromCity: 'Surat / Mumbai',
    fromCode: 'BOM',
    toCity: 'Athens (Santorini Connection)',
    toCode: 'ATH',
    departureTime: '04:10',
    arrivalTime: '12:20',
    duration: '10h 40m',
    stops: 1,
    layoverCity: 'Doha (DOH)',
    cabinClass: 'Business',
    price: 115000,
    baggage: '40 kg',
    cabinBaggage: '14 kg',
    refundable: true,
    jainMealAvailable: true,
    seatsLeft: 3
  }
];

// =================== HOTELS DATA ===================
export const SAMPLE_HOTELS: HotelProperty[] = [
  {
    id: 'htl-1',
    slug: 'canaves-oia-epitome-santorini',
    name: 'Canaves Oia Epitome Luxury Cave Suites',
    city: 'Santorini',
    country: 'Greece',
    stars: 5,
    address: 'Oia Village Caldera Cliff, Santorini 84702, Greece',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85'
    ],
    startingPrice: 38500,
    rating: 4.9,
    reviewCount: 342,
    pureVegKitchen: true,
    amenities: ['Caldera Sunset View', 'Private Infinity Plunge Pool', 'Jain Chef on Request', 'Airport Chauffeur', 'Luxury Spa'],
    overview: 'Perched over the Aegean Sea with private cave architecture, plunge pools, and bespoke vegetarian dining.',
    rooms: [
      {
        id: 'rm-101',
        name: 'Deluxe Caldera View Suite with Plunge Pool',
        bedType: '1 King Bed',
        sizeSqFt: 520,
        maxGuests: 2,
        pricePerNight: 38500,
        mealPlan: 'Breakfast Included',
        freeCancellation: true,
        amenities: ['Private Heated Pool', 'Caldera View', 'Espresso Bar', 'Luxury Bathrobe']
      },
      {
        id: 'rm-102',
        name: 'Honeymoon Pool Villa with Sunset Terrace',
        bedType: '1 King Bed + Daybed',
        sizeSqFt: 850,
        maxGuests: 3,
        pricePerNight: 58000,
        mealPlan: 'All Meals (Jain Friendly)',
        freeCancellation: true,
        amenities: ['Full Sunset Panorama', 'Private Butler', 'Jacuzzi', 'Outdoor Dining Pavilion']
      }
    ]
  },
  {
    id: 'htl-2',
    slug: 'atlantis-the-royal-dubai',
    name: 'Atlantis The Royal Palm Luxury Resort',
    city: 'Dubai',
    country: 'UAE',
    stars: 5,
    address: 'Palm Jumeirah, Crescent Rd, Dubai, United Arab Emirates',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85'
    ],
    startingPrice: 42000,
    rating: 4.95,
    reviewCount: 890,
    pureVegKitchen: true,
    amenities: ['Sky Pool 22nd Floor', 'Celebrity Restaurants', 'Aquaventure Access', 'Private Beach', 'Pure Veg Dining'],
    overview: 'Dubai’s ultra-luxury architectural icon on the Palm with sky gardens and Michelin dining options.',
    rooms: [
      {
        id: 'rm-201',
        name: 'Seascape King Room with Palm Island View',
        bedType: '1 Ultra King Bed',
        sizeSqFt: 600,
        maxGuests: 2,
        pricePerNight: 42000,
        mealPlan: 'Breakfast Included',
        freeCancellation: true,
        amenities: ['Balcony with Palm View', 'Marble Bathroom', 'Complimentary Waterpark', '24h Concierge']
      }
    ]
  },
  {
    id: 'htl-3',
    slug: 'the-khyber-himalayan-resort-gulmarg',
    name: 'The Khyber Himalayan Resort & Spa',
    city: 'Gulmarg, Kashmir',
    country: 'India',
    stars: 5,
    address: 'Near Gondola, Gulmarg 193403, Jammu and Kashmir',
    images: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85'
    ],
    startingPrice: 28000,
    rating: 4.85,
    reviewCount: 520,
    pureVegKitchen: true,
    amenities: ['Heated Indoor Pool', 'Gulmarg Gondola Walking Distance', 'Snow Peak Views', 'Jain Food Care', 'L’Occitane Spa'],
    overview: 'India’s premier ski resort located amidst snow-laden pine forests, 8,825 feet above sea level.',
    rooms: [
      {
        id: 'rm-301',
        name: 'Premier Himalayan View Room',
        bedType: '1 King Bed',
        sizeSqFt: 460,
        maxGuests: 2,
        pricePerNight: 28000,
        mealPlan: 'Breakfast Included',
        freeCancellation: true,
        amenities: ['Snow Peak Panorama', 'Kashmiri Walnut Wood Accents', 'Underfloor Heating']
      }
    ]
  }
];

// =================== CABS & TRANSFERS ===================
export const SAMPLE_CABS: CabOption[] = [
  {
    id: 'cab-sedan',
    vehicleName: 'Maruti Dzire / Toyota Etios',
    category: 'Sedan',
    passengerCapacity: 4,
    luggageCapacity: 2,
    ac: true,
    baseFare: 4200,
    includedKms: 280,
    perExtraKm: 14,
    tollStateTaxIncluded: true,
    driverAllowanceIncluded: true,
    idealFor: 'Couples and small families for airport transfers & Mumbai runs.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cab-innova',
    vehicleName: 'Toyota Innova Crysta / Hycross',
    category: 'Executive SUV',
    passengerCapacity: 6,
    luggageCapacity: 4,
    ac: true,
    baseFare: 6800,
    includedKms: 280,
    perExtraKm: 20,
    tollStateTaxIncluded: true,
    driverAllowanceIncluded: true,
    idealFor: 'Executive comfort, multi-baggage international airport drops, and family tours.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cab-van',
    vehicleName: 'Mercedes Sprinter / Force Urbania Luxury',
    category: 'Luxury Van',
    passengerCapacity: 12,
    luggageCapacity: 10,
    ac: true,
    baseFare: 14500,
    includedKms: 300,
    perExtraKm: 32,
    tollStateTaxIncluded: true,
    driverAllowanceIncluded: true,
    idealFor: 'VIP family delegations, weddings, and group expeditions.',
    image: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=600&q=80'
  }
];

// =================== BUSES DATA ===================
export const SAMPLE_BUSES: BusOption[] = [
  {
    id: 'bus-1',
    operatorName: 'Patel Tours & Travels (VIP Class)',
    busType: 'Volvo Multi-Axle B11R AC Sleeper (2+1)',
    fromCity: 'Surat (Katargam / Ring Road)',
    toCity: 'Ahmedabad (Paldi / ISKCON)',
    departureTime: '23:15',
    arrivalTime: '04:45',
    duration: '5h 30m',
    boardingPoint: 'Surat: Ring Road Sahara Darwaja',
    droppingPoint: 'Ahmedabad: Paldi Cross Roads',
    price: 850,
    rating: 4.8,
    totalSeats: 36,
    availableSeats: 12,
    liveTracking: true
  },
  {
    id: 'bus-2',
    operatorName: 'Neeta Tours & Travels Luxury',
    busType: 'Mercedes-Benz Super Luxury Sleeper',
    fromCity: 'Surat (VIP Road / Adajan)',
    toCity: 'Mumbai (Borivali / Dadar)',
    departureTime: '23:55',
    arrivalTime: '05:30',
    duration: '5h 35m',
    boardingPoint: 'Surat: VIP Road Vesu Drop point',
    droppingPoint: 'Mumbai: Borivali West / Dadar TT',
    price: 950,
    rating: 4.7,
    totalSeats: 32,
    availableSeats: 8,
    liveTracking: true
  },
  {
    id: 'bus-3',
    operatorName: 'Shrinath Travel Agency',
    busType: 'BharatBenz 2+1 AC Sleeper with Charging & WiFi',
    fromCity: 'Surat',
    toCity: 'Udaipur',
    departureTime: '20:30',
    arrivalTime: '06:00',
    duration: '9h 30m',
    boardingPoint: 'Surat: Surat Central Bus Terminal',
    droppingPoint: 'Udaipur: Udiapol Bus Stand',
    price: 1200,
    rating: 4.6,
    totalSeats: 36,
    availableSeats: 15,
    liveTracking: true
  }
];

// =================== TRAINS DATA ===================
export const SAMPLE_TRAINS: TrainSchedule[] = [
  {
    trainNumber: '20901',
    trainName: 'Vande Bharat Express',
    fromStation: 'Mumbai Central',
    fromCode: 'MMCT',
    toStation: 'Surat / Gandhinagar',
    toCode: 'ST',
    departureTime: '06:00',
    arrivalTime: '08:52',
    duration: '2h 52m',
    runningDays: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    classes: [
      { code: 'EC', name: 'Executive Chair Car', fare: 1850, availability: 'Available - 24' },
      { code: 'CC', name: 'AC Chair Car', fare: 995, availability: 'Available - 82' }
    ],
    pantryPureVeg: true
  },
  {
    trainNumber: '12951',
    trainName: 'Tejas Rajdhani Express',
    fromStation: 'Surat',
    fromCode: 'ST',
    toStation: 'New Delhi',
    toCode: 'NDLS',
    departureTime: '19:48',
    arrivalTime: '08:32',
    duration: '12h 44m',
    runningDays: ['Daily'],
    classes: [
      { code: '1A', name: 'First AC', fare: 4200, availability: 'Available - 4' },
      { code: '2A', name: 'Second AC', fare: 2600, availability: 'Available - 18' },
      { code: '3A', name: 'Third AC', fare: 1900, availability: 'Available - 46' }
    ],
    pantryPureVeg: true
  }
];

// =================== ACTIVITIES & SIGHTSEEING ===================
export const SAMPLE_ACTIVITIES: ActivityTour[] = [
  {
    id: 'act-1',
    title: 'Santorini Sunset Luxury Catamaran Cruise with BBQ',
    destination: 'Santorini',
    country: 'Greece',
    duration: '5 Hours',
    price: 14500,
    rating: 4.95,
    reviewsCount: 420,
    highlights: ['Red Beach & White Beach snorkeling', 'Hot springs volcanic soak', 'Vegetarian Greek feast & local wine', 'Oia sunset view from water'],
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    guideLanguages: ['English', 'Greek'],
    skipTheLine: true,
    instantConfirmation: true,
    includesPickUp: true
  },
  {
    id: 'act-2',
    title: 'Dubai Red Dune Desert Safari with VIP Majlis Dinner',
    destination: 'Dubai',
    country: 'UAE',
    duration: '6 Hours',
    price: 6800,
    rating: 4.88,
    reviewsCount: 1250,
    highlights: ['4x4 Dune bashing on Land Cruiser', 'Sunset sandboarding', 'VIP seated Jain & Veg BBQ buffet', 'Tanoura & Fire live show'],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    guideLanguages: ['English', 'Hindi', 'Arabic'],
    skipTheLine: true,
    instantConfirmation: true,
    includesPickUp: true
  },
  {
    id: 'act-3',
    title: 'Gulmarg Gondola Phase 1 & Phase 2 Alpine Snow Pass',
    destination: 'Gulmarg, Kashmir',
    country: 'India',
    duration: 'Full Day',
    price: 3200,
    rating: 4.9,
    reviewsCount: 680,
    highlights: ['Apharwat Peak 13,780 ft ascent', 'Pristine deep snow viewpoints', 'Skiing & sledge guidance', 'Skip queue expedited boarding'],
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    guideLanguages: ['Hindi', 'English', 'Kashmiri'],
    skipTheLine: true,
    instantConfirmation: true,
    includesPickUp: false
  }
];

// =================== VISA REQUIREMENTS ===================
export const SAMPLE_VISAS: VisaRequirement[] = [
  {
    id: 'visa-schengen',
    country: 'Schengen (Europe - Greece / Switzerland / France)',
    flag: '🇪🇺',
    visaType: 'Short Stay Tourist Visa (Type C)',
    processingTimeDays: '15 - 20 Working Days',
    validity: 'Up to 90 Days in 180 Days',
    embassyFee: 7800,
    serviceFee: 2500,
    approvalRatePercentage: 96.8,
    checklist: [
      'Original Passport valid for 6+ months from travel date',
      '2 Recent Biometric Photos (35x45mm, 80% face coverage on white background)',
      'Last 6 months Bank Statement (with bank stamp & min ₹2.5L balance)',
      'Income Tax Returns (ITR-V) for last 2 assessment years',
      'Covering Letter stating travel purpose & confirmed return itinerary',
      'Confirmed flight reservations and 5-star hotel vouchers (Provided by The Travelopedia)',
      'Travel Medical Insurance with €30,000 coverage'
    ],
    biometricsRequired: true,
    expressAvailable: false
  },
  {
    id: 'visa-uae',
    country: 'United Arab Emirates (Dubai)',
    flag: '🇦🇪',
    visaType: '30 Days Tourist e-Visa',
    processingTimeDays: '2 - 3 Working Days',
    validity: '58 Days from issuance (Single Entry)',
    embassyFee: 6500,
    serviceFee: 1200,
    approvalRatePercentage: 99.4,
    checklist: [
      'Passport Front & Back scanned color copy',
      'Passport size photograph with white background',
      'Confirmed Return Flight Tickets',
      'Pan Card of Primary Traveler'
    ],
    biometricsRequired: false,
    expressAvailable: true
  },
  {
    id: 'visa-uk',
    country: 'United Kingdom (UK)',
    flag: '🇬🇧',
    visaType: 'Standard Visitor Visa (6 Months)',
    processingTimeDays: '15 Working Days',
    validity: '6 Months (Multiple Entry)',
    embassyFee: 12500,
    serviceFee: 3000,
    approvalRatePercentage: 94.2,
    checklist: [
      'Original Passport with minimum 2 blank pages',
      'Employment Letter / Business GST registration',
      'Last 6 months Bank Statement showing verified funds',
      'ITR acknowledgements for last 3 years',
      'VFS Global appointment biometrics'
    ],
    biometricsRequired: true,
    expressAvailable: true
  }
];

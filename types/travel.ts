export type TravelCategory = 'international' | 'domestic';

export type TripType = 
  | 'Group Tour' 
  | 'Customized' 
  | 'Honeymoon' 
  | 'Luxury Expedition' 
  | 'Family Holiday' 
  | 'Weekend Getaway';

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  meals?: string;
  hotel?: string;
  activities?: string[];
}

export interface TravelPackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: TravelCategory;
  subcategory: string; // e.g. Europe, Middle East, Kashmir, Kerala
  destination: string; // e.g. Dubai, UAE
  durationNights: number;
  durationDays: number;
  tripType: TripType;
  basePrice: number;
  discountedPrice: number;
  heroImage: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  hotelRating: number; // 3, 4, 5
  flightsIncluded: boolean;
  mealsIncluded: boolean;
  transfersIncluded: boolean;
  bestTimeToVisit?: string;
  badge?: string; // "Bestseller", "Trending", "Luxury Special", etc.
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  countryOrState: string;
  category: TravelCategory;
  coverImage: string;
  tagline: string;
  packagesCount: number;
  topAttractions: string[];
  featured: boolean;
}

export type EnquiryStatus = 
  | 'New' 
  | 'Contacted' 
  | 'Proposal Sent' 
  | 'Confirmed' 
  | 'Cancelled';

export type DietaryPreference = 'Jain Friendly' | 'Pure Vegetarian' | 'Regular / Any';
export type PaymentStatus = 'Unpaid' | 'Advance Received' | 'Full Paid';

export interface Enquiry {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  packageId?: string;
  packageTitle?: string;
  destination: string;
  travelDate: string;
  durationDays?: string;
  adults: number;
  children: number;
  hotelCategory: string; // 3-Star, 4-Star, 5-Star, Luxury
  estimatedBudget: string;
  specialRequests?: string;
  status: EnquiryStatus;
  notes?: string;
  source: 'Package Page' | 'Custom Tour' | 'Quick Inquiry' | 'Hero Search' | 'Contact Form';
  assignedStaffId?: string;
  assignedStaffName?: string;
  dietaryPreference?: DietaryPreference;
  flightAssistance?: boolean;
  departureCity?: string;
  dealValue?: number;
  advancePaid?: number;
  paymentStatus?: PaymentStatus;
  followUpDate?: string;
}

export type StaffDepartment = 
  | 'International Holidays' 
  | 'Domestic Tours' 
  | 'Visa & Ticketing' 
  | 'Customized Luxury' 
  | 'Finance & Accounts';

export type StaffRole = 
  | 'Managing Director'
  | 'Senior Holiday Specialist' 
  | 'Travel Consultant' 
  | 'Visa Operations Manager' 
  | 'Air Ticketing Executive'
  | 'Accounts Executive';

export interface StaffMember {
  id: string;
  name: string;
  employeeCode: string;
  department: StaffDepartment;
  role: StaffRole;
  phone: string;
  email: string;
  avatar: string;
  activeLeadsCount: number;
  completedBookingsCount: number;
  totalRevenueGenerated: number;
  status: 'active' | 'on_leave' | 'inactive';
  joinedDate: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
}

// =================== 8 CORE TRAVEL SERVICES ===================

export interface FlightTicket {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  layoverCity?: string;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business';
  price: number;
  baggage: string;
  cabinBaggage: string;
  refundable: boolean;
  jainMealAvailable: boolean;
  seatsLeft: number;
}

export interface HotelRoom {
  id: string;
  name: string;
  bedType: string;
  sizeSqFt: number;
  maxGuests: number;
  pricePerNight: number;
  mealPlan: 'Room Only' | 'Breakfast Included' | 'All Meals (Jain Friendly)';
  freeCancellation: boolean;
  amenities: string[];
}

export interface HotelProperty {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  stars: number;
  address: string;
  images: string[];
  startingPrice: number;
  rating: number;
  reviewCount: number;
  pureVegKitchen: boolean;
  amenities: string[];
  overview: string;
  rooms: HotelRoom[];
}

export interface CabOption {
  id: string;
  vehicleName: string;
  category: 'Sedan' | 'Executive SUV' | 'Luxury Van';
  passengerCapacity: number;
  luggageCapacity: number;
  ac: boolean;
  baseFare: number;
  includedKms: number;
  perExtraKm: number;
  tollStateTaxIncluded: boolean;
  driverAllowanceIncluded: boolean;
  idealFor: string;
  image: string;
}

export interface BusOption {
  id: string;
  operatorName: string;
  busType: string; // e.g. Volvo Multi-Axle AC Sleeper
  fromCity: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  boardingPoint: string;
  droppingPoint: string;
  price: number;
  rating: number;
  totalSeats: number;
  availableSeats: number;
  liveTracking: boolean;
}

export interface TrainSchedule {
  trainNumber: string;
  trainName: string;
  fromStation: string;
  fromCode: string;
  toStation: string;
  toCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  runningDays: string[];
  classes: { code: string; name: string; fare: number; availability: string }[];
  pantryPureVeg: boolean;
}

export interface ActivityTour {
  id: string;
  title: string;
  destination: string;
  country: string;
  duration: string;
  price: number;
  rating: number;
  reviewsCount: number;
  highlights: string[];
  image: string;
  guideLanguages: string[];
  skipTheLine: boolean;
  instantConfirmation: boolean;
  includesPickUp: boolean;
}

export interface VisaRequirement {
  id: string;
  country: string;
  flag: string;
  visaType: string;
  processingTimeDays: string;
  validity: string;
  embassyFee: number;
  serviceFee: number;
  approvalRatePercentage: number;
  checklist: string[];
  biometricsRequired: boolean;
  expressAvailable: boolean;
}

export interface WebsitePage {
  id: string;
  slug: string;
  title: string;
  category: 'core' | 'service' | 'policy' | 'custom';
  metaTitle: string;
  metaDescription: string;
  isActive: boolean;
  isCustom: boolean;
  updatedAt: string;
}


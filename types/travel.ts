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
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
}

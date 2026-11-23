export type TravelRequestStatus = 
  | 'pending_verification'
  | 'new'
  | 'contacted'
  | 'quotation_sent'
  | 'follow_up'
  | 'confirmed'
  | 'cancelled';

export type NotificationStatus = 'pending' | 'sent' | 'failed';

export interface TravelRequest {
  id: string;
  request_number: string;
  customer_id?: string | null;
  customer_name: string;
  customer_email: string;
  customer_mobile: string;
  destination: string;
  travel_start_date: string;
  travel_return_date?: string | null;
  travellers_count: number;
  budget?: string | null;
  requirements?: string | null;
  email_verified: boolean;
  status: TravelRequestStatus;
  assigned_to?: string | null;
  admin_notified: boolean;
  notification_status: NotificationStatus;
  notification_error?: string | null;
  notification_sent_at?: string | null;
  source?: string | null;
  metadata?: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface TravelRequestSubmissionInput {
  customer_name: string;
  customer_email: string;
  customer_mobile: string;
  destination: string;
  travel_start_date: string;
  travel_return_date?: string;
  travellers_count: number;
  budget?: string;
  requirements?: string;
  source?: string;
}

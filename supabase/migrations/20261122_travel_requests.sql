-- =============================================================================
-- TRAVELOPEDIA PRODUCTION DATABASE MIGRATION: travel_requests
-- Migration: 20261122_travel_requests.sql
-- Description: Creates the travel_requests table, request_number sequence,
--              triggers, indexes, and Row Level Security (RLS) policies.
-- =============================================================================

-- 1. Enable pgcrypto / uuid-ossp for secure UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create Sequence for Human-Readable Request Number (e.g. TRV-2026-0001)
CREATE SEQUENCE IF NOT EXISTS travel_request_seq START WITH 1001;

-- 3. Create Function to Generate Request Number Automatically
CREATE OR REPLACE FUNCTION generate_travel_request_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.request_number IS NULL OR NEW.request_number = '' THEN
    NEW.request_number := 'TRV-' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-' || LPAD(NEXTVAL('travel_request_seq')::TEXT, 4, '0');
  END IF;
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Create Table: travel_requests
CREATE TABLE IF NOT EXISTS public.travel_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_number VARCHAR(32) UNIQUE NOT NULL,
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_mobile TEXT NOT NULL,
  destination TEXT NOT NULL,
  travel_start_date TEXT NOT NULL,
  travel_return_date TEXT,
  travellers_count INTEGER DEFAULT 2 CHECK (travellers_count > 0),
  budget TEXT,
  requirements TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  status VARCHAR(32) DEFAULT 'pending_verification' CHECK (
    status IN (
      'pending_verification',
      'new',
      'contacted',
      'quotation_sent',
      'follow_up',
      'confirmed',
      'cancelled'
    )
  ),
  assigned_to TEXT,
  admin_notified BOOLEAN DEFAULT FALSE,
  notification_status VARCHAR(20) DEFAULT 'pending' CHECK (
    notification_status IN ('pending', 'sent', 'failed')
  ),
  notification_error TEXT,
  notification_sent_at TIMESTAMPTZ,
  source TEXT DEFAULT 'Website Enquiry',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Attach Auto-Generation Trigger for Request Number & Timestamp
DROP TRIGGER IF EXISTS trg_set_travel_request_number ON public.travel_requests;
CREATE TRIGGER trg_set_travel_request_number
BEFORE INSERT ON public.travel_requests
FOR EACH ROW
EXECUTE FUNCTION generate_travel_request_number();

DROP TRIGGER IF EXISTS trg_update_travel_request_timestamp ON public.travel_requests;
CREATE TRIGGER trg_update_travel_request_timestamp
BEFORE UPDATE ON public.travel_requests
FOR EACH ROW
EXECUTE FUNCTION generate_travel_request_number();

-- 6. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_travel_requests_email ON public.travel_requests (customer_email);
CREATE INDEX IF NOT EXISTS idx_travel_requests_status ON public.travel_requests (status);
CREATE INDEX IF NOT EXISTS idx_travel_requests_created_at ON public.travel_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_travel_requests_request_number ON public.travel_requests (request_number);
CREATE INDEX IF NOT EXISTS idx_travel_requests_customer_id ON public.travel_requests (customer_id);

-- 7. Enable Row Level Security (RLS)
ALTER TABLE public.travel_requests ENABLE ROW LEVEL SECURITY;

-- 8. RLS Policies

-- Policy A: Anonymous / Public can insert initial pending requests
CREATE POLICY "Public insert pending travel requests"
ON public.travel_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'pending_verification' AND email_verified = FALSE
);

-- Policy B: Authenticated customers can view their own requests
CREATE POLICY "Customers view own travel requests"
ON public.travel_requests
FOR SELECT
TO authenticated
USING (
  customer_id = auth.uid() OR customer_email = auth.jwt()->>'email'
);

-- Policy C: Service Role has full bypass access for API routes & backend workers
CREATE POLICY "Service role full access on travel requests"
ON public.travel_requests
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Policy D: Staff / Admin CRM Role (authenticated with role in user_metadata)
CREATE POLICY "Staff view and update travel requests"
ON public.travel_requests
FOR ALL
TO authenticated
USING (
  (auth.jwt()->'user_metadata'->>'role') IN ('admin', 'staff', 'superadmin')
)
WITH CHECK (
  (auth.jwt()->'user_metadata'->>'role') IN ('admin', 'staff', 'superadmin')
);

COMMENT ON TABLE public.travel_requests IS 'Travelopedia customer enquiries and verified travel requests';

/*
  # Create Bookings Table
  
  1. New Tables
    - `bookings`
      - `id` (uuid, primary key) - Booking unique identifier
      - `user_id` (uuid, foreign key) - Reference to users table
      - `service_type` (text) - Type of service
      - `status` (text) - Booking status
      - `date` (timestamptz) - Service date/time
      - `address_id` (uuid, foreign key) - Reference to addresses table
      - `vehicle_id` (uuid, foreign key) - Reference to vehicles table (optional)
      - `notes` (text) - Special instructions
      - `total` (decimal) - Total booking amount
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
  
  2. Security
    - Enable RLS
    - Add policies for booking access
*/

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_type text NOT NULL,
  status text NOT NULL DEFAULT 'Pending',
  date timestamptz NOT NULL,
  address_id uuid NOT NULL REFERENCES addresses(id),
  vehicle_id uuid REFERENCES vehicles(id),
  notes text,
  total decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'))
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
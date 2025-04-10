import { Reservation } from './reservation.interface';
export interface RentalAgreement {
    id: number;
    reservation_id: number;
    agreement_code: string;
    rent_start_date: string;
    rent_end_date: string | null;
    person_count: number;
    total_amount: string;
    is_advance_payment: number;
    description: string;
    signature_png_string: string;
    status: string;
    created_at: string;
    updated_at: string;
    reservation: Reservation;
  }
  
  
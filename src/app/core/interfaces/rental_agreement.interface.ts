import { LatestBilling } from './billing.interface';
import { Reservation } from './reservation.interface';
import { Tenant } from './tenant.interface';
import { UserProfile } from './users.interface';
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
    next_billing_month?: string;
    latest_billing?: LatestBilling;
    pivot?: Pivot;
    pivot_tenants?: Tenant[];
  }

  export interface Pivot {
    tenant_id: number,
    rental_agreement_id: number,
  }
  
 

  export interface RentalAgreementResponse {
    success: boolean;
    message: string;
    data: {
      rental_agreements?: RentalAgreement[];
      pdf_url?: string;
    }
  }
  
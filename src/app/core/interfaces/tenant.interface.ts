// tenant.interface.ts

import { RentalAgreement } from "./rental_agreement.interface";
import { UserProfile } from "./users.interface";

// Interface to represent the Tenant data
export interface Tenant {
  id: number;
  profile_id: number;
  rental_agreement_id: number;
  status: string;
  evacuation_date: string | null;
  move_out_date: string | null;
  created_at: string;
  updated_at: string;
  rental_agreement?: RentalAgreement;
  user_profile?: UserProfile;
}

  
  // Interface for the response from the backend (tenant list)
  export interface TenantResponse {
    success: boolean;  // should be boolean not number
    message: string;
    data: {
      tenant?: Tenant[];  // Optional tenants array
      tenants?: Tenant[]; // Optional tenants array
    };
  }
  
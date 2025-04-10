// tenant.interface.ts

// Interface to represent the Tenant data
export interface Tenant {
    id: number;
    profile_id: string;
    rental_agreement_id: string;
    status: 'pending' | 'active' | 'moved_out';
    evacuation_date: string | null;
    move_out_date: string | null;
  }
  
  // Interface for the response from the backend (tenant list)
  export interface TenantResponse {
    data: {
      tenants: Tenant[];
    };
  }
  
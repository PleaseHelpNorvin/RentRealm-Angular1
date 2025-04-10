import { Tenant } from './tenant.interface';

export interface Users {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
    role: string;
    created_at: string;
    updated_at: string;
  
    // Optional: add relationship data if your API includes it
    profile?: UserProfile;
  }
  
  export interface UserProfile {
    id: number;
    user_id: number;
    full_name: string;
    address: string;
    contact_number: string;
    gender: string;
    birthdate: string;
    image_url?: string;
    created_at: string;
    updated_at: string;
  }
  
  // Interface for the response from the backend
  export interface UserResponse {
    data: {
      users: Users[];
    };
  }
  
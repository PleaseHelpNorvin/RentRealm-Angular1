import { Address } from './address.interface';
import { Tenant } from './tenant.interface';

export interface Users {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  role: string;
  steps: string;
  created_at: string;
  updated_at: string;
  user_profile?: UserProfile[]; // <-- ARRAY not single object
}


export interface UserProfile {
  id: number;
  user_id: number;
  profile_picture_url?: string;
  phone_number: string;
  occupation: string;
  social_media_links: string;
  driver_license_number: string;
  national_id?: string;
  passport_number?: string;
  social_security_number?: string;
  created_at: string;
  updated_at: string;
  address: Address; // <-- This is an object
  user?: Users;
}
  
  // Interface for the response from the backend
  export interface UserResponse {
    success: boolean;  // should be boolean not number
    message: string;
    data: {
      user: Users[];
    };
  }
  
  export interface UserProfileResponse {
    success: boolean;  // should be boolean not number
    message: string;
    data: {
      userProfile: UserProfile[];
    };
  }
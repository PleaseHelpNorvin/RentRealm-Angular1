import { Address } from './address.interface';
import { Setting } from './setting.interface';
import { Tenant } from './tenant.interface';

export interface Users {
  data: any;
  id: number;
  name: string;
  email: string;
  admin_phone?: string;
  password?: string | null;
  email_verified_at?: string | null | undefined;
  role: string;
  steps: string;
  created_at: string;
  updated_at: string;
  user_profile?: UserProfile[];
  setting?: Setting;
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

  export interface UserSettingResponse {
    success: boolean;  // should be boolean not number
    message: string;
    data: {
      user: Users;
    };
  }
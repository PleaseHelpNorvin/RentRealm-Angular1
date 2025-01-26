import { Address } from './address.interface';

  export interface Property {
    id: number;
    name: string;
    property_picture_url: any[];
    gender_allowed: string;
    pets_allowed: boolean;
    type: string;
    status: string;
    updated_at: string;
    created_at: string;
    address: Address;
  }
  
  export interface PropertyResponse {
    success: boolean;
    message: string;
    data: {
      properties: Property[]; // Array of Property objects
    };
  }
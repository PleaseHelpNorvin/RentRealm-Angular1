import { Address } from './address.interface';

export interface PropertyResponse {
  success: boolean;
  message: string;
  data: {
    properties: Property[]; // Array of Property objects
    total_vacant_properties: number;
    total_full_properties: number;
  };
}

export interface Property {
    id: number;
    name: string;
    property_picture_url: any[];
    gender_allowed: string;
    // pets_allowed: boolean;
    type: string;
    status: string;
    updated_at: string;
    created_at: string;
    address: Address;

    //for counting not included in api response
    roomCount?: number;  
    total_occupied_rooms?: number;     // Vacant Rooms
    total_vacant_rooms?: number;
}
  

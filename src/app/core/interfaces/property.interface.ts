export interface Property {
    id: number;
    name: string;
    line_1: string;
    line_2: string;
    province: string;
    country: string;
    postal_code: string;
    type: string;
    status: string;
    updated_at: string;
    created_at: string;
    // Add other properties as necessary
  }
  
  export interface PropertyResponse {
    success: boolean;
    message: string;
    data: {
      properties: Property[]; // Array of Property objects
    };
  }
export interface Room {
    property_id: number;
    room_picture_url: any[]; // Change to array of strings to handle multiple image URLs
    room_code: string;
    description: string;
    room_details: string;
    category: string;
    rent_price: number;
    reservation_fee: number;
    capacity: number;
    current_occupants: number;
    min_lease: number; 
    size: string;
    status: string;
    unit_type: string;
    updated_at: string;
    created_at: string;
    id: number;
}

export interface RoomResponse {
    success: boolean;
    message: string;
    data: {
        rooms: Room[];
    };
}

export interface Room {
    property_id: number;
    room_picture_url: any[]; // Change to array of strings to handle multiple image URLs
    rent_price: number;
    capacity: number;
    current_occupants: number;
    min_lease: number;
    status: string;
    room_code: string;
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

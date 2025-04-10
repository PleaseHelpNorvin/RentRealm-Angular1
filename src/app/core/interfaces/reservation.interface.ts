import { Room } from "./room.interface";

export interface Reservation {
    id: number;
    profile_id: number;
    room_id: number;
    reservation_code: string;
    payment_method: string;
    reservation_payment_proof_url: string[];
    status: string;
    approved_by: number;
    approval_date: string;
    created_at: string;
    updated_at: string;
    room: Room;
  }
  
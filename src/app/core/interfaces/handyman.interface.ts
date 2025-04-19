import { Users } from "./users.interface";

export interface Handyman {
    id: number;
    user_id: number;
    status: string;
    created_at: string;
    updated_at: string;
    user?: Users;
}
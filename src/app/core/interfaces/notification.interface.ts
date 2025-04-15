import { Billing } from "./billing.interface";

export interface Notification {
    id: number;
    user_id: number;
    title: string;
    message: string;
    is_read: boolean;
    notifiable_type?: string;
    notifiable_id?: number;
    created_at?: string;
    updated_at?: string;
    notifiable?: Billing;
}
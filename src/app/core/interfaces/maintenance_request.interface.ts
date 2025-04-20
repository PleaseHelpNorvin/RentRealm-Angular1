import { Handyman } from "./handyman.interface";
import { Room } from "./room.interface";
import { Tenant } from "./tenant.interface";
import { Users } from "./users.interface";

export interface MaintenanceRequest {
 id: number;
 ticket_code: string;
 tenant_id: number;
 room_id: number;
 handyman_id?: number | null;
 assigned_by?: Users | null;
 approved_by?: Users | null;
 title: string;
 description: number;
 images: string[] | null;
 status: string;
 requested_at: string;
 assigned_at: string | null;
 assisted_at: string | null;
 completed_at: string | null;
 approved_at: string | null;
 created_at: string;
 updated_at: string;
 tenant? : Tenant;
 room?: Room;
 handyman?: Handyman;
}

export interface MaintenanceRequestResponse {
    success: boolean;
    message: string;
    data: {
        maintenance_requests: MaintenanceRequest[];
        handymens?: Handyman[];
    }
}
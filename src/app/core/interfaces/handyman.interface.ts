import { MaintenanceRequest } from "./maintenance_request.interface";
import { Users } from "./users.interface";

export interface Handyman {
    id: number;
    user_id: number;
    status: string;
    created_at: string;
    updated_at: string;
    user?: Users;
    maintenance_requests?: MaintenanceRequest[];
    
}


export interface HandymanResponse {
    success: boolean;
    message: string;
    data: {
        handymens?: Handyman[];
    }

}


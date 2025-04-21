export interface TenantReports {
    code: string;
    name: string;
    apartment: string; 
    status: string;
    joined_at: string;
}

export interface RentCollectionReports {
    code: string;
    tenant: string;
    title: string;
    month: string;
    amount: string;
    status: string;
}

export interface UnitOccupancyReports {
    apartment: string; 
    total_units: number; 
    occupied: number; 
    vacant: number; 
}

export interface MaintenanceRequestsReports {
    ticket_code: string; 
    tenant: string;
    apartment: string;
    issue: string; 
    status: string;
}

export interface AuditLogsAndActivityReports {
    aud_code: string;
    user: string; 
    action: string; 
    date_time: string; 
}

export interface ReportsResponse {
    success: boolean;
    message: string;
    data: {
        tenant_reports: TenantReports[];
        rent_collection_reports: RentCollectionReports[];
        unit_occupancy_reports: UnitOccupancyReports[];
        maintenance_requests_reports: MaintenanceRequestsReports[];
        audits_logs_activity_reports: AuditLogsAndActivityReports[];
    }
}
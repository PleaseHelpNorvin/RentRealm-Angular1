export interface TenantReports {
    id: number;
}

export interface RentCollectionReports {
    id: number;
}

export interface UnitOccupancyReports {
    id: number;
}

export interface MaintenanceRequestsReports {
    id: number;
}

export interface AuditLogsAndActivityReports{
    id: number;
} 


export interface ReportsResponse{
    success: boolean;
    message: string;
    data: {
        tenant_reports?: TenantReports[];
        rent_collection_reports?: RentCollectionReports[];
        unit_occupancy_reports?: UnitOccupancyReports[];
        maintenance_requests_reports?: MaintenanceRequestsReports[];
        audits_logs_activity_reports?: AuditLogsAndActivityReports[];
    }
}

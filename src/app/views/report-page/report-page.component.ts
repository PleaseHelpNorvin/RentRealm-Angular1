import { Component, ViewEncapsulation  } from '@angular/core';
import { ReportService } from '../../core/service/reports/report.service';
import { AuditLogsAndActivityReports, MaintenanceRequestsReports, RentCollectionReports, ReportsResponse, TenantReports, UnitOccupancyReports } from '../../core/interfaces/reports.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-page',
  imports: [CommonModule],
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ReportPageComponent {
  constructor(private reportService: ReportService) {}
  allTenantReports: TenantReports[] = [];
  allRentCollectionReports: RentCollectionReports[] = [];
  allUnitOccupancyReports: UnitOccupancyReports[] = [];
  allMaintenanceRequestReports: MaintenanceRequestsReports[] = [];
  allAuditLogsActivityReports: AuditLogsAndActivityReports[] = [];
  
  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.getReports().subscribe({
      next: (res: ReportsResponse) => {
        console.log('from loadReports response: ', res)
        const tenantReports = res.data.tenant_reports;
        const rentCollectionReports = res.data.rent_collection_reports;
        const unitOccupancyReports = res.data.unit_occupancy_reports;
        const maintenanceRequestsReports = res.data.maintenance_requests_reports
        const auditLogsActivityReports = res.data.audits_logs_activity_reports;

        this.allTenantReports = tenantReports;
        this.allRentCollectionReports = rentCollectionReports;
        this.allUnitOccupancyReports = unitOccupancyReports;
        this.allMaintenanceRequestReports = maintenanceRequestsReports;
        this.allAuditLogsActivityReports = auditLogsActivityReports;

        console.log('Tenant Reports:', this.allTenantReports);
        console.log('Rent Collection Reports:', this.allRentCollectionReports);
        console.log('Unit Occupancy Reports:', this.allUnitOccupancyReports);
        console.log('Maintenance Requests Reports:', this.allMaintenanceRequestReports);
        console.log('Audit Logs & Activity Reports:', this.allAuditLogsActivityReports);
      },
      error: (err) => {
        console.error('Error loading reports:', err);
      }
      
    })
  }
  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-secondary text-white';
      case 'requested':
        return 'bg-info text-dark';
      case 'assigned':
        return 'bg-primary text-white';
      case 'in_progress':
        return 'bg-warning text-dark';
      case 'forApprove':
        return 'bg-light text-dark border border-dark';
      case 'completed':
        return 'bg-success text-white';
      case 'cancelled':
        return 'bg-danger text-white';
      default:
        return 'bg-dark text-white';
    }
  }
  
}

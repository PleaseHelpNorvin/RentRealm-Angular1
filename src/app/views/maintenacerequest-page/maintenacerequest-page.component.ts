import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaintenanceRequest } from '../../core/interfaces/maintenance_request.interface';
import { MaintenenanceRequestService } from '../../core/service/maintenance_request/maintenenance-request.service';

@Component({
  selector: 'app-maintenacerequest-page',
  imports: [CommonModule],
  templateUrl: './maintenacerequest-page.component.html',
  styleUrl: './maintenacerequest-page.component.css'
})
export class MaintenacerequestPageComponent {
  allMaintenanceRequests: MaintenanceRequest[] = [];
  pendingMaintenanceRequests: MaintenanceRequest[] =[];
  requestedMaintenanceRequests: MaintenanceRequest[] = [];
  assignedMaintenanceRequests: MaintenanceRequest[] = [];
  inProgessMaintenanceRequests: MaintenanceRequest[] = [];
  forApproveMaintenanceRequests: MaintenanceRequest[] = [];
  completedMaintenanceRequests: MaintenanceRequest[] = [];
  cancelledMaintenanceRequests: MaintenanceRequest[] = [];
  constructor(private maintenanceRequestService: MaintenenanceRequestService) {}

 ngOnInit(): void {
  this.loadMaintenanceRequests()
 }

 loadMaintenanceRequests(): void {
  this.maintenanceRequestService.getMaintenanceRequests().subscribe({
    next: (respose) => {
      const maintenanceRequestsArray = respose.data.maintenance_requests;

      if (maintenanceRequestsArray) {
        this.allMaintenanceRequests =  maintenanceRequestsArray;
        this.pendingMaintenanceRequests = maintenanceRequestsArray.filter(res => res.status === 'pending');
        this.requestedMaintenanceRequests = maintenanceRequestsArray.filter(res => res.status === 'requested');
        this.assignedMaintenanceRequests = maintenanceRequestsArray.filter(res => res.status === 'assigned');
        this.inProgessMaintenanceRequests = maintenanceRequestsArray.filter(res => res.status === 'in_progress');
        this.forApproveMaintenanceRequests = maintenanceRequestsArray.filter(res => res.status === 'forApprove');
        this.completedMaintenanceRequests = maintenanceRequestsArray.filter(res => res.status === 'completed');
        this.cancelledMaintenanceRequests = maintenanceRequestsArray.filter(res => res.status === 'cancelled');
        console.log('all maintenannce requests', this.allMaintenanceRequests)
        console.log('pending maintenannce requests', this.pendingMaintenanceRequests)
        console.log('requested maintenannce requests', this.requestedMaintenanceRequests)
        console.log('assigned maintenannce requests', this.assignedMaintenanceRequests)
        console.log('inProgress maintenannce requests', this.inProgessMaintenanceRequests)
        console.log('for approve maintenannce requests', this.forApproveMaintenanceRequests)
        console.log('completed maintenannce requests', this.completedMaintenanceRequests);
        console.log('cancelled maintenannce requests', this.cancelledMaintenanceRequests);

      }
    },
    error: (err) => {
      console.error('Error loading maintenance requests:', err);
    }
  })
 }

 assignMaintenanceRequestToHandyman(maintenanceRequest_id: number): void {
  const confirmed = window.confirm('Are you sure you want to assign this maintenance request to a handyman?');
  
  if (confirmed) {
    console.log('maintenance request id', maintenanceRequest_id);
    // You can put the actual assignment logic here
  } else {
    console.log('Assignment cancelled.');
  }
}
}

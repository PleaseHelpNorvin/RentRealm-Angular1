import { CommonModule } from '@angular/common';
import { afterNextRender, Component, ElementRef, ViewChild } from '@angular/core';
import { MaintenanceRequest } from '../../core/interfaces/maintenance_request.interface';
import { MaintenenanceRequestService } from '../../core/service/maintenance_request/maintenenance-request.service';
import { Modal } from 'bootstrap';
import { Handyman } from '../../core/interfaces/handyman.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-maintenacerequest-page',
  imports: [CommonModule, FormsModule],
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
  allHandymens: Handyman[] = [];
  selectedMaintenanceRequest: MaintenanceRequest | null = null;
  selectedHandyman: Handyman | null = null;

  constructor(private maintenanceRequestService: MaintenenanceRequestService) {}

    @ViewChild('modalTrigger', { static: false }) modalTrigger!: ElementRef;
    @ViewChild('assignMaintenanceRequestToHandymanModalTrigger', { static: false }) assignMaintenanceRequestToHandymanModalTrigger!: ElementRef;


 ngOnInit(): void {
  this.loadMaintenanceRequests()
 }

 ngAfterViewInit(): void {
  if (this.modalTrigger) {
    console.log('Modal Trigger is available:', this.modalTrigger);
  }
}


 loadMaintenanceRequests(): void {
  this.maintenanceRequestService.getMaintenanceRequests().subscribe({
    next: (respose) => {
      const maintenanceRequestsArray = respose.data.maintenance_requests;
      const handymens = respose.data.handymens;
      if (maintenanceRequestsArray) {
        this.allMaintenanceRequests =  maintenanceRequestsArray;
        this.pendingMaintenanceRequests = maintenanceRequestsArray.filter(res => res.status === 'pending');
        this.requestedMaintenanceRequests = maintenanceRequestsArray.filter(res => res.status === 'requested');
        this.assignedMaintenanceRequests = maintenanceRequestsArray.filter(res => res.status === 'assigned');
        this.inProgessMaintenanceRequests = maintenanceRequestsArray.filter(res => res.status === 'in_progress');
        this.forApproveMaintenanceRequests = maintenanceRequestsArray.filter(res => res.status === 'forApprove');
        this.completedMaintenanceRequests = maintenanceRequestsArray.filter(res => res.status === 'completed');
        this.cancelledMaintenanceRequests = maintenanceRequestsArray.filter(res => res.status === 'cancelled');
        this.allHandymens = handymens ?? [];
        
        
        console.log('all maintenannce requests', this.allMaintenanceRequests)
        console.log('pending maintenannce requests', this.pendingMaintenanceRequests)
        console.log('requested maintenannce requests', this.requestedMaintenanceRequests)
        console.log('assigned maintenannce requests', this.assignedMaintenanceRequests)
        console.log('inProgress maintenannce requests', this.inProgessMaintenanceRequests)
        console.log('for approve maintenannce requests', this.forApproveMaintenanceRequests)
        console.log('completed maintenannce requests', this.completedMaintenanceRequests);
        console.log('cancelled maintenannce requests', this.cancelledMaintenanceRequests);
        console.log('all handymens: ', this.allHandymens)

      }
    },
    error: (err) => {
      console.error('Error loading maintenance requests:', err);
    }
  })
 }
 selectHandyman(handyman: Handyman): void {
  this.selectedHandyman = handyman;
}

assignToHandyman() {
  if (!this.selectedHandyman || !this.selectedMaintenanceRequest) return;

  const confirmAssign = window.confirm(
    `Are you sure you want to assign ${this.selectedHandyman.user?.name} to this maintenance request?`
  );

  if (!confirmAssign) return;

  console.log('Assigning handyman:', this.selectedHandyman);
  console.log('To request:', this.selectedMaintenanceRequest);

  this.maintenanceRequestService.patchAssignMaintenanceRequestToTenant(
    this.selectedMaintenanceRequest.id,
    this.selectedHandyman.id
  ).subscribe({
    next: (res) => {
      console.log('Successfully assigned handyman!', res);
      this.loadMaintenanceRequests();  // Reload maintenance requests after assigning
      this.hideMaintenanceRequestToHandymanModal();  // Close the modal after success
    },
    error: (err) => {
      console.error('Error assigning handyman:', err);
    }
  });
}

  hideMaintenanceRequestToHandymanModal(): void {
    if (this.assignMaintenanceRequestToHandymanModalTrigger) {
      const modalElement = this.assignMaintenanceRequestToHandymanModalTrigger.nativeElement;
      const modal = Modal.getInstance(modalElement);  // Get the existing modal instance
      if (modal) {
        modal.hide(); // Hide the modal
      }
    }
  }


  assignMaintenanceRequestToHandymanModal(maintenanceRequest_id: number): void {
    console.log(`from openModal() id:${maintenanceRequest_id}`);
    this.selectedMaintenanceRequest = this.allMaintenanceRequests.find(res => res.id === maintenanceRequest_id) || null;

    // Check if the modalTrigger is set, then use the Modal API
    if (this.assignMaintenanceRequestToHandymanModalTrigger) {
      const modalElement = this.assignMaintenanceRequestToHandymanModalTrigger.nativeElement as HTMLElement;
      const modal = new Modal(modalElement);  // Create a new Modal instance using Bootstrap's Modal API
      modal.show();  // Show the modal
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'badge bg-warning text-dark';
      case 'requested':
        return 'badge bg-secondary';
      case 'assigned':
        return 'badge bg-primary';
      case 'in_progress':
        return 'badge bg-info text-dark';
      case 'forapprove':
        return 'badge bg-light text-dark';
      case 'completed':
        return 'badge bg-success';
      case 'cancelled':
        return 'badge bg-danger';
      default:
        return 'badge bg-dark';
    }
  }

  openModal(id: number): void {
    console.log(`from openModal() id:${id}`);
    this.selectedMaintenanceRequest = this.allMaintenanceRequests.find(res => res.id === id) || null;

    // Check if the modalTrigger is set, then use the Modal API
    if (this.modalTrigger) {
      const modalElement = this.modalTrigger.nativeElement as HTMLElement;
      const modal = new Modal(modalElement);  // Create a new Modal instance using Bootstrap's Modal API
      modal.show();  // Show the modal
    }
  }

  approveMaintenanceRequest(maintenanceRequest_id: number): void {
    const confirmApprove = window.confirm('Are you sure you want to approve this maintenance request?');
  
    if (confirmApprove) {
      console.log('Approved Maintenance Request ID:', maintenanceRequest_id);
      this.maintenanceRequestService.patchApproveMaintenanceRequest(maintenanceRequest_id).subscribe({
        next: (res) => {
          console.log('from approveMaintenanceRequest:', res)
          this.loadMaintenanceRequests()
        },
        error: (err) => {
          console.error('Error approving maintenance request:', err);
        }
      }
      )

    } else {
      console.log('Approval cancelled');
    }
  }
  
  rejectMaintenanceRequest(maintenanceRequest_id: number): void {
    const confirmReject = window.confirm('Are you sure you want to reject this maintenance request?');
  
    if (confirmReject) {
      console.log('Rejected Maintenance Request ID:', maintenanceRequest_id);
      // Add your rejection logic here (e.g., call the service to reject the request)
    } else {
      console.log('Rejection cancelled');
    }
  }
}

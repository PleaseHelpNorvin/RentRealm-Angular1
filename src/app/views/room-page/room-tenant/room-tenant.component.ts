import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../core/service/room/room.service';
import { Tenant, TenantResponse } from '../../../core/interfaces/tenant.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-room-tenant',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './room-tenant.component.html',
  styleUrl: './room-tenant.component.css'
})
export class RoomTenantComponent {
  property_id: number| null = null;
  room_id: number | null = null;
  errorMessage: string = '';
  tenant: Tenant[] = [];
  selectedTenant: Tenant | null = null;
  noTenantFound: boolean = false; 
  loading: boolean = false;


  constructor(private router: Router, private route:ActivatedRoute, private roomService: RoomService,   private cdRef: ChangeDetectorRef
    ) {
    this.route.params.subscribe(params => {
      this.room_id = params['room_id'];
      this.property_id = params['property_id'];
    });
  }

  ngOnInit(): void {
    if (this.room_id) {
      console.log(this.noTenantFound);
      this.loadRoomTenant(this.room_id);
    }
  }
  
  loadRoomTenant(room_id: number): void {
    console.log('Fetching tenant for room_id:', room_id);
  
    this.loading = true;
  
    // Manually trigger change detection to ensure loader is shown
    this.cdRef.detectChanges();
  
    this.roomService.getRoomTenant(room_id).subscribe({
      next: (response: TenantResponse) => {
        console.log('API Response:', response);
  
        const tenantData = response.data.tenant;
  
        if (response.success && tenantData) {
          this.tenant = Array.isArray(tenantData) ? tenantData : [tenantData];
          this.selectedTenant = this.tenant[0];
          this.noTenantFound = false;
  
          console.log('Tenant List:', this.tenant);
        } else {
          this.tenant = [];
          this.noTenantFound = true;
        }
  
        this.loading = false;
        this.cdRef.detectChanges();
      },
  
      error: (error) => {
        console.error('API Error:', error);
        this.tenant = [];
        this.noTenantFound = true;
        this.errorMessage = 'Failed to load tenant details';
        this.loading = false;
        this.cdRef.detectChanges();
      },
    });
  }

  goToViewRoomsPage(): void {
    console.log(` FROM GOTOVIEWROOMPAGE(): ${this.property_id}`);

    this.router.navigate([`/admin/properties/rooms/`, this.property_id]).then(success => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.log('Navigation failed');
      }
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }
}

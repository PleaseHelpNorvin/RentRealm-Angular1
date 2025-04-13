import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../../../core/service/tenant/tenant.service';
import { CommonModule } from '@angular/common';
import { Billing, LatestBilling } from '../../../core/interfaces/billing.interface';
import { Tenant } from '../../../core/interfaces/tenant.interface';
import { Notification } from '../../../core/interfaces/notification.interface';
import { RentalAgreement } from '../../../core/interfaces/rental_agreement.interface';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tenant-show',
  imports: [CommonModule, FormsModule],
  templateUrl: './tenant-show.component.html',
  styleUrl: './tenant-show.component.css'
})
export class TenantShowComponent {
  profile_id: number | null = null;

  tenant?: Tenant;
  rentalAgreements?: RentalAgreement[] = [];
  paymentHistory: Billing[] = [];
  notifications: Notification[] = [];

  tenantName: string = '';
  tenantEmail: string = '';
  tenantPhone: string = '';

  constructor(private router: Router,private route: ActivatedRoute, private tenantService: TenantService) {
    this.route.params.subscribe(params => {
      this.profile_id = params['profile_id'];
    });
  }

  ngOnInit(): void {
    console.log(`profile_id received ${this.profile_id}`);
    this.LoadTenantByProfileId();
  }

  LoadTenantByProfileId(): void {
    if (this.profile_id !== null) {
      this.tenantService.getTenantProfileByProfileId(this.profile_id).subscribe({
        next: (response) => {
          console.log('Tenant Data:', response);
          
          this.tenant = response.data.tenant as Tenant;
          this.paymentHistory = response.data.payment_history || [];
          this.notifications = response.data.notifications || [];
          this.rentalAgreements = response.data.rental_agreements || []; 
          console.log('Tenant:', this.tenant);
          console.log('Rental Agreements:', this.rentalAgreements);
          console.log('Payment History:', this.paymentHistory);
          console.log('Notifications:', this.notifications);

          this.tenantName = this.tenant?.user_profile?.user?.name || '';
          this.tenantEmail = this.tenant?.user_profile?.user?.email || '';
          this.tenantPhone = this.tenant?.user_profile?.phone_number || '';
        },
        error: (err) => {
          console.error('Error fetching tenant:', err);
        }
      });
    }
  } 

  updateTenantProfile(): void {
    if (this.tenant && this.tenant.user_profile && this.tenant.user_profile.user) {
      this.tenant.user_profile.user.name = this.tenantName;
      this.tenant.user_profile.user.email = this.tenantEmail;
      this.tenant.user_profile.phone_number = this.tenantPhone;
    }
  }
}

import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../../../core/service/tenant/tenant.service';
import { CommonModule } from '@angular/common';
import { Billing, LatestBilling } from '../../../core/interfaces/billing.interface';
import { Tenant } from '../../../core/interfaces/tenant.interface';
import { Notification } from '../../../core/interfaces/notification.interface';
import { RentalAgreement } from '../../../core/interfaces/rental_agreement.interface';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { UserService } from '../../../core/service/user/user.service';

@Component({
  selector: 'app-tenant-show',
  imports: [CommonModule, FormsModule],
  templateUrl: './tenant-show.component.html',
  styleUrl: './tenant-show.component.css'
})
export class TenantShowComponent {
  profile_id: number | null = null;
  sendWarningModalInstance!: Modal;
  @ViewChild('sendModalChild') sendWarningModalElement!: ElementRef;


  tenant?: Tenant;
  rentalAgreements: RentalAgreement[] = [];
  latest_monthly_rent?: Billing;
  paymentHistory: Billing[] = [];
  notifications: Notification[] = [];

  tenantName: string = '';
  tenantEmail: string = '';
  tenantPassword: String = '';

  tenantPhone: string = '';
  tenantSocialMedia: string = '';
  tenantOccupation: string = '';
  
  tenantDriverLicenseNumber: string = '';
  tenantNationalId: string = '';
  tenantPassportNumber: string = '';
  tenantSSSnumber: string = '';

  tenantAddressLine1: string = '';
  tenantAddressLine2: string = '';
  tenantAddressProvince: string = '';
  tenantAddressCountry: string = '';
  tenantAddressPostalCode: string = '';

  // for send warning
  selectedAgreementId = '';
  

  constructor(private router: Router,private route: ActivatedRoute, private tenantService: TenantService, private userService: UserService) {
    this.route.params.subscribe(params => {
      this.profile_id = params['profile_id'];
    });
  }

  ngOnInit(): void {
    console.log(`profile_id received ${this.profile_id}`);
    this.LoadTenantByProfileId();
  }

  ngAfterViewInit() {
    if (this.sendWarningModalElement) {
      this.sendWarningModalInstance = new Modal(this.sendWarningModalElement.nativeElement);
    }
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
          this.latest_monthly_rent = response.data.latest_monthly_rent as Billing;

          console.log('Tenant:', this.tenant);
          console.log('Rental Agreements:', this.rentalAgreements);
          console.log('Latest Monthly Rent:', this.latest_monthly_rent);

          console.log('Payment History:', this.paymentHistory);
          console.log('Notifications:', this.notifications);

          // for display user data to update
          this.tenantName = this.tenant?.user_profile?.user?.name || '';
          this.tenantEmail = this.tenant?.user_profile?.user?.email || '';

          // for display to update userProfile side
          this.tenantPhone = this.tenant?.user_profile?.phone_number || '';
          this.tenantSocialMedia = this.tenant.user_profile?.social_media_links || '';
          this.tenantOccupation = this.tenant.user_profile?.occupation || '';
          this.tenantDriverLicenseNumber = this.tenant.user_profile?.driver_license_number || '';
          this.tenantNationalId = this.tenant.user_profile?.national_id || '';
          this.tenantPassportNumber = this.tenant.user_profile?.passport_number || '';
          this.tenantSSSnumber = this.tenant.user_profile?.social_security_number || '';

          // for display to update user address
          this.tenantAddressLine1 = this.tenant.user_profile?.address.line_1 || '';
          this.tenantAddressLine2 = this.tenant.user_profile?.address.line_2 || '';
          this.tenantAddressProvince = this.tenant.user_profile?.address.province || '';
          this.tenantAddressCountry = this.tenant.user_profile?.address.country || '';
          this.tenantAddressPostalCode = this.tenant.user_profile?.address.postal_code || '';

          
        },
        error: (err) => {
          console.error('Error fetching tenant:', err);
        }
      });
    }
  } 

  updateTenantProfile(): void {
    if (this.tenant && this.tenant.user_profile && this.tenant.user_profile.user) {
      // 1. Prepare data for userService
      const userUpdatePayload: any = {
        name: this.tenantName,
        email: this.tenantEmail,
      };
  
      if (this.tenantPassword && this.tenantPassword.trim() !== '') {
        userUpdatePayload.password = this.tenantPassword;
      }
  
      // 2. Prepare data for tenantService
      const tenantUpdatePayload = {
        phone_number: this.tenantPhone,
        social_media_links: this.tenantSocialMedia,
        occupation: this.tenantOccupation,
        driver_license_number: this.tenantDriverLicenseNumber,
        national_id: this.tenantNationalId,
        passport_number: this.tenantPassportNumber,
        social_security_number: this.tenantSSSnumber,
        address: {
          line_1: this.tenantAddressLine1,
          line_2: this.tenantAddressLine2,
          province: this.tenantAddressProvince,
          country: this.tenantAddressCountry,
          postal_code: this.tenantAddressPostalCode,
        }
      };
  
      this.userService.updateUserData(this.profile_id!, userUpdatePayload).subscribe({
        next: (response) => {
          console.log('User part updated:', response);
          this.tenantPassword = ''; 
        },
        error: (userErr) => {
          console.error('Error updating user data:', userErr);
        }
      });

      this.userService.updateTenantProfile(this.profile_id!, tenantUpdatePayload).subscribe({
        next: (tenantResponse) => {
          console.log('Tenant part updated:', tenantResponse);
        },
        error: (tenantErr) => {
          console.error('Error updating tenant data:', tenantErr);
        }
      });
    }
  }
  

  sendWarningModal(): void {
    if (this.sendWarningModalInstance) {
      this.sendWarningModalInstance.show();
    }
  }

  sendWarningToTenant(user_id: number | null): void {

  }
}

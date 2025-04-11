import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { SigninPageComponent } from './views/signin-page/signin-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { PropertyUpdateComponent } from './views/property-page/property-update/property-update.component';
import { AuthGuard } from './core/guard/auth.guard';
import { NoAuthGuard } from './core/guard/noauth.guard';
import { PropertyPageComponent } from './views/property-page/property-page.component';
import { RoomPageComponent } from './views/room-page/room-page.component';
import { PropertyAddComponent } from './views/property-page/property-add/property-add.component';
// import { RoomViewComponent } from './views/room-page/room-view/room-view.component';
import { RoomAddComponent } from './views/room-page/room-add/room-add.component';
import { RoomEditComponent } from './views/room-page/room-edit/room-edit.component';
import { TenantsPageComponent } from './views/tenants-page/tenants-page.component';
import { BillingandpaymentPageComponent } from './views/billingandpayment-page/billingandpayment-page.component';
import { MaintenacerequestPageComponent } from './views/maintenacerequest-page/maintenacerequest-page.component';
import { ContractPageComponent } from './views/contract-page/contract-page.component';
import { BillingPageComponent } from './views/billingandpayment-page/billing-page/billing-page.component';
import { PaymentPageComponent } from './views/billingandpayment-page/payment-page/payment-page.component';
import { ContractAcceptedComponent } from './views/contract-page/contract-accepted/contract-accepted.component';
import { ContractRejectedComponent } from './views/contract-page/contract-rejected/contract-rejected.component';
import { ContractPendingComponent } from './views/contract-page/contract-pending/contract-pending.component';
import { TenantShowComponent } from './views/tenants-page/tenant-show/tenant-show.component';

import { MapPageComponent } from './views/map-page/map-page.component';
import { RoomTenantComponent } from './views/room-page/room-tenant/room-tenant.component';

export const routes: Routes = [
  {
    path: '', 
    component: SigninPageComponent,  // Independent SignIn page
    data: { breadcrumb: 'Sign In' },
    canActivate: [NoAuthGuard],
  },
  {
    path: 'admin',  // Admin routes protected by AuthGuard
    component: AdminLayoutComponent, 
    children: [
      {
        path: 'dashboard',
        component: HomePageComponent,
        // data: {x breadcrumb: 'Dashboard' }
      },
      {
        path: 'properties',
        component: PropertyPageComponent,
      },
      {
        path: 'properties/add',
        component: PropertyAddComponent,
      },
      { path: 'properties/update/:id', 
        component: PropertyUpdateComponent 
      },
      {
        path: 'properties/rooms/:property_id',
        component: RoomPageComponent
      },
      {
        path: 'properties/rooms/:property_id/:room_id/tenants',
        component: RoomTenantComponent
      },
      {
        path: 'properties/:property_id/rooms/add',
        component: RoomAddComponent
      },
      {
        path: 'properties/:property_id/rooms/:id/edit',
        component: RoomEditComponent
      },
      {
        path: 'tenant',
        component: TenantsPageComponent
      },
      {
        path: 'tenant/show/:id',
        component: TenantShowComponent 
        
      },
      


      {
        path: 'billingandpayment',
        component: BillingandpaymentPageComponent,
        children: [
          {
            path: 'billing',  
            component: BillingPageComponent,  
          },
          {
            path: 'payment',  
            component: PaymentPageComponent, 
          }
        ]
      },
      {
        path: 'contract',
        component: ContractPageComponent,
        children: [
          {
            path: 'contract-pending',
            component: ContractPendingComponent,
          },
          {
            path: 'contract-accepted',
            component: ContractAcceptedComponent,
          },
          {
            path: 'contract-rejected',
            component: ContractRejectedComponent,
          },
        ],
      },
      
      {
        path: 'maintenacerequest',
        component: MaintenacerequestPageComponent
      },
      
      {
        path: 'map',
        component: MapPageComponent
      }
      
      
      
      
      
    
    //   {
    //     path: 'tenants',
    //     component: TenantsPageComponent,
    //     data: { breadcrumb: 'Tenants' }
    //   }, 
    //   {
    //     path: 'tenants/:id',  // This is the child route for tenant details
    //     component: TenantsDetailsComponent,
    //     data: { breadcrumb: 'Tenant Details' }
    //   },
    //   {
    //     path: 'tenants-edit/:id',
    //     component: TenantsEditComponent,
    //     data: { breadcrumb: 'Tenant Edit'}
    //   },
    //   {
    //     path: 'chat',
    //     component: ChatPageComponent,
    //     data: { breadcrumb: 'Messages' }
    //   },
    //   {
    //     path: 'payment',
    //     component: PaymentPageComponent,
    //     data: { breadcrumb: 'Payment' }
    //   },
    //   {
    //     path: 'maintenance',
    //     component: MaintenancePageComponent,
    //     data: { breadcrumb: 'Maintenance Requests'},
    //   },
    //   {
    //     path: 'settings',
    //     component: SettingsPageComponent,
    //     data: { breadcrumb: 'Settings'},
    //   }
      
    ],
    canActivate: [AuthGuard],  // Protect admin routes
  }
];
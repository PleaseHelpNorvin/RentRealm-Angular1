import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-billingandpayment-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './billingandpayment-page.component.html',
  styleUrl: './billingandpayment-page.component.css'
})
export class BillingandpaymentPageComponent implements OnInit {
  activeTab: string = 'billing';  

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    // Check if there's a child route, if not, navigate to the default 'payment' tab
    const currentRoute = this.activatedRoute.snapshot.firstChild?.routeConfig?.path;
    
    if (!currentRoute) {
      this.router.navigate(['/admin/billingandpayment/billing']);
      this.activeTab = 'billing';
    } else if (currentRoute === 'billing') {
      this.activeTab = 'billing';
    } else if (currentRoute === 'payment') {
      this.activeTab = 'payment';
    }
  }

  goToBilling():void {
    this.router.navigate(['/admin/billingandpayment/billing']);
    this.activeTab = 'billing';
  }
  goToPayment():void {
    this.router.navigate(['/admin/billingandpayment/payment']);
    this.activeTab = 'payment';
  }
}

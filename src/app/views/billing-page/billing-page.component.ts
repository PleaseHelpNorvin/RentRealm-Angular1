import { Component } from '@angular/core';
import { BillingService } from '../../core/service/billing/billing.service';
import { error } from 'jquery';
import { Billing } from '../../core/interfaces/billing.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billing-page',
  imports: [CommonModule],
  templateUrl: './billing-page.component.html',
  styleUrl: './billing-page.component.css'
})
export class BillingPageComponent {
  errorMessage: string = '';
  billings: Billing[] = [];
  constructor (
    private billingService: BillingService,
  ) {}
  
  ngOnInit(): void {
    this.loadBillings();

  }


  loadBillings() {
    this.billingService.getBillings().subscribe({
      next: (response) => {
        console.log('Response from backend:', response);
        this.billings = response.data.billings;
        console.log('Loaded billings:', this.billings); // 👀 Check in browser console
      },
      error: (error) => {
        this.errorMessage = 'Failed to Billings ';
        console.error('Error fetching Billings:', error);
      }
    });
  }
}

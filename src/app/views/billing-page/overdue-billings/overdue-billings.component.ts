import { Component } from '@angular/core';
import { BillingService } from '../../../core/service/billing/billing.service';
import { Billing } from '../../../core/interfaces/billing.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overdue-billings',
  imports: [CommonModule],
  templateUrl: './overdue-billings.component.html',
  styleUrl: './overdue-billings.component.css'
})
export class OverdueBillingsComponent {
    errorMessage: string = '';
    billings: Billing[] = [];
    constructor (private billingService: BillingService) {}

  ngOnInit(): void {
    this.loadBillings();
  }

  loadBillings() {
    this.billingService.getBillings().subscribe({
      next: (response) => {
        console.log('Response from backend:', response);
  
        this.billings = (response.data.billings || []).filter((billing: any) => {
          const createdAt = new Date(billing.created_at);
          const dueDate = new Date(billing.due_date);
          return createdAt > dueDate && billing.status === 'pending';
        });
  
        console.log('Filtered billings:', this.billings); // 👀 Check filtered results
      },
      error: (error) => {
        this.errorMessage = 'Failed to load billings';
        console.error('Error fetching billings:', error);
      }
    });
  }
}

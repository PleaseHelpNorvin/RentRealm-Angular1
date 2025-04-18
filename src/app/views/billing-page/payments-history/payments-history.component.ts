import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaymentService } from '../../../core/service/payment/payment.service';
import { Payment } from '../../../core/interfaces/payment.interface';

@Component({
  selector: 'app-payments-history',
  imports: [CommonModule],
  templateUrl: './payments-history.component.html',
  styleUrl: './payments-history.component.css'
})
export class PaymentsHistoryComponent {
  errorMessage: string = '';
  payments: Payment[] = [];
  showPaymentReference: boolean = false;


  constructor (private paymentService: PaymentService) {}
    ngOnInit(): void {
      this.loadPayments();
    }

    loadPayments() {
      this.paymentService.getPayments().subscribe({
        next: (response) => {
          console.log('data from api call payment: ',response)
          this.payments = response.data.payments;
          console.log('payments from getter: ', this.payments);
        },
        error: (error) => {
          this.errorMessage = 'Failed to payments';
        console.error('Error fetching payments:', error);
        }
      });
    }
    toggleReferenceVisibility() {
      this.showPaymentReference = !this.showPaymentReference;
    }
}

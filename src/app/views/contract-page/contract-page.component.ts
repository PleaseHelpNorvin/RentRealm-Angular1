import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { RentalAgreement, RentalAgreementResponse } from '../../core/interfaces/rental_agreement.interface';
import { RentalAgreementService } from '../../core/service/rental_agreement/rental-agreement.service';
import { Modal } from 'bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SafeUrlPipe } from '../../safe-url.pipe';


@Component({
  selector: 'app-contract-page',
  imports: [CommonModule, RouterModule, PdfViewerModule, SafeUrlPipe],
  templateUrl: './contract-page.component.html',
  styleUrl: './contract-page.component.css',
})
export class ContractPageComponent implements AfterViewInit {
    
    allRentalAgreements: RentalAgreement[] = [];
    activeRentalAgreements: RentalAgreement[] = []; 
    inActiveRentalAgreements: RentalAgreement[] = []; 
    selectedRentalAgreement: RentalAgreement | null = null;
    pdfUrl: string = '';

  constructor(private router: Router, private rentalAgreementService: RentalAgreementService) {}
  @ViewChild('modalTrigger', { static: false }) modalTrigger!: ElementRef;

  ngOnInit(): void {
    this.loadRentalAgreements()
  }

  ngAfterViewInit(): void {
    if (this.modalTrigger) {
      console.log('Modal Trigger is available:', this.modalTrigger);
    }
  }

  loadRentalAgreements(): void {
    this.rentalAgreementService.getRentalAgreements().subscribe({
      next: (response: RentalAgreementResponse) => {
        const rentalAgreementsArray = response.data.rental_agreements;
        if (rentalAgreementsArray) {
          this.allRentalAgreements = rentalAgreementsArray;
          this.activeRentalAgreements = rentalAgreementsArray.filter(res => res.status === 'active');
          this.inActiveRentalAgreements = rentalAgreementsArray.filter(res => res.status === 'inactive');
        }
      },
      error: (err) => {
        console.error('Error loading reservations:', err);
      },
    });
  }

  pdfAgreement(agreement_code: string | null): void {
    if (!agreement_code) {
      console.error('Agreement code is missing!');
      return;
    }
  
    this.rentalAgreementService.getRentalAgreementPdf(agreement_code).subscribe({
      next: (response) => {
        if (response.data.pdf_url) {
          window.open(response.data.pdf_url, '_blank');
        }
      },
      error: (error) => {
        console.error('Error fetching PDF:', error);
      }
    });
  }

  openModal(id: number, agreement_code: string ): void {
    console.log(`from openModal() id:${id}`);
    this.selectedRentalAgreement = this.allRentalAgreements.find(res => res.id === id) || null;

    this.loadPdf(agreement_code);

    // Check if the modalTrigger is set, then use the Modal API
    if (this.modalTrigger) {
      const modalElement = this.modalTrigger.nativeElement as HTMLElement;
      const modal = new Modal(modalElement);  // Create a new Modal instance using Bootstrap's Modal API
      modal.show();  // Show the modal
    }
  }

    loadPdf(agreement_code: string): void {
      this.rentalAgreementService.getRentalAgreementPdf(agreement_code).subscribe({
        next: (response) => {
          if (response.data.pdf_url) {
            this.pdfUrl = response.data.pdf_url;  // Load URL directly
          }
        },
        error: (err) => {
          console.error('Error loading PDF:', err);
        }
      });
    }
    
}

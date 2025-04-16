import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ReservationService } from '../../core/service/reservation/reservation.service';
import { Reservation, ReservationResponse } from '../../core/interfaces/reservation.interface';
import { CommonModule } from '@angular/common';

// Import the Modal class from Bootstrap's JavaScript
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-reservations',
  imports: [CommonModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent implements AfterViewInit {
  constructor(private reservationService: ReservationService ) {}

  allReservations: Reservation[] = [];
  pendingReservations: Reservation[] = [];
  approvedReservations: Reservation[] = [];
  rejectedReservations: Reservation[] = [];
  selectedReservation: Reservation | null = null;

  @ViewChild('modalTrigger', { static: false }) modalTrigger!: ElementRef;

  ngOnInit(): void {
    this.loadReservationsIndex();
  }

  ngAfterViewInit(): void {
    // Check if modalTrigger exists after view initialization
    if (this.modalTrigger) {
      console.log('Modal Trigger is available:', this.modalTrigger);
    }
  }

  loadReservationsIndex(): void {
    this.reservationService.getReservations().subscribe({
      next: (response: ReservationResponse) => {
        const reservationsArray = response.data.reservations;

        this.allReservations = reservationsArray;
        this.pendingReservations = reservationsArray.filter(res => res.status === 'pending');
        this.approvedReservations = reservationsArray.filter(res => res.status === 'approved');
        this.rejectedReservations = reservationsArray.filter(res => res.status === 'rejected');
      },
      error: (err) => {
        console.error('Error loading reservations:', err);
      },
    });
  }

  openModal(id: number): void {
    console.log(`from openModal() id:${id}`);
    this.selectedReservation = this.allReservations.find(res => res.id === id) || null;

    // Check if the modalTrigger is set, then use the Modal API
    if (this.modalTrigger) {
      const modalElement = this.modalTrigger.nativeElement as HTMLElement;
      const modal = new Modal(modalElement);  // Create a new Modal instance using Bootstrap's Modal API
      modal.show();  // Show the modal
    }
  }
  approveReservation(id: number): void {
    const confirmed1 = confirm('Did you check the Receipt?');
    const confirmed2 = confirm('Are you sure you want to approve this reservation?');
    if (confirmed1 && confirmed2) {
      console.log(`from approveReservation() id: ${id}`);
      this.reservationService.patchApprove(id).subscribe({
        next: (response) => {
            console.log(`success ${response}`);
            this.loadReservationsIndex()
        },
        error: (err) => {
            console.log(`failed to approve reservation ${err}`);
        },
      });
    }
  }
  
  rejectReservation(id: | number): void {
    const confirmed = confirm('Are you sure you want to approve this reservation?');
    if (confirmed) {
      console.log(`from rejectReservation() id: ${id}`);
      this.reservationService.patchReject(id).subscribe({
        next: (response) => {
          console.log(`success ${response}`);
          this.loadReservationsIndex()
        },
        error: (err) => {
          console.error(`failed to reject reservation ${err}`);
        },
      })
    }
  }
}

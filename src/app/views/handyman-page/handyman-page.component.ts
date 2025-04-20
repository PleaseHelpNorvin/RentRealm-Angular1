import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HandymanService } from '../../core/service/handyman/handyman.service';
import { Handyman } from '../../core/interfaces/handyman.interface';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-handyman-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './handyman-page.component.html',
  styleUrl: './handyman-page.component.css'
})
export class HandymanPageComponent {


  handymenList: Handyman[] = [];
  availableHandymen: Handyman[] = [];
  busyHandymen: Handyman[] =[];
  terminatedHandymen: Handyman[] = [];

  selectedHandyman: Handyman | null = null;

  @ViewChild('viewModal') viewModalRef!: ElementRef;
  @ViewChild('addModal') addModalRef!: ElementRef;
  @ViewChild('editModal') editModalRef!: ElementRef;

  constructor(private handymanService: HandymanService) {}

  ngOnInit(): void {
    this.fetchHandymen();
  }

  ngAfterViewInit(): void {
    console.log('Modals initialized');
  }

  fetchHandymen(): void {
    this.handymanService.getHandymens().subscribe({
      next: (res) => {
        const handymenArray = res.data.handymens ?? [];
        this.handymenList = handymenArray;
        console.log("filtered allHandyman", this.handymenList)
        this.availableHandymen = handymenArray.filter(res => res.status === 'available')
        console.log("filtered availableHandymen", this.availableHandymen)
        this.busyHandymen = handymenArray.filter(res => res.status === 'busy')
        console.log("filtered busyHandymen ", this.busyHandymen)
        this.terminatedHandymen = handymenArray.filter(res => res.status === 'terminated')
        console.log("filtered terminatedHandymen ", this.terminatedHandymen)
      },
      error: (err) => console.error('Error fetching handymen:', err)
    });
  }

  openViewModal(id: number): void {
    this.selectedHandyman = this.handymenList.find(h => h.id === id) || null;
    const modal = new Modal(this.viewModalRef.nativeElement);
    modal.show();
  }

  openAddModal(): void {
    const modal = new Modal(this.addModalRef.nativeElement);
    modal.show();
  }

  openEditModal(id: number): void {
    this.selectedHandyman = this.handymenList.find(h => h.id === id) || null;
    const modal = new Modal(this.editModalRef.nativeElement);
    modal.show();
  }

  terminateHandyman(id: number): void {
    const confirmed = confirm('Are you sure you want to terminate this handyman?');
    if (confirmed) {
      console.log(`Terminating handyman with ID: ${id}`);
      
      // You can call your API here if needed, e.g.:
      // this.handymanService.terminateHandyman(id).subscribe(() => {
      //   this.fetchHandymen(); // refresh the list after termination
      // });
  
    } else {
      console.log('Termination cancelled');
    }
  }


  getHandymanBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'available':
        return 'badge bg-success';
      case 'busy':
        return 'badge bg-warning text-dark';
      case 'terminated':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }
  
}

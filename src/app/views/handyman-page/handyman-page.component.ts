import { Component, ElementRef, ViewChild } from '@angular/core';
import { HandymanService } from '../../core/service/handyman/handyman.service';
import { Handyman, NewHandyman } from '../../core/interfaces/handyman.interface';
import { Modal } from 'bootstrap';
import { Users } from '../../core/interfaces/users.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-handyman-page',
  imports: [CommonModule, FormsModule, ],
  templateUrl: './handyman-page.component.html',
  styleUrl: './handyman-page.component.css'
})
export class HandymanPageComponent {
  modalInstance: Modal | undefined;  

  handymenList: Handyman[] = [];
  availableHandymen: Handyman[] = [];
  busyHandymen: Handyman[] = [];
  terminatedHandymen: Handyman[] = [];

  newHandymanData: NewHandyman = {
    user: {
      name: '',
      email: '',
      password: '',
      role: 'handyman',
      steps: "0",
    } as Users,
    status: 'available'
  };

  selectedHandyman: Handyman | null = {
  id: 0,
  user_id: 0,
  created_at: '',
  updated_at: '',
  user: {
    name: '',
    email: '',
    password: '',
    role: 'handyman',
    steps: '0'
  } as Users,
  status: 'available'
};



  @ViewChild('viewModal') viewModalRef!: ElementRef;
  @ViewChild('addModal') addModalRef!: ElementRef;
  @ViewChild('editModal') editModalRef!: ElementRef;

  constructor(private handymanService: HandymanService) {}

  ngOnInit(): void {
    this.fetchHandymen();
  }

  fetchHandymen(): void {
    this.handymanService.getHandymens().subscribe({
      next: (res) => {
        const handymenArray = res.data.handymens ?? [];
        this.handymenList = handymenArray;
        this.availableHandymen = handymenArray.filter(res => res.status === 'available');
        this.busyHandymen = handymenArray.filter(res => res.status === 'busy');
        this.terminatedHandymen = handymenArray.filter(res => res.status === 'terminated');
      },
      error: (err) => console.error('Error fetching handymen:', err)
    });
  }

  openViewModal(id: number): void {
    this.selectedHandyman = this.handymenList.find(h => h.id === id) || null;
    this.modalInstance = new Modal(this.viewModalRef.nativeElement);
    this.modalInstance.show();
  }

  openAddModal(): void {
    this.modalInstance = new Modal(this.addModalRef.nativeElement);
    this.modalInstance.show();
  }

  closeAddModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide(); 
    }
  }

  addHandyman(): void {
    const confirmed = confirm('Are you sure you want to create this handyman?');
    if (confirmed) {
      if (this.isFormValid()) {
        console.log('Creating handyman with user:', this.newHandymanData);
  
        const formData = new FormData();
        formData.append('name', this.newHandymanData.user.name);
        formData.append('email', this.newHandymanData.user.email);
        formData.append('password', this.newHandymanData.user.password ?? '');
  
        this.handymanService.postHandymanCreation(formData).subscribe({
          next: (res) => {
            console.log('Handyman created successfully:', res);
            this.fetchHandymen();
            this.resetForm();
            this.closeAddModal();
          },
          error: (err) => {
            console.error('Error creating handyman:', err);
          }
        });
      } else {
        alert('Please fill in all required fields');
      }
    } else {
      console.log('Creation cancelled');
      this.resetForm();
      this.closeAddModal();
    }
  }
  

  isFormValid(): boolean {
    return (
      this.newHandymanData.user?.name.trim() !== '' &&
      this.newHandymanData.user?.email.trim() !== '' &&
      this.newHandymanData.user?.password?.trim() !== ''
    );
  }

  resetForm(): void {
    this.newHandymanData = {
      user: {
        name: '',
        email: '',
        password: '',
        role: 'handyman',
        steps: '0'
      } as Users,
      status: 'available'
    };
  }

  openEditModal(id: number): void {
    this.selectedHandyman = this.handymenList.find(h => h.id === id) || null;
    this.modalInstance = new Modal(this.editModalRef.nativeElement);
    this.modalInstance.show();
  }

  updateHandyman(): void {
    if (this.selectedHandyman) {
      const confirmed = confirm('Are you sure you want to update this handyman?');
      if (confirmed) {
        if (this.isUpdateFormValid()) {
          const updatedHandymanData = { ...this.selectedHandyman };  
          console.log('Updating handyman:', updatedHandymanData);
  
          const formData = new FormData();
          formData.append('name', updatedHandymanData?.user?.name || '');  
          formData.append('email', updatedHandymanData?.user?.email || ''); 
          formData.append('password', updatedHandymanData?.user?.password ?? ''); 
          formData.append('status', updatedHandymanData.status);
          formData.append('user_id', updatedHandymanData.user_id.toString());          
  
          this.handymanService.postUpdateHandyman(formData).subscribe({
            next: (res) => {
              console.log('Handyman updated successfully:', res);
              this.fetchHandymen();
              this.closeEditModal();
            },
            error: (err) => {
              console.error('Error updating handyman:', err);
            }
          });
        } else {
          alert('Please fill in all required fields');
        }
      } else {
        console.log('Update cancelled');
        this.closeEditModal();
      }
    }
  }
  
  isUpdateFormValid(): boolean {
    const user = this.selectedHandyman?.user;
    const password = user?.password ?? '';
  
    return (
      user?.name.trim() !== '' &&
      user?.email.trim() !== '' &&
      (password === '' || password.length >= 6)
    );
  }


  closeEditModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();  
    }
  }
  

  terminateHandyman(handyman_id: number): void {
    const confirmed = confirm('Are you sure you want to terminate this handyman?');
    if (confirmed) {
      console.log(`Terminating handyman with ID: ${handyman_id}`);
      this.handymanService.postTerminateHandyman(handyman_id).subscribe({
        next: (res) => {
          console.log('Handyman terminated successfully:', res);
          this.fetchHandymen()
        },
        error: (err) => {
          console.error('Error terminateHandyman handyman:', err);
        }
      })
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

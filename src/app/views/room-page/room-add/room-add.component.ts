import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../core/service/room/room.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // <-- Import this
import { Room, RoomResponse } from '../../../core/interfaces/room.interface';

@Component({
  selector: 'app-room-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.css']
})
export class RoomAddComponent {
  property_id: number | null = null;
  selectedImages: string[] = []; // Array to hold selected images
  room: Room = {
    property_id: 0,
    description: '',
    room_details: '',
    category: '',
    rent_price: 0,
    capacity: 0,
    current_occupants: 0,
    min_lease: 0,
    size: '',
    status: 'available',
    unit_type: 'studio unit',
    reservation_fee: 0,
    room_picture_url: [],
    room_code: '',
    updated_at: '',
    created_at: '',
    id: 0,
  };

  // room = {
  //   rentPrice: '',
  //   capacity: '',
  //   status: 'available',
  //   minLease: '',
  //   // images: [] as (File | string | any)[],
  //   images: [] as string[] // To store image files
  // };

  constructor(private router: Router, private route: ActivatedRoute, private roomService: RoomService) {
    this.route.params.subscribe(params => {
      this.property_id = params['property_id'];
      console.log('Property ID:', this.property_id);
    });
  }

  // Handle image selection
  onImageSelected(event: any): void {
    const files = event.target.files; // Get the selected files
    const maxImages = 7;
  
    if (this.room.room_picture_url.length + files.length > maxImages) {
      alert(`You can only select up to ${maxImages} images.`);
      return;
    }
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.room.room_picture_url.push(file); // Store the File object
    }
  
    // For preview, convert to base64
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImages.push(reader.result as string); // Add to preview array
      };
      reader.readAsDataURL(files[i]);
    }
  } 
  // Handle form submission
  onSubmit(): void {
    // Validate the form data
    if (!this.room.description || !this.room.room_details || !this.room.category || !this.room.rent_price || !this.room.capacity || !this.room.size || !this.room.status || !this.room.min_lease || !this.room.unit_type) {
      alert('Please fill out all required fields.');
      return;
    }
  
    // Prepare data for submission
    const formData = new FormData();
    formData.append('description', this.room.description.toString());
    formData.append('room_details', this.room.room_details.toString());
    formData.append('category', this.room.category.toString());
    formData.append('rent_price', this.room.rent_price.toString());  // Matching interface property names
    formData.append('capacity', this.room.capacity.toString());
    formData.append('size', this.room.size.toString());
    formData.append('status', this.room.status.toString());
    formData.append('min_lease', this.room.min_lease.toString());
    formData.append('unit_type', this.room.unit_type.toString());
    formData.append('reservation_fee', this.room.reservation_fee.toString());


    // Add image files to the form data
    for (const file of this.room.room_picture_url) {
      console.log('Adding image:', file);
      formData.append('room_picture_url[]', file);  // Correct field name
    }
  
    console.log('FormData contents:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    // Call the service to submit the data
    this.roomService.storeRoomData(this.property_id , formData).subscribe(
      (response: RoomResponse) => {
        console.log('Room added successfully:', response);
        this.router.navigate([`admin/properties/rooms/${this.property_id}`]);
      },
      (error) => {
        console.error('Error adding room:', error);
      }
    );
  }
  

  goToRooms(property_id: number | null): void {
    this.router.navigate([`admin/properties/rooms/${this.property_id}`]);
  }
}

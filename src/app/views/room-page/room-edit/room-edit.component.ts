import { Component, OnInit } from '@angular/core';
import { Room, RoomResponse } from '../../../core/interfaces/room.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../core/service/room/room.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/service/auth/auth.service';

@Component({
  selector: 'app-room-edit',
  imports: [CommonModule,FormsModule],
  templateUrl: './room-edit.component.html',
  styleUrl: './room-edit.component.css'
})
export class RoomEditComponent implements OnInit{

  property_id: number | number = 0;
  room_id: number | number = 0;

  selectedImages: string[] = [];   // Array to hold selected images
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

  constructor(private router: Router, private route: ActivatedRoute, private roomService: RoomService, private authService: AuthService) {
    this.route.params.subscribe(params => {
      this.property_id = params['property_id'];
      this.room_id = params['id'];
      console.log('Property ID:', this.property_id);
      console.log('room ID:', this.room_id);
    });
  }

  ngOnInit(): void{
    this.fetchRoom(this.room_id);
  }
  
  fetchRoom(room_id: number | number = 0): void{
    console.log(`from fetchRoom(): ${room_id}`);
    this.roomService.getRoomData(this.room_id).subscribe((response: any) => {
      if (response) {
        this.room = response.data.rooms;
        const imageUrls: string[] = response.data.rooms.room_picture_url;

        imageUrls.forEach(imageUrl => {
          this.selectedImages.push(imageUrl);
        });
        //  this.selectedImages = imageUrl;
        // this.selectedImages = response.data.rooms.room_picture_url;
        console.log(`from fetchRoom(): ${this.selectedImages}`);
        if (this.selectedImages !== null) {
          console.log('no pictures');
        }
      }
    });
  }
  
    
  onImageSelected(event: any): void {
    const files = event.target.files; // Get the selected files
    const maxImages = 7;

    this.selectedImages = [];
    this.room.room_picture_url = [];

  
    if (files.length > maxImages) {
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

  onSubmitEdit(): void {
    // Validate the form data
    if (!this.room.rent_price || !this.room.capacity || !this.room.status || !this.room.min_lease) {
      alert('Please fill out all required fields.');
      return;
    }
  
    // Prepare data for submission
    const formData = new FormData();
    formData.append('rent_price', this.room.rent_price.toString());  // Matching interface property names
    formData.append('description', this.room.description.toString());
    formData.append('category', this.room.category.toString());
    formData.append('room_details', this.room.room_details.toString());
    formData.append('size', this.room.size.toString());
    formData.append('capacity', this.room.capacity.toString());
    formData.append('status', this.room.status.toString());
    formData.append('min_lease', this.room.min_lease.toString());
    formData.append('unit_type', this.room.unit_type.toString());

  
    // Only append room_picture_url if there are new images selected
    if (this.room.room_picture_url && this.room.room_picture_url.length > 0 && this.room.room_picture_url[0] instanceof File) {
      // Only add image files if new ones are selected
      for (const file of this.room.room_picture_url) {
        if (file instanceof File) {
          console.log('Adding new image file:', file);
          formData.append('room_picture_url[]', file);  // Append only files
        }
      }
    } else {
      // If no new files are selected, do not include room_picture_url in the form data
      console.log('No new images, room_picture_url not included in payload.');
    }
  
    console.log('FormData contents:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    // Call the service to submit the data
    this.roomService.updateRoomData(this.room_id, this.property_id, formData).subscribe(
      (response: RoomResponse) => {
        console.log('Room updated successfully:', response);
        this.router.navigate([`admin/properties/rooms/${this.property_id}`]);
      },
      (error) => {
        console.error('Error updating room:', error);
      }
    );
  }
    
  goToRooms(property_id: number | null): void {
    this.router.navigate([`admin/properties/rooms/${this.property_id}`]);
  }
}

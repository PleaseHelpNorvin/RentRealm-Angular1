import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../core/service/room/room.service';
import { Room, RoomResponse } from '../../core/interfaces/room.interface';

@Component({
  selector: 'app-room-page',
  imports: [CommonModule],
  templateUrl: './room-page.component.html',
  styleUrl: './room-page.component.css'
})
export class RoomPageComponent {
  rooms: Room[] = [];
  errorMessage: string = '';
  property_id: number | null = null;
  mainImage: string = '../../../assets/AdminLTE/dist/img/Ap1.jpg'; // Default main image
  thumbnails: string[] = [
    '../../../assets/AdminLTE/dist/img/Ap1.jpg',
    '../../../assets/AdminLTE/dist/img/Ap2.jpg',
    '../../../assets/AdminLTE/dist/img/Ap3.jpg',
    '../../../assets/AdminLTE/dist/img/Ap4.jpg',
    '../../../assets/AdminLTE/dist/img/Ap5.jpg'
  ];

  constructor(private router: Router, private route: ActivatedRoute, private roomService: RoomService) {
    this.route.params.subscribe(params => {
      this.property_id = params['property_id'];
    });
  }

  ngOnInit(): void {
    if (this.property_id !== null) {
      this.loadRooms(this.property_id);
    } else {
      this.errorMessage = 'Property ID is not available';
    }
  }

  loadRooms(property_id: number): void {
    this.roomService.getRooms(property_id).subscribe({
      next: (response: RoomResponse) => {
        if (response && response.data && Array.isArray(response.data.rooms)) {
          this.rooms = response.data.rooms;
        } else {
          this.errorMessage = `Invalid data structure received: ${JSON.stringify(response)}`;
        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to load Rooms';
        console.error(error);
      },
    });
  }

  onDeleteRoom(id: number): void {
    if (confirm(`Are you sure you want to delete this room?`)) {
      this.roomService.deleteRoomData(id).subscribe({
        next: (response: RoomResponse) => {
          if (this.property_id !== null) {
            this.loadRooms(this.property_id);
          }
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete room';
          console.error(error);
        }
      });
    }
  }

  goToViewRoom(property_id: number, id: number): void {
    this.router.navigate([`admin/properties/rooms/${property_id}/${id}`]);
  }

  goToAddRoom(property_id: number | null): void {
    this.router.navigate([`admin/properties/${property_id}/rooms/add`]);
  }

  goToEditRoom(property_id: number, id: number): void {
    this.router.navigate([`admin/properties/${property_id}/rooms/${id}/edit`]);
  }

  goToProperty(): void {
    this.router.navigate([`admin/properties`]);
  }

  // Function to update the main image when a thumbnail is clicked
  swapImage(imageUrl: string): void {
    this.mainImage = imageUrl;
  }
}

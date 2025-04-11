import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../core/service/room/room.service';
import { Room, RoomResponse } from '../../core/interfaces/room.interface';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-room-page',
  imports: [CommonModule],
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.css']
})
export class RoomPageComponent implements AfterViewInit {

  roomModal!: Modal; // Reference to the modal instance
  @ViewChild('roomViewModal') roomViewModal!: ElementRef;

  rooms: Room[] = [];
  room: Room | null = null;
  errorMessage: string = '';
  property_id: number | null = null;
  mainImage: string = 'path/to/default/image.jpg'; // Default image
  selectedRoomImages: string[] = []; // To store images for the selected room

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
  ngAfterViewInit() {
    // Remove modal opening here
    // If you want to initialize the modal for later use, you can keep this part:
    if (this.roomViewModal) {
      this.roomModal = new Modal(this.roomViewModal.nativeElement); // Initialize modal
    }
  }
  
  loadRooms(property_id: number): void {
    this.roomService.getRooms(property_id).subscribe({
      next: (response: RoomResponse) => {
        if (response && response.data && Array.isArray(response.data.rooms)) {
          this.rooms = response.data.rooms;
          if (this.rooms.length > 0) {
            // Select the first room by default
            this.selectRoom(this.rooms[0]);
          }
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

  selectRoom(room: Room): void {
    this.selectedRoomImages = Array.isArray(room.room_picture_url) ? room.room_picture_url : [room.room_picture_url];
    this.mainImage = this.selectedRoomImages.length > 0 ? this.selectedRoomImages[0] : 'path/to/default/image.jpg';
  }
  onViewRoomDetail(roomId: number): void {

    if (this.roomModal) {
      this.roomModal.show(); // Show the modal when a room is clicked
    }
    // Fetch the room details using roomId
    this.roomService.getRoomData(roomId).subscribe({
      next: (response: RoomResponse) => {
        if (response && response.data && response.data.rooms) {
          // Find the specific room using the roomId
          const room = response.data.rooms.find(r => r.id === roomId);
  
          if (room) {
            this.room = room;  // Set the room to the found room
            this.loadRoomImages(room);  // Load its images
            // Ensure that roomModal is initialized before calling show()
            if (this.roomModal) {
              this.roomModal.show();  // Show the modal
            }
          } else {
            console.error('Room not found for id:', roomId);
            this.errorMessage = 'Room not found';
          }
        } else {
          console.error('Invalid response structure:', response);
          this.errorMessage = 'Failed to load room details';
        }
      },
      error: (error) => {
        console.error('Failed to load room details:', error);
        this.errorMessage = 'Failed to load room details';
      }
    });
  }
  

  onRoomClick(room: Room): void {
    this.room = room;
    this.loadRoomImages(room);
    // Ensure that roomModal is initialized before calling show()
    // if (this.roomModal) {
    //   this.roomModal.show(); // Show the modal when a room is clicked
    // }
  }

  loadRoomImages(room: Room): void {
    if (room && Array.isArray(room.room_picture_url) && room.room_picture_url.length > 0) {
      this.selectedRoomImages = room.room_picture_url; // Store all images for the selected room
      this.mainImage = room.room_picture_url[0]; // Set the first image as the main image
    } else {
      this.mainImage = 'path/to/default/image.jpg'; // Default image when no images are available
      this.selectedRoomImages = [];
    }
  }

  swapImage(imageUrl: string): void {
    this.mainImage = imageUrl;
  }

  onDeleteRoom(id: number): void {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.deleteRoomData(id).subscribe({
        next: () => {
          // Handle successful deletion
          this.loadRooms(this.property_id!); // Reload rooms after deletion
        },
        error: (error) => {
          console.error('Failed to delete room:', error);
        },
      });
    }
  }
  goToRoomTenant(room_id: number | null, property_id: number | null): void {
    this.router.navigate([`admin/properties/rooms/${property_id}/${room_id}/tenants`]);
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
}

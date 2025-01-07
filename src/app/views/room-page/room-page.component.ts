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
  
  constructor(private router: Router, private route: ActivatedRoute, private roomService: RoomService) {
    this.route.params.subscribe(params => {
      this.property_id = params['property_id'];
      console.log('Property ID:', this.property_id);
    });
  }

  ngOnInit(): void{
    if (this.property_id !== null) {
      this.loadRooms(this.property_id);  // Pass the property_id to loadRooms
    } else {
      this.errorMessage = 'Property ID is not available';
    }
  }

  loadRooms(property_id: number): void {
    console.log("from loadRooms(): ", property_id);
    this.roomService.getRooms(property_id).subscribe({
      next: (response: RoomResponse) => {
        console.log('API Response:', response);
        if (response && response.data && Array.isArray(response.data.rooms)) {
          this.rooms = response.data.rooms; 
          console.log('Rooms:', this.rooms); 
        } else {
          this.errorMessage = `Invalid data structure received: ${JSON.stringify(response)}`;
        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to load Rooms';
        console.error(error); // Log the error for debugging
      },
    });
  }

  goToViewRoom(property_id: number, id: number): void {
    this.router.navigate([`admin/properties/rooms/${property_id}/${id}`]);
    console.log(this.router.navigate([`admin/properties/rooms/${property_id}/${id}`]));
  }

  
}

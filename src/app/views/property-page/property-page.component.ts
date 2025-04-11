import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../core/service/property/property.service';
import { CommonModule } from '@angular/common';
import { Property, PropertyResponse } from '../../core/interfaces/property.interface';
import { Router, RouterModule  } from '@angular/router';
// import { Room, RoomResponse } from '../../core/interfaces/room.interface';
import { DatePipe } from '@angular/common';

import { RoomService } from '../../core/service/room/room.service';

@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.css'],
  imports: [CommonModule, RouterModule],
  providers: [DatePipe]
})
export class PropertyPageComponent implements OnInit {
  properties: Property[] = []; // Array to hold the property data
  // rooms: Room[] = [];

  errorMessage: string = ''; // To handle errors

  constructor(private router: Router, private propertyService: PropertyService, private roomService: RoomService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadProperties(); // Fetch properties when the component is initialized
  }

  loadProperties(): void {
    this.propertyService.getProperties().subscribe({
      next: (response: PropertyResponse) => {
        if (response && response.data && Array.isArray(response.data.properties)) {
          this.properties = response.data.properties.map(property => {
            property.created_at = this.datePipe.transform(property.created_at, 'medium') || property.created_at;

            if (typeof property.property_picture_url === 'string') {
              try {
                property.property_picture_url = JSON.parse(property.property_picture_url);
              } catch (error) {
                console.error('Error parsing property_picture_url', error);
                property.property_picture_url = [];
              }
            }

            return property;
          });

          // Count rooms after loading properties
          this.countRoomsPerProperty();
          this.countVacantRoomPerProperty();
          this.countFullRoomPerProperty();

        } else {
          this.errorMessage = 'Invalid data structure received';
        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to load properties';
        console.error(error);
      },
    });
  }

  countRoomsPerProperty(): void {
    this.properties.forEach(property => {
      this.roomService.getRooms(property.id).subscribe({
        next: (response) => {
          property.roomCount = response.data.rooms.length;
        },
        error: (error) => {
          console.error('Failed to load rooms for property id:', property.id, error);
        }
      });
    });
  }

  countVacantRoomPerProperty(): void {
    this.properties.forEach(property => {
      this.roomService.getRooms(property.id).subscribe({
        next: (response) => {
          const vacantRooms = response.data.rooms.filter(room => room.status === 'vacant');
          property.vacantRoomCount = vacantRooms.length;
        },
        error: (error) => {
          console.error('Failed to load rooms for property id:', property.id, error);
        }
      });
    });
  }

  countFullRoomPerProperty(): void {
    this.properties.forEach(property => {
      this.roomService.getRooms(property.id).subscribe({
        next: (response) => {
          const fullRooms = response.data.rooms.filter(room => room.status === 'full');
          property.fullRoomCount = fullRooms.length;
        },
        error: (error) => {
          console.error('Failed to load rooms for property id:', property.id, error);
        }
      });
    });
  }
  


  

  // Method to delete a property
  deleteProperty(id: number): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(id).subscribe({
        next: (response) => {
          // On success, filter out the deleted property from the array
          this.properties = this.properties.filter(property => property.id !== id);
          console.log('Property deleted:', response);
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete property';
          console.error(error);
        },
      });
    }
  }

  goToUpdatePage(id: number): void {
    this.router.navigate([`/admin/properties/update/`, id]);
    console.log(this.router.navigate([`/admin/properties/update/`, id]));
  }

  goToViewRoomsPage(property_id: number): void {
    this.router.navigate([`/admin/properties/rooms/`, property_id]);
    console.log(this.router.navigate([`/admin/properties/rooms/`, property_id]));
  }
  goToAddPropertyPage(): void {
    this.router.navigate([`/admin/properties/add`]);
    console.log(this.router.navigate([`/admin/properties/add`]));
  }
}

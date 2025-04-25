import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../core/service/property/property.service';
import { CommonModule } from '@angular/common';
import { Property, PropertyResponse } from '../../core/interfaces/property.interface';
import { Router, RouterModule } from '@angular/router';
import { RoomService } from '../../core/service/room/room.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-page',
  standalone: true,
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [DatePipe]
})
export class PropertyPageComponent implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  errorMessage: string = '';
  currentFilter: string = 'all';
  sortOrder: string = 'index';
  sortDirection: string = 'asc';
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private roomService: RoomService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  // Add these two methods to calculate totals for the filter buttons
  getTotalVacant(): number {
    return this.properties.reduce((total, property) => total + (property.vacantRoomCount || 0), 0);
  }

  getTotalFull(): number {
    return this.properties.reduce((total, property) => total + (property.fullRoomCount || 0), 0);
  }

  loadProperties(): void {
    this.isLoading = true;
    this.propertyService.getProperties().subscribe({
      next: (response: PropertyResponse) => {
        if (response?.data?.properties) {
          console.log('properties: ', response.data.properties)
          this.properties = response.data.properties.map(property => {
            property.created_at = this.datePipe.transform(property.created_at, 'medium') || property.created_at;
            
            if (typeof property.property_picture_url === 'string') {
              try {
                property.property_picture_url = JSON.parse(property.property_picture_url);
              } catch {
                console.log("images", property.property_picture_url);
                property.property_picture_url = [];
              }
            }
            
            return property;
          });

          this.countRoomsPerProperty(() => {
            this.filteredProperties = [...this.properties];
            this.isLoading = false;
          });
        } else {
          this.errorMessage = 'Invalid data structure received';
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to load properties';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  countRoomsPerProperty(callback?: () => void): void {
    let propertiesProcessed = 0;
    const totalProperties = this.properties.length;
    
    if (totalProperties === 0) {
      if (callback) callback();
      return;
    }

    this.properties.forEach(property => {
      this.roomService.getRooms(property.id).subscribe({
        next: (response) => {
          property.roomCount = response.data.rooms.length;
          property.vacantRoomCount = response.data.rooms.filter(room => room.status.toLowerCase() === 'vacant').length;
          property.fullRoomCount = response.data.rooms.filter(room => room.status.toLowerCase() === 'full').length;
          
          propertiesProcessed++;
          if (propertiesProcessed === totalProperties && callback) {
            callback();
          }
        },
        error: (error) => {
          console.error('Failed to load rooms for property:', property.id, error);
          property.roomCount = 0;
          property.vacantRoomCount = 0;
          property.fullRoomCount = 0;
          propertiesProcessed++;
          if (propertiesProcessed === totalProperties && callback) {
            callback();
          }
        }
      });
    });
  }

  applyFilter(filter: string): void {
    this.currentFilter = filter;
    
    if (filter === 'all') {
      this.filteredProperties = [...this.properties];
      return;
    }

    this.filteredProperties = this.properties.filter(property => {
      const vacant = Number(property.vacantRoomCount) || 0;
      const full = Number(property.fullRoomCount) || 0;
      
      switch(filter) {
        case 'vacant': 
          return vacant > 0;
        case 'full':
          return full > 0;
        case 'maintenance':
          return property.status?.toLowerCase() === 'maintenance';
        default:
          return true;
      }
    });
  }

  shuffleItems(): void {
    this.filteredProperties = [...this.filteredProperties.sort(() => Math.random() - 0.5)];
  }

  sortItems(order: string, direction: string): void {
    this.sortOrder = order;
    this.sortDirection = direction;
    
    this.filteredProperties.sort((a, b) => {
      let comparison = 0;
      
      if (order === 'index') {
        comparison = a.id - b.id;
      } else if (order === 'name') {
        comparison = a.name.localeCompare(b.name);
      }
      
      return direction === 'asc' ? comparison : -comparison;
    });
  }

  deleteProperty(id: number): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(id).subscribe({
        next: () => {
          this.properties = this.properties.filter(p => p.id !== id);
          this.filteredProperties = this.filteredProperties.filter(p => p.id !== id);
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete property';
          console.error(error);
        }
      });
    }
  }

  goToUpdatePage(id: number): void {
    this.router.navigate([`/admin/properties/update/`, id]);
  }

  goToViewRoomsPage(id: number): void {
    this.router.navigate([`/admin/properties/rooms/`, id]);
  }

  goToAddPropertyPage(): void {
    this.router.navigate([`/admin/properties/add`]);
  }
}
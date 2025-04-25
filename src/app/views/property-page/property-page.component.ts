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

  // New total counts
  totalVacantProperties: number = 0;
  totalFullProperties: number = 0;
  totalOccupiedRoomsPerProeprty: number = 0;
  totalVacantRoomsPerProeprty: number = 0; 
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

  //thats bullshit
  getTotalVacant(): number {
    return this.properties.reduce((total, property) => total + (property.total_vacant_rooms || 0), 0);
  }

  getTotalFull(): number {
    return this.properties.reduce((total, property) => total + (property.total_occupied_rooms || 0), 0);
  }

  loadProperties(): void {
    this.isLoading = true;
    this.propertyService.getProperties().subscribe({
      next: (response: PropertyResponse) => {
        if (response?.data?.properties) {
          this.totalVacantProperties = response.data.total_vacant_properties;
          this.totalFullProperties = response.data.total_full_properties;

          this.properties = response.data.properties.map(property => {
            property.created_at = this.datePipe.transform(property.created_at, 'medium') || property.created_at;

            if (typeof property.property_picture_url === 'string') {
              try {
                property.property_picture_url = JSON.parse(property.property_picture_url);
              } catch {
                property.property_picture_url = [];
              }
            }

            return property;
          });

          this.filteredProperties = [...this.properties];
          this.isLoading = false;
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


  applyFilter(filter: string): void {
    this.currentFilter = filter;
  
    if (filter === 'vacant') {
      this.filteredProperties = this.properties.filter(
        property => property.status === 'vacant'
      );
    } else if (filter === 'full') {
      this.filteredProperties = this.properties.filter(
        property => property.status === 'full'
      );
    } else {
      this.filteredProperties = [...this.properties]; // show all
    }
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

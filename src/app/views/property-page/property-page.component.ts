import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../core/service/property/property.service';
import { CommonModule } from '@angular/common';
import { Property, PropertyResponse } from '../../core/interfaces/property.interface';
import { Router, RouterModule  } from '@angular/router';

@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.css'],
  imports: [CommonModule, RouterModule]
})
export class PropertyPageComponent implements OnInit {
  properties: Property[] = []; // Array to hold the property data
  errorMessage: string = ''; // To handle errors

  constructor(private router: Router, private propertyService: PropertyService) {}

  // Method to fetch property data from the backend
  loadProperties(): void {
    this.propertyService.getProperties().subscribe({
      next: (response: PropertyResponse) => {
        // Access properties inside the 'data' object of the response
        if (response && response.data && Array.isArray(response.data.properties)) {
          this.properties = response.data.properties; // Assign the properties array
        } else {
          this.errorMessage = 'Invalid data structure received';
        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to load properties';
        console.error(error); // Log the error for debugging
      },
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

  ngOnInit(): void {
    this.loadProperties(); // Fetch properties when the component is initialized
  }
}

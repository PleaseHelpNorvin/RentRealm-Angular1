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
        console.log(response);
        if (response && response.data && Array.isArray(response.data.properties)) {
          // Parse the property_picture_url into an array
          this.properties = response.data.properties.map(property => {
            // Check if property_picture_url is a string and parse it
            // console.log("Before Parsing:", property.property_picture_url);
            if (typeof property.property_picture_url === 'string') {
              try {
                property.property_picture_url = JSON.parse(property.property_picture_url);
              } catch (error) {
                console.error('Error parsing property_picture_url', error);
                property.property_picture_url = []; // fallback to an empty array if parsing fails
              }
            }
            return property;
          });
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
  goToAddPropertyPage(): void {
    this.router.navigate([`/admin/properties/add`]);
    console.log(this.router.navigate([`/admin/properties/add`]));
  }

  ngOnInit(): void {
    this.loadProperties(); // Fetch properties when the component is initialized
  }
}

import { Component } from '@angular/core';
import { Property } from '../../../core/interfaces/property.interface';
import { FormsModule } from '@angular/forms'; 
import { PropertyService } from '../../../core/service/property/property.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-add',
  imports: [FormsModule, CommonModule],
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.css']
})
export class PropertyAddComponent {

  property: Property = {
    id: 0,
    name: '',
    property_picture_url: [],  // Ensure this is an array
    gender_allowed: '',
    pets_allowed: false,
    type: 'apartment',
    status: 'available',
    updated_at: '',
    created_at: '',
    address: {
      id: 0,
      line_1: '',
      line_2: '',
      province: '',
      country: '',
      postal_code: '',
      longitude: 0,
      latitude: 0,
      addressable_type: '',
      addressable_id: 0,
      created_at: '',
      updated_at: '',
    }
  };

  selectedImages: string[] = [];

  constructor(private propertyService: PropertyService, private router: Router) {}  

  onImageSelected(event: any): void {
    const files = event.target.files;
    const maxImages = 5; // Modify this as per your requirement

    this.selectedImages = [];
    this.property.property_picture_url = [];
    
    if (this.property.property_picture_url.length + files.length > maxImages) {
      alert(`You can only select up to ${maxImages} images`);
      return;
    }
  
    // Store files directly in the property_picture_url array
    for (let i = 0; i < files.length; i++) {
      this.property.property_picture_url.push(files[i]); // Push file objects directly
      const reader = new FileReader();
      reader.readAsDataURL(files[i]); // Prepare base64 string for preview
      reader.onload = () => {
        this.selectedImages.push(reader.result as string); // Preview the image
      };
    }
  }

  onSubmit(): void {
    const formData = new FormData();
  
    // Append basic property details
    formData.append('name', this.property.name);
    formData.append('status', this.property.status);
    formData.append('type', this.property.type);
    formData.append('gender_allowed', this.property.gender_allowed);
    // formData.append('pets_allowed', this.property.pets_allowed ? '1' : '0');
    formData.append('pets_allowed', this.property.pets_allowed ? '1' : '0');

    // Append address details
    formData.append('line_1', this.property.address.line_1);
    formData.append('line_2', this.property.address.line_2);
    formData.append('province', this.property.address.province);
    formData.append('country', this.property.address.country);
    formData.append('postal_code', this.property.address.postal_code);
  
    // Loop through the images array and append each image as a Blob
    for (let i = 0; i < this.property.property_picture_url.length; i++) {
      const file = this.property.property_picture_url[i];
      if (file instanceof File) {
        formData.append('property_picture_url[]', file, file.name);  // Ensure that the file is a File object
      } else {
        console.error('Selected item is not a file:', file);
      }
    }
  
    // Log the form data for debugging
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    // Call the API to update the property
    this.propertyService.addProperty(formData).subscribe(
      response => {
        console.log(`Property Added successfully: ${response}`);
        this.router.navigate(['/admin/properties']);
      },
      error => {
        console.error('Error Add property:', error);
      }
    );
  }

  goToProperty(): void {
    this.router.navigate(['/admin/properties']);
  }
}

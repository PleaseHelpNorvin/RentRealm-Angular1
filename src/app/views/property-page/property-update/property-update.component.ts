import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../../core/service/property/property.service';
import { Property } from '../../../core/interfaces/property.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-update',
  templateUrl: './property-update.component.html',
  styleUrls: ['./property-update.component.css'],
  imports: [FormsModule, CommonModule]
})
export class PropertyUpdateComponent implements OnInit {
  property_id: number | number = 0;

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
      addressable_type: '',
      addressable_id: 0,
      created_at: '',
      updated_at: '',
    }
  };

  selectedImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.property_id = params['id'];
    });
  }

  ngOnInit(): void {
    this.fetchProperty(this.property_id)
  }

  fetchProperty(property_id: number | number = 0): void {
    console.log(`from fetchProperty(): ${property_id}`);
    this.propertyService.getPropertyById(property_id).subscribe((response: any) => {
      console.log('Full response:', response);  // Log the full response for debugging
      if (response && response.data) {
        this.property = response.data;
        console.log('this is this.property', this.property);
  
        const imageUrls: string = response.data.property_picture_url;
        
        // Check if property_picture_url is a string and try to parse it
        if (imageUrls) {
          try {
            const parsedUrls = JSON.parse(imageUrls);  // Parse the stringified JSON array
            if (Array.isArray(parsedUrls)) {
              parsedUrls.forEach((imageUrl: string) => {
                this.selectedImages.push(imageUrl);
              });
              console.log(`from fetchProperty(): ${this.selectedImages}`);
            } else {
              console.log('Parsed property_picture_url is not an array');
            }
          } catch (error) {
            console.error('Error parsing property_picture_url:', error);
          }
        } else {
          console.log('No valid property_picture_url found');
        }
      } else {
        console.error('Invalid response data');
      }
    });
  } 
  
  onImageSelected(event: any): void {
    const files = event.target.files;
    const maxImages = 5; // Modify this as per your requirement
    
    // Clear previous selected images when a new one is selected
    this.selectedImages = [];  // Reset the selected images array
    this.property.property_picture_url = [];
  
    if (this.property.property_picture_url.length + files.length > maxImages) {
      alert(`You can only select up to ${maxImages} images`);
      return;
    }
  
    // Loop through selected files and process each one
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
  
      // Log the details of each file selected
      console.log('Selected File:', file.name);
      console.log('File Type:', file.type);
      console.log('File Size (bytes):', file.size);
  
      // Push file object to property_picture_url array
      this.property.property_picture_url.push(file);
  
      // Create a FileReader to generate a preview URL for the image
      const reader = new FileReader();
      reader.readAsDataURL(file);  // Prepare base64 string for preview
      reader.onload = () => {
        const previewUrl = reader.result as string;
        console.log('Preview URL:', previewUrl); // Log the preview URL
        this.selectedImages.push(previewUrl); // Store the preview URL
      };
    }
  }

  onSubmit(): void {
    const formData = new FormData();
  
    // Append property details
    formData.append('name', this.property.name);
    formData.append('status', this.property.status);
    formData.append('type', this.property.type);
    formData.append('gender_allowed', this.property.gender_allowed);
    formData.append('pets_allowed', this.property.pets_allowed ? '0' : '1');
  
    // Append address details
    formData.append('line_1', this.property.address.line_1);
    formData.append('line_2', this.property.address.line_2);
    formData.append('province', this.property.address.province);
    formData.append('country', this.property.address.country);
    formData.append('postal_code', this.property.address.postal_code);
  
    // Only append images if new files are selected
    if (this.property.property_picture_url.length > 0) {
      for (let i = 0; i < this.property.property_picture_url.length; i++) {
        const file = this.property.property_picture_url[i];
        if (file instanceof File) { // Ensure it's a new file
          formData.append('property_picture_url[]', file, file.name);
        }
      }
    }
  
    // Debug log for FormData contents
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
  
    // Make the update request
    this.propertyService.updateProperty(this.property_id, formData).subscribe(
      response => {
        console.log('Property updated:', response);
        this.router.navigate(['/admin/properties']);
      },
      error => {
        console.error('Error updating property:', error);
      }
    );
  }
  

  goToProperty(): void {
    this.router.navigate([`admin/properties`]);
  }
}

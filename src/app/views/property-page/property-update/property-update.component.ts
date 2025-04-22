import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../../core/service/property/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Property, PropertyResponse } from '../../../core/interfaces/property.interface';


@Component({
  selector: 'app-property-update',
  imports: [
    CommonModule, // Import CommonModule for *ngIf and other structural directives
    FormsModule   // Import FormsModule for ngModel binding
  ],
  templateUrl: './property-update.component.html',
  styleUrls: ['./property-update.component.css'],
})
export class PropertyUpdateComponent implements OnInit {
  property_id: number = 0;
  // property: any = {};
  

  property: Property = {
    id: 0,
    name: '',
    property_picture_url: [],
    gender_allowed: '',
    // pets_allowed: false,
    type: 'apartment',
    status: 'available',
    created_at: '',
    updated_at: '',
    address: { // Initialize address object with default values
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
      updated_at: ''
    }
  };

  selectedImages: string[] = []; // This will hold image URLs for display

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.property_id = params['id'];
    });
  }

  ngOnInit(): void {
    this.fetchProperty(this.property_id);
  }

  fetchProperty(property_id: number): void {
    console.log('Fetching property with ID:', property_id); // Check if this line runs
    this.propertyService.getPropertyById(property_id).subscribe({
      next: (res: PropertyResponse) => {
        console.log('API Response:', res);  // Log full response
        // 1. Grab the single property object:
        console.log('raw image from response: ', res.data.properties[0].property_picture_url)
        const raw = res.data.properties[0];
        
        // 2. Parse the JSON-stringified URL array:
        const urlString = raw.property_picture_url as unknown as string;
        let pics: string[] = [];
        
        try {
          pics = JSON.parse(urlString);
          console.log('pics:', pics);
        } catch (e) {
          console.error('Invalid JSON in property_picture_url', e);
        }
        
  
        // 3. Merge into your initialized `property` and `selectedImages`:
        this.property = {
          ...this.property,
          ...raw,
          property_picture_url: pics
        };
  
        this.selectedImages = pics;
  
        console.log('Loaded property:', this.property);
        console.log('Loaded images:', this.selectedImages);
      },
      error: (err) => {
        console.error('Error fetchProperty:', err);
      }
    });
  }

  onImageSelected(event: any): void {
    const files = event.target.files;
    this.selectedImages = [];
    this.property.property_picture_url = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.property.property_picture_url.push(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedImages.push(reader.result as string);
      };
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.property.name);
    formData.append('status', this.property.status);
    formData.append('type', this.property.type);
    formData.append('gender_allowed', this.property.gender_allowed);
    // formData.append('pets_allowed', this.property.pets_allowed ? '1' : '0');
    formData.append('line_1', this.property.address.line_1);
    formData.append('line_2', this.property.address.line_2);
    formData.append('province', this.property.address.province);
    formData.append('country', this.property.address.country);
    formData.append('postal_code', this.property.address.postal_code);

    this.property.property_picture_url.forEach((image: File) => {
      formData.append('property_picture_url[]', image, image.name);
    });

    this.propertyService.updateProperty(this.property_id, formData).subscribe(
      (response) => {
        if (response && response.status === 'success') {
          this.router.navigate(['/admin/property']);
        }
      },
      (error) => {
        console.error('Error updating property:', error);
      }
    );
  }

  goToProperty(): void {
    this.router.navigate(['/admin/properties']);
  }
}

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
  
  // property: Property | null = null;
    property: Property = {
    id: 0,
    name: '',
    line_1: '',
    line_2: '',
    province: '',
    country: '',
    postal_code: '',
    type: '',
    status: '',
    updated_at: '',
    created_at: ''
  };

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.propertyService.getPropertyById(id).subscribe((response: any) => {
        if (response) {
          this.property = response.data;
          console.log(response);
          console.log('this is this.property', this.property)
        }
      });
    });
  }

  onSubmit(): void {
    // Handle the form submission, e.g., update the property
    if (this.property) {
      this.propertyService.updateProperty(this.property).subscribe(response => {
        console.log('Property updated:', response);
        this.router.navigate(['/admin/properties']);
        // Optionally, navigate or show a success message
      });
    }
  }
}

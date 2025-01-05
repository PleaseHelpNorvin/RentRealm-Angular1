import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-property-update',
  imports: [],
  templateUrl: './property-update.component.html',
  styleUrl: './property-update.component.css'
})
export class PropertyUpdateComponent {
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const id = params['id'];  // Get 'id' parameter from the route
      console.log('Property ID:', id); // You can use the id as needed
    });
  }

  
}

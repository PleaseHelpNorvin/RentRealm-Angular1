import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-room-page',
  imports: [],
  templateUrl: './room-page.component.html',
  styleUrl: './room-page.component.css'
})
export class RoomPageComponent {
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const property_id = params['property_id'];
      console.log('Property ID:', property_id);
    });
  }

  ngOnInit(): void{
    
  }

  loadRooms(): void {
    
  }
}

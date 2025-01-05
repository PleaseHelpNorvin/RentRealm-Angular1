import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports: [MatListModule, MatIconModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],  // Use styleUrls, not styleUrl
  encapsulation: ViewEncapsulation.None,  // To ensure styles are not encapsulated
})
export class SidebarComponent {

  showInsideSidebar = false; // Sidebar initially hidden

  toggleInsideSidebar() {
    this.showInsideSidebar = !this.showInsideSidebar; // Toggle visibility
    if(this.showInsideSidebar){
      console.log('true');
    }else{
      console.log('false')
    }

  }

}
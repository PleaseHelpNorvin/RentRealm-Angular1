import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';

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
  constructor(public router: Router) {}  // 👈 Inject Router here


  toggleInsideSidebar() {
    this.showInsideSidebar = !this.showInsideSidebar; // Toggle visibility
    if(this.showInsideSidebar){
      console.log('true');
    }else{
      console.log('false')
    }
  }

  isBillingSectionActive(): boolean {
    return this.router.url.startsWith('/admin/billing') ||
           this.router.url.startsWith('/admin/payments-history') ||
           this.router.url.startsWith('/admin/overdue-billings');
  }

}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './contract-page.component.html',
  styleUrl: './contract-page.component.css',
})
export class ContractPageComponent implements OnInit {
  activeTab: string = 'pending'; // Default to 'pending'

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Determine the active tab based on the current route
    const currentRoute = this.activatedRoute.snapshot.firstChild?.routeConfig?.path;
   

      if (!currentRoute) {
        this.router.navigate(['/admin/contract/contract-pending']);
        this.activeTab = 'pending';
      } else if (currentRoute === 'accepted') {
        this.activeTab = 'accepted';
      } else if (currentRoute === 'rejected') {
        this.activeTab = 'rejected';
      }
  }

  goToPending(): void {
    this.router.navigate(['/admin/contract/contract-pending']);
    this.activeTab = 'pending';
  }

  goToAccepted(): void {
    this.router.navigate(['/admin/contract/contract-accepted']);
    this.activeTab = 'accepted';
  }

  goToRejected(): void {
    this.router.navigate(['/admin/contract/contract-rejected']);
    this.activeTab = 'rejected';
  }
}

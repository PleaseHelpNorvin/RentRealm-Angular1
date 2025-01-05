import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIcon  } from '@angular/material/icon';
import { AuthService } from '../../../core/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIcon ,CommonModule,MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  menuOpen = false; // To track if the dropdown menu is open

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Toggle menu visibility
  }

  logout() {
    console.log('Logging out...');
    this.authService.logout().subscribe(
      (response) => {
        console.log('Logout successful:', response);
        this.router.navigate(['/']); // Redirect to the login page
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }


  profile() {
    console.log('Opening profile...');
    // Navigate to the profile page or show profile modal
  }

  settings() {
    console.log('Opening settings...');
    // Navigate to settings page or show settings modal
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../core/service/user/user.service';  
import { Users } from '../../core/interfaces/users.interface';     

@Component({
  selector: 'app-tenants-page',  
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tenants-page.component.html',
  styleUrls: ['./tenants-page.component.css']
})
export class TenantsPageComponent implements OnInit {  
  users: Users[] = [];  
  errorMessage: string = '';  

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  // Method to fetch users from the backend
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log('Response from backend:', response);
        if (response && response.data && Array.isArray(response.data.users)) {
          this.users = response.data.users;
        } else {
          this.errorMessage = 'Invalid user data received';
        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to load users';
        console.error('Error fetching users:', error);
      },
    });
  }

  // Method to navigate to a specific user's detail page
  viewUser(id: number): void {
    this.router.navigate([`/admin/tenant/show`, id]);
    console.log(`Navigating to user ID ${id}`);
  }

  ngOnInit(): void {
    this.loadUsers();  // Load users when the component is initialized
  }
}

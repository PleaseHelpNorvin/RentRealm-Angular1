import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../core/service/user/user.service';  
import { Users } from '../../core/interfaces/users.interface';     
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tenants-page',  
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tenants-page.component.html',
  styleUrls: ['./tenants-page.component.css']
})
export class TenantsPageComponent implements OnInit {  
  users: Users[] = [];  
  errorMessage: string = '';  
  searchTerm: string = '';
  filteredUsers: Users[] = [];


  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  loadUsers(): void {
    this.userService.getUsersWithProfile().subscribe({
      next: (response) => {
        console.log('Response from backend:', response);
        if (response && response.data && Array.isArray(response.data.user)) {
          this.users = response.data.user;  
          this.filteredUsers = [...this.users]; 
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
  filterUsers(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name?.toLowerCase().includes(term) || 
      user.email?.toLowerCase().includes(term) ||
      user.user_profile?.[0]?.occupation?.toLowerCase().includes(term)
    );
  }

  // Method to navigate to a specific user's detail page
  viewUser(profile_id: number): void {
    this.router.navigate([`/admin/tenant/show`, profile_id]);
    console.log(` Navigating to profile_id ${profile_id}`);
  }

  

  ngOnInit(): void {
    this.loadUsers();  // Load users when the component is initialized
  }
}

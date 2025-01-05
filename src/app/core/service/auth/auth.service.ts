import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Your API base URL
  private tokenKey = 'token';  // Key for storing the token in sessionStorage

  constructor(private http: HttpClient, private router: Router) {}

  // Check if the user is logged in (based on the token)
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.tokenKey); // Returns true if token exists in sessionStorage
  }

  // Log in the user by sending credentials to the API
  adminLogin(email: string, password: string): Observable<any> {
    const body = { email, password };
    console.log('adminLogin', body);
    return this.http.post<any>(`${this.apiUrl}/login`, body);  // Adjusted the URL to match your route
  }

  // Log out the user by removing the token
  logout(): Observable<any> {
    const token = this.getToken(); // Get the actual token from sessionStorage
    if (!token) {
      console.error('No token found in sessionStorage');
      throw new Error('User is not logged in');
    }
    const headers = {
      Authorization: `Bearer ${token}` // Use the retrieved token
    };
    sessionStorage.clear();
    

    return this.http.get<any>(`${this.apiUrl}/logout`, { headers }); // Send GET request with headers
  }

  // Save the token
  saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
    console.log('Token saved in sessionStorage:', sessionStorage.getItem(this.tokenKey)); // Debugging log
  }

  // Get the token
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  // Redirect after login
  redirectAfterLogin(): void {
    const returnUrl = this.router.url.split('?returnUrl=')[1] || '/admin/dashboard';
    this.router.navigate([returnUrl]);
  }
}
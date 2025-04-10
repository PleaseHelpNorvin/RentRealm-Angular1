import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; // ✅ Import map here
import { AuthService } from '../auth/auth.service';
import { UserResponse } from '../../interfaces/users.interface'; // Assuming this is the response interface for users

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/landlord/user';  // API URL for user management

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsersWithProfile(): Observable<UserResponse> {
    const token = this.authService.getToken(); // Get token from AuthService
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Specify content type
      'Accept': 'application/json'
    };

    return this.http.get<UserResponse>(`${this.apiUrl}/users-lists-with-relations`, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  
  /**
   * Get a single user by ID
   */
  getUserById(id: number): Observable<any> {
    const token = this.authService.getToken(); // Get token from AuthService
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.http.get<any>(`${this.apiUrl}/show/${id}`, { headers }).pipe(
    
    );
  }

  /**
   * Add a new user
   */
  addUser(userData: any): Observable<UserResponse> {
    const token = this.authService.getToken();  // Get token from AuthService
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Content type for sending data
      'Accept': 'application/json'
    };

    return this.http.post<UserResponse>(`${this.apiUrl}/store`, userData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Update an existing user's details
   */
  updateUser(id: number, userData: any): Observable<UserResponse> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Content type for sending data
      'Accept': 'application/json'
    };

    return this.http.put<UserResponse>(`${this.apiUrl}/update/${id}`, userData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Delete a user
   */
  deleteUser(id: number): Observable<UserResponse> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.http.delete<UserResponse>(`${this.apiUrl}/destroy/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle errors from API requests
   * @param error - The error response
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage); // Return an observable with the error message
  }
}

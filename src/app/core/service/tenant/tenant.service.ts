// tenant.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Tenant, TenantResponse } from '../../interfaces/tenant.interface'; // Import the response interface

@Injectable({
  providedIn: 'root'
})
export class TenantService {
    // private apiUrl = 'http://192.168.1.99:8000/api/tenant/tenant';
    // private adminApiUrl = 'http://192.168.1.99:8000/api/landlord/user';

    private apiUrl = 'http://192.168.60.216:8000/api/tenant/tenant';
    private adminApiUrl = 'http://192.168.60.216:8000/api/landlord/user';




  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Fetch all tenants from the backend
   */
  getTenants(): Observable<TenantResponse> {
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    };

    return this.http.get<TenantResponse>(`${this.apiUrl}/index`, { headers }).pipe(
      catchError(this.handleError) // Handle any errors during the API request
    );
  }
  getTenantProfileByProfileId(profile_id: number): Observable<TenantResponse> {
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    };

    return this.http.get<TenantResponse>(`${this.adminApiUrl}/admin-show-tenant-by-profile-id/${profile_id}`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get a single tenant by ID
   */
  getTenantById(id: number): Observable<any> {
    const token = this.authService.getToken(); // Get the token from AuthService
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.http.get<any>(`${this.apiUrl}/show/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  addTenant(tenantData: any): Observable<TenantResponse> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Content type for sending data
      'Accept': 'application/json'
    };

    return this.http.post<TenantResponse>(`${this.apiUrl}/store`, tenantData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Update a tenant's details
   */
  updateTenant(id: number, tenantData: any): Observable<TenantResponse> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Content type for sending data
      'Accept': 'application/json'
    };

    return this.http.put<TenantResponse>(`${this.apiUrl}/update/${id}`, tenantData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Delete a tenant
   */
  deleteTenant(id: number): Observable<TenantResponse> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.http.delete<TenantResponse>(`${this.apiUrl}/destroy/${id}`, { headers }).pipe(
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

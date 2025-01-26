import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Property, PropertyResponse } from '../../interfaces/property.interface'; // Ensure Property interface is defined correctly

@Injectable({
  providedIn: 'root', // This makes the service available globally in the app
})
export class PropertyService {
  private apiUrl = 'http://127.0.0.1:8000/api/landlord/property'; // Replace with your Laravel API endpoint

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Fetch all properties from the API
   */
  getProperties(): Observable<PropertyResponse> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    }

    return this.http.get<PropertyResponse>(`${this.apiUrl}/index`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addProperty(formData: FormData): Observable<PropertyResponse> {
    const token = this.authService.getToken();
    const headers = {

      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',  // Tell the server we're sending JSON
      'Accept': 'application/json'  // The server should respond with JSON as well
    };
  
    // Send the property object in the body of the request
    return this.http.post<PropertyResponse>(`${this.apiUrl}/store`, formData, { headers });
      // catchError(this.handleError)

  }

  getPropertyById(id: number): Observable<Property> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    };
    return this.http.get<Property>(`${this.apiUrl}/show/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }



  /**
   * Delete a property by ID
   * @param id - The ID of the property to delete
   */
  deleteProperty(id: number): Observable<PropertyResponse> {
    const token = this.authService.getToken();
    console.log("Token being sent:", token);

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    };
    console.log(token);
    console.log(headers);
    return this.http.delete<PropertyResponse>(`${this.apiUrl}/destroy/${id}`, { headers });
    // .pipe()
      // catchError(this.handleError)
    // );
  }

  /**
   * Update property
   * @param property - The property object containing updated values
   */
  updateProperty(property_id: number,formData: FormData): Observable<Property> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    return this.http.post<Property>(`${this.apiUrl}/update/${property_id}`, formData, { headers }).pipe(
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

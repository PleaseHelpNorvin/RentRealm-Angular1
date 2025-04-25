import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {ReservationResponse } from '../../interfaces/reservation.interface';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://192.168.1.99:8000/api/landlord/reservation'
  constructor(private http: HttpClient, private authService: AuthService) { }

  getReservations(): Observable<ReservationResponse>{
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    }
    return this.http.get<ReservationResponse>(`${this.apiUrl}/index`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  postApprove(id: number | null): Observable<any> {
    const token = this.authService.getToken();
    const admin_id = this.authService.getAdminId();
    console.log(`from postApprove admin ${admin_id}`);
    console.log(`from postApprove token: ${token}`);
  
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  
    // Instead of sending query params, send the data in the body
    const body = {
      status: 'approved',
      approved_by: admin_id
    };
  
    return this.http.post<any>(`${this.apiUrl}/updateStatus/${id}`, body, { headers }).pipe(
      'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'
    }
  
    const body = {
      status: 'approved',
      approved_by: admin_id
    };
  
    return this.http.post<any>(`${this.apiUrl}/updateStatus/${id}`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  postReject(id: number | null): Observable<any> {
    const token = this.authService.getToken();
    let admin_id = this.authService.getAdminId();
    console.log(`from postReject admin ${admin_id}`);
    console.log(`from postReject token: ${token}`);
    
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'
    }
  
    const body = {
      status: 'rejected',
      approved_by: admin_id
    };
  
    return this.http.post<any>(`${this.apiUrl}/updateStatus/${id}`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
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

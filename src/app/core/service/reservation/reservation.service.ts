import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {ReservationResponse } from '../../interfaces/reservation.interface';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://127.0.0.1:8000/api/landlord/reservation'
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

  patchApprove(id: number | null): Observable<any> {
    const token = this.authService.getToken();
    let admin_id = this.authService.getAdminId();
    console.log(`from postApprove admin ${admin_id}`)
    console.log(`from postApprove token: ${token} `)
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    }

    return this.http.patch<any>(`${this.apiUrl}/updateStatus/${id}?status=approved&approved_by=${admin_id}`, {}, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  patchReject(id: number | null): Observable<any> {
    const token = this.authService.getToken();
    let admin_id = this.authService.getAdminId();
    console.log(`from postApprove admin ${admin_id}`)
    console.log(`from postApprove token: ${token} `)
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    }
    return this.http.patch<any>(`${this.apiUrl}/updateStatus/${id}?status=rejected&approved_by=${admin_id}`, {}, {headers}).pipe(
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

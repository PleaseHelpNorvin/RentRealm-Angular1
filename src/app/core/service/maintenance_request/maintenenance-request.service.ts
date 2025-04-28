import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { MaintenanceRequestResponse } from '../../interfaces/maintenance_request.interface';
import { RentalAgreementResponse } from '../../interfaces/rental_agreement.interface';

@Injectable({
  providedIn: 'root'
})
export class MaintenenanceRequestService {
  private apiUrl = 'http://192.168.1.99:8000/api/landlord/maintenance_request';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getMaintenanceRequests(): Observable<MaintenanceRequestResponse> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'  
    }

    return this.http.get<MaintenanceRequestResponse>(`${this.apiUrl}/index`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  patchAssignMaintenanceRequestToTenant(request_id: number, handyman_id: number): Observable<MaintenanceRequestResponse> {
    const admin_id = this.authService.getAdminId();
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  
    const body = {
      request_id,
      handyman_id,
      admin_id
    };
    
    return this.http.post<MaintenanceRequestResponse>(`${this.apiUrl}/assign-maintenance-request`, body, { headers });
  }

  patchApproveMaintenanceRequest(request_id: number): Observable<MaintenanceRequestResponse> {
    const admin_id = this.authService.getAdminId();
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  
    const body = {
      request_id,
      admin_id
    };
  
    console.log('from patchApproveMaintenanceRequest', body);
  
    return this.http.post<MaintenanceRequestResponse>(
      `${this.apiUrl}/approve-maintenance-request`,
      body,
      { headers }
    ).pipe(
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

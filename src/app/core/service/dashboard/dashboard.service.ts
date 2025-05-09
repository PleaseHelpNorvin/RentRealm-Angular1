import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { DashboardResponse } from '../../interfaces/dashboard.interface';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // private apiUrl = 'http://192.168.1.99:8000/api/landlord/dashboard';
  private apiUrl = 'http://192.168.60.216:8000/api/landlord/dashboard';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getDashboardData(): Observable<DashboardResponse> {
    const token = this.authService.getToken();
    console.log('getDashboardData',token)
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'  
    }

    return this.http.get<DashboardResponse>(`${this.apiUrl}/index`, {headers}).pipe(
      catchError(this.handleError)
    )
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

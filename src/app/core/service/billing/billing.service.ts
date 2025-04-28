import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { BillingResponse } from '../../interfaces/billing.interface';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  // private apiUrl = 'http://192.168.1.99:8000/api/landlord/billing'
  private apiUrl = 'http://192.168.60.216:8000/api/landlord/billing'

  constructor(private http: HttpClient, private authService: AuthService ) { }

  getBillings(): Observable<BillingResponse> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', 
      'Accept': 'application/json'  
    }

    return this.http.get<BillingResponse>(`${this.apiUrl}/index`, {headers}).pipe(
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

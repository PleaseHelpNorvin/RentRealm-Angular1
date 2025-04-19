import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RentalAgreementResponse } from '../../interfaces/rental_agreement.interface';

@Injectable({
  providedIn: 'root'
})
export class RentalAgreementService {
  private apiUrl = 'http://127.0.0.1:8000/api/landlord/rental_agreement'

  constructor(private http: HttpClient, private authService: AuthService) { }

  getRentalAgreements(): Observable<RentalAgreementResponse>{
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'  
    }

    return this.http.get<RentalAgreementResponse>(`${this.apiUrl}/index`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  getRentalAgreementPdf(agreement_code: string | null | undefined): Observable<RentalAgreementResponse> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'  
    }

    return this.http.get<RentalAgreementResponse>(`${this.apiUrl}/view-pdf/${agreement_code}`, {headers}).pipe(
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

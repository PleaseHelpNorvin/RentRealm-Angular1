import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { UserResponse, UserSettingResponse } from '../../interfaces/users.interface';
import { SettingResponse } from '../../interfaces/setting.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private apiUrl = 'http://127.0.0.1:8000/api/landlord/setting';
  constructor(private http: HttpClient, private authService: AuthService) { }

  showUserSetting(): Observable<UserSettingResponse>{
    const userId = this.authService.getAdminId();
    const token = this.authService.getToken(); // Get token from AuthService
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Specify content type
      'Accept': 'application/json'
    };

    return this.http.get<UserSettingResponse>(`${this.apiUrl}/show-setting/${userId}`, {headers}).pipe(
      catchError(this.handleError)
    ); 
  }

  putAdminUpdate(name: string | null, email: string | null, admin_phone: string | null, password: string | null): Observable<UserSettingResponse> {
  
    const userId = this.authService.getAdminId();
    const token = this.authService.getToken();
  
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  
    const body = {
      name,
      email,
      admin_phone,
      password
    };
  
    return this.http.put<UserSettingResponse>(`${this.apiUrl}/update-admin/${userId}`, body, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  postUpdateSetting(settingData: any): Observable<SettingResponse> {
    const userId = this.authService.getAdminId();
    const token = this.authService.getToken();
  
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    return this.http.post<SettingResponse>(`${this.apiUrl}/update-or-create-setting`, settingData, { headers })
      .pipe(
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

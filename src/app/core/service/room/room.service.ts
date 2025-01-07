import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Room, RoomResponse } from '../../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://127.0.0.1:8000/api/landlord/room';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getRooms(property_id: number): Observable<RoomResponse> {

    console.log("from getRooms(): ",property_id);

    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    }

    return this.http.get<RoomResponse>(`${this.apiUrl}/property/${property_id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getRoomData(id: number): Observable<RoomResponse> {
    console.log("from getRoomData():", id);
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    }
    return this.http.get<RoomResponse>(`${this.apiUrl}/show/${id}`, {headers}).pipe(
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

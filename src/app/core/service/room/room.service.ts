import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Room, RoomResponse } from '../../interfaces/room.interface';
import { TenantResponse } from '../../interfaces/tenant.interface';

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
    if (!token) {
      console.error('No token found');
      return throwError('No token found');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    }
    return this.http.get<RoomResponse>(`${this.apiUrl}/show/${id}`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  getRoomTenant(room_id: number): Observable<TenantResponse> {
    console.log("from getRoomTenant():", room_id);

    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    }
    return this.http.get<TenantResponse>(`${this.apiUrl}/room-tenant/${room_id}`, {headers}).pipe(

      catchError(this.handleError)
    );

  }

  storeRoomData(id: number | null, formData: FormData): Observable<RoomResponse> {
    console.log(`from storeRoomData(): ${id}`);
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    }
    return this.http.post<RoomResponse>(`${this.apiUrl}/store?property_id=${id}`, formData, {headers})
  }

  updateRoomData(id: number, property_id: number, formData: FormData): Observable<RoomResponse> {

    console.log(`updateRoomData(): ${id}`)
    console.log(`updateRoomData(): ${property_id}`)
    console.log(`updateRoomData(): ${formData}`)
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    }
    return this.http.post<RoomResponse>(`${this.apiUrl}/update/${id}?property_id=${property_id}`, formData, {headers})
  }

  deleteRoomData(id: number ): Observable<RoomResponse> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',  // Specify the content type
      'Accept': 'application/json'  
    }
    return this.http.delete<RoomResponse>(`${this.apiUrl}/destroy/${id}`, {headers})
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

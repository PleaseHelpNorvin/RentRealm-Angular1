import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://127.0.0.1:8000/api/landlord/room';
  constructor(private http: HttpClient, private authService: AuthService) {}

  // getRooms(): Observable<>
}

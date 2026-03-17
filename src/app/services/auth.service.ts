import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  authenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  // BehaviorSubject pour suivre l'état de connexion dans toute l'app
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  sendOtp(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, { numeroTelephone: phone });
  }

  verifyOtp(phone: string, code: string): Observable<any> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/verify-otp`, { 
      numeroTelephone: phone, 
      codeOtp: code 
    }).pipe(
      tap(res => {
        if (res.authenticated) {
          localStorage.setItem('auth_token', 'true'); // Simulation de token
          localStorage.setItem('parent_phone', phone);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('parent_phone');
    this.isLoggedInSubject.next(false);
  }
}
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const isAuthenticated = !!localStorage.getItem('auth_token');
    
    if (isAuthenticated) {
      return true;
    } else {
      // Rediriger vers le login si non connecté
      return this.router.parseUrl('/login');
    }
  }
}
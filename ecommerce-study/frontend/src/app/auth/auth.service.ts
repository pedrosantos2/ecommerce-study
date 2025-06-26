// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { Router }     from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'jwt';

  constructor(private router: Router) {}

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    // remove o JWT e redireciona para login
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}


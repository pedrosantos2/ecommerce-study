import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule }       from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './login.html',
  host: { 'class': 'h-screen' }
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  private authUrl = 'http://localhost:8080/auth/login';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService     
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.loginForm.invalid) return;
    this.isSubmitting = true;
    this.errorMessage = '';

    this.http.post<{ token: string }>(this.authUrl, this.loginForm.value)
      .subscribe({
        next: res => {
          // ← AQUI: armazena o JWT no localStorage via AuthService
          this.authService.setToken(res.token);

          // e só então navega para a rota protegida
          this.router.navigate(['/home']);
        },
        error: err => {
          this.errorMessage = err.status === 401 
            ? 'Usuário ou senha inválidos' 
            : 'Erro no servidor';
          this.isSubmitting = false;
        }
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule }       from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule }            from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './cadastro.html',
})
export class Cadastrado implements OnInit {
  registerForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  private registerUrl = 'http://localhost:8080/auth/register';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm:  ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup) {
    return group.get('password')!.value === group.get('confirm')!.value
      ? null
      : { mismatch: true };
  }

  submit() {
    if (this.registerForm.invalid) return;
    this.isSubmitting = true;
    this.errorMessage = '';
    const { username, email, password } = this.registerForm.value;
    this.http.post(this.registerUrl, { username, email, password })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: err => {
          this.errorMessage = err.status === 409
            ? 'Usuário ou email já cadastrado'
            : 'Erro no servidor';
          this.isSubmitting = false;
        }
      });
  }
}

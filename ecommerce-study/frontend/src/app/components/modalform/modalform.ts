import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators }    from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modalform',
  standalone: true,            // ← necessário
  imports: [
    CommonModule,
    ReactiveFormsModule,       // ← traga o módulo de forms reativos
    HttpClientModule
  ],
  templateUrl: './modalform.html',
  styleUrls: ['./modalform.css']
})
export class Modalform {
  @Output() cancel = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<void>();  

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [0.0, Validators.required],
      categoriaId: [0, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) { return; }

    this.http.post('http://localhost:8080/home/produtos', this.form.value)
      .subscribe({
        next: () => this.submitted.emit(),
        error: err => console.error('Erro ao enviar:', err)
      });
  }
}

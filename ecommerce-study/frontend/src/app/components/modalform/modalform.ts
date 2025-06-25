import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FieldConfig } from '../../model/field-config';


@Component({
  selector: 'app-modalform',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './modalform.html',
  styleUrls: ['./modalform.css']
})
export class Modalform implements OnInit {
  @Input() fields: FieldConfig[] = [];
  @Input() postUrl: string = '';
  @Output() cancel = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>();


  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const group: any = {};
    this.fields.forEach(field => {
      group[field.name] = ['', field.validators || []];
    });
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value;
    console.log('Enviando:', data);

    if(this.postUrl) {
      this.http.post(this.postUrl, this.form.value).subscribe({
        next: () => this.submitted.emit(this.form.value),
        error: err => console.error('Erro ao enviar:', err)
      });
    } else {
      this.submitted.emit(this.form.value);
    }
  }
}

import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from '../../model/field-config';

@Component({
  selector: 'app-modalform',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modalform.html',
  styleUrls: ['./modalform.css']
})
export class Modalform implements OnInit, OnChanges {
  @Input() fields: FieldConfig[] = [];
  @Input() initialData: any = null;
  @Output() cancel = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'] && this.form) {
      this.form.patchValue(this.initialData || {});
    }
  }

  private buildForm() {
    const group: any = {};
    this.fields.forEach(field => {
      group[field.name] = [ this.initialData?.[field.name] || '', field.validators || [] ];
    });
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.submitted.emit(this.form.value);
  }
}

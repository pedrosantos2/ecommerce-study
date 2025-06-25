import { Validators } from '@angular/forms';
import { FieldConfig } from './field-config';


export const categoriaFields: FieldConfig[] = [
  { name: 'nome', label: 'Nome', type: 'text', validators: [Validators.required] }
];

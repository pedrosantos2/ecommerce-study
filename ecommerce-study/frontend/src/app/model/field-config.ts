import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  name: string;                     // nome do formControl
  label: string;                    // texto do label
  type: 'text' | 'number' | 'textarea' | 'select' | 'password'; // tipo do input
  placeholder?: string;             // placeholder opcional
  options?: { value: any; label: string }[]; // opções para select
  validators?: ValidatorFn[];       // array de validadores (ex: Validators.required)
}

import { Validators } from '@angular/forms';
import { FieldConfig } from './field-config';


export const produtoFields: FieldConfig[] = [
  { name: 'nome', label: 'Nome', type: 'text', validators: [Validators.required] },
  { name: 'descricao', label: 'Descrição', type: 'textarea', validators: [Validators.required] },
  { name: 'preco', label: 'Preço', type: 'number', validators: [Validators.required] },
  {
    name: 'categoriaId',
    label: 'Categoria',
    type: 'select',
    validators: [Validators.required],
    options: [
      { value: 1, label: 'Categoria A' },
      { value: 2, label: 'Categoria B' },
    ]
  }
];

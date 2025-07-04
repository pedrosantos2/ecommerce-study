// src/app/model/produtofields.ts
import { Validators } from '@angular/forms';
import { FieldConfig } from './field-config';

export const produtoFields: FieldConfig[] = [
  { name: 'nome',        label: 'Nome',      type: 'text',     validators: [Validators.required] },
  { name: 'descricao',   label: 'Descri��o', type: 'textarea', validators: [Validators.required] },
  { name: 'preco',       label: 'Pre�o',     type: 'number',   validators: [Validators.required] },
  {
    name: 'categoriaId',
    label: 'Categoria',
    type: 'select',
    validators: [Validators.required],
    options: []    // ? placeholder, ser� preenchido pelo componente
  }
];

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiSearch } from '@taiga-ui/layout';
import { TuiTextfield } from '@taiga-ui/core';
import {TuiAppearance} from '@taiga-ui/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [
    TuiSearch,
    CommonModule,
    ReactiveFormsModule,
    TuiTextfield,
    TuiAppearance,
    RouterLink
  ],
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']  
})
export class InputSearchComponent { 

  @Output() buscar = new EventEmitter<string>();

 form = new FormGroup({
  search: new FormControl('')
 });

 OnSearch(){
  const searchValue = this.form.get('search')?.value?.trim() ?? '';
  console.log(searchValue)
  if(searchValue){
    this.buscar.emit(searchValue);
  }else{
    this.buscar.emit('');
  }
 }

}



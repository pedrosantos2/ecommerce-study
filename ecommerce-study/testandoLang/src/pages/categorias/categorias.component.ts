import { Observable } from 'rxjs';
import { Produto } from '../../app/models/produto.model';
import { ProdutoService } from '../../app/services/produto.service';
import {NgForOf, NgIf,AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiTable} from '@taiga-ui/addon-table';
import { map } from 'rxjs/operators';
import {
    TuiAutoColorPipe,
    TuiButton,
    TuiDropdown,
    TuiIcon,
    TuiInitialsPipe,
    TuiLink,
    TuiTitle,
} from '@taiga-ui/core';
import {
    TuiAvatar,
    TuiBadge,
    TuiCheckbox,
    TuiChip,
    TuiItemsWithMore,
    TuiProgressBar,
    TuiRadioList,
    TuiStatus,
} from '@taiga-ui/kit';
import {TuiCell} from '@taiga-ui/layout';


@Component({
  selector: 'app-categorias',
  imports: [
    FormsModule,
	        NgForOf,
	        NgIf,
	        TuiAutoColorPipe,
	        TuiAvatar,
	        TuiBadge,
	        TuiButton,
	        TuiCell,
	        TuiCheckbox,
	        TuiChip,
	        TuiDropdown,
	        TuiIcon,
	        TuiInitialsPipe,
	        TuiItemsWithMore,
	        TuiLink,
	        TuiProgressBar,
	        TuiRadioList,
	        TuiStatus,
	        TuiTable,
	        TuiTitle,
          AsyncPipe 
  ],
  templateUrl: './categorias.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {


    protected readonly sizes = ['l', 'm', 's'] as const;
     
    protected size = this.sizes[0];
  
   
}

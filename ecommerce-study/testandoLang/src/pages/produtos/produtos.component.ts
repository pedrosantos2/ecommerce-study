import { Observable } from 'rxjs';
import { Produto } from '../../app/models/produto.model';
import { ProdutoService } from '../../app/services/produto.service';
import {NgForOf, NgIf,AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiTable} from '@taiga-ui/addon-table';
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
import { InputSearchComponent } from "../../app/utils/itens/input-search/input-search.component";
import { ItemSidebarComponent } from "../../app/utils/itens/item-sidebar/item-sidebar.component";

@Component({
  selector: 'app-produtos',
  standalone: true,
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
    AsyncPipe,
    InputSearchComponent,
    ItemSidebarComponent
],
  templateUrl: './produtos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {

  protected readonly sizes = ['l', 'm', 's'] as const;
	 
	protected size = this.sizes[0];

  produtos = new Observable<Produto[]>();

  constructor(private produtoService: ProdutoService) {
    this.obterUsuariosCadastrados()
  }

  obterUsuariosCadastrados(){
    this.produtos = this.produtoService.obterProdutos()

  }

  filtrarProdutos(nome: string) {
    if (!nome || nome.trim() === '') {
      this.obterUsuariosCadastrados();
    }else{
      this.produtos = this.produtoService.buscarPorNome(nome);
    }
  }
 
}

import {ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TuiRepeatTimes} from '@taiga-ui/cdk';
import {TuiAppearance, TuiButton, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiCell, TuiHeader} from '@taiga-ui/layout';
import { ItemSidebarComponent } from './utils/itens/item-sidebar/item-sidebar.component';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true, // 👈 ESSENCIAL!
  imports: [
    RouterOutlet,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    ItemSidebarComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css'] // 👈 Corrigido aqui também (estava styleUrl)
})
export class AppComponent {
  isCollapsed = false;
}

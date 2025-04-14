import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiCurrency, TuiCurrencyPipe} from '@taiga-ui/addon-commerce';
import {TuiDay, TuiTime} from '@taiga-ui/cdk';
import {
    TuiButton,
    TuiError,
    TuiGroup,
    TuiIcon,
    TuiLabel,
    TuiTextfield,
    TuiTitle,
} from '@taiga-ui/core';
import {
    TuiBlock,
    TuiCheckbox,
    TuiDataListWrapper,
    TuiFieldErrorPipe,
    TuiInputNumber,
    TuiPassword,
    TuiRadio,
    TuiTooltip,
} from '@taiga-ui/kit';
import {TuiForm, TuiHeader} from '@taiga-ui/layout';
import {
    TuiInputDateModule,
    TuiInputModule,
    TuiInputPhoneModule,
    TuiInputSliderModule,
    TuiInputTimeModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

@Component({
  selector: 'app-produto-form',
  imports: [],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.css'
})
export class ProdutoFormComponent {

}

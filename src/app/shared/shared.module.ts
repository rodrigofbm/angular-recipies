import { DropdownDirective } from './dropdown.directive';
import { NgModule } from '@angular/core';

import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AlertComponent,
    SpinnerComponent,
    DropdownDirective
  ],
  exports: [
    AlertComponent,
    SpinnerComponent,
    DropdownDirective
  ]
})
export class SharedModule {}

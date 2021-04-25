import { NgModule } from '@angular/core';

import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AlertComponent,
    SpinnerComponent
  ],
  exports: [
    AlertComponent,
    SpinnerComponent
  ]
})
export class SharedModule {}

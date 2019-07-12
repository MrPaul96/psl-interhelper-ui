import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  declarations: [
    NavbarComponent,
    TimePickerComponent
  ],
  exports: [
    NavbarComponent,
    TimePickerComponent
  ],
  bootstrap: [
    TimePickerComponent
  ]
})
export class SharedModule { }

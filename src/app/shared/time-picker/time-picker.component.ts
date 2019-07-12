import { Component } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html'
})
export class TimePickerComponent {

  time = {hour: 13, minute: 30};
  meridian = true;

}

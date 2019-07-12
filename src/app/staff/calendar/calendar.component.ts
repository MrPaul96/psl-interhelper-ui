import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
@Component({
  selector: 'app-staff-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Month; //CurrentView is the actual view Month / Week
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  constructor() {
  }

  ngOnInit() {
  }

  setView(view: CalendarView) {
    this.view = view;
    console.log(this.viewDate);
  }

}

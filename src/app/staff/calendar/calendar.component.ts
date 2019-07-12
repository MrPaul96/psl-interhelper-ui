import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { colors } from './event.colors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateInterviewModalComponent } from '../create-interview-modal/create-interview-modal.component';
@Component({
  selector: 'app-staff-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  currentView: CalendarView = CalendarView.Month; // CurrentView is the actual view Month / Week
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  calendarEvents: CalendarEvent[] = [];

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    const testEvent: CalendarEvent = {
      start: new Date('July 12, 2019 03:24:00'),
      end: new Date('July 12, 2019 5:24:00'),
      title: 'Interview 1 - Edwin Alvarez - Frontend',
      color: colors.green
    };

    this.addCalendarEvent(testEvent);
  }

  setView(view: CalendarView) {
    this.currentView = view;
    console.log(this.viewDate);
  }

  addCalendarEvent(event: CalendarEvent) {
    this.calendarEvents.push(event);
  }

  editInterview(event): void {
  }

  createInterview() {
    console.log('hey entramos a abrir el modal');
    const modalRef = this.modalService.open(CreateInterviewModalComponent);
  }

}

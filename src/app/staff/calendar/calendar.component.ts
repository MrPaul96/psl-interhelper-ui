import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { colors } from './event.colors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateInterviewModalComponent } from '../create-interview-modal/create-interview-modal.component';
import { Interview } from '../../core/models/interview.model';
import { StaffService } from '../services/staff.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { AlertService } from '../../shared/notifications/alert.service';
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
  interviews: Interview[] = [];
  refresh: Subject<any> = new Subject();
  testEvent: CalendarEvent;

  constructor(private modalService: NgbModal,
              private staffService: StaffService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.interviews = this.staffService.fakeInterviews;
    this.getCalendarEvents();
  }


  getCalendarEvents() {
    if (this.interviews) {
      this.interviews.forEach( (interview) => this.addCalendarEvent(interview));
    }
  }

  addCalendarEvent(interview: Interview) {

    const eventTitle = `${interview.candidate.email} -  ${interview.interviewer.email} - ${interview.job}`;
    const colorStatus = ( interview.status === 'UNFINISHED') ? colors.red : colors.green;

    const event: CalendarEvent = {
      title: eventTitle,
      start: new Date(interview.startTime),
      end: new Date(interview.endTime),
      color: colorStatus,
    };

    this.calendarEvents.push(event);
  }

  setView(view: CalendarView) {
    this.currentView = view;
  }

  editInterview(event): void {
  }

  createInterview() {

    const modalRef = this.modalService.open(CreateInterviewModalComponent);
    modalRef.componentInstance.interviewToDB.subscribe(
       (interview: Interview) => {
         this.staffService.fakeInterviews.push(interview);
         this.addCalendarEvent(interview);
         this.refresh.next();
       }
    );
  }

}

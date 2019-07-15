import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { colors } from './event.colors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateInterviewModalComponent } from '../create-interview-modal/create-interview-modal.component';
import { Interview } from '../../core/models/interview.model';
import { StaffService } from '../services/staff.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from '../../shared/notifications/alert.service';
import { InterviewService } from '../../core/services/interview.service';
@Component({
  selector: 'app-staff-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  private currentView: CalendarView = CalendarView.Month; // CurrentView is the actual view Month / Week
  private CalendarView = CalendarView;
  private viewDate: Date = new Date();
  private calendarEvents: CalendarEvent[] = [];
  private interviews: Interview[] = [];
  private refresh: Subject<any> = new Subject();
  private destroy$: Subject<boolean> = new Subject();

  constructor(private modalService: NgbModal,
              private staffService: StaffService,
              private interviewService: InterviewService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getInterviews();
  }

  getInterviews() {
    this.interviewService.getInterviews()
                         .pipe(takeUntil(this.destroy$))
                         .subscribe((interviews: Interview[]) => {
                          this.interviews = interviews;
                          this.resetCalendarEvents();
                          this.getCalendarEvents();
                          this.refresh.next();
                         });

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
      id: interview.id
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
    modalRef.componentInstance.interviewToDB
            .pipe(takeUntil(this.destroy$))
            .subscribe( (interview: Interview) => {
              this.interviewService.addInterview(interview);
              this.alertService.showMessage('Interview has been created', 'success', false);
              this.refresh.next();
             });
  }

  resetCalendarEvents() {
    this.calendarEvents = [];
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

}

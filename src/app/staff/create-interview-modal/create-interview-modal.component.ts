import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { availableJobs } from '../../shared/utils/jobs.constants';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interview } from '../../core/models/interview.model';
import { User } from '../../core/models/user.model';
import { StaffService } from '../services/staff.service';
import { UserService } from '../../core/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-create-interview-modal',
  templateUrl: './create-interview-modal.component.html',
  styleUrls: ['./create-interview-modal.component.scss']
})
export class CreateInterviewModalComponent implements OnInit, OnDestroy {

  private jobs: string[];
  private interviewForm: FormGroup;
  private interviewers: User[] = [];
  private candidates: User[] = [];
  private destroy$: Subject<boolean> = new Subject();
  @Output() interviewToDB =  new EventEmitter<Interview>();

  constructor(private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private staffService: StaffService,
    private userService: UserService
    ) {
  }

  ngOnInit() {
    this.jobs = availableJobs;
    this.initializeForm();
    this.getInterviewers();
    this.getCandidates();
  }

  initializeForm() {
    this.interviewForm = this.formBuilder.group(
      {
        candidate: ['', [Validators.required]],
        interviewer: ['', [Validators.required]],
        date: ['', [Validators.required]],
        startTime: ['', [Validators.required]],
        endTime: ['', [Validators.required]],
        job: ['', [Validators.required]]
      }
    );
  }

  getCandidates(): void {
    this.userService.getUsersByRole('candidate')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((candidates: User[]) => this.candidates = candidates);
  }

  getInterviewers(): void {
    this.userService.getUsersByRole('interviewer')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((interviewers: User[]) => this.interviewers = interviewers);
  }

  submitForm(): void {
   if (this.interviewForm) {
    const startTime = this.getDateWithTime(this.interviewForm.value['date'], this.interviewForm.value['startTime']);
    const endTime = this.getDateWithTime(this.interviewForm.value['date'], this.interviewForm.value['endTime']);

    const interview = this.getInterviewObject(startTime, endTime);
    this.interviewToDB.emit(interview);
    this.activeModal.close();
   }
  }

  getInterviewObject(startTime, endTime): Interview {

    return {
      startTime: startTime,
      endTime: endTime,
      job: this.interviewForm.value['job'],
      interviewer: {
        email: this.interviewForm.value['interviewer'],
        assists: false
      },
      candidate: {
        email: this.interviewForm.value['candidate'],
        assists: false
      },
      status: 'UNFINISHED'
    };

  }

  getDateWithTime(date, time): string {
    const stringDate = this.staffService.convertDateInputIntoString(date);
    return `${stringDate} ${time.hour}:${time.minute}`;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

}

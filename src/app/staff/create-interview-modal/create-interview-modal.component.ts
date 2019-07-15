import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { availableJobs } from '../../shared/utils/jobs.constants';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interview } from '../../core/models/interview.model';
import { User } from '../../core/models/user.model';
import { StaffService } from '../services/staff.service';
@Component({
  selector: 'app-create-interview-modal',
  templateUrl: './create-interview-modal.component.html',
  styleUrls: ['./create-interview-modal.component.scss']
})
export class CreateInterviewModalComponent implements OnInit {

  private jobs: string[];
  private interviewForm: FormGroup;
  private interviewers: User[] = [];
  private candidates: User[] = [];
  @Output() interviewToDB =  new EventEmitter<Interview>();

  constructor(private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private staffService: StaffService
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

  getCandidates() {
    const candidate1: User = {
      id: '77747',
      name: 'Paul',
      email: 'romafusion@hotmail.com',
      role: {
        candidate: true
      }
    };

    this.candidates = [ candidate1 ];
  }

  getInterviewers() {

    const interviewer1: User = {
      id: '2344233213asdsad',
      name: 'Luis Cervantes',
      email: 'lcervanteso@psl.com.co',
      role: {
        interviewer: true
      },
      job: 'Frontend Lead'
    };

    const interviewer2: User = {
      id: '234423321qwweq3asdsad',
      name: 'Adrian Jimenez',
      email: 'ajimenezc@psl.com.co',
      role: {
        interviewer: true
      },
      job: 'Frontend'
    };

    const interviewer3: User = {
      id: '23442332www13asdsad',
      name: 'Andres Romero',
      email: 'aromerov@psl.com.co',
      role: {
        interviewer: true
      },
      job: 'Backend Lead'
    };

    const interviewer4: User = {
      id: '23442332www13asdsad55',
      name: 'Pablo Villegas',
      email: 'pvillegasg@psl.com.co',
      role: {
        interviewer: true
      },
      job: 'Frontend'
    };

    this.interviewers = [interviewer1, interviewer2, interviewer3, interviewer4];
  }

  submitForm() {
   if (this.interviewForm) {
    const startTime = this.getDateWithTime(this.interviewForm.value['date'], this.interviewForm.value['startTime']);
    const endTime = this.getDateWithTime(this.interviewForm.value['date'], this.interviewForm.value['endTime']);

    const interview = this.getInterviewObject(startTime, endTime);
    this.interviewToDB.emit(interview);
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
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SharedModule } from '../shared/shared.module';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateInterviewModalComponent } from './create-interview-modal/create-interview-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffService } from './services/staff.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ CreateInterviewModalComponent ],
  declarations: [DashboardComponent, CalendarComponent, CreateInterviewModalComponent],
  exports: [
    DashboardComponent
  ],
  providers: [
    StaffService
  ]
})
export class StaffModule { }

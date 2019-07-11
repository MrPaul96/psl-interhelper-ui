
import { Routes} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';

export const STAFF_ROUTES: Routes = [
  {
    path: 'interview-calendar',
    component: DashboardComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'staff-dashboard'
  }
];

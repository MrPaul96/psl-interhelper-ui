
import { Routes} from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthGuardStaff } from '../core/guards/staff.guard';

export const STAFF_ROUTES: Routes = [
  { path: '', redirectTo: 'interview-calendar', pathMatch: 'full', canActivate: [ AuthGuardStaff] },
  { path: 'interview-calendar', component: CalendarComponent, canActivate: [ AuthGuardStaff]  },
  { path: '**', pathMatch: 'full',  redirectTo: 'interview-calendar', canActivate: [ AuthGuardStaff]  }
];

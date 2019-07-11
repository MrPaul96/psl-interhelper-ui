
import { Routes} from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

export const STAFF_ROUTES: Routes = [
  { path: 'interview-calendar', component: CalendarComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'interview-calendar' }
];

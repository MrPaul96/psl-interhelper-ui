import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './core/auth/login/login.component';
import { DashboardComponent } from './staff/dashboard/dashboard.component';
import { STAFF_ROUTES } from './staff/staff.routes';

const routes: Routes = [
  { path: 'login',
    component: LoginComponent
  },
  {
    path: 'staff-dashboard',
    component: DashboardComponent,
    children: STAFF_ROUTES
  },
  { path: '**',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class InterhelperRoutingModule {}

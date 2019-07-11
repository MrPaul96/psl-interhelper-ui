import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Modules
import { CoreModule } from './core/core.module';
import { StaffModule } from './staff/staff.module';
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';

import { InterhelperRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    StaffModule,
    SharedModule,
    InterhelperRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

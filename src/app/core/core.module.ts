import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';


// Components
import { LoginComponent } from './auth/login/login.component';

// Enviroment
import { environment } from 'src/environments/environment';

// Services
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuardStaff } from './guards/staff.guard';
import { InterviewService } from './services/interview.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  declarations: [LoginComponent],
  exports: [
    LoginComponent
  ],
  providers: [
    AuthService,
    UserService,
    InterviewService,
    AngularFirestore,
    AngularFireAuth,
    AuthGuardStaff
  ]
})
export class CoreModule { }

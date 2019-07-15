import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../../shared/notifications/alert.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private alertService: AlertService
              ) {
  }

  ngOnInit() {
    this.initializeLoginForm();
  }

  initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );
  }

  /*Missing validation with DT"*/
  submitData() {
    this.authService.logIn(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      data => this.getUserInDatabase(data['user'].uid),
      error => this.alertService.showMessage(error.message, 'error', false)
    );
  }


  getUserInDatabase(userId: string) {
    this.userService.getUserById(userId).subscribe((user: User) => {
      if (user) {
        console.log(user);
        this.verifyUserRoleToRedirect(user, userId);
      } else {
        this.alertService.showMessage('Invalid credentials', 'error', false);
      }
    });
  }

  verifyUserRoleToRedirect(user: User, userId: string): void {
    sessionStorage.setItem('userId', userId);
    const message = `Welcome ${user.name} to the InterHelper platform`;

    if (user.role.staff) {
      this.sendMessageAndAssignRole(message, 'staff');
      this.router.navigate(['/staff-dashboard']);
    } else if (user.role.interviewer) {
      this.sendMessageAndAssignRole(message, 'interviewer');
    }
  }

  sendMessageAndAssignRole(message: string, userRol: string): void {
    this.alertService.showMessage(message, 'success', false);
    sessionStorage.setItem('rol', userRol);
    this.alertService.closeNotification();
  }
}

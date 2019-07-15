import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/notifications/alert.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private alertService: AlertService,
              private authService: AuthService,
              private router: Router
          ) { }

  ngOnInit() {
  }

  onClickLogOut() {
    this.authService.logOut().subscribe(() => {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }

}

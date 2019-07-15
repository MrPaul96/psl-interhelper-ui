import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private authService: AuthService,
              private router: Router
          ) { }

  onClickLogOut() {
    this.authService.logOut().subscribe(() => {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }

}

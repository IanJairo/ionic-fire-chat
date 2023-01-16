import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { NavParamService } from '../services/navParam/nav-param.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public navParamService: NavParamService,
    public authService: AuthenticationService,
    public router: Router
  ) {}
  ngOnInit() {}

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if (this.authService.isEmailVerified(res.user)) {
          this.router.navigate(['chat']);
        } else {
          window.alert('Email is not verified');
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  toVerifyEmail() {
    this.router.navigate(['verify-email']);
  }
}

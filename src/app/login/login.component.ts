import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.authenticationService.clearError();
    this.authenticationService.clearEverything();
  }

  onEmailChange(email: string) {
    this.authenticationService.changeEmail(email);
  }

  onPasswordChange(password: string) {
    this.authenticationService.changePassword(password);
  }

  submitHandler() {
     const {email, password, attemptUserLogin} = this.authenticationService;

     if (email && password) {
       attemptUserLogin.call(this.authenticationService, {email, password});
     }
  }
}
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private isLoading: boolean;
  private error: string;

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService.clearEverything();
  }

  onEmailChange(email: string) {
    this.authenticationService.email = email;
  }

  onPasswordChange(password: string) {
    this.authenticationService.password = password;
  }

  submitHandler() {
     const {
       email,
       password,
       attemptUserLogin
     } = this.authenticationService;

     if (email && password) {
       this.isLoading = true;
       attemptUserLogin.call(this.authenticationService, {email, password});
     }
  }
}

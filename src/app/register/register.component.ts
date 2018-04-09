import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService.clearEverything();
  }

  onFirstNameChange(firstname: string) {
    this.authenticationService.firstName = firstname;
  }

  onLastNameChange(lastname: string) {
    this.authenticationService.lastName = lastname;
  }

  onEmailChange(email: string) {
    this.authenticationService.email = email;
  }

  onPasswordChange(password: string) {
    this.authenticationService.password = password;
  }

  submitHandler() {
    const {
      firstName,
      lastName,
      email,
      password,
      attemptUserRegistration
    } = this.authenticationService;

    if (firstName && lastName && email && password) {
      attemptUserRegistration.call(this.authenticationService, {firstName, lastName, email, password});
    }
  }
}

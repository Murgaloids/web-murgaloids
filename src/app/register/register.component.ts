import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    public authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.authenticationService.clearEverything();
  }

  public onFirstNameChange(firstname: string): void {
    this.authenticationService.changeFirstName(firstname);
  }

  public onLastNameChange(lastname: string): void {
    this.authenticationService.changeLastName(lastname);
  }

  public onEmailChange(email: string): void {
    this.authenticationService.changeEmail(email);
  }

  public onPasswordChange(password: string): void {
    this.authenticationService.changePassword(password);
  }

  public submitHandler(): void {
    const {
      firstName,
      lastName,
      email,
      password,
      attemptUserRegistration
    } = this.authenticationService;

    if (firstName && lastName && email && password)
      attemptUserRegistration.call(this.authenticationService, {firstName, lastName, email, password});
  }
}
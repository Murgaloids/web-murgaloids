import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    public authenticationService: AuthenticationService,
    private titleService: Title
  ) {}

  public ngOnInit(): void {
    this.authenticationService.clearEverything();
    this.titleService.setTitle('beachshop | Register');
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

  public submitHandler(event: any): void {
    if (event)
      event.preventDefault();

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
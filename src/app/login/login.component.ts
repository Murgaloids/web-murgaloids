import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    public authenticationService: AuthenticationService,
  ) {}

  public ngOnInit(): void {
    this.authenticationService.clearEverything();
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

    const {email, password, attemptUserLogin} = this.authenticationService;

    if (email && password)
      attemptUserLogin.call(this.authenticationService, {email, password});
  }
}
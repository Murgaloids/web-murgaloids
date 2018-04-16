import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthRouteGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  // This method makes sure the user is authenticated first before
  // continuing on to the desired route. If the user is not
  // authenticated, they will be re-directed to the login page.
  canActivate(): boolean {
    if (!this.authenticationService.token) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}

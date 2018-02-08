import { EventEmitter } from '@angular/core';

const SIGN_IN_CONST = 'Sign In';
const SIGN_OUT_CONST = 'Sign Out';
const ACCOUNT_CONST = 'Account';
const SELL_CONST = 'Sell';

export class AccountService {
  private isLoggedIn = false;
  private activeLinks = [ACCOUNT_CONST, SELL_CONST, SIGN_IN_CONST];
  private inactiveLinks = [SIGN_OUT_CONST];

  linksChanged = new EventEmitter<void>();

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }

  getActiveLinks() {
    return this.activeLinks.slice();
  }

  getInactiveLinks() {
    return this.inactiveLinks.slice();
  }

  toggleSignIn() {
    let signOutIndex, signInIndex, signOutConst, signInConst;

    if (this.activeLinks.indexOf(SIGN_IN_CONST) == -1) {
      signOutIndex = this.inactiveLinks.indexOf(SIGN_OUT_CONST);
      signInIndex  = this.activeLinks.indexOf(SIGN_IN_CONST);
      this.inactiveLinks.splice(signOutIndex, 1);
      this.activeLinks.splice(signInIndex, 1);
      this.inactiveLinks.push(SIGN_IN_CONST);
      this.activeLinks.push(SIGN_OUT_CONST);
    } else {
      signOutIndex = this.activeLinks.indexOf(SIGN_OUT_CONST);
      signInIndex  = this.inactiveLinks.indexOf(SIGN_IN_CONST);
      this.activeLinks.splice(signOutIndex, 1);
      this.inactiveLinks.splice(signInIndex, 1);
      this.activeLinks.push(SIGN_IN_CONST);
      this.inactiveLinks.push(SIGN_OUT_CONST);
    }
      
    this.toggleLogin();
  }
}
import { EventEmitter } from '@angular/core';

const SIGN_IN_CONST = 'Sign In';
const SIGN_OUT_CONST = 'Sign Out';

export class AccountService {
  private activeOption = SIGN_IN_CONST;
  private inactiveOption = SIGN_OUT_CONST;

  linksChanged = new EventEmitter<void>();

  isUserLoggedIn() {
    return this.activeOption === SIGN_OUT_CONST;
  }

  getActiveOption() {
    return this.activeOption;
  }

  getInactiveLinks() {
    return this.inactiveOption;
  }

  toggleLogin() {
    const temp = this.activeOption;
    this.activeOption = this.inactiveOption;
    this.inactiveOption = temp;
  }
}
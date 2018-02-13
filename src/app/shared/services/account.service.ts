import { SIGN_IN, SIGN_OUT } from '../global';

export class AccountService {
  private activeOption = SIGN_IN;
  private inactiveOption = SIGN_OUT;

  isUserLoggedIn() {
    return this.activeOption === SIGN_OUT;
  }

  toggleLogin() {
    const temp = this.activeOption;
    this.activeOption = this.inactiveOption;
    this.inactiveOption = temp;
  }

  get active(): string {
    return this.activeOption;
  }

  get inactive(): string {
    return this.inactiveOption;
  }
}
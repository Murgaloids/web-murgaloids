import { Component, OnInit } from '@angular/core';
import { MOBILE_WIDTH, SIGN_IN, SIGN_OUT } from '../global';
import { AccountService } from '../services/account.service';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private SIGN_IN_CONST = SIGN_IN;
  private SIGN_OUT_CONST = SIGN_OUT;
  private mobileWidth: number;
  private isInputVisible: boolean;
  private input: string;

  constructor(
     private accountService: AccountService,
     private windowService: WindowService
  ) {}

  ngOnInit() {
    this.mobileWidth = MOBILE_WIDTH;
    this.isInputVisible = false;
  }

  onSignInToggle() {
    this.accountService.toggleLogin();
  }

  onSearchIconToggle() {
    this.isInputVisible = !this.isInputVisible;
  }

  onInputEnter(event: any) {
    if (event.keyCode == 13) {
      this.input = event.target.value;
      event.target.value = '';
      event.target.blur();
    }
  }
}
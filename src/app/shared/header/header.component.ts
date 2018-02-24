import { Component, OnInit } from '@angular/core';

import { MOBILE_WIDTH } from '../global';

import { AccountService } from '../services/account.service';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private mobileWidth: number;
  private isInputVisible: boolean;

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
}
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private loginOption: String;

  constructor(private accountService: AccountService, private windowService: WindowService) {}

  ngOnInit() {
    this.loginOption = this.accountService.getActiveOption();
    this.accountService.linksChanged.subscribe(() => this.loginOption = this.accountService.getActiveOption());
  }

  onSignInToggle() {
    this.accountService.toggleLogin();
  }

  getLoginOption() {
    return this.loginOption;
  }
}

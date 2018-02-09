import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private loginOption: String;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.loginOption = this.accountService.getActiveOption();
    this.accountService.linksChanged.subscribe(this.toggleSignIn.bind(this));
  }

  toggleSignIn() {
    this.accountService.toggleLogin();
    this.loginOption = this.accountService.getActiveOption();
  }

  onSignInToggle() {
    this.accountService.linksChanged.emit();
  }

  getLoginOption() {
    return this.loginOption;
  }
}

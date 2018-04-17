import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MOBILE_WIDTH } from '../global';
import { AuthenticationService } from '../services/authentication.service';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private mobileWidth: number;
  private isInputVisible: boolean;
  private inputValue: string = '';

  constructor(
     private authenticationService: AuthenticationService,
     private windowService: WindowService,
     private router: Router
  ) {}

  ngOnInit() {
    this.mobileWidth = MOBILE_WIDTH;
    this.isInputVisible = false;
  }

  onSearchIconToggle() {
    this.isInputVisible = !this.isInputVisible;
  }

  onSearchTermChange(value: string) {
    this.inputValue = value;
  }

  submitHandler(event: any) {
    if (event.keyCode == 13) {
      event.target.value = '';
      event.target.blur();
    }
  }

  titleClickHandler() {
    if (this.authenticationService.token)
      this.router.navigate(['/home'])
    else
      this.router.navigate(['/welcome']);
  }

  signOutClickHandler() {
    localStorage.clear();
    this.authenticationService.clearError();
    this.authenticationService.clearEverythingExceptErrors();
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MOBILE_WIDTH } from '../global';
import { AuthenticationService } from '../services/authentication.service';
import { ItemsService } from '../services/items.service';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private mobileWidth: number;
  private isInputVisible: boolean;
  private inputValue: string;

  constructor(
     private authenticationService: AuthenticationService,
     private windowService: WindowService,
     private itemsService: ItemsService,
     private router: Router
  ) {}

  ngOnInit() {
    this.mobileWidth = MOBILE_WIDTH;
    this.isInputVisible = false;
  }

  onSearchIconToggle() {
    this.isInputVisible = !this.isInputVisible;
  }

  submitHandler(event: any) {
    if (event.keyCode == 13) {
      if (this.inputValue) {
        this.itemsService.setSearchedItemsByQuery(this.inputValue)
          .then(() => this.router.navigate(['/search-result']));
      }

      this.inputValue = ''
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
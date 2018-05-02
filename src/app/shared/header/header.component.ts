import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MOBILE_WIDTH } from '../global';
import { AuthenticationService } from '../services/authentication.service';
import { ItemsService } from '../services/items.service';
import { MessagingService } from '../services/messaging.service';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public mobileWidth: number;
  public isInputVisible: boolean;
  public inputValue: string;

  constructor(
    private itemsService: ItemsService,
    private messagingService: MessagingService,
    private router: Router,
    public authenticationService: AuthenticationService,
    public windowService: WindowService
  ) {}

  public ngOnInit(): void {
    this.mobileWidth = MOBILE_WIDTH;
    this.isInputVisible = false;
  }

  public onSearchIconToggle(): void {
    this.isInputVisible = !this.isInputVisible;
  }

  public submitHandler(event: any): void {
    if (event.keyCode == 13) {
      if (this.inputValue) {
        this.itemsService.setSearchedItemsByQuery(this.inputValue)
          .then(() => {
            this.router.navigate(['/search-results', {query: this.inputValue}]);
            this.inputValue = '';
          });
      }
    }
  }

  public titleClickHandler(): void {
    if (this.authenticationService.token)
      this.router.navigate(['/home'])
    else
      this.router.navigate(['/welcome']);
  }

  public signOutClickHandler(): void {
    localStorage.clear();
    this.messagingService.disconnectWebSocket();
    this.authenticationService.clearEverything();
    this.itemsService.clearEverything();
    this.messagingService.clearEverything();
  }
}
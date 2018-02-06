import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-header-links',
  templateUrl: './header-links.component.html',
  styleUrls: ['./header-links.component.css']
})
export class HeaderLinksComponent implements OnInit {
  private links: String[];

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.links = this.accountService.getActiveLinks();
    this.accountService.linksChanged.subscribe(() => {
      this.accountService.toggleSignIn();
      this.links = this.accountService.getActiveLinks();
    });
  }

  onSignInToggle() {
    this.accountService.linksChanged.emit();
  }
}
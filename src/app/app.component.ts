import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';

import { WindowService } from './shared/services/window.service';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private windowService: WindowService,
    private authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.authenticationService.getAuthenticationFromLocalStorage();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event): void {
    this.windowService.width = event.target.innerWidth;
  }
}

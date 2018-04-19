import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';

import { WindowService } from './shared/services/window.service';
import { ItemsService } from './shared/services/items.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { StudentsService } from './shared/services/students.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    WindowService,
    ItemsService,
    StudentsService
  ]
})
export class AppComponent implements OnInit {
  constructor(
    private windowService: WindowService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService.getAuthenticationFromLocalStorage();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowService.width = event.target.innerWidth;
  }
}

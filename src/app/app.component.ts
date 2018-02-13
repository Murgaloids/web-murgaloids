import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';

import { WindowService } from './shared/services/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private windowService: WindowService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowService.width = event.target.innerWidth;
  }
}

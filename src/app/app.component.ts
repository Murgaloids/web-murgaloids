import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';

import { WindowService } from './shared/services/window.service';
import { DataService } from './shared/services/data.service';
import { ItemsService } from './shared/services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    WindowService,
    DataService,
    ItemsService
  ]
})
export class AppComponent {
  constructor(private windowService: WindowService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowService.width = event.target.innerWidth;
  }
}

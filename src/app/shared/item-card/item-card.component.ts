import { Component, Input, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';
import { Item } from '../models/item.model';

import { MOBILE_WIDTH } from '../global';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;

  private mobileWidth: number;

  constructor(private windowService: WindowService) {}

  ngOnInit() {
    this.mobileWidth = MOBILE_WIDTH;
  }
}

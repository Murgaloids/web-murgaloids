import { Component, Input, OnInit } from '@angular/core';
import { WindowService } from '../shared/services/window.service';

import { MOBILE_WIDTH } from '../shared/global';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() itemName: string;
  @Input() itemAbout: string;
  @Input() itemRating: number;
  @Input() itemPrice: number;
  @Input() itemImageSrc: string;

  private mobileWidth: number;

  constructor(private windowService: WindowService) {}

  ngOnInit() {
    this.mobileWidth = MOBILE_WIDTH;
  }
}
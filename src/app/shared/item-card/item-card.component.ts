import { Component, Input, OnInit } from '@angular/core';
import { MOBILE_WIDTH } from '../global';
import { WindowService } from '../services/window.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;

  private mobileWidth: number;
  private sellerName: string;
  private ready: boolean;
  private soldByThisStudent: boolean;

  constructor(
    private windowService: WindowService
  ) {}

  ngOnInit() {
    this.mobileWidth = MOBILE_WIDTH;
  }
}

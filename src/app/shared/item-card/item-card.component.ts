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
  @Input() public item: Item;
  public mobileWidth: number;

  constructor(
    public windowService: WindowService
  ) {}

  public ngOnInit(): void {
    this.mobileWidth = MOBILE_WIDTH;
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ItemsService } from '../shared/services/items.service';
import { Item } from '../shared/models/item.model';

const NUM_OF_ITEMS_TO_FETCH = 10;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  private recentItemsForSale: Item[];
  private itemCount = 8;

  constructor(
    private authenticationService: AuthenticationService,
    private itemsService: ItemsService,
  ) {}

  ngOnInit() {
    this.itemsService.setRecentItems(NUM_OF_ITEMS_TO_FETCH)
      .then(() => this.recentItemsForSale = this.itemsService.recentItems.slice(0, this.itemCount));
  }

  displayMoreItems() {
    this.itemCount += 8;
    this.recentItemsForSale = this.itemsService.recentItems.slice(0, this.itemCount);
  }
}

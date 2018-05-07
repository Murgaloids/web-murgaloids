import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ItemsService } from '../shared/services/items.service';
import { Item } from '../shared/models/item.model';
import { Title } from '@angular/platform-browser';

const NUM_OF_ITEMS_TO_FETCH = 100;
const NUM_TO_EXPAND = 8;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  public recentItemsForSale: Item[];
  public itemCount = 8;

  constructor(
    public authenticationService: AuthenticationService,
    public itemsService: ItemsService,
    private titleService: Title
  ) {}

  public ngOnInit(): void {
    this.itemsService.setRecentItems(NUM_OF_ITEMS_TO_FETCH)
      .then((recentItems: any) => this.recentItemsForSale = recentItems.slice(0, this.itemCount));
      this.titleService.setTitle('beachshop | Home');
  }

  public displayMoreItems(): void {
    this.itemCount += NUM_TO_EXPAND;
    this.recentItemsForSale = this.itemsService.recentItems.slice(0, this.itemCount);
  }
}

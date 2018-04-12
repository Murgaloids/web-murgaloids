import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ItemsService } from '../shared/services/items.service';
import { Item } from '../shared/models/item.model';
import { ItemCondition } from '../shared/global';
import { ItemCategory } from '../shared/global';

@Component({
  selector: 'app-sell-item-page',
  templateUrl: './sell-item-page.component.html',
  styleUrls: ['./sell-item-page.component.scss']
})
export class SellItemPageComponent {
  private item: Item = new Item();
  private itemCondition: string;
  private itemCategory: string;

  constructor(
    private authenticationService: AuthenticationService,
    private itemsService: ItemsService,
    private router: Router
  ) {
    this.item.itemSold = false;
    this.item.itemRated = false;
    this.item.imageSource = ''
  }

  onImageSourceChange(imageSource) {
    this.item.imageSource = imageSource;
  }

  submitHandler() {
    // Sets the owner of the item
    this.item.sellerId = this.authenticationService.userId;
    this.item.conditionTypeId = ItemCondition[this.itemCondition];
    this.item.categoryTypeId = ItemCategory[this.itemCategory];

    const {
      itemName,
      sellerId,
      conditionTypeId,
      categoryTypeId,
      description,
      price
    } = this.item;

    if (itemName && sellerId && conditionTypeId &&
        categoryTypeId && description && price) {
      this.itemsService.addItemToServer.call(this.itemsService, this.item);
    }
  }
}

import { Component } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Item } from '../shared/models/item.model';

@Component({
  selector: 'app-sell-item-page',
  templateUrl: './sell-item-page.component.html',
  styleUrls: ['./sell-item-page.component.css']
})
export class SellItemPageComponent {

  itemName: string;
  sellerID: number;
  conditionTypeID: number;
  categoryTypeID: number;
  description: string;
  price: number;
  isItemSold: number;
  rating: number;
  pictureURL: string;

  constructor(private dataService: DataService) { }

  submit() {
    this.dataService.addNewItem(
      this.itemName,
      this.sellerID,
      this.conditionTypeID,
      this.categoryTypeID,
      this.description,
      this.price,
      this.isItemSold,
      this.rating,
      this.pictureURL
    );
  }

}

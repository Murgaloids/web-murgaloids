import { Component } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Item } from '../shared/models/item.model';
import { ItemCondition } from '../shared/global';
import { ItemCategory } from '../shared/global';

@Component({
  selector: 'app-sell-item-page',
  templateUrl: './sell-item-page.component.html',
  styleUrls: ['./sell-item-page.component.css']
})
export class SellItemPageComponent {

  item: Item = new Item();
  itemCondition: string;
  itemCategory: string;

  constructor(private dataService: DataService) { }

  submit() {
    this.item.sellerId = this.dataService.getUserId();
    this.item.itemSold = false;
    this.item.rating = 0;
    this.item.conditionTypeId = ItemCondition[this.itemCondition];
    this.item.categoryTypeId = ItemCategory[this.itemCategory];
    this.dataService.addNewItem(this.item).subscribe(id => {
      //the content of this method will change when the
      //api is updated to return a json object
      localStorage.setItem('item' + id, this.item.imageSrc);
    });
  }

}

import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

const SERVER_URL: string = 'http://localhost:8080';

@Injectable()
export class ItemsService {
  private mRecentItems: Item[];
  private mSearchedItems: Item[];
  private mUserItems: Item[];
  private mDisplayedItem: Item;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  get recentItems(): Item[] { return this.mRecentItems; }
  get searchedItems(): Item[] { return this.mSearchedItems; }
  get userItems(): Item[] { return this.mUserItems; }
  get displayedItem(): Item { return this.mDisplayedItem; }

  clearEverything() {
    this.mRecentItems = null;
    this.mSearchedItems = null;
    this.mUserItems = null;
    this.mDisplayedItem = null;
  }

  addItemToServer(item: Item) {
    const {
      sellerId,
      conditionTypeId,
      categoryTypeId,
      itemName,
      description,
      price
    } = item;

    if (sellerId && conditionTypeId && categoryTypeId &&
        itemName && description && price) {
      const headers = {'Authorization': this.authenticationService.token};

      this.http.post(`${SERVER_URL}/items/add`, item, {headers, observe: 'response'})
        .subscribe((res: any) => {
          const httpStatus = res.status;

          if (httpStatus === 200)
            this.router.navigate(['/success']);
        });
    }
  }

  getRecentItems(numOfItems: number) {
    const headers = {'Authorization': this.authenticationService.token};
    this.http.get(`${SERVER_URL}/items/recent?numOfResults=${numOfItems}`, {headers})
      .subscribe((res: any) => this.mRecentItems = res.data);
  }

  getItemsForSaleObservable(userId: number): Observable<any>  {
    const headers = {'Authorization': this.authenticationService.token};
    return this.http.get(`${SERVER_URL}/items/all?userId=${userId}`, {headers});
  }

  buildItemsForSale(itemsObservable: any[]): Item[] {
    var items: Item[] = [];
    itemsObservable.forEach(item => {
      items.push(this.buildItem(item));
    });
    return items;
  }

  buildItem(itemsObservable: any): Item {
    return new Item({
      id: itemsObservable.id,
      itemName: itemsObservable.itemName,
      sellerId: itemsObservable.sellerId,
      conditionTypeId: itemsObservable.conditionTypeId,
      categoryTypeId: itemsObservable.categoryTypeId,
      description: itemsObservable.description,
      rating: itemsObservable.rating,
      price: itemsObservable.price,
      imageSource: itemsObservable.imageSource
    })
  }
}

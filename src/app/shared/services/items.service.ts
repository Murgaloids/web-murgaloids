import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthenticationService } from './authentication.service';
import { SERVER_URL, DEFAULT_ITEM_IMAGE_PATH } from '../global';
import { Observable } from 'rxjs';

@Injectable()
export class ItemsService {
  private mRecentItems: Item[];
  private mSearchedItems: Item[];
  private mUserItems: Item[];
  private mDisplayedItem: Item;
  private mIsDataSet: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  get recentItems(): Item[] { return this.mRecentItems; }
  get searchedItems(): Item[] { return this.mSearchedItems; }
  get userItems(): Item[] { return this.mUserItems; }
  get displayedItem(): Item { return this.mDisplayedItem; }
  get isDataSet(): boolean { return this.mIsDataSet; }

  clearEverything(): void {
    this.mRecentItems = null;
    this.mSearchedItems = null;
    this.mUserItems = null;
    this.mDisplayedItem = null;
  }

  addItemToServer(item: Item): void {
    const {
      sellerId,
      conditionTypeId,
      categoryTypeId,
      itemName,
      description,
      price
    } = item;

    this.mIsDataSet = false;

    if (sellerId && conditionTypeId && categoryTypeId &&
        itemName && description && price) {
      const headers = {'Authorization': this.authenticationService.token};
      this.http.post(`${SERVER_URL}/items/add`, item, {headers, observe: 'response'})
        .subscribe((res: any) => {
          if (res.status === 200)
            this.router.navigate(['/success']);
          this.mIsDataSet = true;
        });
    }
  }

  setRecentItems(numOfItems: number): void {
    this.mIsDataSet = false;
    const headers = {'Authorization': this.authenticationService.token};
    this.http.get(`${SERVER_URL}/items/recent?numOfResults=${numOfItems}`, {headers})
      .subscribe((res: any) => {
        this.mRecentItems = res.data;
        this.mRecentItems.forEach((item: Item) => {
          if (!item.imageSource)
            item.imageSource = DEFAULT_ITEM_IMAGE_PATH; 
        });
        this.mIsDataSet = true;
      });
  }

  setDisplayItemById(id: number): void {
    this.mIsDataSet = false;
    const headers = {'Authorization': this.authenticationService.token};
    this.http.get(`${SERVER_URL}/items/get?id=${id}`, {headers})
      .subscribe((res: any) => {
        this.mDisplayedItem = res.data;
        if (!this.mDisplayedItem.imageSource) {
          this.mDisplayedItem.imageSource = DEFAULT_ITEM_IMAGE_PATH;
        }
        this.mIsDataSet = true;
      });
  }

  getUserItemsObservable(userId: number): Observable<any>  {
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
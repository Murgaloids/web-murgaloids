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

  addItemToServer(item: Item) {
    return new Promise((resolve, reject) => {
      const {
        sellerId,
        conditionTypeId,
        categoryTypeId,
        itemName,
        description,
        price
      } = item;

      if (sellerId && conditionTypeId && categoryTypeId &&
          itemName && description && (price >= 0)) {
        const headers = {'Authorization': this.authenticationService.token};
        this.http.post(`${SERVER_URL}/items/add`, item, {headers, observe: 'response'})
          .subscribe((res: any) => {
            if (res.status === 200) resolve();
            this.mIsDataSet = true;
          },
          err => reject(err));
      }
    });
  }

  updateItem({
    id,
    itemName,
    sellerId,
    conditionTypeId,
    categoryTypeId,
    description,
    price,
    itemSold,
    itemRated,
    rating,
    imageSource}) {
    return new Promise((resolve, reject) => {
      const bodyObject: object = {id, sellerId};

      if (conditionTypeId || categoryTypeId || itemName || description ||
          (price >= 0) || itemSold || itemRated || rating || imageSource ) {
        const headers = {'Authorization': this.authenticationService.token};

        if (conditionTypeId) Object.assign(bodyObject, {conditionTypeId});
        if (categoryTypeId) Object.assign(bodyObject, {categoryTypeId});
        if (itemName) Object.assign(bodyObject, {itemName});
        if (description) Object.assign(bodyObject, {description});
        if (price) Object.assign(bodyObject, {price});
        if (itemSold) Object.assign(bodyObject, {itemSold});
        if (itemRated) Object.assign(bodyObject, {itemRated});
        if (rating) Object.assign(bodyObject, {rating});
        if (imageSource) Object.assign(bodyObject, {imageSource});

        this.http.post(`${SERVER_URL}/items/update`, bodyObject, {headers, observe: 'response'})
          .subscribe((res: any) => {
            if (res.status === 200) resolve();
            this.mIsDataSet = true;
          },
          err => reject(err));
      }
    });
  }

  deleteItem(id: number) {
    return new Promise((resolve, reject) => {
      const headers = {'Authorization': this.authenticationService.token};
      this.http.post(`${SERVER_URL}/items/delete`, id, {headers, observe: 'response'})
        .subscribe((res: any) => {
          if (res.status === 200) resolve();
          this.mIsDataSet = true;
        },
        err => reject(err));
    });
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

  setDisplayItemById(id: number) {
    return new Promise((resolve, reject) => {
      this.mIsDataSet = false;
      const headers = {'Authorization': this.authenticationService.token};
      this.http.get(`${SERVER_URL}/items/get?id=${id}`, {headers})
        .subscribe((res: any) => {
          this.mDisplayedItem = res.data;
          if (!this.mDisplayedItem.imageSource) {
            this.mDisplayedItem.imageSource = DEFAULT_ITEM_IMAGE_PATH;
          }
          this.mIsDataSet = true;
          resolve(this.mDisplayedItem.sellerId);
        },
        err => reject(err));
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

  setSearchedItemsByQuery(query: string) {
    return new Promise((resolve, reject) => {
      if (query) {
        const headers = {'Authorization': this.authenticationService.token};
        this.http.get(`${SERVER_URL}/items/search?query=${query}`, {headers})
          .subscribe((res: any) => {
            this.mSearchedItems = res.data;
            resolve();
          },
          err => reject(err));
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
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

  public clearEverything(): void {
    this.mRecentItems = null;
    this.mSearchedItems = null;
    this.mUserItems = null;
    this.mDisplayedItem = null;
    this.mIsDataSet = false;
  }

  public addItemToServer(item: Item): Promise<any> {
    return new Promise((resolve, reject) => {
      const {
        sellerId,
        conditionTypeId,
        categoryTypeId,
        itemName,
        description,
        price
      } = item;

      if (sellerId && conditionTypeId && categoryTypeId && itemName && description && (price >= 0)) {
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

  public getItem(itemId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      if (itemId) {
        const headers = {'Authorization': this.authenticationService.token};

        this.http.get(`${SERVER_URL}/items/get?id=${itemId}`, {headers})
          .subscribe((res: any) => {
            if (res && res.data) resolve(res.data);
          },
          err => reject(err));
      }
    });
  }

  public updateItem({
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
    imageSource}): Promise<any> {
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
        if (itemRated) Object.assign(bodyObject, {itemRated});
        if (rating) Object.assign(bodyObject, {rating});
        if (imageSource) Object.assign(bodyObject, {imageSource});
        Object.assign(bodyObject, {itemSold});

        this.http.post(`${SERVER_URL}/items/update`, bodyObject, {headers, observe: 'response'})
          .subscribe((res: any) => {
            if (res.status === 200) resolve();
            this.mIsDataSet = true;
          },
          err => reject(err));
      }
    });
  }

  public deleteItem(id: number): Promise<any> {
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

  public setRecentItems(numOfItems: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = {'Authorization': this.authenticationService.token};

      this.http.get(`${SERVER_URL}/items/recent?numOfResults=${numOfItems}`, {headers})
        .subscribe((res: any) => {
          this.mRecentItems = res.data;

          this.mRecentItems.forEach((item: Item) => {
            if (!item.imageSource)
              item.imageSource = DEFAULT_ITEM_IMAGE_PATH;
          });

          resolve(this.mRecentItems);
        },
        err => reject(err));
    });
  }

  public setDisplayItemById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = {'Authorization': this.authenticationService.token};

      this.http.get(`${SERVER_URL}/items/get?id=${id}`, {headers})
        .subscribe((res: any) => {
          this.mDisplayedItem = res.data;

          if (!this.mDisplayedItem.imageSource)
            this.mDisplayedItem.imageSource = DEFAULT_ITEM_IMAGE_PATH;

          resolve(this.mDisplayedItem.sellerId);
        },
        err => reject(err));
    });
  }

  public getUserItemsObservable(userId: number): Observable<any>  {
    const headers = {'Authorization': this.authenticationService.token};

    return this.http.get(`${SERVER_URL}/items/all?userId=${userId}`, {headers});
  }

  public buildItemsForSale(itemsObservable: any[]): Item[] {
    var items: Item[] = [];

    itemsObservable.forEach(item => {
      if(!item.itemSold)
        items.push(this.buildItem(item));
    });

    return items;
  }

  public buildItemsSold(itemsObservable: any[]): Item[] {
    var items: Item[] = [];

    itemsObservable.forEach(item => {
      if(item.itemSold)
        items.push(this.buildItem(item));
    });

    return items;
  }

  public buildItem(itemsObservable: any): Item {
    return new Item({
      id: itemsObservable.id,
      itemName: itemsObservable.itemName,
      sellerId: itemsObservable.sellerId,
      conditionTypeId: itemsObservable.conditionTypeId,
      categoryTypeId: itemsObservable.categoryTypeId,
      description: itemsObservable.description,
      rating: itemsObservable.rating,
      itemSold: itemsObservable.itemSold,
      price: itemsObservable.price,
      imageSource: itemsObservable.imageSource
    })
  }

  public setSearchedItemsByQuery(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (query) {
        const headers = {'Authorization': this.authenticationService.token};

        this.http.get(`${SERVER_URL}/items/search?query=${query}`, {headers})
          .subscribe(
            (res: any) => {
              this.mSearchedItems = res.data;
              resolve();
            },
            err => reject(err)
          );
      }
    });
  }
}

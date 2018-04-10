import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthenticationService } from './authentication.service';

const SERVER_URL: string = 'http://localhost:8080';

@Injectable()
export class ItemsService {
  private mRecentItems: Item[];
  private mSearchedItems: Item[];
  private mUserItems: Item[];
  private mDisplayedItem: Item;
  private headers: HttpHeaders;

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
      const headerObj = {'Authorization': this.authenticationService.token};

      this.http.post(`${SERVER_URL}/items/add`, item, {headers: headerObj, observe: 'response'})
        .subscribe((res: any) => {
          this.router.navigate(['/success']);
        });
    }
  }
}
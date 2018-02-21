'use strict';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Item } from '../models/item.model';
import { DummyDataService } from './dummy-data.service';

@Injectable()
export class DataService {

  constructor(private dummyDataService: DummyDataService) { }

  getUser(userId: number): User {
    return this.dummyDataService.getDummyUser(userId);
  }

  getUserName(userId: number): string {
    return this.dummyDataService.getDummyUserName(userId);
  }

  getUserAbout(userId: number): string {
    return this.dummyDataService.getDummyUserAbout(userId);
  }

  getUserItemsForSale(userId: number): Item[] {
    return this.dummyDataService.getDummyUserItemsForSale(userId);
  }

  getUserItemsViewed(userId: number): Item[] {
    return this.dummyDataService.getDummyUserItemsViewed(userId);
  }

  getUserImageSrc(userId: number): string {
    return this.dummyDataService.getDummyUserImageSrc(userId);
  }

  getItemById(itemId: number): Item {
    return this.dummyDataService.getDummyItemById(itemId);
  }

}

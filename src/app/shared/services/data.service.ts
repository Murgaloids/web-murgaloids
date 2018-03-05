import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Item } from '../models/item.model';
import { DummyDataService } from './dummy-data.service';

@Injectable()
export class DataService {
  constructor(private dummyDataService: DummyDataService) { }

  getStudent(userId: number): Student {
    return this.dummyDataService.getDummyUser(userId);
  }

  getItemById(itemId: number): Item {
    return this.dummyDataService.getDummyItemById(itemId);
  }

  getRecentItemsForSale(): Item[] {
    return this.dummyDataService.getRecentItemsForSale();
  }
}

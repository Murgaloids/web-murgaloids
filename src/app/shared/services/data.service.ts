import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Item } from '../models/item.model';
import { DummyDataService } from './dummy-data.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  //eventually authorization will be moved to the account service
  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Murgaloids eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXJyaWNrMkBnbWFpbC5jb20iLCJleHAiOjE1MjM1NzA1OTV9.ZGQAel8S6KO7J1SkY3i6jVSA18XWrDcgk5ssjlbPLvwy-eroeqp5rsmopQmD1DtgM4EOUcPD8d_u8XtCse63oA'
    })
  };

  private url: string = 'http://localhost:8080/';

  constructor(private dummyDataService: DummyDataService, private http: HttpClient) { }

  getStudentObservable(userId: number): Observable<any> {
    return this.http.get(this.url + 'students/get?id=' + userId, this.httpOptions);
  }

  getItemsForSaleObservable(userId: number): Observable<any>  {
    return this.http.get(this.url + 'items/all?userId=' + userId, this.httpOptions);
  }

  getItemObservable(itemId: number): Observable<any> {
    return this.http.get(this.url + 'items/get?id=' + itemId, this.httpOptions);
  }

  buildStudent(studentObservable: any, itemsForSale: Item[]): Student {
    return new Student({
      id: studentObservable.id,
      name: studentObservable.firstName,
      aboutDesc: studentObservable.description,
      profilePicture: this.getUserPhoto(studentObservable.id),
      itemsForSale: itemsForSale,
      itemsViewed: [] //empty for now
    });
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
      imageSrc: this.getItemPhoto(itemsObservable.id)
    })
  }

  getUserPhoto(userId: number): string {
    return localStorage.getItem('user' + userId);
  }

  getItemPhoto(itemId: number): string {
    return localStorage.getItem('item' + itemId);
  }

  //eventually this will be converted to use real data
  getRecentItemsForSale(): Item[] {
    return this.dummyDataService.getRecentItemsForSale();
  }

  addNewItem(item: Item) {
      return this.http.post(this.url + "items/add", item, this.httpOptions);
  }

  getUserId() {
    return 1;
  }
}

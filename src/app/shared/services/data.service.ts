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
      'Authorization': 'Murgaloids eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtaWNoYWVsYmx4Y2tAZ21haWwuY29tIiwiZXhwIjoxNTIxNDAzNjM5fQ.9-Ar9rDS-N0ExbK2vMGIMtAX5GOukt8kb6vY-PWYnxSqPMvADqUJlnhmb5Co98caIoeMjaJ8nh7LrcQcZuiFlQ'
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
    return this.http.get(this.url + 'items/get?id=', this.httpOptions);
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
      name: itemsObservable.itemName,
      aboutDesc: itemsObservable.description,
      rating: itemsObservable.rating,
      price: itemsObservable.price,
      imageSrc: this.getItemPhoto(itemsObservable.id);
    })
  }

  //eventually user photos will be mapped in local storage
  getUserPhoto(userId: number): string {
    return 'https://avatars0.githubusercontent.com/u/10682341?s=400&v=4';
  }

  //eventually item photos will be mapped in local storage
  getItemPhoto(itemId: number): string {
    return 'https://www.obaku.com/content/collection/V213GUCURZ.jpg';
  }

  //eventually this will be converted to use real data
  getRecentItemsForSale(): Item[] {
    return this.dummyDataService.getRecentItemsForSale();
  }
}

import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Item } from '../models/item.model';
import { DummyDataService } from './dummy-data.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  private httpOptions: any = {
    headers: new HttpHeaders({
      'Authorization': 'Murgaloids eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtaWNoYWVsYmx4Y2tAZ21haWwuY29tIiwiZXhwIjoxNTIxNDAzNjM5fQ.9-Ar9rDS-N0ExbK2vMGIMtAX5GOukt8kb6vY-PWYnxSqPMvADqUJlnhmb5Co98caIoeMjaJ8nh7LrcQcZuiFlQ'
    })
  };

  private url: string;

  constructor(private dummyDataService: DummyDataService, private http: HttpClient) { }

  getStudentObservable(userId: number): Observable<any> {
    this.url = "http://localhost:8080/students/all";
    return this.http.get(this.url, this.httpOptions);
  }

  buildStudent(studentObservable: any, itemsForSale: Item[]): Student {
    return new Student({
      id: studentObservable.id,
      name: studentObservable.firstName,
      aboutDesc: `
        Hi! I'm Derrick. I'm a computer science major at CSULB and I
        have lots of stuff to sell! For now this is just a hard
        coded bio, but eventually you'll be reading this bio after
        it's retreived from a data base!`,
      profilePicture: 'https://avatars0.githubusercontent.com/u/10682341?s=400&v=4',
      itemsForSale: itemsForSale,
      itemsViewed: []
    });
  }

  getItemsForSaleObservable(userId: number): Observable<any>  {
    this.url = "http://localhost:8080/items/get?userId=" + userId;
    return this.http.get(this.url, this.httpOptions);
  }

  buildItemsForSale(itemsObservable: any[]): Item[] {
    var items: Item[] = [];
    itemsObservable.forEach(item => {
      items.push(new Item({
        id: item.id,
        name: item.itemName,
        aboutDesc: item.description,
        rating: 4.0,
        price: item.price,
        imageSrc: 'https://www.obaku.com/content/collection/V213GUCURZ.jpg'

      }));
    });
    return items;
  }

  getItemById(itemId: number): Item {
    return this.dummyDataService.getDummyItemById(itemId);
  }

  getRecentItemsForSale(): Item[] {
    return this.dummyDataService.getRecentItemsForSale();
  }
}

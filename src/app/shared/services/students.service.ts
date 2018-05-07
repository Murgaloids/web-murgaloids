import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

import { SERVER_URL } from '../global';

@Injectable()
export class StudentsService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public getStudentObservable(userId: number): Observable<any> {
    const headers = {'Authorization': this.authenticationService.token};

    return this.http.get(`${SERVER_URL}/students/get?id=${userId}`, {headers});
  }

  public buildStudent(studentObservable: any, itemsForSale: Item[], itemsSold: Item[]): Student {
    return new Student({
      id: studentObservable.data.id,
      name: `${studentObservable.data.firstName} ${studentObservable.data.lastName}`,
      description: studentObservable.data.description,
      imageSource: studentObservable.data.imageSource,
      itemsForSale: itemsForSale,
      itemsSold: itemsSold,
      itemsViewed: []
    });
  }

}

import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

const SERVER_URL: string = 'http://localhost:8080';

@Injectable()
export class StudentsService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  getStudentObservable(userId: number): Observable<any> {
    const headers = {'Authorization': this.authenticationService.token};
    return this.http.get(`${SERVER_URL}/students/get?id=${userId}`, {headers});
  }

  buildStudent(studentObservable: any, itemsForSale: Item[]): Student {
    return new Student({
      id: studentObservable.id,
      name: studentObservable.firstName,
      aboutDesc: studentObservable.description,
      profilePicture: '', // have yet to implement
      itemsForSale: itemsForSale,
      itemsViewed: []
    });
  }
}

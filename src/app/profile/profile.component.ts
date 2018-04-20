import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { StudentsService } from '../shared/services/students.service';
import { ItemsService } from '../shared/services/items.service';
import { Student } from '../shared/models/student.model';
import { Item } from '../shared/models/item.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: number;
  student: Student;
  ready: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private studentsService: StudentsService,
    private itemsService: ItemsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.studentsService.getStudentObservable(this.id).subscribe(student => {
        this.itemsService.getUserItemsObservable(this.id).subscribe(item => {
          let itemsForSale: Item[] = this.itemsService.buildItemsForSale(item.data);
          this.student = this.studentsService.buildStudent(student, itemsForSale);
          this.ready = true;
        });
      });
    });
  }
}

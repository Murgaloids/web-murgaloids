import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../shared/services/students.service';
import { ItemsService } from '../shared/services/items.service';
import { Student } from '../shared/models/student.model';
import { Item } from '../shared/models/item.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ StudentsService ]
})
export class ProfileComponent implements OnInit {
  id: number;
  student: Student;
  ready: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private itemsService: ItemsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentsService.getStudentObservable(+params['id']).subscribe(student => {
        this.itemsService.getUserItemsObservable(+params['id']).subscribe(item => {
          let itemsForSale: Item[] = this.itemsService.buildItemsForSale(item.data);
          this.student = this.studentsService.buildStudent(student, itemsForSale);
          this.ready = true;
        });
      });
    });
  }
}

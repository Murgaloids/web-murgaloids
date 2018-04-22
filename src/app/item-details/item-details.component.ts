import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../shared/models/item.model';
import { ItemsService } from '../shared/services/items.service';
import { StudentsService } from '../shared/services/students.service';
import { Student } from '../shared/models/student.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  private seller: Student;
  private ready: boolean;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private studentsService: StudentsService
  ) {}

  ngOnInit() {    
    this.route.params.subscribe(params => {
      this.itemsService.setDisplayItemById(+params['id'])
        .then((sellerId: number) => {
          this.studentsService.getStudentObservable(sellerId)
            .subscribe(res => {
              if (res && res.data) {
                this.seller = new Student({
                  name: `${res.data.firstName} ${res.data.lastName}`,
                  imageSource: res.data.imageSource,
                  aboutDesc: res.data.description || '',
                  id: res.data.id
                });
                this.ready = true;
              }
            });
        });
    });
  }
}

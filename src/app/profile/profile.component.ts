import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Student } from '../shared/models/student.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: number;
  student: Student;
  ready: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.id = 1;
    this.dataService.getStudentObservable(this.id).subscribe(student => {
      this.dataService.getItemsForSaleObservable(this.id).subscribe(item => {
        var itemsForSale = this.dataService.buildItemsForSale(item);
        this.student = this.dataService.buildStudent(student[0], itemsForSale);
        this.ready = true;
      });
    });

  }
}

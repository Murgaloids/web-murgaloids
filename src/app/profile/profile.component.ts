import { Component, OnInit } from '@angular/core';
//services
import { DataService } from '../shared/services/data.service';
//models
import { Student } from '../shared/models/student.model';
import { Item } from '../shared/models/item.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private id: number;
  private student: Student;
  private ready: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    //currently hardcoding the id here
    this.id = 1;
    this.dataService.getStudentObservable(this.id).subscribe(student => {
      this.dataService.getItemsForSaleObservable(this.id).subscribe(item => {
        let itemsForSale: Item[] = this.dataService.buildItemsForSale(item);
        this.student = this.dataService.buildStudent(student, itemsForSale);
        this.ready = true;
      });
    });
  }
}

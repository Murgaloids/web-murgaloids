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
    //these two lines are for testing using local storage for images
    localStorage.setItem('user1', 'https://avatars0.githubusercontent.com/u/10682341?s=400&v=4');
    localStorage.setItem('item1', 'https://www.obaku.com/content/collection/V213GUCURZ.jpg');
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

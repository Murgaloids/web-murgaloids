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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.id = 12345678;
    this.student = this.dataService.getStudent(this.id);
  }
}

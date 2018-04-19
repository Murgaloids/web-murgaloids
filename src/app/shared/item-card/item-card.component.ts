import { Component, Input, OnInit } from '@angular/core';
import { MOBILE_WIDTH } from '../global';
import { WindowService } from '../services/window.service';
import { StudentsService } from '../services/students.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;

  private mobileWidth: number;
  private sellerName: string;
  private ready: boolean;

  constructor(
    private windowService: WindowService,
    private studentsService: StudentsService
  ) {}

  ngOnInit() {
    this.mobileWidth = MOBILE_WIDTH;
    this.studentsService.getStudentObservable(this.item.sellerId).subscribe(student => {
        let builtStudent = this.studentsService.buildStudent(student, null);
        this.sellerName = builtStudent.name;
        this.ready = true;
    });
  }
}

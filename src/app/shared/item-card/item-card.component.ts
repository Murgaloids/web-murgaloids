import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MOBILE_WIDTH } from '../global';
import { WindowService } from '../services/window.service';
import { StudentsService } from '../services/students.service';
import { AuthenticationService } from '../services/authentication.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;
  private hover: boolean;

  private mobileWidth: number;
  private sellerName: string;
  private ready: boolean;
  private soldByThisStudent: boolean;

  constructor(
    private windowService: WindowService,
    private studentsService: StudentsService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.mobileWidth = MOBILE_WIDTH;
    this.studentsService.getStudentObservable(this.item.sellerId).subscribe(student => {
        let builtStudent = this.studentsService.buildStudent(student, null);
        this.sellerName = builtStudent.name;
        if(this.router.url === "/profile/" + this.authenticationService.userId) { 
          this.soldByThisStudent = true;
        }
        this.ready = true;
    });
  }
}

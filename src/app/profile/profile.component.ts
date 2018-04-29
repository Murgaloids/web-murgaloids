import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { AuthenticationService } from '../shared/services/authentication.service';
import { StudentsService } from '../shared/services/students.service';
import { ItemsService } from '../shared/services/items.service';
import { MessagingService } from '../shared/services/messaging.service';

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
    private router: Router,
    private authenticationService: AuthenticationService,
    private studentsService: StudentsService,
    private messagingService: MessagingService,
    private itemsService: ItemsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.studentsService.getStudentObservable(this.id).subscribe(student => {
        this.itemsService.getUserItemsObservable(this.id).subscribe(item => {
          let itemsForSale: Item[] = this.itemsService.buildItemsForSale(item.data);
          let itemsSold: Item[] = this.itemsService.buildItemsSold(item.data);
          this.student = this.studentsService.buildStudent(student, itemsForSale, itemsSold);
          this.ready = true;
        });
      });
    });
  }

  openMessageDialog(): void {
    const conversationId = [this.student.id, this.authenticationService.userId].sort().join(':');

    this.messagingService.doesConversationExists(conversationId)
      .then(data => {
        if (!data) {
          const dialogRef = this.dialog.open(MessageDialog, {
            width: '500px',
            data: {id: this.student.id}
          });
        } else {
          this.router.navigate(['message']);
        }
      })
  }
}

@Component({
  selector: 'message-dialog',
  templateUrl: './message-dialog.html',
  styleUrls: ['./profile.component.scss']
})
export class MessageDialog {
  private message: string;

  constructor(
    public dialogRef: MatDialogRef<MessageDialog>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private messagingService: MessagingService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  send(): void {
    this.messagingService.addConversationWithInitialMessage(this.data.id, this.message)
      .then(res => {
        if (res) {
          this.router.navigate(['message']);
          this.dialogRef.close();
        }
      });
  }
}

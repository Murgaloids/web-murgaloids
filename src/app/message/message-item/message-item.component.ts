import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { StudentsService } from '../../shared/services/students.service';
import { MessagingService } from '../../shared/services/messaging.service';
import { Student } from '../../shared/models/student.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {
  @Input() conversation;
  private otherStudent: Student;

  constructor(
    private authenticationService: AuthenticationService,
    private studentsService: StudentsService,
    private messagingService: MessagingService
  ) {
    this.otherStudent = new Student();
  }
 
  ngOnInit() { 
    this.otherStudent.id = this.authenticationService.userId !== this.conversation.student1Id ?
                            this.conversation.student1Id : this.conversation.student2Id;

    this.studentsService.getStudentObservable(this.otherStudent.id)
      .subscribe(res => this.otherStudent = this.studentsService.buildStudent(res, null));
  }

  clickHandler() {
    this.messagingService.setDisplayConversation(this.otherStudent.name, this.conversation.id);
  }
}

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
    const {student1Id, student2Id} = this.conversation.details;
    this.otherStudent.id = this.authenticationService.userId !== student1Id ? student1Id : student2Id;

    this.studentsService.getStudentObservable(this.otherStudent.id)
      .subscribe(res => this.otherStudent = this.studentsService.buildStudent(res, null, null));
  }

  clickHandler() {
    this.messagingService.setDisplayConversation(this.otherStudent.name, this.conversation.details.id);
  }
}

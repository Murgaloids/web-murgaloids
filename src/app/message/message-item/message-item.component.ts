import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { StudentsService } from '../../shared/services/students.service';
import { MessagingService } from '../../shared/services/messaging.service';
import { Student } from '../../shared/models/student.model';
import { Conversation } from '../../shared/models/conversation.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {
  @Input() public conversation: Conversation;
  public otherStudent: Student;

  constructor(
    private authenticationService: AuthenticationService,
    private studentsService: StudentsService,
    private messagingService: MessagingService
  ) {
    this.otherStudent = new Student();
  }
 
  public ngOnInit(): void {
    const {student1Id, student2Id} = this.conversation;
    this.otherStudent.id = this.authenticationService.userId !== student1Id ? student1Id : student2Id;

    this.studentsService.getStudentObservable(this.otherStudent.id)
      .subscribe(res => this.otherStudent = this.studentsService.buildStudent(res, null, null));
  }

  public clickHandler(): void {
    this.messagingService.setDisplayConversation(this.otherStudent.name, this.conversation.id);
  }
}
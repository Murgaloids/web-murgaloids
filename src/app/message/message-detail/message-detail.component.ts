import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../shared/services/messaging.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
<<<<<<< HEAD
export class MessageDetailComponent implements OnInit {
=======
export class MessageDetailComponent implements OnInit, OnDestroy {
>>>>>>> attempting to persist message data to reduce less http request made.
  private message: string;

  constructor(
    private messagingService: MessagingService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
  }

<<<<<<< HEAD
  onSubmit() {
    this.messagingService.addMessage(this.message);
    this.message = '';
=======
  ngOnDestroy() {
  }

  onSubmit() {
>>>>>>> attempting to persist message data to reduce less http request made.
  }
}

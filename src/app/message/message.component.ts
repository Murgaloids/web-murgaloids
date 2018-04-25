import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MessagingService } from '../shared/services/messaging.service';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  private conversations;

  constructor(
    private router: Router,
    private messagingService: MessagingService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.messagingService.getConversations(this.authenticationService.userId)
      .then(conversations => {
        this.conversations = conversations || [];

        if (this.conversations.length) {

        }
      });
  }
}

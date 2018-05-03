import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../shared/services/messaging.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  constructor(
    public messagingService: MessagingService
  ) {}

  public ngOnInit(): void {
    this.messagingService.getConversations();
  }
}

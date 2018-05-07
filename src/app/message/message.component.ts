import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../shared/services/messaging.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  constructor(
    private titleService: Title,
    public messagingService: MessagingService
  ) {}

  public ngOnInit(): void {
    this.messagingService.getConversations();
    this.titleService.setTitle('beachshop | Message');
  }
}

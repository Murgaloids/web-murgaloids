import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MessagingService } from '../shared/services/messaging.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  constructor(
    private router: Router,
    private messagingService: MessagingService
  ) {}

  ngOnInit() {
    this.messagingService.getConversations();
  }
}

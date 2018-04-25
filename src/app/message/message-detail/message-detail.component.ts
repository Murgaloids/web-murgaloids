import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagingService } from '../../shared/services/messaging.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit, OnDestroy {

  constructor(
    private messagingService: MessagingService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.messagingService.clearDisplayConversation();
  }

}

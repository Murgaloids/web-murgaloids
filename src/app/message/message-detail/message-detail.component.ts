import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagingService } from '../../shared/services/messaging.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit, OnDestroy {
  private message: string;

  constructor(
    private messagingService: MessagingService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  onSubmit() {
  }
}

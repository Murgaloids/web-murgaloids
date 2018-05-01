import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  ElementRef,
  ViewChild
} from '@angular/core';
import { MessagingService } from '../../shared/services/messaging.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messages') private messageContainer: ElementRef;
  private message: string;

  constructor(
    private messagingService: MessagingService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  ngOnDestroy() {
    this.messagingService.disconnectWebSocket();
    this.messagingService.clearMessageDisplay();
  }

  onSubmit() {
    this.messagingService.addMessage(this.message);
    this.message = '';
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.log(err);
    }
  }
}

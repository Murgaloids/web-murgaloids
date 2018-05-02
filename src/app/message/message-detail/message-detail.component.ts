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
  public message: string;

  constructor(
    public messagingService: MessagingService,
    public authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.scrollToBottom();
  }

  public ngAfterViewChecked(): void {
    this.scrollToBottom();        
  } 

  public ngOnDestroy(): void {
    this.messagingService.disconnectWebSocket();
    this.messagingService.clearMessageDisplay();
  }

  public onSubmit(): void {
    this.messagingService.addMessage(this.message);
    this.message = '';
  }

  private scrollToBottom(): void {
    try {
      if (this.messageContainer)
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.log(err);
    }
  }
}

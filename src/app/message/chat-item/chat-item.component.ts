import { Component, Input } from '@angular/core';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent {
  @Input() public chat: Message;
  @Input() public position: string;
  public toolTipPosition: string = 'after';
}

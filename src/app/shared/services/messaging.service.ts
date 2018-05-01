import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client/dist/sockjs.min';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { SERVER_URL } from '../global';

import { Conversation } from '../models/conversation.model';
import { ConversationDetails } from '../models/conversation-details.model';
import { Message } from '../models/message.model';

const SOCKET_URL = `${SERVER_URL}/chat`;

@Injectable()
export class MessagingService {
  private mConversations: Conversation[];
  private mMessages: Message[];
  private mConversationDetails: ConversationDetails;
  private mStompClient;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.mMessages = [];
    this.mConversations = [];
    this.mConversationDetails = {id: null, studentName: null};
  }

  get messages() { return this.mMessages; }
  get conversationDetails() { return this.mConversationDetails; }
  get conversations() { return this.mConversations; }

  public clearEverything(): void {
    this.mMessages = [];
    this.mConversations = [];
    this.mConversationDetails = {id: null, studentName: null};
    this.mStompClient = null;
  }

  public clearMessageDisplay(): void {
    this.mMessages = [];
    this.mConversationDetails = {id: null, studentName: null};
  }

  public doesConversationExists(conversationId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (conversationId) {
        const headers = {'Authorization': this.authenticationService.token};

        this.http.get(`${SERVER_URL}/conversations/exists?id=${conversationId}`, {headers})
          .subscribe((res: any) => {
            if (res) resolve(res.data);
          },
          err => reject(err));
      } else resolve(false);
    });
  }

  public addConversationWithInitialMessage(studentId: number, message: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (studentId >= 0 && message) {
        const bodyObject: object = {
          id: [this.authenticationService.userId, studentId].sort().join(':'),
          student1Id: this.authenticationService.userId,
          student2Id: studentId
        };

        const headers = {'Authorization': this.authenticationService.token};

        this.http.post(`${SERVER_URL}/conversations/add`, bodyObject, {headers, observe: 'response'})
          .subscribe(
            this.addInitialMessage.bind(this, message, resolve, reject),
            err => reject(err)
          );
      }
    });
  }

  private addInitialMessage(message, resolve, reject, conversationRes: any): void {
    if (conversationRes && conversationRes.body) {
      const bodyObject: object = {
        conversationId: conversationRes.body.data.id,
        senderId: this.authenticationService.userId,
        message: message
      };

      const headers = {'Authorization': this.authenticationService.token};
      this.http.post(`${SERVER_URL}/messages/add`, bodyObject, {headers, observe: 'response'})
        .subscribe(
          (messageRes: any) => {
            if (messageRes && messageRes.body)
              resolve(messageRes.body.data);
            else reject(null);
        },
          err => reject(err)
        );
    }
  }

  public getConversations(): void {
    const headers = {'Authorization': this.authenticationService.token};
    this.http.get(`${SERVER_URL}/conversations/get-conversations?id=${this.authenticationService.userId}`, {headers})
      .subscribe((res: any) => {
        if (res && res.data) this.mConversations = res.data;
      },
      err => console.log(err));
  }

  public addMessage(message: string): void {
    if (message) {
      const bodyObject: object = {
        conversationId: this.mConversationDetails.id,
        senderId: this.authenticationService.userId,
        message
      };

      this.mStompClient.send(`/app/chats/${this.mConversationDetails.id}`, {}, JSON.stringify(bodyObject));
    }
  }

  public setDisplayConversation(studentName: string, conversationId: string): void {
    this.disconnectWebSocket();

    let ws = new SockJS(SOCKET_URL);
    this.mStompClient = Stomp.over(ws);

    this.mStompClient.connect({}, (frame) => {
      this.mStompClient.subscribe(`/topic/chat.${conversationId}`, ({body}) => {
        this.mMessages.push(JSON.parse(body));
      });
    });

    if (conversationId.length) {
      const headers = {'Authorization': this.authenticationService.token};

      this.http.get(`${SERVER_URL}/messages/get-messages?id=${conversationId}`, {headers})
        .subscribe((res: any) => {
          if (res && res.data) this.mMessages = res.data;
        },
        err => console.log(err));
    }

    this.mConversationDetails.id = conversationId;
    this.mConversationDetails.studentName = studentName;
  }

  public disconnectWebSocket(): void {
    if (this.mStompClient) this.mStompClient.disconnect();
  }
}
import * as _ from 'lodash';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client/dist/sockjs.min';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { SERVER_URL } from '../global';

const SOCKET_URL = 'http://localhost:8080/chat';

@Injectable()
export class MessagingService {
  private mConversationObj;
  private mConversationArray;
  private mMessages;
  private mConversationDetails;
  private mStompClient;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.mMessages = [];
    this.mConversationObj = {};
    this.mConversationArray = [];
    this.mConversationDetails = {};
  }

  get messages() { return this.mMessages; }
  get conversationDetails() { return this.mConversationDetails; }
  get conversations() { return this.mConversationArray; }

  clearEverything(): void {
    this.mMessages = [];
    this.mConversationObj = {};
    this.mConversationArray = [];
    this.mConversationDetails = {};
    this.mStompClient = null;
  }

  clearMessageDisplay(): void {
    this.mMessages = [];
    this.mConversationDetails = {};
  }

  doesConversationExists(conversationId: string) {
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

  addConversationWithInitialMessage(studentId: number, message: string) {
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

  addInitialMessage(message, resolve, reject, conversationRes: any) {
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
            if (messageRes && messageRes.body) {
              this.mConversationObj[messageRes.body.data.conversationId] = {
                details: {
                  id: conversationRes.body.data.id,
                  student1Id: conversationRes.body.data.student1Id,
                  student2Id: conversationRes.body.data.student2Id
                },
                messages: [messageRes.body.data]
              };

              resolve(messageRes.body.data);
          } else reject(null);
        },
          err => reject(err)
        );
    }
  }


  getConversations() {
    const headers = {'Authorization': this.authenticationService.token};

    this.http.get(`${SERVER_URL}/conversations/get-conversations?id=${this.authenticationService.userId}`, {headers})
      .subscribe((res: any) => {
        if (res && res.data) {
          res.data.forEach(data => {
            if (!this.mConversationObj[data.id]) {
              this.mConversationObj[data.id] = {
                details: {
                  id: data.id,
                  student1Id: data.student1Id,
                  student2Id: data.student2Id
                },
                messages: []
              };
            }
          });

          this.mConversationArray = _.values(this.mConversationObj);
        }
      },
      err => console.log(err));
  }

  addMessage(message: string) {
    if (message) {
      const bodyObject: object = {
        conversationId: this.mConversationDetails.id,
        senderId: this.authenticationService.userId,
        message
      };

      this.mStompClient.send(`/app/chats/${this.mConversationDetails.id}`, {}, JSON.stringify(bodyObject));
    }
  }

  setDisplayConversation(studentName: string, conversationId: string) {
    this.disconnectWebSocket();

    let ws = new SockJS(SOCKET_URL);
    this.mStompClient = Stomp.over(ws);
    this.mStompClient.connect({}, (frame) => {
      this.mStompClient.subscribe(`/topic/chat.${conversationId}`, ({body}) => {
        this.mMessages.push(JSON.parse(body));
      });
    });

    if (this.mConversationObj[conversationId] && this.mConversationObj[conversationId].messages &&
        this.mConversationObj[conversationId].messages.length) {
      this.mMessages = [...this.mConversationObj[conversationId].messages];
    } else if (conversationId.length) {
      const headers = {'Authorization': this.authenticationService.token};

      this.http.get(`${SERVER_URL}/messages/get-messages?id=${conversationId}`, {headers})
        .subscribe((res: any) => {
          this.mConversationObj[conversationId].messages = res.data;
          this.mMessages = res.data;
        },
        err => console.log(err));
    }

    this.mConversationDetails.id = conversationId;
    this.mConversationDetails.studentName = studentName;
  }

  disconnectWebSocket() {
    if (this.mStompClient)
      this.mStompClient.disconnect();
  }
}
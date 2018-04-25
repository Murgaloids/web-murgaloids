import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { SERVER_URL } from '../global';

@Injectable()
export class MessagingService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  doesConversationExists(conversationId: string) {
    return new Promise((resolve, reject) => {
      if (conversationId) {
        const headers = {'Authorization': this.authenticationService.token};
        this.http.get(`${SERVER_URL}/conversations/exists?id=${conversationId}`, {headers})
          .subscribe((res: any) => {
            if (res) resolve(res.data);
          },
          err => reject(err));
      } else {
        resolve(false);
      }
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
            this.addMessage.bind(this, message, resolve, reject),
            err => reject(err)
          );
      }
    });
  }

  addMessage(message, resolve, reject, res: any) {
    if (res && res.body) {
      const bodyObject: object = {
        conversationId: res.body.data.id,
        senderId: this.authenticationService.userId,
        message: message
      };

      const headers = {'Authorization': this.authenticationService.token};
      this.http.post(`${SERVER_URL}/messages/add`, bodyObject, {headers, observe: 'response'})
        .subscribe(
          (res: any) => {
            if (res && res.body) {
              resolve(res.body.data);
            } else resolve(null);
          },
          err => reject(err)
        );
    }
  }
}
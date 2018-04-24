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
}
import bcryptjs = require('bcryptjs');
import SHA256 = require('crypto-js/hmac-sha256');

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Challenge } from '../models/challenge.model';


const SERVER_URL: string = 'http://localhost:8080';
const SALT_ROUNDS: number = 10;

@Injectable()
export class AuthenticationService {
  private mFirstname: string;
  private mLastname: string;
  private mEmail: string;
  private mPassword: string;
  private mSalt: string;
  private mUserId: number;
  private mToken: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  set firstName(firstName: string) {
    this.mFirstname = firstName;
  }

  get firstName(): string {
    return this.mFirstname;
  }

  set lastName(lastName: string) {
    this.mLastname = lastName;
  }

  get lastName(): string {
    return this.mLastname;
  }

  set email(email: string) {
    this.mEmail = email;
  }

  get email(): string {
    return this.mEmail;
  }

  set password(password: string) {
    this.mPassword = password;
  }

  get password(): string {
    return this.mPassword;
  }

  set salt(salt: string) {
    this.mSalt = salt;
  }

  get salt(): string {
    return this.mSalt;
  }

  set userId(id: number) {
    this.mUserId = id;
  }

  get userId(): number {
    return this.mUserId;
  }

  set token(token: string) {
    this.mToken = token;
  }

  clearEverything() {
    this.mFirstname = '';
    this.mLastname = '';
    this.mEmail = '';
    this.mPassword = '';
    this.mUserId = null;
    this.mToken = '';
  }

  attemptUserRegistration({firstName, lastName, email, password}) {
    if (firstName && lastName && email && password) {
      bcryptjs.genSalt(SALT_ROUNDS)
        .then(this.hashUserPassword.bind(this, password))
        .then(this.registerUserToServer.bind(this))
        .catch(err => console.log(err));
    }
  }

  attemptUserLogin({email, password}) {
    if (email && password) {
      const body: object = {email};

      this.http.request('post', `${SERVER_URL}/students/get-challenge`, {body})
        .subscribe(({salt, challenge}: Challenge) => {
          if (email && password && salt && challenge) {
            bcryptjs.hash(password, salt)
              .then(hash => {
                const tag = SHA256(challenge, hash).toString();
                this.http.post(`${SERVER_URL}/students/validate-tag`, {email, challenge, tag}, {observe: 'response'})
                  .subscribe((res: any) => {
                    this.mToken = res.headers.get('authorization');
                    if (this.mToken && res.body.data.id) {
                      this.userId = res.body.data.id;
                      this.router.navigate(['/']);
                    }
                  });
              });
          }
        });
    }
  }

  hashUserPassword(password: string, salt: string) {
    if (password && salt) {
      this.mSalt = salt;
      return bcryptjs.hash(password, salt);
    }

    return Promise.reject({error: 'Unable to hash user password'});
  }

  registerUserToServer(hashedPassword: string) {
    if (hashedPassword) {
      this.password = hashedPassword;
      const body: object = {
        firstName: this.mFirstname,
        lastName: this.mLastname,
        email: this.mEmail,
        password: this.mPassword,
        salt: this.mSalt
      }

      this.http.post(`${SERVER_URL}/students/add`, body, {observe: 'response'})
        .subscribe((res: any) => {
          this.mToken = res.headers.get('authorization')
          if (this.mToken && res.body.data.id) {
            this.userId = res.body.data.id;
            this.router.navigate(['/']);
          }
        });
    }
  }
}

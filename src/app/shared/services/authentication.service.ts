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
  private mFirstName: string;
  private mLastName: string;
  private mEmail: string;
  private mPassword: string;
  private mSalt: string;
  private mUserId: number;
  private mToken: string;
  private mError: boolean;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  get firstName(): string { return this.mFirstName; }
  get lastName(): string { return this.mLastName; }
  get email(): string { return this.mEmail; }
  get password(): string { return this.mPassword; }
  get salt(): string { return this.mSalt; }
  get userId(): number { return this.mUserId; }
  get token(): string { return this.mToken; }
  get error(): boolean { return this.mError; }

  changeFirstName(firstname: string) { this.mFirstName = firstname; }
  changeLastName(lastname: string) { this.mLastName = lastname; }
  changeEmail(email: string) { this.mEmail = email; }
  changePassword(password: string) { this.mPassword = password; }

  clearEverything() {
    this.mFirstName = '';
    this.mLastName = '';
    this.mEmail = '';
    this.mPassword = '';
    this.mSalt = '';
    this.mUserId = null;
    this.mToken = '';
  }

  clearIsError() {
    this.mError = false;
  }

  attemptUserRegistration({firstName, lastName, email, password}) {
    if (firstName && lastName && email && password) {
      bcryptjs.genSalt(SALT_ROUNDS)
        .then(this.hashUserPassword.bind(this, password))
        .then(this.registerUserToServer.bind(this))
        .catch(this.errorHandler.bind(this));
    }
  }

  attemptUserLogin({email, password}) {
    if (email && password) {
      const bodyObject: object = {email};

      this.http.post(`${SERVER_URL}/students/get-challenge`, bodyObject, {observe: 'response'})
        .subscribe(
          this.hashPasswordAndGenerateTag.bind(this, email, password),
          this.errorHandler.bind(this)
        );
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
      this.changePassword(hashedPassword);

      const body: object = {
        firstName: this.mFirstName,
        lastName: this.mLastName,
        email: this.mEmail,
        password: this.mPassword,
        salt: this.mSalt
      };

      this.http.post(`${SERVER_URL}/students/add`, body, {observe: 'response'})
        .subscribe((res: any) => {
          this.mToken = res.headers.get('authorization');
          this.mUserId = res.body.data.id;
          const httpStatus = res.status;

          if (this.mToken && this.mUserId && (httpStatus === 201)) {
            this.mPassword = '';
            this.mSalt = '';
            this.mError = false;
            this.router.navigate(['/']);
          }
        },
        this.errorHandler.bind(this));
    }
  }

  hashPasswordAndGenerateTag(email: string, password: string, res: any) {
    const {salt, challenge} = res.body;
    const httpStatus = res.status;

    if (email && password && salt && challenge && (httpStatus === 200)) {
      bcryptjs.hash(password, salt)
        .then(this.generateTag.bind(this, email, challenge))
        .catch(this.errorHandler.bind(this));
    }
  }

  generateTag(email: string, challenge: string, hashedPassword: string) {
    const tag = SHA256(challenge, hashedPassword).toString();

    this.http.post(`${SERVER_URL}/students/validate-tag`, {email, challenge, tag}, {observe: 'response'})
      .subscribe((res: any) => {
        this.mToken = res.headers.get('authorization');
        this.mUserId = res.body.data.id;
        const httpStatus = res.status;

        if (this.mToken && this.mUserId && (httpStatus === 200)) {
          this.mPassword = '';
          this.mSalt = '';
          this.mError = false;
          this.router.navigate(['/']);
        }
      },
      this.errorHandler.bind(this));
  }

  errorHandler(err: any) {
    this.mError = true;
    this.clearEverything();
  }
}
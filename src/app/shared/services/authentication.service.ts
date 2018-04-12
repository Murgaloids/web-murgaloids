import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { SERVER_URL } from '../global';
import bcryptjs = require('bcryptjs');
import SHA256 = require('crypto-js/hmac-sha256');

const SALT_ROUNDS: number = 10;

@Injectable()
export class AuthenticationService {
  // All the member variables.
  private mFirstName: string;
  private mLastName: string;
  private mEmail: string;
  private mPassword: string;
  private mSalt: string;
  private mUserId: number;
  private mToken: string;
  private mHasError: boolean;
  private mErrorMessage: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // All the getter methods.
  //
  // There are no setter methods because components outside
  // this file should not be able to set member variables.
  // Only methods inside this file should be able to set
  // member variables.
  get firstName(): string { return this.mFirstName; }
  get lastName(): string { return this.mLastName; }
  get email(): string { return this.mEmail; }
  get password(): string { return this.mPassword; }
  get salt(): string { return this.mSalt; }
  get userId(): number { return this.mUserId; }
  get token(): string { return this.mToken; }
  get hasError(): boolean { return this.mHasError; }
  get errorMessage(): string { return this.mErrorMessage; }

  // These methods are used to capture immediate user input
  // to set the member variables.
  changeFirstName(firstname: string) { this.mFirstName = firstname; }
  changeLastName(lastname: string) { this.mLastName = lastname; }
  changeEmail(email: string) { this.mEmail = email; }
  changePassword(password: string) { this.mPassword = password; }

  // Particularly used when there is an error or when the
  // user signs out of the application.
  clearEverything() {
    this.mFirstName = '';
    this.mLastName = '';
    this.mEmail = '';
    this.mPassword = '';
    this.mSalt = '';
    this.mUserId = null;
    this.mToken = '';
  }

  clearError() {
    this.mHasError = false;
    this.mErrorMessage = '';
  }

  // Attempts to register a new user.
  //
  // Hashes the user's password before sending to the server
  // to prevent man-in-the-middle attacks.
  attemptUserRegistration({firstName, lastName, email, password}) {
    if (firstName && lastName && email && password) {
      bcryptjs.genSalt(SALT_ROUNDS)
        .then(this.hashUserPassword.bind(this, password))
        .then(this.registerUserToServer.bind(this))
        .catch(this.errorHandler.bind(this));
    }
  }

  // Attempts to login a user.
  //
  // To login a user, the server first sends a challenge to
  // the client to allow the client to create a tag to send
  // back to the server. If the client's tag matches the server's
  // tag, then the user has been validated.
  //
  // Notice that at no point in this method does the user's password
  // ever get sent to the server. This is known as the
  // challenge-response authentication technique.
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

  // Hashese the user's password.
  //
  // This is a helper method to register a user.
  hashUserPassword(password: string, salt: string) {
    if (password && salt) {
      this.mSalt = salt;
      return bcryptjs.hash(password, salt);
    }

    return Promise.reject({error: 'Unable to hash user password'});
  }

  // Registers the user to the server.
  //
  // This is a helper method to register a user.
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
            this.mHasError = false;
            this.router.navigate(['/home']);
          }
        },
        this.errorHandler.bind(this));
    }
  }

  // Hashes the user's password and generates a tag.
  //
  // This is a helper method to validate a user during login.
  hashPasswordAndGenerateTag(email: string, password: string, res: any) {
    const {salt, challenge} = res.body;
    const httpStatus = res.status;

    if (email && password && salt && challenge && (httpStatus === 200)) {
      bcryptjs.hash(password, salt)
        .then(this.generateTag.bind(this, email, challenge))
        .catch(this.errorHandler.bind(this));
    }
  }

  // Generates a tag to send back to the server to validate.
  //
  // This is a helper method to validate a user during login.
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
          this.mHasError = false;
          this.router.navigate(['/home']);
        }
      },
      this.errorHandler.bind(this));
  }

  errorHandler(err: any) {
    this.mHasError = true;
    this.clearEverything();
  }
}
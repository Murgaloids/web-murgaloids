import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { SERVER_URL } from '../global';
import bcryptjs = require('bcryptjs');
import SHA256 = require('crypto-js/hmac-sha256');

const SALT_ROUNDS: number = 10;
const LOCAL_STORAGE_KEY = 'beach-shop';

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
  private mIsProcessing: boolean;

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
  get isProcessing(): boolean { return this.mIsProcessing; }

  // These methods are used to capture immediate user input
  // to set the member variables.
  changeFirstName(firstname: string): void { this.mFirstName = firstname; }
  changeLastName(lastname: string): void { this.mLastName = lastname; }
  changeEmail(email: string): void { this.mEmail = email; }
  changePassword(password: string): void { this.mPassword = password; }

  public getAuthenticationFromLocalStorage(): void {
    if (localStorage) {
      const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

      if (localStorageData) {
        this.mFirstName = localStorageData.auth.firstName;
        this.mLastName = localStorageData.auth.lastName;
        this.mEmail = localStorageData.auth.email;
        this.mUserId = localStorageData.auth.userId;
        this.mToken = localStorageData.auth.token;
      }
    }
  }

  private setAuthenticationToLocalStorage(): void {
    if (localStorage) {
      localStorage.clear();
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
      auth: {
        firstName: this.mFirstName,
        lastName: this.mLastName,
        email: this.mEmail,
        userId: this.mUserId,
        token: this.mToken
      }
    }));
  }

  // Particularly used when there is an error or when the
  // user signs out of the application.
  public clearEverythingExceptErrors(): void {
    this.mFirstName = '';
    this.mLastName = '';
    this.mEmail = '';
    this.mPassword = '';
    this.mSalt = '';
    this.mToken = '';
    this.mUserId = null;
    this.mIsProcessing = false;
  }

  public clearError() {
    this.mHasError = false;
    this.mErrorMessage = '';
  }

  public editUserInformation({email, firstName, lastName, description, imageSource}): void {
    if (email && (firstName || lastName || description || imageSource)) {
      const bodyObject: object = {email};
      const headers = {'Authorization': this.token};

      if (firstName) Object.assign(bodyObject, {firstName});
      if (lastName) Object.assign(bodyObject, {lastName});
      if (description) Object.assign(bodyObject, {description});
      if (imageSource) Object.assign(bodyObject, {imageSource});

      this.http.post(`${SERVER_URL}/students/update`, bodyObject, {headers})
        .subscribe(
          (res: any) => {
            if (res && res.data) {
              this.mFirstName = res.data.firstName;
              this.mLastName = res.data.lastName;
              this.mUserId = res.data.id;
              this.mEmail = res.data.email;
              this.router.navigate([`/profile/${this.mUserId}`]);
            }
          },
          this.errorHandler.bind(this)
         );
    }
  }

  // Attempts to register a new user.
  //
  // Hashes the user's password before sending to the server
  // to prevent man-in-the-middle attacks.
  public attemptUserRegistration({firstName, lastName, email, password}) {
    if (firstName && lastName && email && password) {
      this.mIsProcessing = true;
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
  public attemptUserLogin({email, password}) {
    if (email && password) {
      this.mIsProcessing = true;
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
  private hashUserPassword(password: string, salt: string) {
    if (password && salt) {
      this.mSalt = salt;
      return bcryptjs.hash(password, salt);
    }

    return Promise.reject({error: 'Unable to hash user password'});
  }

  // Registers the user to the server.
  //
  // This is a helper method to register a user.
  private registerUserToServer(hashedPassword: string) {
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
          if (res && res.headers && res.body && res.body.data && res.status) {
            this.mToken = res.headers.get('authorization');
            this.mUserId = res.body.data.id;
            const httpStatus = res.status;

            if (this.mToken && this.mUserId && (httpStatus === 200)) {
              this.setAuthenticationToLocalStorage();
              this.clearPasswordSaltAndErrors();
              this.router.navigate(['/home']);
            }
          } else
            this.errorHandler.call(this);
        },
        this.errorHandler.bind(this));
    }
  }

  // Hashes the user's password and generates a tag.
  //
  // This is a helper method to validate a user during login.
  private hashPasswordAndGenerateTag(email: string, password: string, res: any) {
    if (res && res.body && res.status) {
      const {salt, challenge} = res.body;
      const httpStatus = res.status;

      if (email && password && salt && challenge && (httpStatus === 200)) {
        bcryptjs.hash(password, salt)
          .then(this.generateTag.bind(this, email, challenge))
          .catch(this.errorHandler.bind(this));
      } else
        this.errorHandler.call(this);
    } else {
      this.errorHandler.call(this);
    }
  }

  // Generates a tag to send back to the server to validate.
  //
  // This is a helper method to validate a user during login.
  private generateTag(email: string, challenge: string, hashedPassword: string) {
    const tag = SHA256(challenge, hashedPassword).toString();

    this.http.post(`${SERVER_URL}/students/validate-tag`, {email, challenge, tag}, {observe: 'response'})
      .subscribe((res: any) => {
        if (res && res.headers && res.body && res.body.data && res.status) {
          this.mToken = res.headers.get('authorization');
          this.mUserId = res.body.data.id;
          const httpStatus = res.status;

          if (this.mToken && this.mUserId && (httpStatus === 200)) {
            this.mEmail = res.body.data.email;
            this.mFirstName = res.body.data.firstName;
            this.mLastName = res.body.data.lastName;

            this.setAuthenticationToLocalStorage();
            this.clearPasswordSaltAndErrors();
            this.router.navigate(['/home']);
          } else
            this.errorHandler.call(this);
        } else
        this.errorHandler.call(this);
      },
      this.errorHandler.bind(this));
  }

  private errorHandler(err: any) {
    this.mHasError = true;
    this.clearEverythingExceptErrors();
  }

  private clearPasswordSaltAndErrors() {
    this.mPassword = '';
    this.mSalt = '';
    this.mHasError = false;
    this.mIsProcessing = false;
  }
}
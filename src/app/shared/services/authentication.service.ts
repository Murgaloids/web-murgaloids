import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { SERVER_URL } from '../global';
import * as bcryptjs from 'bcryptjs';
import * as SHA256 from 'crypto-js/hmac-sha256';
import { AuthenticatedUser} from '../models/authenticated-user.model';

const SALT_ROUNDS: number = 10;
const LOCAL_STORAGE_KEY = 'beach-shop';

@Injectable()
export class AuthenticationService {

  // All the member variables.
  private user: AuthenticatedUser;
  private mHasError: boolean;
  private mErrorMessage: string;
  private mIsProcessing: boolean;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.user = {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      description: null,
      salt: null,
      token: null
    }
  }

  // All the getter methods.
  //
  // There are no setter methods because components outside
  // this file should not be able to set member variables.
  // Only methods inside this file should be able to set
  // member variables.
  get firstName(): string { return this.user.firstName; }
  get lastName(): string { return this.user.lastName; }
  get email(): string { return this.user.email; }
  get password(): string { return this.user.password; }
  get description(): string { return this.user.description; }
  get userId(): number { return this.user.id; }
  get token(): string { return this.user.token; }
  get hasError(): boolean { return this.mHasError; }
  get errorMessage(): string { return this.mErrorMessage; }
  get isProcessing(): boolean { return this.mIsProcessing; }

  // These methods are used to capture immediate user input
  // to set the member variables.
  changeFirstName(firstname: string): void { this.user.firstName = firstname; }
  changeLastName(lastname: string): void { this.user.lastName = lastname; }
  changeEmail(email: string): void { this.user.email = email; }
  changePassword(password: string): void { this.user.password = password; }

  public getAuthenticationFromLocalStorage(): void {
    if (localStorage) {
      const localStorageData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

      if (localStorageData) {
        this.user = {
          id: localStorageData.auth.userId,
          firstName: localStorageData.auth.firstName,
          lastName: localStorageData.auth.lastName,
          email :localStorageData.auth.email,
          description: localStorageData.auth.description,
          token: localStorageData.auth.token,
          salt: null,
          password: null
        }
      }
    }
  }

  private setAuthenticationToLocalStorage(): void {
    if (localStorage)
      localStorage.clear();

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
      auth: {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        userId: this.user.id,
        token: this.user.token,
        description: this.user.description
      }
    }));
  }

  public editUserInformation({email, firstName, lastName, description, imageSource}): Promise<any> {
    return new Promise((resolve, reject) => {
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
                this.user.firstName = res.data.firstName;
                this.user.lastName = res.data.lastName;
                this.user.description = res.data.description;
                this.user.id = res.data.id;
                this.user.email = res.data.email;
                resolve();
              }
            },
            this.errorHandler.bind(this)
           );
      } else reject();
    });
  }

  // Attempts to register a new user.
  //
  // Hashes the user's password before sending to the server
  // to prevent man-in-the-middle attacks.
  public attemptUserRegistration({firstName, lastName, email, password}): void {
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
  public attemptUserLogin({email, password}): void {
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
  private hashUserPassword(password: string, salt: string): Promise<any> {
    if (password && salt) {
      this.user.salt = salt;

      return bcryptjs.hash(password, salt);
    }

    return Promise.reject({error: 'Unable to hash user password'});
  }

  // Registers the user to the server.
  //
  // This is a helper method to register a user.
  private registerUserToServer(hashedPassword: string): void {
    if (hashedPassword) {
      this.changePassword(hashedPassword);

      const body: object = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
        salt: this.user.salt
      };

      this.http.post(`${SERVER_URL}/students/add`, body, {observe: 'response'})
        .subscribe((res: any) => {
          if (res && res.headers && res.body && res.body.data && res.status) {
            this.user.token = res.headers.get('authorization');
            this.user.id = res.body.data.id;
            const httpStatus = res.status;

            if (this.user.token && this.user.id && (httpStatus === 200)) {
              this.user.email = res.body.data.email;
              this.user.firstName = res.body.data.firstName;
              this.user.lastName = res.body.data.lastName;
              this.user.description = res.body.data.description;

              this.setAuthenticationToLocalStorage();
              this.clearPasswordSaltAndErrors();
              this.router.navigate(['/home']);
            }
          } else this.errorHandler.call(this);
        },
        this.errorHandler.bind(this));
    }
  }

  // Hashes the user's password and generates a tag.
  //
  // This is a helper method to validate a user during login.
  private hashPasswordAndGenerateTag(email: string, password: string, res: any): void {
    if (res && res.body && res.status) {
      const {salt, challenge} = res.body;
      const httpStatus = res.status;

      if (email && password && salt && challenge && (httpStatus === 200)) {
        bcryptjs.hash(password, salt)
          .then(this.generateTag.bind(this, email, challenge))
          .catch(this.errorHandler.bind(this));
      } else this.errorHandler.call(this);
    } else this.errorHandler.call(this);
  }

  // Generates a tag to send back to the server to validate.
  //
  // This is a helper method to validate a user during login.
  private generateTag(email: string, challenge: string, hashedPassword: string): void {
    const tag = SHA256(challenge, hashedPassword).toString();

    this.http.post(`${SERVER_URL}/students/validate-tag`, {email, challenge, tag}, {observe: 'response'})
      .subscribe((res: any) => {
        if (res && res.headers && res.body && res.body.data && res.status) {
          this.user.token = res.headers.get('authorization');
          this.user.id = res.body.data.id;
          const httpStatus = res.status;

          if (this.user.token && this.user.id && (httpStatus === 200)) {
            this.user.email = res.body.data.email;
            this.user.firstName = res.body.data.firstName;
            this.user.lastName = res.body.data.lastName;
            this.user.description = res.body.data.description;

            this.setAuthenticationToLocalStorage();
            this.clearPasswordSaltAndErrors();
            this.router.navigate(['/home']);
          } else this.errorHandler.call(this);
        } else this.errorHandler.call(this);
      },
      this.errorHandler.bind(this));
  }

  private errorHandler(err: any): void {
    this.mHasError = true;
    this.clearEverythingExceptErrors();
  }

  private clearPasswordSaltAndErrors(): void {
    this.user.password = '';
    this.user.salt = '';
    this.mHasError = false;
    this.mIsProcessing = false;
  }

  // Particularly used when there is an error or when the
  // user signs out of the application.
  private clearEverythingExceptErrors(): void {
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.email = '';
    this.user.password = '';
    this.user.description = '';
    this.user.salt = '';
    this.user.token = '';
    this.user.id = null;
    this.mIsProcessing = false;
  }

  public clearEverything(): void {
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.email = '';
    this.user.password = '';
    this.user.description = '';
    this.user.salt = '';
    this.user.id = null;
    this.user.token = '';
    this.mHasError = false;;
    this.mErrorMessage = '';
    this.mIsProcessing = false;;
  }
}
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";
import { AuthenticationService } from '../shared/services/authentication.service';
import { StudentsService } from '../shared/services/students.service';
import { FileUpload } from '../shared/models/file-upload.model';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  private firstName: string;
  private lastName: string;
  private aboutMe: string;
  private imageSource: string;

  // Firebase attributes
  private selectedFiles: FileList;
  private currentFileUpload: FileUpload;
  private progress: { percentage: number } = { percentage: 0 };
  private basePath: string = '/uploads';

  constructor(
    private authenticationService: AuthenticationService,
    private studentsService: StudentsService,
    private angularFireDatabase: AngularFireDatabase,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.studentsService.getStudentObservable(this.authenticationService.userId)
      .subscribe(res => {
        if (res && res.data) {
          this.firstName = res.data.firstName;
          this.lastName = res.data.lastName;
          this.aboutMe = res.data.description;
        }
      });
  }

  private submitHandler() {
    if (this.selectedFiles) {
      const file = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      this.currentFileUpload = new FileUpload(file);
      this.pushFileToStorage(this.currentFileUpload, this.progress);
    }
    else
      this.updateUser();
  }

  // Handles uploading image to Firebase
  private pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number}): any {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // In progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // Failure
        console.log("ERROR UPLOADING PHOTO TO FIREBASE ", error);
      },
      () => {
        // Success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload);
      }
    );
  }

  // Handles saving user image and adding the user to database
  private saveFileData(fileUpload: FileUpload) {
    this.angularFireDatabase.list(`${this.basePath}`).push(fileUpload).then(
      data => {
        const userImageId = this.parseUserImageId(data);
        this.setUserImageSrc(userImageId);
      });
  }

  private parseUserImageId(data: any): string {
    return String(data.path).split(this.basePath + "/")[1];
  }

  private setUserImageSrc(itemImageId: string): void {
    const ref = firebase.database().ref(`${this.basePath}/${itemImageId}`)
      .once('value').then(
        snapshot => {
          this.imageSource = this.getUserImageSrcFromId(snapshot);
          this.updateUser();
        });
  }

  private getUserImageSrcFromId(snapshot: any): string {
    return snapshot.node_.children_.root_.value.value_;
  }

  private selectFile(event) {
    const file = event.target.files.item(0);
    if(file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert("INVALID IMAGE FORMAT");
    }
  }

  private updateUser(): void {
    const {
      firstName,
      lastName,
      aboutMe: description,
      imageSource
    } = this;

    const { email } = this.authenticationService;

    const userObj = { email, firstName, lastName, description, imageSource };
    this.authenticationService.editUserInformation(userObj)
      .then(() => {
        this.router.navigate(['/profile', this.authenticationService.userId])
        this.snackBar.open('Edits saved!', null, { duration: 1500 });
      });
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FileUpload } from '../models/file-upload.model';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  private selectedFile: FileList;
  private currentFileUpload: FileUpload;
  private basePath: string = '/uploads';

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  public getUploadTask(data: any): firebase.storage.UploadTask {
    const file = data.item(0);
    this.selectedFile = undefined;
    this.currentFileUpload = new FileUpload(file);
    const storageRef = firebase.storage().ref();
    return storageRef.child(`${this.basePath}/${this.currentFileUpload.file.name}`).put(this.currentFileUpload.file);
  }

  public getStateChanged(): firebase.storage.TaskEvent {
    return firebase.storage.TaskEvent.STATE_CHANGED;
  }

  public addToFirebase(uploadTask: any): any {
    this.currentFileUpload.url = uploadTask.snapshot.downloadURL;
    this.currentFileUpload.name = this.currentFileUpload.file.name;
    return this.angularFireDatabase.list(`${this.basePath}`).push(this.currentFileUpload);
  }

  public saveFileData(data: any): any {
    const itemImageId = this.parseItemImageId(data);
    return firebase.database().ref(`${this.basePath}/${itemImageId}`);
  }

  public getItemImageSrcFromId(snapshot: any): string {
    return snapshot.node_.children_.root_.value.value_;
  }

  public setFile(event: any): void {
    const file = event.target.files.item(0);
    if(file.type.match('image.*')) {
      this.selectedFile = event.target.files;
    } else {
      alert("INVALID IMAGE FORMAT");
    }
  }

  public getFile(): FileList {
    return this.selectedFile;
  }

  private parseItemImageId(data: any): string {
    return String(data.path).split(this.basePath + "/")[1];
  }

  private setItemImageSrc(itemImageId: string): firebase.database.Reference {
    return firebase.database().ref(`${this.basePath}/${itemImageId}`);
  }
}

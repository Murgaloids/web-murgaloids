import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//services
import { DataService } from '../shared/services/data.service';
//models
import { Item } from '../shared/models/item.model';
import { FileUpload } from '../shared/models/file-upload.model'
//enums
import { ItemCondition } from '../shared/global';
import { ItemCategory } from '../shared/global';
//firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sell-item-page',
  templateUrl: './sell-item-page.component.html',
  styleUrls: ['./sell-item-page.component.scss']
})
export class SellItemPageComponent {
  //item attributes
  item: Item = new Item();
  itemCondition: string;
  itemCategory: string;
  //firebase attributes
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  basePath:string = '/uploads';

  constructor(
    private dataService: DataService,
    private router: Router,
    private db: AngularFireDatabase) { }

  submit() {
    this.item.sellerId = this.dataService.getUserId();
    this.item.itemSold = false;
    this.item.rating = 0;
    this.item.conditionTypeId = ItemCondition[this.itemCondition];
    this.item.categoryTypeId = ItemCategory[this.itemCategory];
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.pushFileToStorage(this.currentFileUpload, this.progress);
  }

  selectFile(event) {
    const file = event.target.files.item(0);
    if(file.type.match('image.*')) {
      if(file.type.match('image.*')) {
        this.selectedFiles = event.target.files;
      } else {
        alert('invalid format!');
      }
    }
  }

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }): any {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload);
      }
    );
  }

  private saveFileData(fileUpload: FileUpload) {
    this.db.list(`${this.basePath}/`).push(fileUpload).then(data => {
      console.log(String(data.path).split("/uploads/"));
      console.log("path ", data.path);
      this.item.imageSrc = String(data.path).split("/uploads/")[1];
      console.log(this.item.imageSrc);
      this.dataService.addNewItem(this.item).subscribe(id => {
        localStorage.setItem('item' + id, this.item.imageSrc);
        this.router.navigate(['/success']);
      });
    });
  }

}

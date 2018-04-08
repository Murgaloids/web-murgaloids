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
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sell-item-page',
  templateUrl: './sell-item-page.component.html',
  styleUrls: ['./sell-item-page.component.scss']
})
export class SellItemPageComponent {
  //item attributes
  private item: Item = new Item();
  private itemCondition: string;
  private itemCategory: string;
  //firebase attributes
  private selectedFiles: FileList;
  private currentFileUpload: FileUpload;
  private progress: { percentage: number } = { percentage: 0 };
  private basePath:string = '/uploads';

  constructor(
    private dataService: DataService,
    private router: Router,
    private db: AngularFireDatabase) { }

  submit() {
    // set the item attributes
    this.item.sellerId = this.dataService.getUserId();
    this.item.itemSold = false;
    this.item.rating = 0;
    this.item.conditionTypeId = ItemCondition[this.itemCondition];
    this.item.categoryTypeId = ItemCategory[this.itemCategory];
    // set up for uploading the item image
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.pushFileToStorage(this.currentFileUpload, this.progress);
  }

  // event handler for selecting item image to be uploaded, see
  // firebase docs
  selectFile(event) {
    const file = event.target.files.item(0);
    if(file.type.match('image.*')) {
      if(file.type.match('image.*')) {
        this.selectedFiles = event.target.files;
      } else {
        alert('INVALID FORMAT');
      }
    }
  }

  // handles uploading the item image to firebase, see firebase docs
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
        // once the file has been successfully uploaded, call saveFileData
        this.saveFileData(fileUpload);
      }
    );
  }

  // now that the image has been successfully uploaded, we can save its data
  private saveFileData(fileUpload: FileUpload) {
    this.db.list(`${this.basePath}/`).push(fileUpload).then(data => {
      // parse out and save the image source id
      this.item.imageSrc = this.parseItemImageSrc(data);
      // add the new item to the database and redirect to success page
      this.dataService.addNewItem(this.item).subscribe(id => {
        localStorage.setItem('item' + id, this.item.imageSrc);
        this.router.navigate(['/success']);
      });
    });
  }

  private parseItemImageSrc(data:any):string {
    return String(data.path).split("/uploads/")[1];
  }

}

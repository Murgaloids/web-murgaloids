import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// Services
import { AuthenticationService } from '../shared/services/authentication.service';
import { ItemsService } from '../shared/services/items.service';
// Models
import { Item } from '../shared/models/item.model';
import { FileUpload } from '../shared/models/file-upload.model';
// Enums
import { ItemCondition } from '../shared/global';
import { ItemCategory } from '../shared/global';
// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  private item: Item = new Item();
  private itemCondition: string;
  private itemCategory: string;
  // Firebase attributes
  private selectedFiles: FileList;
  private currentFileUpload: FileUpload;
  private progress: { percentage: number } = { percentage: 0 };
  private basePath: string = '/uploads';

  constructor(
    private authenticationService: AuthenticationService,
    private itemsService: ItemsService,
    private router: Router,
    private route: ActivatedRoute,
    private angularFireDatabase: AngularFireDatabase
  ) {
    this.item.itemSold = false;
    this.item.itemRated = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.item.id = +params['id'];
    });
  }

  submitHandler() {
    // Sets the owner of the item
    this.item.sellerId = this.authenticationService.userId;
    this.item.conditionTypeId = ItemCondition[this.itemCondition];
    this.item.categoryTypeId = ItemCategory[this.itemCategory];
    // Set up for uploading the item to firebase
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.pushFileToStorage(this.currentFileUpload, this.progress);
  }

  // Event handler for selecting image
  selectFile(event) {
    const file = event.target.files.item(0);
    if(file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert("INVALID IMAGE FORMAT");
    }
  }

  // Handles uploading image to Firebase
  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number}): any {
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

  // Handles saving item image and adding the item to database
  private saveFileData(fileUpload: FileUpload) {
    this.angularFireDatabase.list(`${this.basePath}`).push(fileUpload).then(
      data => {
        const itemImageId = this.parseItemImageId(data);
        this.setItemImageSrc(itemImageId);
      });
  }

  private parseItemImageId(data: any): string {
    return String(data.path).split(this.basePath + "/")[1];
  }

  private setItemImageSrc(itemImageId: string): void {
    const ref = firebase.database().ref(`${this.basePath}/${itemImageId}`)
      .once('value').then(
        snapshot => {
          this.item.imageSource = this.getItemImageSrcFromId(snapshot);
          this.addItem();
        });
  }

  private getItemImageSrcFromId(snapshot: any): string {
    return snapshot.node_.children_.root_.value.value_;
  }

  private addItem(): void {
    console.log("trying");
    const {
      itemName,
      sellerId,
      conditionTypeId,
      categoryTypeId,
      description,
      price,
      imageSource
    } = this.item;

    if (itemName && sellerId && conditionTypeId &&
        categoryTypeId && description && (price >= 0) && imageSource) {
      this.itemsService.updateItem.call(this.itemsService, this.item);
    }
  }
}

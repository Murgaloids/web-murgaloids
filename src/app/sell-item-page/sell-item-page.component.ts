import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from '../shared/services/items.service';
import { MatSnackBar } from '@angular/material';
// Services
import { AuthenticationService } from '../shared/services/authentication.service';
import { FirebaseService } from '../shared/services/firebase.service';
// Models
import { Item } from '../shared/models/item.model';
// Enums
import { ItemCondition } from '../shared/global';
import { ItemCategory } from '../shared/global';
// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sell-item-page',
  templateUrl: './sell-item-page.component.html',
  styleUrls: ['./sell-item-page.component.scss']
})
export class SellItemPageComponent {
  private item: Item = new Item();
  private itemCondition: string;
  private itemCategory: string;
  private progress: { percentage: number } = { percentage: 0 };
  private isLoading: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private itemsService: ItemsService,
    private firebaseService: FirebaseService,
    private router: Router,
    private angularFireDatabase: AngularFireDatabase,
    private snackBar: MatSnackBar
  ) {
    this.item.itemSold = false;
    this.item.itemRated = false;
  }

  submitHandler() {
    this.item.sellerId = this.authenticationService.userId;
    this.item.conditionTypeId = ItemCondition[this.itemCondition];
    this.item.categoryTypeId = ItemCategory[this.itemCategory];
    this.addItemWithPhoto();
  }

  // Event handler for selecting image
  selectFile(event) {
    this.firebaseService.setFile(event);
  }

  private addItem(): void {
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
      this.itemsService.addItemToServer.call(this.itemsService, this.item)
        .then(() => {
          this.router.navigate(['/home']);
          this.snackBar.open('Item successfully added!', null, { duration: 1500 });
        });
    }
  }

  private addItemWithPhoto(): void {
    this.isLoading = true;
    const uploadTask = this.firebaseService.getUploadTask(this.firebaseService.getFile());
    uploadTask.on(this.firebaseService.getStateChanged(),
    (snapshot) => {
      this.progress.percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    },
    (error) => {
      console.log("ERROR UPLOADING PHOTO TO FIREBASE ", error);
    },
    () => {
      this.firebaseService.addToFirebase(uploadTask).then(
        data => {
          this.firebaseService.saveFileData(data)
          .once('value').then(
            snapshot => {
              this.item.imageSource = this.firebaseService.getItemImageSrcFromId(snapshot);
              this.addItem();
            });
        })
    });
  }
}

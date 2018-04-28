import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AreYouSureDialog } from '../shared/are-you-sure-dialog/are-you-sure-dialog.component';
// Services
import { AuthenticationService } from '../shared/services/authentication.service';
import { ItemsService } from '../shared/services/items.service';
import { FirebaseService } from '../shared/services/firebase.service';
// Models
import { Item } from '../shared/models/item.model';
// Enums
import { ItemCondition } from '../shared/global';
import { ItemCategory } from '../shared/global';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
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
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.item.itemSold = false;
    this.item.itemRated = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.item.id = +params['id'];
      this.itemsService.getItem(this.item.id)
        .then((res: any) => {
          this.item.itemName = res.itemName;
          this.itemCondition = ItemCondition[res.conditionTypeId];
          this.itemCategory = ItemCategory[res.categoryTypeId];
          this.item.description = res.description;
          this.item.price = res.price;
        })
    });
  }

  submitHandler() {
    this.item.sellerId = this.authenticationService.userId;
    this.item.conditionTypeId = ItemCondition[this.itemCondition];
    this.item.categoryTypeId = ItemCategory[this.itemCategory];
    if(this.firebaseService.getFile() != null) {
      this.updateItemWithPhoto();
    } else {
      this.updateItem();
    }

  }

  selectFile(event) {
    this.firebaseService.setFile(event);
  }

  private updateItemWithPhoto(): void {
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
              this.updateItem();
            });
        })
    });
  }

  private updateItem(): void {
    const {
      itemName,
      sellerId,
      conditionTypeId,
      categoryTypeId,
      description,
      price,
      imageSource
    } = this.item;

    if (itemName || conditionTypeId ||
        categoryTypeId || description || (price >= 0) || imageSource) {
      this.itemsService.updateItem.call(this.itemsService, this.item)
        .then(() => {
          this.router.navigate(['profile', sellerId]);
          this.snackBar.open('Edits saved!', null, { duration: 1500 });
        });
    }
  }

  openDialog(toggle: boolean): void {
    let dialogRef = this.dialog.open(AreYouSureDialog, {
      width: '250px',
      data: { item: this.item, isDelete: toggle}
    });
  }
}

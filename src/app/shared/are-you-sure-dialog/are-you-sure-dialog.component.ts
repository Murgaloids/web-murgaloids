import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ItemsService } from '../services/items.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'are-you-sure-dialog',
  templateUrl: 'are-you-sure-dialog.html'
})
export class AreYouSureDialog {

  constructor(
    private authenticationService: AuthenticationService,
    private itemsService: ItemsService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AreYouSureDialog>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  no(): void {
    this.dialogRef.close();
  }

  yes(): void {
    if(this.data.isDelete === true) {
      this.itemsService.deleteItem(this.data.item.id)
        .then(() => {
          this.router.navigate(['/profile', this.authenticationService.userId]);
          this.dialogRef.close();
          this.snackBar.open('Item deleted!', null, { duration: 1500 });
        });
    } else {
      this.data.item.itemSold = true;
      if (this.data.item.itemSold) {
        this.itemsService.updateItem.call(this.itemsService, this.data.item)
          .then(() => {
            this.router.navigate(['home']);
            this.dialogRef.close();
            this.snackBar.open('Item Closed!', null, { duration: 1500 });
          });
      }
    }
  }
}

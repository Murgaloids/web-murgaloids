import { Component, Input, OnInit } from '@angular/core';
import { MOBILE_WIDTH } from '../global';
//services
import { WindowService } from '../services/window.service';
//models
import { Item } from '../models/item.model';
//firebase
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;

  private mobileWidth: number;
  private ready: boolean = false;
  private basePath:string = '/uploads';

  constructor(
    private windowService: WindowService,
    // AngularFireDatabase import is needed for context, errors without
    private db: AngularFireDatabase) { }

  ngOnInit() {
    this.mobileWidth = MOBILE_WIDTH;
    // get the item image id, this will change when image id is added to database/backend
    var id = String(localStorage.getItem('item' + this.item.id));
    if(id != null) {
      // make a request to firebase for the item's image source using its image id
      const ref = firebase.database().ref(`${this.basePath}/${id}`)
        .once('value').then(snapshot => {
          // firebase returns a Reference snapshot, call
          // getItemImageSource to parse out the image source and set it
          this.getItemImageSource(snapshot);
          // component is now ready to be rendered
          this.ready = true;
        }).catch(e => {
          console.log("ERROR ACCESSING IMAGE: ", e);
          this.ready = true;
        });
    }
  }

  private getItemImageSource(snapshot:any):void {
    this.item.imageSrc = snapshot.node_.children_.root_.value.value_;
  }
}

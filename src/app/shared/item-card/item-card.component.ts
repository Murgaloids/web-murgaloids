import { Component, Input, OnInit } from '@angular/core';
import { MOBILE_WIDTH } from '../global';
import { WindowService } from '../services/window.service';
import { Item } from '../models/item.model';
import { DataService } from '../services/data.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;

  private mobileWidth: number;
  basePath:string = '/uploads';
  ready: boolean = false;

  constructor(private windowService: WindowService, private dataService: DataService, private db: AngularFireDatabase) {}

  ngOnInit() {
    this.mobileWidth = MOBILE_WIDTH;
    console.log("ITEM ID ", this.item.id);
    var id = String(localStorage.getItem('item' + this.item.id));
    console.log("PHOTO ID ", id);
    if(id != null) {
    const ref = firebase.database().ref(`${this.basePath}/${id}`)
      .once('value').then(snapshot => {
        console.log("SNAPSHOT", snapshot);
        this.item.imageSrc = snapshot.node_.children_.root_.value.value_;
        this.ready = true;
      })
      .catch(e => {
        console.log("there was an error ");
        this.ready = true;
      });
    }
  }
}

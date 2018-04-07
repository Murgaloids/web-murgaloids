import { Component, Input, OnInit } from '@angular/core';
import { MOBILE_WIDTH } from '../global';
//services
import { WindowService } from '../services/window.service';
import { DataService } from '../services/data.service';
//models
import { Item } from '../models/item.model';
//firebase
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
  private ready: boolean = false;
  private basePath:string = '/uploads';

  constructor(
    private windowService: WindowService,
    private dataService: DataService,
    private db: AngularFireDatabase) { }

  ngOnInit() {
    this.mobileWidth = MOBILE_WIDTH;

    var id = String(localStorage.getItem('item' + this.item.id));
    if(id != null) {
      const ref = firebase.database().ref(`${this.basePath}/${id}`)
        .once('value').then(snapshot => {
          this.item.imageSrc = snapshot.node_.children_.root_.value.value_;
          this.ready = true;
        }).catch(e => {
          console.log("ERROR ACCESSING IMAGE: ", e);
          this.ready = true;
        });
    }
  }
}

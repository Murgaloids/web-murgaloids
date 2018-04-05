import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { Item } from '../shared/models/item.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  item: Item = new Item();
  ready: boolean = false;
  basePath:string = '/uploads';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.getItemObservable(+params['id']).subscribe(item => {
        var id = localStorage.getItem('item' + item.id);
        const ref = firebase.database().ref(`${this.basePath}/${id}`)
          .once('value').then(snapshot => {
            this.item = this.dataService.buildItem(item);
            this.item.imageSrc = snapshot.node_.children_.root_.value.value_;
            this.ready = true;
          });
      });
    });
  }
}

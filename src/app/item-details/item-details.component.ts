import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//services
import { DataService } from '../shared/services/data.service';
//models
import { Item } from '../shared/models/item.model';
//firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  private item: Item = new Item();
  private ready: boolean = false;
  private basePath:string = '/uploads';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.getItemObservable(+params['id']).subscribe(item => {
        if(item != null) { //added for the dummy items
          var id = localStorage.getItem('item' + item.id);
          const ref = firebase.database().ref(`${this.basePath}/${id}`)
            .once('value').then(snapshot => {
              this.item = this.dataService.buildItem(item);
              this.item.imageSrc = snapshot.node_.children_.root_.value.value_;
              this.ready = true;
            }).catch(e => {
              console.log("ERROR ACCESSING IMAGE: ", e);
              this.ready = true;
            });
        }
      });
    });
  }
}

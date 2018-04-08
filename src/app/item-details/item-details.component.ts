import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//services
import { DataService } from '../shared/services/data.service';
//models
import { Item } from '../shared/models/item.model';
//firebase
import { AngularFireDatabase } from 'angularfire2/database';
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
    // AngularFireDatabase import is needed for context, errors without
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      // backend returns an observable with which we build the item, see data service
      this.dataService.getItemObservable(+params['id']).subscribe(item => {
        if(item != null) { //added for the dummy items
          // get the item image id, this will change when image id is added to database/backend
          var id = localStorage.getItem('item' + item.id);
          // make a request to firebase for the item's image source using its image id
          const ref = firebase.database().ref(`${this.basePath}/${id}`)
            .once('value').then(snapshot => {
              // once the image source is retrieved, build the item
              this.item = this.dataService.buildItem(item);
              // firebase returns a Reference snapshot, call
              // getItemImageSource to parse out the image source and set it
              this.getItemImageSource(snapshot);
              // this component is now ready to be rendered
              this.ready = true;
            }).catch(e => {
              console.log("ERROR ACCESSING IMAGE: ", e);
              this.ready = true;
            });
        }
      });
    });
  }

  private getItemImageSource(snapshot:any):void {
    this.item.imageSrc = snapshot.node_.children_.root_.value.value_;
  }
}

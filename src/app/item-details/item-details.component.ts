import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { Item } from '../shared/models/item.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  providers: [DataService]
})
export class ItemDetailsComponent implements OnInit, OnDestroy {

  itemId: number;
  item: Item;
  sub: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.itemId = +params['id'];
      this.item = this.dataService.getItemById(this.itemId);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

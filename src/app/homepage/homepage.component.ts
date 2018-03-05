import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Item } from '../shared/models/item.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  recentItemsForSale: Item[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.recentItemsForSale = this.dataService.getRecentItemsForSale();
  }
}

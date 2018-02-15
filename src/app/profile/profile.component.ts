import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { User } from '../shared/models/user.model';
import { Item } from '../shared/models/item.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: number;
  userName: string;
  userAbout: string;
  userItemsForSale: Item[];
  userItemsViewed: Item[];
  userImageSrc: string;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.id = 12345678;
    this.userName = this.dataService.getUserName(this.id);
    this.userAbout = this.dataService.getUserAbout(this.id);
    this.userItemsForSale = this.dataService.getUserItemsForSale(this.id);
    this.userItemsViewed = this.dataService.getUserItemsViewed(this.id);
    this.userImageSrc = this.dataService.getUserImageSrc(this.id);
  }

}

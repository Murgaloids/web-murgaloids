import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../shared/services/items.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  public ready: boolean;

  constructor(
    private route: ActivatedRoute,
    public itemsService: ItemsService,
    private titleService: Title
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemsService.setSearchedItemsByQuery(params['query'])
        .then(() => this.ready = true);
    });

    this.titleService.setTitle('beachshop | Search Results');
  }
}

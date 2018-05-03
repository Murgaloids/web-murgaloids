import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../shared/services/items.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  public ready: boolean;

  constructor(
    private route: ActivatedRoute,
    public itemsService: ItemsService
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemsService.setSearchedItemsByQuery(params['query'])
        .then(() => this.ready = true);
    });
  }
}

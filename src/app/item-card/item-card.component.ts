import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

  @Input() itemName: string;
  @Input() itemAbout: string;
  @Input() itemRating: number;
  @Input() itemPrice: number;
  @Input() itemImageSrc: string;

}

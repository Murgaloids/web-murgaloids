import { Item } from './item.model';

export class User {
  userId: number;
  userName: string;
  userAbout: string;
  userItemsForSale: Item[];
  userItemsViewed: Item[];
  userImageSrc: string;
}

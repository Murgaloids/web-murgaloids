import { Item } from './item.model';

export class Student {
  id: number;
  name: string;
  aboutDesc: string;
  profilePicture: string;
  itemsForSale: Item[];
  itemsSold: Item[];
  itemsViewed: Item[];
  imageSource: string;

  public constructor(init?:Partial<Student>) {
    Object.assign(this, init);
  }
}

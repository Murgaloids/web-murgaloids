import { Item } from './item.model';

export class Student {
  id: number;
  name: string;
  aboutDesc: string;
  profilePicture: string;
  itemsForSale: Item[];
  itemsViewed: Item[];

  public constructor(init?:Partial<Student>) {
    Object.assign(this, init);
  }
}

export class Item {
  public id: number;
  public name: string;
  public seller: number;
  public conditionType: number;
  public categoryType: number;
  public aboutDesc: string;
  public price: number;
  public isItemSold: number;
  public rating: number;
  public imageSrc: string;

  public constructor(init?:Partial<Item>) {
    Object.assign(this, init);
  }
}

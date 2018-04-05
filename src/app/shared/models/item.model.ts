export class Item {
  public id: number;
  public itemName: string;
  public sellerId: number;
  public conditionTypeId: number;
  public categoryTypeId: number;
  public description: string;
  public price: number;
  public itemSold: boolean;
  public rating: number;
  public imageSrc: any;

  public constructor(init?:Partial<Item>) {
    Object.assign(this, init);
  }
}

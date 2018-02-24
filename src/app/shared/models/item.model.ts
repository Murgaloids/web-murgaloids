export class Item {
  public id: number;
  public name: string;
  public aboutDesc: string;
  public rating: number;
  public price: number;
  public imageSrc: string;

  public constructor(init?:Partial<Item>) {
    Object.assign(this, init);
  }
}

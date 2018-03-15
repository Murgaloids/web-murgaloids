import { Student } from '../models/student.model';
import { Item } from '../models/item.model';

export class DummyDataService {
  dummyUser: Student;
  dummyItems: Item[];

  constructor() {
    let dummyItem1 = new Item({
      id: 1,
      itemName: 'Laptop',
      description: 'About the laptop.',
      rating: 5.0,
      price: 1000.00,
      imageSrc: 'https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/T/V9/TV901/TV901_AV1?wid=1000&hei=1000&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1465509119024'
    });

    let dummyItem2 = new Item({
      id: 2,
      itemName: 'Watch',
      description: 'About the watch.',
      rating: 4.0,
      price: 100.00,
      imageSrc: 'https://www.obaku.com/content/collection/V213GUCURZ.jpg'
    });

    let dummyItem3 = new Item({
      id: 3,
      itemName: 'Textbook',
      description: 'About the textbook.',
      rating: 3.0,
      price: 50.00,
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNKRtgGPWEqw9T5cETltCf8IVKcrtoCNPlJiW12-3EjNIXmo'
    });

    let dummyItem4 = new Item({
      id: 4,
      itemName: 'iClicker',
      description: 'About the iClicker',
      rating: 2.0,
      price: 25.00,
      imageSrc: 'https://www.umsl.edu/technology/frc/images/student-iclicker.png'
    });

    let dummyItem5 = new Item({
      id: 5,
      itemName: 'Calculator',
      description: 'About the calculator.',
      rating: 5.0,
      price: 5.00,
      imageSrc: 'https://www.goodsamaritan.ms/uploads/1/2/7/7/12777965/s736176615899143325_p466_i1_w1200.jpeg'
    });

    let dummyItem6 = new Item({
      id: 6,
      itemName: 'Pencils',
      description: 'About the pencils.',
      rating: 4.0,
      price: 1.00,
      imageSrc: 'http://www.hobbycraft.co.uk/supplyimages/597152_1000_1_800.jpg'
    });

    let dummyItem7 = new Item({
      id: 7,
      itemName: 'Backpack',
      description: 'About the backpack description',
      rating: 2.0,
      price: 40.00,
      imageSrc: 'https://i5.walmartimages.com/asr/1afc32ce-b86e-4545-aae8-fe0fb6d1dd6c_1.1123d86c3a7f30ef2dcebb1582a1dc4f.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'
    });

    let dummyItem8 = new Item({
      id: 8,
      itemName: 'Skateboard',
      description: 'About the skateboard.',
      rating: 5.0,
      price: 120.00,
      imageSrc: 'https://gloimg.gbtcdn.com/gb/pdm-product-pic/Electronic/2017/07/18/goods-img/1500610680603760593.jpg'
    });

    let dummyUserItemsForSale = [];
    dummyUserItemsForSale.push(dummyItem1);
    dummyUserItemsForSale.push(dummyItem2);
    dummyUserItemsForSale.push(dummyItem3);
    dummyUserItemsForSale.push(dummyItem4);

    let dummyUserItemsViewed = [];
    dummyUserItemsViewed.push(dummyItem5);
    dummyUserItemsViewed.push(dummyItem6);
    dummyUserItemsViewed.push(dummyItem7);
    dummyUserItemsViewed.push(dummyItem8);

    this.dummyItems = [];
    this.dummyItems.push(dummyItem1);
    this.dummyItems.push(dummyItem2);
    this.dummyItems.push(dummyItem3);
    this.dummyItems.push(dummyItem4);
    this.dummyItems.push(dummyItem5);
    this.dummyItems.push(dummyItem6);
    this.dummyItems.push(dummyItem7);
    this.dummyItems.push(dummyItem8);

    this.dummyUser = new Student({
      id: 12345678,
      name: 'Derrick',
      aboutDesc: `
        Hi! I'm Derrick. I'm a computer science major at CSULB and I
        have lots of stuff to sell! For now this is just a hard
        coded bio, but eventually you'll be reading this bio after
        it's retreived from a data base!`,
        profilePicture: 'https://avatars0.githubusercontent.com/u/10682341?s=400&v=4',
        itemsForSale: dummyUserItemsForSale,
        itemsViewed: dummyUserItemsViewed
    });
  }

  getDummyUser(userId: number): Student {
    return (userId === this.dummyUser.id) ? this.dummyUser : null;
  }

  getDummyItemById(id: number): Item {
    return this.dummyItems.find(item => item.id === id);
  }

  getRecentItemsForSale() {
    return this.dummyItems.slice(0, 8);
  }
}

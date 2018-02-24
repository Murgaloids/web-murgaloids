import { Student } from '../models/student.model';
import { Item } from '../models/item.model';

export class DummyDataService {
  dummyUser: Student;
  dummyItems: Item[];

  constructor() {
    let dummyItem1 = new Item();
    dummyItem1.id = 1;
    dummyItem1.name = 'Laptop';
    dummyItem1.aboutDesc = 'About the laptop.';
    dummyItem1.rating = 5.0;
    dummyItem1.price = 1000.00;
    dummyItem1.imageSrc = 'https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/T/V9/TV901/TV901_AV1?wid=1000&hei=1000&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1465509119024';

    let dummyItem2 = new Item();
    dummyItem2.id = 2;
    dummyItem2.name = 'Watch';
    dummyItem2.aboutDesc = 'About the watch.';
    dummyItem2.rating = 4.0;
    dummyItem2.price = 100.00;
    dummyItem2.imageSrc = 'https://www.obaku.com/content/collection/V213GUCURZ.jpg';

    let dummyItem3 = new Item();
    dummyItem3.id = 3;
    dummyItem3.name = 'Textbook';
    dummyItem3.aboutDesc = 'About the textbook.';
    dummyItem3.rating = 3.0;
    dummyItem3.price = 50.00;
    dummyItem3.imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNKRtgGPWEqw9T5cETltCf8IVKcrtoCNPlJiW12-3EjNIXmo';

    let dummyItem4 = new Item();
    dummyItem4.id = 4;
    dummyItem4.name = 'iClicker';
    dummyItem4.aboutDesc = 'About the iClicker.';
    dummyItem4.rating = 2.0;
    dummyItem4.price = 25.00;
    dummyItem4.imageSrc = 'https://www.umsl.edu/technology/frc/images/student-iclicker.png';

    let dummyItem5 = new Item();
    dummyItem5.id = 5;
    dummyItem5.name = 'Calculator';
    dummyItem5.aboutDesc = 'About the calculator.';
    dummyItem5.rating = 5.0;
    dummyItem5.price = 5.00;
    dummyItem5.imageSrc = 'https://www.goodsamaritan.ms/uploads/1/2/7/7/12777965/s736176615899143325_p466_i1_w1200.jpeg';

    let dummyItem6 = new Item();
    dummyItem6.id = 6;
    dummyItem6.name = 'Pencils';
    dummyItem6.aboutDesc = 'About the pencils.';
    dummyItem6.rating = 4.0;
    dummyItem6.price = 1.00;
    dummyItem6.imageSrc = 'http://www.hobbycraft.co.uk/supplyimages/597152_1000_1_800.jpg';

    let dummyItem7 = new Item();
    dummyItem7.id = 7;
    dummyItem7.name = 'Backpack';
    dummyItem7.aboutDesc = 'About the backpack description.';
    dummyItem7.rating = 2.0;
    dummyItem7.price = 40.00;
    dummyItem7.imageSrc = 'https://i5.walmartimages.com/asr/1afc32ce-b86e-4545-aae8-fe0fb6d1dd6c_1.1123d86c3a7f30ef2dcebb1582a1dc4f.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF';

    let dummyItem8 = new Item();
    dummyItem8.id = 8;
    dummyItem8.name = 'Skateboard';
    dummyItem8.aboutDesc = 'About the skateboard.';
    dummyItem8.rating = 5.0;
    dummyItem8.price = 120.00;
    dummyItem8.imageSrc = 'https://gloimg.gbtcdn.com/gb/pdm-product-pic/Electronic/2017/07/18/goods-img/1500610680603760593.jpg';

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

    this.dummyUser = new Student();
    this.dummyUser.id = 12345678;
    this.dummyUser.name = 'Derrick';
    this.dummyUser.aboutDesc =
    `
        Hi! I'm Derrick. I'm a computer science major at CSULB and I
        have lots of stuff to sell! For now this is just a hard
        coded bio, but eventually you'll be reading this bio after
        it's retreived from a data base!
    `;
    this.dummyUser.itemsForSale = dummyUserItemsForSale;
    this.dummyUser.itemsViewed = dummyUserItemsViewed;
    this.dummyUser.profilePicture = 'https://avatars0.githubusercontent.com/u/10682341?s=400&v=4';
  }

  getDummyUser(userId: number): Student {
    if(userId == this.dummyUser.id) {
      return this.dummyUser;
    } else {
      return null;
    }
  }

  getDummyItemById(id: number): Item {
    var dummyItemById;
     this.dummyItems.forEach(dummyItem => {
       if(dummyItem.id == id) {
         dummyItemById = dummyItem;
       }
    });
    return dummyItemById;
  }
}

import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Item } from '../models/item.model';

@Injectable()
export class DummyDataService {

  dummyUser: User;

  constructor() {
    let dummyItem1 = new Item();
    dummyItem1.itemName = 'Laptop';
    dummyItem1.itemAbout = 'About the laptop.';
    dummyItem1.itemRating = 5.0;
    dummyItem1.itemPrice = 1000.00;
    dummyItem1.itemImageSrc = 'https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/T/V9/TV901/TV901_AV1?wid=1000&hei=1000&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1465509119024';

    let dummyItem2 = new Item();
    dummyItem2.itemName = 'Watch';
    dummyItem2.itemAbout = 'About the watch.';
    dummyItem2.itemRating = 4.0;
    dummyItem2.itemPrice = 100.00;
    dummyItem2.itemImageSrc = 'https://www.obaku.com/content/collection/V213GUCURZ.jpg';

    let dummyItem3 = new Item();
    dummyItem3.itemName = 'Textbook';
    dummyItem3.itemAbout = 'About the textbook.';
    dummyItem3.itemRating = 3.0;
    dummyItem3.itemPrice = 50.00;
    dummyItem3.itemImageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNKRtgGPWEqw9T5cETltCf8IVKcrtoCNPlJiW12-3EjNIXmo';

    let dummyItem4 = new Item();
    dummyItem4.itemName = 'iClicker';
    dummyItem4.itemAbout = 'About the iClicker.';
    dummyItem4.itemRating = 2.0;
    dummyItem4.itemPrice = 25.00;
    dummyItem4.itemImageSrc = 'https://www.umsl.edu/technology/frc/images/student-iclicker.png';

    let dummyItem5 = new Item();
    dummyItem5.itemName = 'Calculator';
    dummyItem5.itemAbout = 'About the calculator.';
    dummyItem5.itemRating = 5.0;
    dummyItem5.itemPrice = 5.00;
    dummyItem5.itemImageSrc = 'https://www.goodsamaritan.ms/uploads/1/2/7/7/12777965/s736176615899143325_p466_i1_w1200.jpeg';

    let dummyItem6 = new Item();
    dummyItem6.itemName = 'Pencils';
    dummyItem6.itemAbout = 'About the pencils.';
    dummyItem6.itemRating = 4.0;
    dummyItem6.itemPrice = 1.00;
    dummyItem6.itemImageSrc = 'http://www.hobbycraft.co.uk/supplyimages/597152_1000_1_800.jpg';

    let dummyItem7 = new Item();
    dummyItem7.itemName = 'Backpack';
    dummyItem7.itemAbout = 'About the backpack description.';
    dummyItem7.itemRating = 2.0;
    dummyItem7.itemPrice = 40.00;
    dummyItem7.itemImageSrc = 'https://i5.walmartimages.com/asr/1afc32ce-b86e-4545-aae8-fe0fb6d1dd6c_1.1123d86c3a7f30ef2dcebb1582a1dc4f.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF';

    let dummyItem8 = new Item();
    dummyItem8.itemName = 'Skateboard';
    dummyItem8.itemAbout = 'About the skateboard.';
    dummyItem8.itemRating = 5.0;
    dummyItem8.itemPrice = 120.00;
    dummyItem8.itemImageSrc = 'https://gloimg.gbtcdn.com/gb/pdm-product-pic/Electronic/2017/07/18/goods-img/1500610680603760593.jpg';

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

    this.dummyUser = new User();
    this.dummyUser.userId = 12345678;
    this.dummyUser.userName = 'Derrick';
    this.dummyUser.userAbout =
    `
        Hi! I'm Derrick. I'm a computer science major at CSULB and I
        have lots of stuff to sell! For now this is just a hard
        coded bio, but eventually you'll be reading this bio after
        it's retreived from a data base!
    `;
    this.dummyUser.userItemsForSale = dummyUserItemsForSale;
    this.dummyUser.userItemsViewed = dummyUserItemsViewed;
    this.dummyUser.userImageSrc = 'https://avatars0.githubusercontent.com/u/10682341?s=400&v=4';
  }

  getDummyUser(userId: number): User {
    if(userId == this.dummyUser.userId) {
      return this.dummyUser;
    } else {
      return null;
    }
  }

  getDummyUserName(userId: number): string {2
    if(userId == this.dummyUser.userId) {
      return this.dummyUser.userName;
    } else {
      return null;
    }
  }

  getDummyUserAbout(userId: number): string {
    if(userId == this.dummyUser.userId) {
      return this.dummyUser.userAbout;
    } else {
      return null;
    }
  }

  getDummyUserItemsForSale(userId: number):Item[] {
    if(userId == this.dummyUser.userId) {
      return this.dummyUser.userItemsForSale;
    } else {
      return null;
    }
  }

  getDummyUserItemsViewed(userId: number):Item[] {
    if(userId == this.dummyUser.userId) {
      return this.dummyUser.userItemsViewed;
    } else {
      return null;
    }
  }

  getDummyUserImageSrc(userId: number): string {
    if(userId == this.dummyUser.userId) {
      return this.dummyUser.userImageSrc;
    } else {
      return null;
    }
  }

}

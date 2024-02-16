import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';
import { ItemsService } from '../../services/items.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ChangeDetectorRef } from '@angular/core';
import { LoginModalPage } from '../login-modal/login-modal.page';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  outletDetails: any;
  outlets2: any;
  selectedOutlet: any;
  selectedOutletFromPrevPage: any;
  item2: any;
  imageEndPoint: any;
  originalFoodItems: any;
  indexValue: number;
  selectedOutletForSegment: string;
  foodItems: any;
  outletItemSubmenuInformation: any = [];
  searchText: any;
  automatiClose: boolean = true;
  cartAmount: number = 0;
  cartItems: any = [];
  orderValue: number = 0;
  orderDiscountValue: number = 0;
  itemCountDetails: number = 0;
  showItemPage: boolean = true;
  address: string;
  mallName: string;
  dinningValue: any;
  constructor(private route: ActivatedRoute,
    private utilitiesService: UtilitiesService,
    private itemsService: ItemsService,
    private alertController: AlertController,
    private changeRef: ChangeDetectorRef,
    private router: Router,
    private modalController: ModalController,
    private storage: Storage) {
    this.imageEndPoint = this.utilitiesService.imageEndPoint;
    this.utilitiesService.changeItemsPage.subscribe(dataValueDetails => {
      console.log(dataValueDetails)
      this.loadingData();
    })

  }

  ngDoCheck() {
    this.itemCountDetails = 0;
    this.orderValue = 0;
    this.cartItems = this.utilitiesService.cartData;
    if (this.cartItems.length > 0) {
      for (var i = 0; i < this.cartItems.length; i++) {
        this.itemCountDetails = this.itemCountDetails + this.cartItems[i].givenQuantity;
        this.orderValue = this.orderValue + (this.cartItems[i].givenQuantity * this.cartItems[i].discountedPrice);
      }
    }
    //this.item2 = this.getItems(this.utilitiesService.extractRelationPath(this.selectedOutlet.links, "inventory"));
  }

  ngOnInit() {

    this.loadingData();
    this.storage.get('TYPEOFDINING').then(dinningType => {
      this.dinningValue = dinningType;
    })

  }


  ngAfterContentInit() {
    console.log('sdfjkhsdfkjhsdfjlsdfj');
    // this.storage.get("VIEWCARTCOUNT").then(dataCount=>{
    //   if(dataCount!=2){
    //     this.item2 = this.getItems(this.utilitiesService.extractRelationPath(this.selectedOutlet.links, "inventory"));
    //     this.storage.set("VIEWCARTCOUNT",1)
    //   }
    // })

  }
  // ionViewWillEnter(){
  //   console.log("dkgskhfsdjkfhkshdfhksjfjh");
  //   this.storage.get("VIEWCARTCOUNT").then(countNumber=>{
  //     if(countNumber>1){
  //     }else{
  //       this.loadingData();
  //       this.storage.set("VIEWCARTCOUNT",1);
  //     }
  //   });
  // }

  loadingData() {
    let outletDetailData = this.utilitiesService.getOutletDetails;
    this.outletDetails = outletDetailData;
    console.log(this.outletDetails);
    this.mallName = this.outletDetails.name;
    this.address = this.outletDetails.address.line2;
    this.getOutletsDetails(this.outletDetails);
    this.cartItems = this.utilitiesService.cartData;
    console.log(this.cartItems);

  }


  goToBack() {
    this.router.navigate(['dashboard']);
  }

  getOutletsDetails(outletDetails) {
    this.showItemPage = false
    this.itemsService.getOutlets(outletDetails).subscribe(data2 => {
      this.outlets2 = data2;
      this.utilitiesService.setOutletsData(this.outlets2);
      console.log('Outlets2 :', this.outlets2);
      this.indexValue = 0;
      this.selectedOutlet = this.selectedOutletFromPrevPage ? this.outlets2.find((element) => {
        return element.id === this.selectedOutletFromPrevPage.id
      }) : this.outlets2[0];
      if (this.selectedOutlet) {
        console.log(this.selectedOutlet);
        this.showItemPage = true;
        this.item2 = this.getItems(this.utilitiesService.extractRelationPath(this.selectedOutlet.links, "inventory"));

      }
    })
  }
  getItems(itemLink) {
    this.itemCountDetails = 0;
    this.orderValue = 0;
    this.showItemPage = false;
    this.itemsService.getItems(itemLink).subscribe(
      data => {
        this.originalFoodItems = data;
        this.originalFoodItems.menus[0].subMenuValue = [];
        let counterValue = 0;
        for (var i = 0; i < this.originalFoodItems.menus[0].subMenus.length; i++) {
          console.log(this.originalFoodItems.menus[0].subMenus[i]);
          if (this.originalFoodItems.menus[0].subMenus[i].items.length > 0) {
            this.originalFoodItems.menus[0].subMenuValue[counterValue] = this.originalFoodItems.menus[0].subMenus[i];
            counterValue++;
          }
        }
        this.originalFoodItems.menus[0].subMenus = this.originalFoodItems.menus[0].subMenuValue;
        this.outletItemSubmenuInformation = this.originalFoodItems.menus[0].subMenus;
        this.outletItemSubmenuInformation[0].open = true;
        let submenuItemDetails = this.originalFoodItems.menus[0].subMenus.map(subMenuData => {
          return subMenuData.items.map(itemData => {
            itemData.givenQuantity = 0;
            return itemData;
          });
        })
        console.log(this.cartItems);
        if (this.cartItems.length > 0) {
          for (var i = 0; i < submenuItemDetails.length; i++) {
            for (var j = 0; j < submenuItemDetails[i].length; j++) {
              for (var k = 0; k < this.cartItems.length; k++) {
                if (submenuItemDetails[i][j].id == this.cartItems[k].id) {
                  submenuItemDetails[i][j].givenQuantity = this.cartItems[k].givenQuantity;
                  //this.itemCountDetails = this.itemCountDetails + this.cartItems[k].givenQuantity;
                }
              }
            }
          }
          for (var i = 0; i < this.cartItems.length; i++) {
            this.itemCountDetails = this.itemCountDetails + this.cartItems[i].givenQuantity;
            this.orderValue = this.orderValue + (this.cartItems[i].givenQuantity * this.cartItems[i].discountedPrice);
          }
        }
        console.log(this.orderValue);
        let submenuItemAddedQuantity = this.originalFoodItems.menus[0].subMenus.map((addedmenuItem, index) => {
          console.log(index);
          addedmenuItem.items = [];
          addedmenuItem.items = submenuItemDetails[index];
          return addedmenuItem;
        });
        console.log(submenuItemAddedQuantity);
        this.showItemPage = true
        //   this.foodItems = Object.assign({}, data);
        //  let dataDetails=[]
        // this.foodItems.menus.forEach(element => {
        //     element.subMenus.forEach(element => {
        //       if(element.items.length>0)
        //       dataDetails.push(element);
        //     });
        // });
        // dataDetails.forEach(itemlist=>{ 
        //   let availableItem=[];
        //   let nonAvailableItem=[];
        //   itemlist.items.forEach(item=>{ 
        //     if(item.availability.available){
        //       availableItem.push(item)
        //     }else{
        //       nonAvailableItem.push(item)
        //     }
        //   })
        //   itemlist.items=availableItem.concat(nonAvailableItem)
        // })
        // var subMenuList= {subMenus:dataDetails}
        // this.foodItems.menus.length=0;
        // this.foodItems.menus[0]=subMenuList;
        //   console.log(' this.foodItems ', this.foodItems);
        // this.foodItems = this.foodItems.menus[0].subMenus.map((subMenu)=>{
        //   console.log(subMenu);
        //   subMenu.items.sort(function(a,b){
        //     return  a.availability.available-b.availability.available
        //   }

        //   )
        // })       
      });
  }

  toggleSection(index) {
    this.outletItemSubmenuInformation[index].open = !this.outletItemSubmenuInformation[index].open;
    if (this.automatiClose && this.outletItemSubmenuInformation[index].open) {
      this.outletItemSubmenuInformation
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => item.open = false);
    }
  }

  toggleItem(index, childIndex) {
    this.outletItemSubmenuInformation[index].items[childIndex].open = !this.outletItemSubmenuInformation[index].items[childIndex].open;
  }

  async addItem(itemDetails) {
    //if(itemDetails.mallId == )
    if (this.cartItems.length > 0) {
      if (this.outletItemSubmenuInformation[0].mallId != this.cartItems[0].mallId) {
        const alert = await this.alertController.create({
          header: 'Venue Change',
          subHeader: 'Cart already has items from other venue. Do you want to change?',
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {

                //   this.itemCountDetails = 0;
                //   itemDetails.givenQuantity = itemDetails.givenQuantity + 1;
                //   this.orderValue = this.orderValue + (itemDetails.givenQuantity * itemDetails.discountedPrice);
                //   if (itemDetails.discount > 0) {
                //     this.orderDiscountValue = this.orderDiscountValue + (itemDetails.givenQuantity * itemDetails.price);
                //   }
                //   itemDetails.outletId = this.selectedOutlet.id;
                //   itemDetails.outletImg = this.selectedOutlet.img;
                //   itemDetails.outletName = this.selectedOutlet.name;
                //   itemDetails.outletavailability = this.selectedOutlet.availability;
                //   itemDetails.mallAddress = this.outletDetails.address;
                //   itemDetails.mallId = this.outletDetails.id;
                //   itemDetails.mallName = this.outletDetails.name;
                //   this.cartItems.push(itemDetails);
                //   this.setDataForOrders();

                //   for (var i = 0; i < this.cartItems.length; i++) {
                //     this.itemCountDetails = this.itemCountDetails + this.cartItems[i].givenQuantity;
                //   }

                // }
              }
            },
            {
              text: "Proceed",
              handler: () => {
                this.cartItems = [];
                this.orderValue = 0;
                this.utilitiesService.cartSetData(this.cartItems);

                this.itemCountDetails = 0;
                itemDetails.givenQuantity = itemDetails.givenQuantity + 1;
                this.orderValue = this.orderValue + (itemDetails.givenQuantity * itemDetails.discountedPrice);
                if (itemDetails.discount > 0) {
                  this.orderDiscountValue = this.orderDiscountValue + (itemDetails.givenQuantity * itemDetails.price);
                }
                itemDetails.outletId = this.selectedOutlet.id;
                itemDetails.outletImg = this.selectedOutlet.img;
                itemDetails.outletName = this.selectedOutlet.name;
                itemDetails.outletavailability = this.selectedOutlet.availability;
                itemDetails.mallAddress = this.outletDetails.address;
                itemDetails.mallId = this.outletDetails.id;
                itemDetails.mallName = this.outletDetails.name;
                this.cartItems.push(itemDetails);
                this.setDataForOrders();

                for (var i = 0; i < this.cartItems.length; i++) {
                  this.itemCountDetails = this.itemCountDetails + this.cartItems[i].givenQuantity;
                }

              }
            }
          ]
        });
        await alert.present();
      } else {

        this.itemCountDetails = 0;
        itemDetails.givenQuantity = itemDetails.givenQuantity + 1;
        this.orderValue = this.orderValue + (itemDetails.givenQuantity * itemDetails.discountedPrice);
        if (itemDetails.discount > 0) {
          this.orderDiscountValue = this.orderDiscountValue + (itemDetails.givenQuantity * itemDetails.price);
        }
        itemDetails.outletId = this.selectedOutlet.id;
        itemDetails.outletImg = this.selectedOutlet.img;
        itemDetails.outletName = this.selectedOutlet.name;
        itemDetails.outletavailability = this.selectedOutlet.availability;
        itemDetails.mallAddress = this.outletDetails.address;
        itemDetails.mallId = this.outletDetails.id;
        itemDetails.mallName = this.outletDetails.name;
        this.cartItems.push(itemDetails);
        this.setDataForOrders();

        for (var i = 0; i < this.cartItems.length; i++) {
          this.itemCountDetails = this.itemCountDetails + this.cartItems[i].givenQuantity;
        }

      }
    } else {
      this.itemCountDetails = 0;
      itemDetails.givenQuantity = itemDetails.givenQuantity + 1;
      this.orderValue = this.orderValue + (itemDetails.givenQuantity * itemDetails.discountedPrice);
      if (itemDetails.discount > 0) {
        this.orderDiscountValue = this.orderDiscountValue + (itemDetails.givenQuantity * itemDetails.price);
      }
      itemDetails.outletId = this.selectedOutlet.id;
      itemDetails.outletImg = this.selectedOutlet.img;
      itemDetails.outletName = this.selectedOutlet.name;
      itemDetails.outletavailability = this.selectedOutlet.availability;
      itemDetails.mallAddress = this.outletDetails.address;
      itemDetails.mallId = this.outletDetails.id;
      itemDetails.mallName = this.outletDetails.name;
      this.cartItems.push(itemDetails);
      this.setDataForOrders();

      for (var i = 0; i < this.cartItems.length; i++) {
        this.itemCountDetails = this.itemCountDetails + this.cartItems[i].givenQuantity;
      }
    }


  }

  incrementItem(itemDetails) {
    if (itemDetails.givenQuantity >= 50) {
      this.utilitiesService.toastFunction("Can't select more 50 quantity per item.");
    } else {
      this.itemCountDetails = 0;
      itemDetails.givenQuantity = itemDetails.givenQuantity + 1;
      var count = 0;
      var itemIndexValue;
      for (var i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].id == itemDetails.id) {
          count = 1;
          itemIndexValue = i;
        }
      }
      if (count == 1) {
        this.cartItems[itemIndexValue].givenQuantity = itemDetails.givenQuantity;
        this.orderValue = this.orderValue + itemDetails.discountedPrice;
        if (itemDetails.discount > 0) {
          this.orderDiscountValue = this.orderDiscountValue + itemDetails.price;
        }
      } else {
        itemDetails.outletId = this.selectedOutlet.id;
        itemDetails.outletImg = this.selectedOutlet.img;
        itemDetails.outletName = this.selectedOutlet.name;
        itemDetails.outletavailability = this.selectedOutlet.availability;
        itemDetails.mallAddress = this.outletDetails.address;
        itemDetails.mallId = this.outletDetails.id;
        itemDetails.mallName = this.outletDetails.name;
        this.cartItems.push(itemDetails);

      }
      for (var i = 0; i < this.cartItems.length; i++) {
        this.itemCountDetails = this.itemCountDetails + this.cartItems[i].givenQuantity;
      }
      this.setDataForOrders();
      console.log(this.cartItems);
      console.log(this.orderValue);
      console.log(this.orderDiscountValue);
    }

  }

  decrementItem(itemDetails) {
    this.itemCountDetails = 0;
    itemDetails.givenQuantity = itemDetails.givenQuantity - 1;
    if (itemDetails.givenQuantity > 0) {
      for (var i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].id == itemDetails.id) {
          this.cartItems[i].givenQuantity = itemDetails.givenQuantity;
          this.orderValue = this.orderValue - itemDetails.discountedPrice;
          if (itemDetails.discount > 0) {
            this.orderDiscountValue = this.orderDiscountValue - itemDetails.price;
          }
        }
      }
    } else {
      for (var i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].id == itemDetails.id) {
          this.cartItems[i].givenQuantity = itemDetails.givenQuantity;
          this.orderValue = this.orderValue - itemDetails.discountedPrice;
          if (itemDetails.discount > 0) {
            this.orderDiscountValue = this.orderDiscountValue - itemDetails.price;
          }
          this.cartItems.splice(i, 1);
        }
      }
    }
    for (var i = 0; i < this.cartItems.length; i++) {
      this.itemCountDetails = this.itemCountDetails + this.cartItems[i].givenQuantity;
      this.storage.set("ITEMSCOUNT", this.itemCountDetails);
    }
    console.log(this.cartItems);
    console.log(this.orderValue);
    console.log(this.orderDiscountValue);
    if (this.cartItems.length > 0) {
      this.setDataForOrders();
    } else {
      this.storage.set("ITEMSCOUNT", 0);
      this.storage.set("ITEMSINCART", []);
      this.storage.set("CARTITEMS", {});
    }
  }
  selectOutlet(outlet) {

    this.selectedOutlet = outlet;
    this.searchText = '';
    this.getItems(this.utilitiesService.extractRelationPath(this.selectedOutlet.links, "inventory"));
    //this.scrollToTop();

  }
  // scrollToTop(): void {
  //   this.content.scrollToTop(750);
  // }

  setDataForOrders() {
    this.utilitiesService.cartSetData(this.cartItems);
    this.storage.set("ITEMSINCART", this.cartItems);
    this.utilitiesService.setCartOutletsData(this.outlets2);
    this.storage.set("SETCARTOUTLET", this.outlets2);
    let uniqueAddresses = Array.from(new Set(this.cartItems.map(a => a.outletId)))
      .map(id => {
        return this.cartItems.find(a => a.outletId === id)
      });
    var orders = [];
    var orderlets = [];
    for (var i = 0; i < uniqueAddresses.length; i++) {
      for (var j = 0; j < this.outlets2.length; j++) {
        if (uniqueAddresses[i].outletId == this.outlets2[j].id) {
          orders.push({
            "name": uniqueAddresses[i].outletName,
            "outletId": uniqueAddresses[i].outletId,
            "outletImg": uniqueAddresses[i].outletImg,
            "mallName": uniqueAddresses[i].mallName,
            "gst": this.outlets2[j].cgst
          })
        }
      }
    }
    console.log(orders)
    for (var i = 0; i < uniqueAddresses.length; i++) {
      orderlets = [];
      for (var j = 0; j < this.cartItems.length; j++) {
        if (this.cartItems[j].outletId == uniqueAddresses[i].outletId) {
          orderlets.push({
            "itemId": this.cartItems[j].id,
            "name": this.cartItems[j].name,
            "price": this.cartItems[j].price,
            "quantity": this.cartItems[j].givenQuantity,
            "customization": [],
            "discountPrice": this.cartItems[j].discountedPrice
          })
        }
      }
      orders[i].orderlets = orderlets;
    }
    var noOfItems = 0
    for (var i = 0; i < orders.length; i++) {
      for (var j = 0; j < orders[i].orderlets.length; j++) {
        noOfItems = noOfItems + orders[i].orderlets[j].quantity;
      }
    }
    this.storage.set("ITEMSCOUNT", noOfItems);
    var itemDetails = {
      "mallId": this.cartItems[0].mallId,
      "saved": false,
      "orders": orders,
      "packagingChargeStr": "No",
      "specialInstructions": "",
      "orderType": "Pickup",
      "dinningType": this.dinningValue
    }
    this.utilitiesService.setCartViewData(itemDetails);
    this.storage.set("CARTITEMS", itemDetails);
  }

  viewCart() {
    this.storage.get("LOGIN").then(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['view-cart']);
      } else {
        this.presentModal();
      }
    })
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginModalPage, cssClass: "modal-halfscreen"
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (!data) {

    } else {
      this.router.navigate(['view-cart']);
    }

  }
}

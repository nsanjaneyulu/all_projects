import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category';
import { CategoryItem } from '../category-item';
import { OrderItemService } from '../order-item.service';
import { MenuService } from '../menu.service';
import { OnlineOfflineService } from '../online-offline.service';
import Dexie from 'dexie';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from '../message.service';
import { UUID } from 'angular2-uuid';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { CustomizationComponent } from '../customization/customization.component'
import { element } from 'protractor';


@Component({
  selector: 'tafelposapp-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss']
})
export class CategoryItemsComponent implements OnInit {
  @Input() category: Category;
  categoryItems: CategoryItem[];
  orderDetails: any = {};
  phoneNumber = "";
  emailId = "";
  finalorlets="";
  i = 0;
  isCashConverted = false;
  dynamicselectedItemNames: any;
  orderType = "POS-Dinein"
  selectedItems: CategoryItem[];
  unselectedItem: CategoryItem;
  searchCategoryItem: any;
  customScrollBarConfig: any;
  isPaymentModeSelected: boolean = false;
  customeSelecteditems = [];
  cartLength = 0;
  isOnline: boolean = true;
  isCardPayment: boolean = false;
  private ordersDb: any;
  orders: any = [
    {
      "outletId": localStorage.getItem('outletIds'),
      "orderlets": []
    }
  ];
  billDetails = {
    totalAmount: 0,
    taxAmount: 0,
    allTotalAmount: 0,
    totalItems: 0,
    totalAmountGet: "",
    allTotalAmountGet: "",
    taxAmountGet: "",
    supplierDiscount: 0,
    discountedAmount: 0,
    discountAmount: 0
  };
  outletName = "";
  mallDetails = "";
  mallName = "";
  mallArea = "";
  mallCity = ""
  datasinking: any;
  categories = {};
  itemPresent = false
  paymentMode: string;
  cardType: "";
  bankType = "";
  totalAmountGet: any;
  ReferenceNumber = "";
  fullOrder5DigitId: any;
  taxAmountGet: any;
  discountAmountGet: any;
  allTotalAmountGet: any;
  outletNameGet: any;
  constructor(private http: HttpClient, private dialog: MatDialog, private menuService: MenuService, public orderItemService: OrderItemService,
    private readonly onlineOfflineService: OnlineOfflineService, private messageService: MessageService) {
    this.createDatabase();
    this.orderItemService.selectedCategory.subscribe(dataValueDetails => { 
      this.categories = dataValueDetails;
      if (this.categories['name'] == "All Products") {
        this.getAllCategoryItems();
      } else {
        this.getCategoryItems();
      }
    })
    this.registerToEvents(onlineOfflineService);
    this.outletName = sessionStorage.getItem('outletName');
    this.mallDetails = sessionStorage.getItem('mallDetails');
    this.mallName = sessionStorage.getItem('mallName');
    this.mallArea = sessionStorage.getItem('mallArea');
    this.mallCity = sessionStorage.getItem('mallCity');
  }

  private createDatabase() {
    this.ordersDb = new Dexie('TafelPOSOrdersDatabase');
    this.ordersDb.version(1).stores({
      orders: 'invoiceId, ssId, mallId, dinerId, status, orders, orderType, phoneNumber, emailId, discountType, discountValue, paymentMode, cardType, bankName'
    });
  }

  selectType(x) {
    console.log(x)
  }
  changeMode(isCashConverted) {
    this.isCashConverted = isCashConverted;
  }

  getAllCategoryItems(): void {  
    this.menuService.data$.subscribe((menu) => {
      let menuItems = [];
      if (menu && menu.menus) {
        menu["menus"][0].subMenus.forEach((category) => {
          category.items.forEach((item) => { 
            if (item.availability.available) {
              menuItems.push({ "id": item.id, "name": item.name, "price": item.price, "veg": item.veg, "discountPrice": item.discountedPrice, 'Customizable': item.customizable, 'itemCustomization': item.itemCustomization,'outletId':    localStorage.getItem('selectedOutletId')
 });
            }
          })
        });
        this.categoryItems = menuItems;
        this.getSelectedItems()
      }
    });
  }

  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.getOnlineStatus().subscribe(onlineStatus => {
      if (onlineStatus) {
        this.isOnline = true;
        if (this.i == 0) {
          this.sendOrdersFromIndexedDb();
        }
      } else {
        this.isOnline = false;
      }
    });
  }
  private async getOrdersFromIndexDb() {
    const allOrders = await this.ordersDb.orders.toArray();
    console.log("this.ordersDb",allOrders,await this.ordersDb.orders.toArray())
    this.orderItemService.offlineOrders=allOrders
  }
  private async sendOrdersFromIndexedDb() {
    let allOrders = await this.ordersDb.orders.toArray();
    if (allOrders.length) {
      this.i = 1;
      Swal.fire({
        title: `Data syncing`,
        text: 'Please wait...',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#5c0632',
        allowOutsideClick: false
      })
      this.orderItemService.createFullOrders(allOrders).subscribe((res) => {
        if (res) {
          this.ordersDb.orders.clear().then(() => {
            this.datasinking = "Internet Connected | Data Syncing";
            this.messageService.setMessage(this.datasinking);
            Swal.fire({
              title: `Data syncing Completed`,
              confirmButtonText: 'Continue',
              confirmButtonColor: '#5c0632',
              allowOutsideClick: false
            })
          });
        }
      });
    }
  }

  getCategoryItems(): void { 
    this.menuService.getCategory()
      .subscribe(selectedCategory => {
        this.menuService.data$.subscribe((menu) => {
          let menuItems = [];
          if (menu && menu.menus) {
            menu.menus[0].subMenus.forEach(function (category) {
              if (selectedCategory.id === category.id || selectedCategory.id === "") {
                category.items.forEach(function (item) {
                  if (item.availability.available) {
                    menuItems.push({ "id": item.id, "name": item.name, "price": item.price, "veg": item.veg, "discountPrice": item.discountedPrice, 'Customizable': item.customizable, 'itemCustomization': item.itemCustomization,'outletId':localStorage.getItem('selectedOutletId') });
                  }
                })
              }
            });
            this.categoryItems = menuItems;
            this.getSelectedItems()
          }
        });
      });
  }

  validateCardSelection(): void {
    if (this.isCardPayment) {
      this.isPaymentModeSelected = true;
    } else {
      this.isPaymentModeSelected = false;
    }
  }

  getSelectedItems(): void {
    let data = []
    this.orderItemService.itemsSelected.forEach(key => {
      data.push(key.id)
    })
    this.categoryItems.forEach(value => {
      if (data.includes(value.id)) {
        value.isSelected = true;
      } else {
        value.isSelected = false;
      }
    })
    this.cartLength = this.orderItemService.itemsSelected.length;

    this.getBillSummary(this.orderItemService.itemsSelected);
  }

  selectOrderType(type) {
    this.orderType = type;
  }

  getBillSummary(selectedItems) {
    this.billDetails.totalAmount = 0;
    this.billDetails['discountedAmount'] = 0;
    this.billDetails['supplierDiscount'] = 0;
    selectedItems.forEach(data => {
      if (data.Customizable) {
        data.customization.forEach(value => {
          this.billDetails.totalAmount = this.billDetails.totalAmount == undefined ? 0 : this.billDetails.totalAmount + value.price * value.quantity;
          this.billDetails['discountedAmount'] = this.billDetails['discountedAmount'] == undefined ? 0 : this.billDetails['discountedAmount'] + value.price * value.quantity;

        })
      } else {
        this.billDetails.totalAmount = this.billDetails.totalAmount == undefined ? 0 : this.billDetails.totalAmount + data.price * data.itemCount;
        this.billDetails['discountedAmount'] = this.billDetails['discountedAmount'] == undefined ? 0 : this.billDetails['discountedAmount'] + data.discountPrice * data.itemCount;

      }
    })
    this.billDetails['supplierDiscount'] = this.billDetails.totalAmount - this.billDetails['discountedAmount'];
    this.billDetails.taxAmount = 5 * (this.billDetails.totalAmount - this.billDetails['supplierDiscount']) / 100;
    this.billDetails.allTotalAmount = this.billDetails.totalAmount + this.billDetails.taxAmount - this.billDetails['supplierDiscount'];
    this.billDetails.totalItems = selectedItems.reduce((a, b) => a + (b["itemCount"] || 0), 0);
    let totalAmountValue = (this.billDetails.totalAmount).toString();
    this.billDetails.totalAmountGet = parseFloat(totalAmountValue).toFixed(2).padStart(10, ' ') + '';
    let allTotalAmountValue = (this.billDetails.allTotalAmount).toString();
    this.billDetails.allTotalAmountGet = parseFloat(allTotalAmountValue).toFixed(2).padStart(10, ' ') + '';
    console.log("this.billDetails.allTotalAmountGet", this.billDetails.allTotalAmountGet);
    let taxAmountValue = (this.billDetails.taxAmount).toString();
    this.billDetails.taxAmountGet = parseFloat(taxAmountValue).toFixed(2).padStart(10, ' ') + '';
    this.orderItemService.billDetails = this.billDetails
  }

  onSelectItem(categoryItem, index) {
    if (this.orderItemService.itemsSelected.length) {
      this.itemPresent = false;
      if (categoryItem.Customizable) {
        this.orderItemService.itemsSelected.forEach(value => {
          if (value.id == categoryItem.id) {
            this.itemPresent = true
            if (value["itemCount"] >= 50) {
              alert("Max Item qunatity Reached")
            } else {
              const dialogRef = this.dialog.open(CustomizationComponent, {
                width: '40%',
                data: categoryItem,
              });
              dialogRef.afterClosed().subscribe(result => {
                if (result != undefined) {
                  categoryItem['isSelected'] = true;
                  value["itemCount"] = value['itemCount'] + 1
                  if (categoryItem.customization != undefined) {
                    if (categoryItem.customization.length) {
                      let customizationPresent = false;
                      categoryItem.customization.forEach(data => {
                        if (data.selectedItems[0].customization[0].name == result.selectedItems[0].customization[0].name) {
                          customizationPresent = true;
                          data.quantity = data.quantity + 1;
                        }
                      })
                      if (!customizationPresent) {
                        result['basicPrice'] = categoryItem.price
                        result.selectedItems.forEach(data => {
                          data.customization.forEach(element => {
                            result['price'] = element.price
                          })
                        })
                        result['quantity'] = 1
                        categoryItem.customization.push(result)
                      }
                    }
                  } else {
                    categoryItem.customization = [];
                    categoryItem.customization.push(result);
                  }
                }
                this.getBillSummary(this.orderItemService.itemsSelected);
              });
            }
            return;
          }

        })
      } else {
        categoryItem['isSelected'] = true;
        this.orderItemService.itemsSelected.forEach(value => {
          if (value.id == categoryItem.id) {
            this.itemPresent = true
            if (value["itemCount"] >= 50) {
              alert("Max Item qunatity Reached")
            } else {
              value["itemCount"] = value['itemCount'] + 1
            }
            return;
          }
        })
      }
    } else {
      this.itemPresent = true
      if (categoryItem.Customizable) {
        this.calCustomizableMethod(categoryItem);
      } else {

        this.callNonCustomizableMethod(categoryItem);
      }
    }
    if (!this.itemPresent) {
      if (categoryItem.Customizable) {
        this.calCustomizableMethod(categoryItem);
      } else {
        this.callNonCustomizableMethod(categoryItem);
      }
    }
    this.getBillSummary(this.orderItemService.itemsSelected);
  }

  onClearOrder(): void {
    this.orderItemService.itemsSelected = [];
    this.phoneNumber = ""
    this.emailId = ""
  }
  calCustomizableMethod(categoryItem) {
    const dialogRef = this.dialog.open(CustomizationComponent, {
      width: '40%',
      data: categoryItem,
    });
    dialogRef.afterClosed().subscribe(result => {
     
      if(result!=undefined){
        categoryItem['isSelected'] = true;
      }
      result['basicPrice'] = categoryItem.price
      result.selectedItems.forEach(data => {
        data.customization.forEach(element => {
          result['price'] = element.price
        })
      })
      result['quantity'] = 1
      categoryItem['itemCount'] = 1;
      categoryItem['customization'] = []
      categoryItem['customization'].push(result)
      this.orderItemService.itemsSelected.push(categoryItem);
      this.cartLength = this.orderItemService.itemsSelected.length;
      this.customeSelecteditems.push(categoryItem)
      this.getBillSummary(this.orderItemService.itemsSelected);
    });
  }
  callNonCustomizableMethod(categoryItem) {
    categoryItem['isSelected'] = true;
    categoryItem['itemCount'] = 1;
    this.orderItemService.itemsSelected.push(categoryItem);
    this.cartLength = this.orderItemService.itemsSelected.length;
    this.customeSelecteditems.push(categoryItem)
  }
  ngOnInit() {
    this.getAllCategoryItems();
    this.getCategoryItems();
    this.customScrollBarConfig = {
      suppressScrollX: true
    }
  }
  paymentType = ""
  selectPaymentMode(value): void {
    this.paymentType = value;
    if (value === "card" || value === "upi") {
      this.isPaymentModeSelected = true;
      this.isCardPayment = true;
      this.paymentMode = "PAYMENT_GATEWAY"
    } else {
      this.isPaymentModeSelected = true;
      this.isCardPayment = false;
      this.paymentMode = 'CASH';

    }
  }
  incCount(selectedItemIndex, selectedItem): void {
    this.orderItemService.itemsSelected.forEach((values, i) => {
      if (values.id == selectedItem.id) {
        if (values.itemCount >= 50) {
          alert("Max Item qunatity Reached")
        } else {
          values.itemCount = values.itemCount + 1;
        }
      }
    })
    this.getBillSummary(this.orderItemService.itemsSelected);
    this.getitemDetailsasperOutlet()

  }

  decCustomizationCount(selectedItemIndex, selectedItem, customOptions): void {
 
    this.orderItemService.itemsSelected.forEach((values, j) => {
      if (values.id == selectedItem.id) {
  
        if (values.customization.length == 1) {
          values.customization.forEach((data, i) => {
            if (data.price == customOptions.price) {
              if (data.quantity > 1) {
                data.quantity = data.quantity - 1;
              } else {
                values.customization.splice(i, 1);
                this.orderItemService.itemsSelected.splice(j, 1)
                values.itemCount = values.itemCount - 1;
                this.getSelectedItems()
              }
            }
          })
        } else {
          values.customization.forEach((data, i) => {
            if (data.price == customOptions.price) {
              if (data.quantity > 1) {
                data.quantity = data.quantity - 1;
              } else {
                values.customization.splice(i, 1);
                values.itemCount = values.itemCount - 1;
                this.getSelectedItems()
              }
            }
          })
        }
        this.cartLength = this.orderItemService.itemsSelected.length;
        this.getBillSummary(this.orderItemService.itemsSelected);
      }
    })

  }
  incCustomizationCount(selectedItemIndex, selectedItem, customOptions) {
    this.orderItemService.itemsSelected.forEach((values, i) => {
      if (values.id == selectedItem.id) {
        values.customization.forEach((data, i) => {
          if (data.price == customOptions.price) {
            if (data.quantity >= 50) {
              alert("Max Item qunatity Reached")
            } else {
              data.quantity = data.quantity + 1;
              values.itemCount = values.itemCount + 1;
              this.getSelectedItems()
            }
          }
        })
      }
    })
    this.cartLength = this.orderItemService.itemsSelected.length;
    this.getBillSummary(this.orderItemService.itemsSelected);
  }
  decCount(selectedItemIndex, selectedItem): void {
    this.orderItemService.itemsSelected.forEach((values, i) => {
      if (values.id == selectedItem.id) {
        if (values.itemCount == 1) {
          this.orderItemService.itemsSelected.splice(i, 1);
          this.getSelectedItems()
        } else {
          values.itemCount = values.itemCount - 1;
        }
      }
    })
    this.cartLength = this.orderItemService.itemsSelected.length;
    this.getBillSummary(this.orderItemService.itemsSelected);
    this.getitemDetailsasperOutlet()
  }

  deleteItem(selectedItem: CategoryItem, selectedItemIndex): void {
    this.orderItemService.itemsSelected.forEach((values, i) => {
      if (values.id == selectedItem.id) {
        this.orderItemService.itemsSelected.splice(i, 1);
        this.getSelectedItems();
      }
    })
    this.cartLength = this.orderItemService.itemsSelected.length;
    this.getBillSummary(this.orderItemService.itemsSelected);

  }
  deleteCustomizedItem(selectedItem: CategoryItem, selectedItemIndex, customOptions) {
    this.orderItemService.itemsSelected.forEach((values, i) => {
      if (values.id == selectedItem.id) {
        if (values.customization.length > 1) {
          values.customization.forEach((data, j) => {
            if (data.price == customOptions.price) {
              values.customization.splice(j, 1)
              values.itemCount = values.itemCount - data.quantity;
              this.getSelectedItems();
            }
          })
        } else {
          this.orderItemService.itemsSelected.splice(i, 1);
          this.getSelectedItems();
        }
      }
    })
    this.cartLength = this.orderItemService.itemsSelected.length;
    this.getBillSummary(this.orderItemService.itemsSelected);
  }
getitemDetailsasperOutlet(){
  console.log("this.orderItemService.itemsSelected",this.orderItemService.itemsSelected)
  const group = this.orderItemService.itemsSelected.reduce((acc, item) => {
    if (!acc[item.outletId]) {
      acc[item.outletId] = [];
    }
  
    acc[item.outletId].push({
      "itemId": item.id,
      "name": item.name,
      "price": item.price,
      "quantity": item.itemCount,
      "discountPrice": item.discountPrice,
      "customization":item.customization
    }
    );
    return acc;
  }, {})

 
  let outletDetails = JSON.parse(localStorage.getItem('outletDetails'))
    let orders=[]
    outletDetails.forEach(data=>{
      if(group[data.id]!=undefined){
        orders.push({
          "outletId":data.id,
          "orderlets":group[data.id]
        })
      }
      
      

    })
}
  private addToIndexedDb(order) {
    console.log("No internet connection detected. Data will be stored in local DB");
    this.ordersDb.orders
      .add(order)
      .then(async () => {
        const allOrders = await this.ordersDb.orders.toArray();
        console.log('saved in DB, DB is now', allOrders);
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e));
      });
  }



  createFullOrder(): void {
    let invoiceIdGet = UUID.UUID();
    let invoiceId6Letters = invoiceIdGet.substring(0, 6).toUpperCase();
    let posConcat = "pos";
    let posOrderID = invoiceId6Letters;
    let date = new Date();
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    let hours = date.getUTCHours();
    let min = date.getUTCMinutes();
    let sec = date.getUTCSeconds();
    let msec = date.getUTCMilliseconds();
    let finalDate = year + "-" + month + "-" + day + "T" + hours + ":" + min + ":" + sec + "." + msec + "Z"
    this.orderDetails.invoiceId = UUID.UUID();
    this.orderDetails.ssId = localStorage.getItem('ssId');
    this.orderDetails.mallId = localStorage.getItem('mallId');
    this.orderDetails.dinerId = localStorage.getItem('dinerId');
    this.orderDetails.status = "COMPLETED"
    let data = []
    const group = this.orderItemService.itemsSelected.reduce((acc, item) => {
      if (!acc[item.outletId]) {
        acc[item.outletId] = [];
      }
      acc[item.outletId].push({
        "itemId": item.id,
        "name": item.name,
        "price": item.price,
        "quantity": item.itemCount,
        "discountPrice": item.discountPrice,
        "customization":item.customization
      }
      );
      return acc;
    }, {})
    let outletDetails = JSON.parse(localStorage.getItem('outletDetails'))
      let orders=[]
      outletDetails.forEach(data=>{
        if(group[data.id]!=undefined){
          orders.push({
            "outletId":data.id,
            "outletName":data.name,
            "orderlets":group[data.id]
          })
        }
      })
    this.orders=orders;
    this.orderDetails.orders = this.orders;
    this.orderDetails.orderType = this.orderType;
    this.orderDetails.phoneNumber = this.phoneNumber;
    this.orderDetails.emailId = this.emailId;
    this.orderDetails.discountType = "";
    this.orderDetails.discountValue = 0;
    if (this.isCashConverted) {
      this.orderDetails.paymentMode = "CASH_CONVERTED";
    } else {
      this.orderDetails.paymentMode = this.paymentMode;
    }
  this.finalorlets;
    this.orderDetails.cardType = this.cardType;
    this.orderDetails.bankName = this.bankType;
    this.dynamicselectedItemNames = "";
    this.outletNameGet = "";
    this.orders.forEach(outletNames => {  
      let outletName = outletNames['outletName'];
      this.finalorlets+= '<text>----------------------------------------------- &#10;</text>\n' + '<text>' + 'Outlet Name - '+ outletName + '&#10;</text>\n' + '<text>----------------------------------------------- &#10;</text>\n';
      this.outletNameGet = this.outletNameGet + '<text>' + outletName + ' '  + '&#10;</text>\n';      
      outletNames['orderlets'].forEach((selectedItemNames) => {        
        let selecteditemName = selectedItemNames.name;
        let selecteditemCount = (selectedItemNames.quantity).toString();
        let selectedItemPriceGet = (selectedItemNames.price).toString();
        let selectedItemPrice = parseFloat(selectedItemPriceGet).toFixed(2) + '';
        let selectedItemAmountGet = (selectedItemNames.quantity * selectedItemNames.price).toString();
        let selectedItemAmount = parseFloat(selectedItemAmountGet).toFixed(2) + '';
        this.dynamicselectedItemNames = this.dynamicselectedItemNames + '<text>' + selecteditemName.substring(21, 0).padEnd(21, ' ') + ' ' + selecteditemCount.padEnd(2, ' ') + ' ' + selectedItemPrice.padStart(9, ' ') + ' ' + selectedItemAmount.padStart(11, ' ') + '&#10;</text>\n';       
        this.finalorlets+='<text>' + selecteditemName.substring(21, 0).padEnd(21, ' ') + ' ' + selecteditemCount.padEnd(2, ' ') + ' ' + selectedItemPrice.padStart(9, ' ') + ' ' + selectedItemAmount.padStart(11, ' ') + '&#10;</text>\n';      
      });
    });
    if (!this.isOnline) {
      this.orderDetails.createdDate = finalDate;
      this.orderDetails.modifiedDate = finalDate;
      this.orderDetails.fullOrder5DigitId = posOrderID;
      this.addToIndexedDb(this.orderDetails);
      this.i = 0;
      Swal.fire({
        title: `Order No:  ${this.orderDetails.fullOrder5DigitId}`,
        text: 'Your Order has confirmed',
        type: 'success',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#5c0632',
      })
      this.orderItemService.itemsSelected = [];
      this.phoneNumber = ""
      this.emailId = ""
      this.getSelectedItems();
    } else {
      if (this.paymentMode == "CASH") {

      } else {
        Swal.fire({
          title: `Payment Processing`,
          text: 'Please wait...',
          type: 'warning',
          showCancelButton: false,
          showConfirmButton: false,
          allowOutsideClick: false
        })
      }
      this.orderItemService.createFullOrder(this.orderDetails).subscribe((res) => {
        if (res) {
          this.fullOrder5DigitId = res.fullOrder5DigitId;
          this.orderType = res.orderType;
          this.totalAmountGet = res.amount;
          let cgst = res.cgst;
          let sgst = res.sgst;
          this.taxAmountGet = cgst + sgst;
          this.allTotalAmountGet = parseFloat(this.totalAmountGet + this.taxAmountGet).toFixed(2).padStart(10, ' ') + '';
          let uniqOrderId = this.fullOrder5DigitId + new Date().getTime()
          if (this.orderDetails.paymentMode == "CASH") {
            Swal.fire({
              title: `Order No:  ${res.fullOrder5DigitId}`,
              text: 'Your Order has confirmed',
              type: 'success',
              confirmButtonText: 'Continue',
              confirmButtonColor: '#5c0632',
              allowOutsideClick: false
            })
            this.orderItemService.itemsSelected = [];
            this.phoneNumber = ""
            this.emailId = ""
            this.getSelectedItems();
            this.printGo();

          } else {
            this.allTotalAmountGet = parseFloat(this.totalAmountGet + this.taxAmountGet).toFixed(2) + '';
           
            let pNumber = this.phoneNumber == "" ? "9999999999" : this.phoneNumber
            let paymentUrl = "/intiateMosambeeTransaction/" + this.paymentType + "/dinnerid/" + localStorage.getItem('dinerId') + "/fullOrderid/" + res['id'] + "/mallId/" + localStorage.getItem('mallId') + "/orderuniqueNumber/" + uniqOrderId + "/deviceId/1/phoneNumber/" + pNumber;
            this.orderItemService.initMosambeeTransaction(paymentUrl).subscribe((res1) => {
              if (res1.status == "SUCCESS") {
                let paymentStatusUrl = "/checkStatusOfOrder/" + localStorage.getItem('dinerId') + "/order/" + uniqOrderId;
                var x = setInterval(function () {
                  this.orderItemService.checkpaymentStatus(paymentStatusUrl).subscribe((res2) => {
                    if (res2.orderStatus == null) {
                    }
                    else if (res2.orderStatus == "00") {
                      Swal.fire({
                        title: `Order No:  ${res.fullOrder5DigitId}`,
                        text: 'Your Order has confirmed',
                        type: 'success',
                        confirmButtonText: 'Continue',
                        confirmButtonColor: '#5c0632',
                        allowOutsideClick: false
                      })
                      clearInterval(x);
                      this.printGo();
                      this.orderItemService.itemsSelected = [];
                      this.phoneNumber = ""
                      this.emailId = ""
                      this.getSelectedItems();
                    } else {
                      Swal.fire({
                        title: `Payment declined`,
                        type: 'warning',
                        confirmButtonText: 'Continue',
                        confirmButtonColor: '#5c0632',
                        allowOutsideClick: false
                      })
                      clearInterval(x);
                    }
                  })
                }.bind(this), 1000);
              } else {
                Swal.fire({
                  title: res1.message,
                  type: 'warning',
                  confirmButtonText: 'Continue',
                  confirmButtonColor: '#5c0632',
                  allowOutsideClick: false
                })
              }
            })
          }

        }
      });
    }
    this.orderItemService.setClearOrderStatus(true);
    this.paymentMode = "";
    this.isPaymentModeSelected = false;
  }
  printGo() {
    var data =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">\n' +
      '<s:Body>\n' +
      '<epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print">\n' +
      '<feed unit="30"/>\n' +
      '<text>           ' + this.mallName + '&#10;</text>\n' +
      '<text>           ' + this.mallArea + ' , ' + this.mallCity + '&#10;</text>\n' +
      '<text>           GSTIN : 36AAGCB4303A1ZE    &#10;</text>\n' +
      '<text>           Date :' + new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ' &#10;</text>\n' +
      '<text>----------------------------------------------- &#10;</text>\n' +
      '<text>Order No:' + this.fullOrder5DigitId + '      Order Type:' + this.orderType + ' &#10;</text>\n' +
      '<text>----------------------------------------------- &#10;</text>\n' +
      '<text>Item Name             Qty   Price        Total&#10;</text>\n' +
      this.finalorlets + '\n' +
      '<text>----------------------------------------------- &#10;</text>\n' +
      '<text>                         Item Total:' + this.totalAmountGet.toFixed(2).padStart(10, ' ') + '' + '&#10;</text>\n' +
      '<text>                              Taxes:' + this.taxAmountGet.toFixed(2).padStart(10, ' ') + '' + '&#10;</text>\n' +
      '<text>                      To Pay Amount:' + this.allTotalAmountGet + '' + '&#10;</text>\n' +
      '<text>===============================================&#10;</text>\n' +
      '<text>             Thank you Order Again! &#10;</text>\n' +
      '<text>               Powered By TAFEL! &#10;</text>\n' +
      '<text>          Reach us at contact@tafel.in &#10;</text>\n' +
      '<text>                      ---------------- &#10;</text>\n' +
      '<feed line="3"/>\n' +
      '<cut type="feed"/>\n' +
      '</epos-print>\n' +
      '</s:Body>\n' +
      '</s:Envelope>\n'
    var urldata = 'http://192.168.1.204/cgi-bin/epos/service.cgi?devid=local_printer';
    console.log("data", data);
    let localData = this.http.post(urldata, data, {
    }).subscribe(data => {
    });
    return localData;
  }

}

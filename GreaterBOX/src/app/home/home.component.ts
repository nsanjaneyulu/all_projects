import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Directive,
  HostListener,
  ElementRef,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  FormArray,
} from "@angular/forms";
import { HomeService } from "../services/homeservice";
import { CheckoutComponent } from "../checkout/checkout.component";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { forkJoin, Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
// export interface productElement {
//   id: string;
//   name: string;
//   description: string;
//   pricePerUnit: number;
//   items: object;
// }
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild("selectProductNode") selectProductElement: ElementRef;
  private defaultSelected = 0;
  cartItems: any;
  orderValue = 1;
  itemCountDetails: any;
  public amount = 1;
  x = [];
  products = [];
  orderForm: FormGroup;
  boxTypeResp: any;
  boxTypeItems: any;
  pickUpLocationResp: any;
  submitted = false;
  buyNumInput: any;
  pickupLocationId: any;
  pickupLocationname: any;
  totalProductAmount = 0;
  selectQty = false;
  availableInventories: any;
  outOfStockText: string;
  stockThresold: number;
  stockThresoldWarning: number;
  stockWarning: string;
  homePageSubscription: Subscription;
  isloadingProducts: boolean;
  errorLoadingProducts: boolean;
  productLoadingError: string;
  constructor(
    private el: ElementRef,
    private routeCtrl: Router,
    private formBuilder: FormBuilder,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.homePageSubscription = new Subscription();
    this.stockThresold = 25;
    this.isloadingProducts = false;
    this.errorLoadingProducts = false;
    this.stockThresoldWarning = this.stockThresold + 10;
    // this.boxType();
    // this.AvailableInventory();
    this.pickUpLocation();
    const productsSubscription = this.getProducts().subscribe(
      (data) => {
        this.isloadingProducts = false;
        this.boxTypeResp = data;
      },
      (error) => {
        this.isloadingProducts = true;
        this.errorLoadingProducts = true;
        this.productLoadingError =
          "Something went wrong with loading the boxes. Please try back later. Apologize for the inconvenience.";
      }
    );

    this.outOfStockText = "The box is out of stock for this Friday pickup.";    
    this.stockWarning = "Please hurry we have limited stock of these boxes.";
    this.orderForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required]],
    });
    this.homePageSubscription.add(productsSubscription);
  }

  get f() {
    return this.orderForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // const invalidControl = this.el.nativeElement.querySelector(".is-invalid");
    // if (invalidControl) {
    //   invalidControl.focus();
    // }
    // if (this.orderForm.invalid) {
    //   return;
    // }
    this.selectQty = true;
    if (this.orderForm.invalid) {
      document.querySelector("#orderFormDetails").scrollIntoView();
      setTimeout(() => {
        const invalidControl: any = document.querySelector(".is-invalid");
        if (invalidControl) {
          invalidControl.focus();
        }
      }, 100);
      return;
    }

    const orderFormData = this.orderForm.value;
    orderFormData["PaymentAmount"] = this.totalProductAmount;
    let productQtyGet = (this.products || []).map((product) => {
      return {
        id: product["id"],
        quantity: product["quantity"],
      };
    });
    orderFormData["products"] = productQtyGet;
    if (
      productQtyGet &&
      Array.isArray(productQtyGet) &&
      productQtyGet.length === 0
    ) {
      this.routeCtrl
        .navigate([], {
          fragment: "selectproduct",
        })
        .then(() => {
          if (
            this.selectProductElement &&
            this.selectProductElement.nativeElement
          ) {
            this.selectProductElement.nativeElement.scrollIntoView({
              behavior: "smooth",
            });
          }
        });
    }
    if (this.pickupLocationId) {
      orderFormData["pickUpLocationId"] = this.pickupLocationId;
      orderFormData["pickUpLocationName"] = this.pickupLocationname;
    } else {
      orderFormData["pickUpLocationId"] = this.pickUpLocationResp[0]["id"];
      orderFormData["pickUpLocationName"] = this.pickUpLocationResp[0][
        "location"
      ];
    }
    if (orderFormData["PaymentAmount"] === 0) {
      return false;
    } else {
      this.homeService.setOrderDetails(orderFormData);
      this.routeCtrl.navigateByUrl("/checkout", { state: orderFormData });
    }
  }

  getProducts() {
    this.isloadingProducts = true;
    return forkJoin(
      this.homeService.boxtypeService(),
      this.homeService.GetAvailableInventories()
    ).pipe(
      map((data) => {
        let updatedProductList;
        const products = data[0];
        const inventories = data[1];
        if (
          products &&
          Array.isArray(products) &&
          inventories &&
          Array.isArray(inventories)
        ) {
          updatedProductList = products.map((product) => {
            const productId = product.id;
            const productInventory = inventories.find(
              (inventory) => inventory && inventory.productId === productId
            );
            product.remaining =
              productInventory && productInventory.remaining
                ? productInventory.remaining
                : 0;
            return product;
          });
        } else {
          updatedProductList = products;
        }
        return updatedProductList;
      })
    );
  }

  // AvailableInventory() {
  //   this.homeService.GetAvailableInventories().subscribe(inventories => {
  //     this.availableInventories = inventories;
  //     this.boxTypeResp.forEach(product => {
  //       if (product.id) {
  //         this.availableInventories.forEach(inventory => {
  //           if (product.id === inventory.productId) {
  //             product.remaining = inventory.remaining;
  //           }
  //         });
  //       }
  //     });
  //   });
  // }

  // boxType() {
  //   this.homeService.boxtypeService().subscribe((resp: any) => {
  //     resp.forEach(item => {
  //       item["remaining"] = 0;
  //       item.items = item.items
  //         .split("{")
  //         .join("")
  //         .split("'")
  //         .join("")
  //         .split("}");
  //     });
  //     this.boxTypeResp = resp;
  //   });
  // }

  pickUpLocation() {
    const pickupSubscription = this.homeService
      .pickUpservice()
      .subscribe((resp) => {
        this.pickUpLocationResp = resp;
      });
    this.homePageSubscription.add(pickupSubscription);
  }

  get selectedBox() {
    return this.products.reduce((prev, curr) => {
      return prev + (curr.quantity || 0);
    }, 0);
  }

  updateProductQuantity(productGet, isIncreament = true) {
    const products = this.getAddedProducts();
    const product = (products || {})[productGet.id] || productGet;
    this.selectQty = true;

    if (isIncreament) {
      product.quantity = (product.quantity || 0) + 1;
      if (product.quantity >= 5) {
        product.quantity = 5;
      }
    } else {
      product.quantity = (product.quantity || 0) - 1;
      if (product.quantity <= 0) {
        product.quantity = 0;
      }
    }
    product.totalAmount = product.quantity * product.pricePerUnit;
    products[product.id] = product;
    this.products = Object.keys(products)
      .reduce((prev, curr) => [...prev, products[curr]], [])
      .filter((p) => p && p.quantity);

    this.totalProductAmount = this.products.reduce(
      (prev, curr) => prev + curr.totalAmount,
      0
    );
  }

  getAddedProducts() {
    return (this.products || []).reduce((prev, curr) => {
      prev[curr.id] = curr;
      return prev;
    }, {});
  }

  handleChange(eve, pickUpLocation) {
    this.pickupLocationId = pickUpLocation.id;
    this.pickupLocationname = pickUpLocation.location;
  }

  ngOnDestroy() {
    if (this.homePageSubscription) {
      this.homePageSubscription.unsubscribe();
    }
  }
}

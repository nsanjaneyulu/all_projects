import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../services/product.service";
import {
  switchMap,
  concatMap,
  map,
  mergeMap,
  catchError,
  tap,
} from "rxjs/operators";
import { InventoryService } from "../services/inventory.service";
import { Inventory } from "../model/inventory.model";
import { Subscription, of } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: "app-addproduct",
  templateUrl: "./addproduct.component.html",
  styleUrls: ["./addproduct.component.scss"],
})
export class AddproductComponent implements OnInit, OnDestroy {
  addProductForm: FormGroup;
  submitted = false;
  subscriptions: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ProductService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.addProductForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", Validators.required],
      pricePerUnit: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9.]*$"),
          Validators.min(1),
        ],
      ],
      items: ["", Validators.required],
      sequence: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      beginningInventory: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.min(1),
        ],
      ],
    });
  }

  get f() {
    return this.addProductForm.controls;
  }

  onAddSubmit() {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      return;
    }

    const loginPayload = {
      name: this.addProductForm.controls.name.value,
      description: this.addProductForm.controls.description.value,
      pricePerUnit: this.addProductForm.controls.pricePerUnit.value,
      items: this.addProductForm.controls.items.value,
      sequence: this.addProductForm.controls.sequence.value,
      isActive: true,
      beginningInventory: this.addProductForm.controls.beginningInventory.value,
    };
    const authorisation = "Bearer " + window.localStorage.getItem("userToken");
    this.apiService
      .addProduct(authorisation, loginPayload)
      .toPromise()
      .then((res) => {
        const inventory: Inventory = {
          beginingInventory: loginPayload.beginningInventory,
          isActive: true,
          productId: res,
          productName: loginPayload.name,
        };
        return this.inventoryService.createInventory(inventory).toPromise();
      })
      .then((data) => {
        const data2 = JSON.parse(JSON.stringify(data));
        if (!!data2) {
          return this.router.navigate(["products"]);
        } else {
          return of(null).toPromise();
        }
      })
      .catch((err) => {
        Swal.fire(err["error"]);
      });
  }

  reset() {
    this.router.navigate(["products"]);
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}

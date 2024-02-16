import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  tableData: any;
  showEditTable: boolean = false;
  editRowID: any = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ProductService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getProductList();
    this.spinner.show();
  }

  getProductList() {
    var authorisation = "Bearer " + window.localStorage.getItem("userToken");
    this.apiService.productDetails(authorisation).subscribe((data) => {
      var data1 = JSON.stringify(data);
      var data2 = JSON.parse(data1);
      this.tableData = data2;
      this.spinner.hide();
      console.log("Product", data2);
    });
  }

  Edit(val) {
    this.editRowID = val;
  }

  Save(val, i) {
    var authorisation = "Bearer " + window.localStorage.getItem("userToken");

    console.log("index", this.tableData[i]);
    const loginPayload = this.tableData[i];
    this.apiService.productPatch(authorisation, loginPayload).subscribe(
      (data) => {
        var data1 = JSON.stringify(data);
        var data2 = JSON.parse(data1);
        //this.tableData=data2;
        console.log("ProductPatch", data2);
        this.editRowID = "";
        this.getProductList();
      },
      (err) => {
        Swal.fire("Geeting Error!");
        //console.log('err', err)
      }
    );
  }

  Deactivate(i) {
    Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        var authorisation =
          "Bearer " + window.localStorage.getItem("userToken");

        console.log("index", this.tableData[i]);
        const productId = this.tableData[i].id;
        this.apiService.deleteProduct(authorisation, productId).subscribe(
          (data) => {
            var data1 = JSON.stringify(data);
            var data2 = JSON.parse(data1);
            console.log("ProductDelete", data2);
            if (data2 === true) {
              this.getProductList();
              Swal.fire("Successfully Deactivated!");
            }
          },
          (err) => {
            console.log("err", err);
          }
        );
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  addNew() {
    this.router.navigate(["addproducts"]);
  }
}

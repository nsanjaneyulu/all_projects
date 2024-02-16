import { Component, OnInit } from "@angular/core";
import { PickupLocationService } from "../services/pickup-location.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-pickup-location",
  templateUrl: "./pickup-location.component.html",
  styleUrls: ["./pickup-location.component.scss"],
})
export class PickupLocationComponent implements OnInit {
  tableData: any;
  showEditTable: boolean = false;
  editRowID: any = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: PickupLocationService,
    private spinner: NgxSpinnerService
  ) {}

  formatTime(value) {
    return this.apiService.getFormatTime(value);
  }

  ngOnInit() {
    this.spinner.show();
    this.getLocations();
  }

  getLocations() {
    var authorisation = "Bearer " + window.localStorage.getItem("userToken");
    this.apiService.getPickUpLocations(authorisation).subscribe((data) => {
      var data1 = JSON.stringify(data);
      var data2 = JSON.parse(data1);
      if (data2 && Array.isArray(data2)) {
        this.tableData = data2.map((location) => {
          return Object.assign({}, location, {
            pickUpTimeStart: location.pickUpTimeStart,
            pickUpTimeEnd: location.pickUpTimeEnd,
          });
        });
      } else {
        this.tableData = [];
      }
      this.spinner.hide();
      console.log("Location", data2);
    });
  }

  Edit(val) {
    this.editRowID = val;
  }

  Save(val, i) {
    var authorisation = "Bearer " + window.localStorage.getItem("userToken");

    console.log("index", this.tableData[i]);
    const loginPayload = this.tableData[i];
    this.apiService.pickUpLocationPatch(authorisation, loginPayload).subscribe(
      (data) => {
        var data1 = JSON.stringify(data);
        var data2 = JSON.parse(data1);
        //this.tableData=data2;
        console.log("ProductPatch", data2);
        this.editRowID = "";
        this.getLocations();
      },
      (err) => {
        Swal.fire("Geeting Error!");
        console.log("err", err);
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
        this.apiService
          .deletePickUpLocation(authorisation, productId)
          .subscribe(
            (data) => {
              var data1 = JSON.stringify(data);
              var data2 = JSON.parse(data1);
              console.log("ProductDelete", data2);
              if (data2 === true) {
                this.getLocations();
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
    this.router.navigate(["addlocation"]);
  }
}

import { Component, OnInit } from '@angular/core';
import { InventoryService } from "../services/inventory.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  tableData: any;
  available_Inventory: any;
  showEditTable: boolean = false;
  editRowID: any = '';
  
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: InventoryService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.inventory();
    this.availableinventory();
  }

  inventory() {
    var authorisation = 'Bearer ' + window.localStorage.getItem('userToken');
    this.apiService.getInventory(authorisation)
      .subscribe(data => {

        var data1 = JSON.stringify(data);
        var data2 = JSON.parse(data1);
        this.tableData = data2;
        this.spinner.hide();
        console.log('getInventory', data2)
      });
  }

  availableinventory() {
    var authorisation = 'Bearer ' + window.localStorage.getItem('userToken');
    this.apiService.getAvailableInventory(authorisation)
      .subscribe(data => {

        var data1 = JSON.stringify(data);
        var data2 = JSON.parse(data1);
        this.available_Inventory = data2;
        console.log('getAvailableInventory', data2)
      });
  }

  Edit(val) {
    this.editRowID = val;
  }

  Save(val, i) {
    var authorisation = 'Bearer ' + window.localStorage.getItem('userToken');

    console.log('index', this.tableData[i])
    const loginPayload = this.tableData[i];
    this.apiService.inventoryPatch(authorisation, loginPayload)
      .subscribe(data => {

        var data1 = JSON.stringify(data);
        var data2 = JSON.parse(data1);
        //this.tableData=data2;
        console.log('ProductPatch', data2)
        this.editRowID = "";
        this.inventory();
        this.availableinventory();
      }, err => {
        Swal.fire('Geeting Error!')
        console.log('err', err)
      });

  }


}

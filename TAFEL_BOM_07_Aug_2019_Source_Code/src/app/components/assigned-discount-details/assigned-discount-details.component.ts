import { Component, OnDestroy, OnInit} from '@angular/core';


@Component({
  selector: 'app-assigned-discount-details',
  templateUrl: './assigned-discount-details.component.html',
  styleUrls: ['./assigned-discount-details.component.scss']
})
export class AssignedDiscountDetailsComponent implements OnInit {

  variableRequired={
    pageTitle:"Assigned Discounts",
    modelButtonName:"Assign Discount",
    modelComponent:"AssignDiscountComponent",
    update:"Update",
    new:"Assign"
  }
  filterColumns=[
    { name:"Discount Title",id:"discountName"},
    { name:"Service Station Name",id:"serviceStationName"},
    { name:"Assigned To",id:"mallName"},
    { name:"Status",id:"status"},
  ]
  fixedHeaders=[
    { id:"discountName"},
    { id:"serviceStationName"},
    { id:"mallName"},
    { id:"createdDate"},
    { id:"budgetConsumed"},
    { id:"status"},
  ]
  headersList=[
    { name:"ID",id:"id", isChecked:false},
    { name:"Discount Title",id:"discountName", isChecked:true},
    { name:"Service Station Name",id:"serviceStationName", isChecked:true},
    { name:"Assigned To",id:"mallName", isChecked:true},
    { name:"Assigned Date",id:"createdDate", isChecked:true},
    { name:"Budget Consumed",id:"budgetConsumed", isChecked:true},
    { name:"Status",id:"status", isChecked:true},
    { name:"Start Date",id:"startDate", isChecked:false},
    { name:"End Date",id:"endDate", isChecked:false},
    { name:"Start Hour", id:"startHour", isChecked:false},
    { name:"End Hour",id:"endHour", isChecked:false},    
    ]      
    constructor() { }
    ngOnInit(): void {}
}

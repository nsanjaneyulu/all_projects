import { Component, OnDestroy, OnInit} from '@angular/core';



@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss'],
})
export class DiscountDetailsComponent implements OnInit {
  variableRequired={
    pageTitle:"Discounts",
    modelButtonName:"Add New Discount",
    modelComponent:"AddDiscountsComponent",
    update:"Update",
    new:"Create"
  }
  filterColumns=[
              { name:"Discount Title",id:"discountName"},
              { name:"Discount Type",id:"discountTypeName"},
              { name:"Budget Allocated",id:"budgetAllocated"},
              { name:"Status",id:"status"},
  ]
  fixedHeaders=[
    { id:"discountName"},
    { id:"discountTypeName"},
    { id:"startDate"},
    { id:"budgetAllocated"},
    {id:"budgetConsumed"},
    { id:"status"},
  ]
  headersList=[
              { name:"ID",id:"id", isChecked:false},
              { name:"Discount Title",id:"discountName", isChecked:true},
              { name:"Discount Type",id:"discountTypeName", isChecked:true},
              { name:"Start Date",id:"startDate", isChecked:true},
              { name:"Start Hour",id:"startHour", isChecked:false},
              { name:"Budget Allocated",id:"budgetAllocated", isChecked:true},
              { name:"Budget Consumed",id:"budgetConsumed", isChecked:true},
              { name:"Status",id:"status", isChecked:true},
              { name:"Assigned",id:"isAssigned", isChecked:false},
              // { name:"Mx Discount Value",id:"maxDiscountValue", isChecked:false},
              // { name:"Discount Max Value",id:"discountValue", isChecked:false},
              { name:"Promotional Type",id:"promoTypeName", isChecked:false},
              { name:"Add Points To Wallet",id:"shouldAddToWallet", isChecked:false},
              { name:"End Date",id:"endDate", isChecked:false},
              { name:"End Hour",id:"endHour", isChecked:false},
              { name:"Usage Limit Type",id:"usageLimitType", isChecked:false},
              { name:"Limit",id:"usageLimitValue", isChecked:false},
    ]    
    constructor() { }
    ngOnInit(): void {}
}

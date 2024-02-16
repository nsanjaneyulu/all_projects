import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DiscountsService } from '../../services/discounts.service';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-add-discounts',
  templateUrl: './add-discounts.component.html',
  styleUrls: ['./add-discounts.component.scss']
})
export class AddDiscountsComponent implements OnInit {
  maxDate: any;
  PromotionalTypes:any=[];
  discountTypes:any=[];
  discountType=""
  title = '';
  isminValueDisplay="";
  isMaxValueRequired=""
  isPromoCodeRequired="";
  minDate = new Date();
  hr=new Date().getHours();
  min=new Date().getMinutes() >9 ? new Date().getMinutes(): "0"+new Date().getMinutes();
  buttonName="";
  isEditable:boolean;
  minimumRequiredValueEditable:boolean
  discountDetails= {
    "id":null,
    "discountName":'',
    "description": "",
    "promoTypeID": "",
    "promoTypeName":"",
    "promoCode": "",
    "discountTypeID": "",
    "discountTypeName": "",
    "discountValueType": "",
    "discountValue": "",
    "maxDiscountValue": "",
    "minimumOrderValue": "",
    "shouldAddToWallet": "No",
    "budgetAllocated": "",
    "budgetConsumed":0,
    "usageLimitType": "Day",
    "usageLimitValue": "",
    "isAssigned": "No",
    "isActive":"Yes",
    "isAvailable":"Yes",
    "isDeleted":"No",
    "startDate":new Date(),
    "endDate":"",
    "startHour":this.hr +":"+ this.min,
    "endHour":"",
    "modifiedBy":"BOM USER"    
}
  constructor(
    public amazingTimePickerService: AmazingTimePickerService,
    public discountsService: DiscountsService,
    public dialogRef: MatDialogRef<AddDiscountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    if(Object.entries(data.data).length != 0){
      this.discountDetails=data.data;
      console.log("discountDetails",this.discountDetails)
    }else{
    }
    this.title=data.title;
    this.isEditable=data.isEditable;
    this.minimumRequiredValueEditable=data.isEditable;
    this.buttonName=data.buttonName;
   }

  ngOnInit() {
    this.getPromoTypes();
    this. getDiscountTypes();
   
    
  }
  getPromoTypes(){
    this.discountsService.getPromoTypes().subscribe(resp => {
      this.PromotionalTypes=resp;
    })
  }
  selectDiscountTypes(type){
    console.log("@@@@@@@@@@@@@22",type) 
    this.discountTypes.forEach(element => {
      if(element.id==type){
        this.discountType=element.discountTypeName;
        this.isminValueDisplay=element.isMinimumOrderValueRequired;
        this.isMaxValueRequired=element.shouldLimitDiscountValue;
        this.discountDetails.discountTypeName=element.discountTypeName
       
      }
      if(type=="0a7bdbe2-31a8-4a01-9c53-9e0a6351fc9c"){
        this.minimumRequiredValueEditable=false;
      }else{
        this.minimumRequiredValueEditable=true;

      }
    })
  }
  discountValidation(value){ 

   
      this.discountTypes.forEach(element => {
        if(this.discountDetails.discountTypeID == element.id){
          if(value>100 && element.discountType =="PCT"){
            alert("Discount value cannot allow more Than 100");
            this.discountDetails.maxDiscountValue="100"
          }
        }
      })
  }
  
  selectPromoType(type){
    this.PromotionalTypes.forEach(element => {
      if(element.id==type){
        this.discountDetails.promoTypeName=element.promoTypeName;
        this.isPromoCodeRequired=element.isPromoCodeRequired
      }
    })
  }
  getDiscountTypes(){
    this.discountsService.getDiscountTypes().subscribe(resp => {
      this.discountTypes=resp;
      if(Object.entries(this.discountDetails).length != 0){ 
        this.discountTypes.forEach(element => {
          if(element.id==this.discountDetails.discountTypeID){
            this.discountType=element.discountTypeName;
            this.isminValueDisplay=element.isMinimumOrderValueRequired;
            this.isMaxValueRequired=element.shouldLimitDiscountValue;
            this.discountDetails.discountTypeName=element.discountTypeName;
           
          }
        })      }
    })
  }
  open() {
    const amazingTimePicker = this.amazingTimePickerService.open();
    amazingTimePicker.afterClose().subscribe(time => {
    });
  }
  // opencustom(){
  //   const amazingTimePicker = this.amazingTimePickerService.open();
  //   amazingTimePicker.afterClose().subscribe(time => {
  //    this.discountDetails.startHour=time;
  //   });
  // }
  // closeCustome(){
  //   const amazingTimePicker = this.amazingTimePickerService.open();
  //   amazingTimePicker.afterClose().subscribe(time => {
  //    this.discountDetails.endHour=time;
  //   });
  // }
  saveDiscounts(){

    if(this.discountDetails.discountName && this.discountDetails.discountTypeID && this.discountDetails.endDate && this.discountDetails.endHour && this.discountDetails.startDate && this.discountDetails.startHour
      && this.discountDetails.usageLimitValue && this.discountDetails.usageLimitType && this.discountDetails.promoTypeID && this.discountDetails.budgetAllocated 
      && this.discountDetails.shouldAddToWallet){
        
        this.discountsService.createDiscount(this.discountDetails).subscribe(value=>{
          this.dialogRef.close();
        })
      }else{
        confirm("Please fill all the fields.");
      }
    
    
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  
  numbersAndPerc(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 31) && (charCode < 37 || charCode > 37)  && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  updateDiscounts(){
    this.discountsService.updateDiscount(this.discountDetails).subscribe(value=>{
      this.dialogRef.close();
    })
  }

}

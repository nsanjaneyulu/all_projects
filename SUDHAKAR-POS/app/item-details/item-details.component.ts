import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InventoryService } from '../inventory.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'tafelposapp-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  itemDetailsOutletId: any;
  setItemsWeeks: any[];


  itemDetailsGet: any; 
  supplierId: any;
  preparationTime=20;
  outletId="";
  itemDetails:any;
  itemDetailsId: string;
  itemDetailsmallId: string;

  
  weeks:any[];
  itemAvailability = true;
  availabilityVeg = true;
  itemDiscount:any;
  price: any;
  veg: any;
  description: any;
  mallId: any;
  itemId: any;
  name: any;
  img:any;
  nameUpperCase: any;
  getUpdateItem: any;
  itemDetailsname: any;
  itemDetailsSubMenuId: any;
  deleteItemResp: any;
  showLoader: boolean;
  outletValidate : boolean = true;
  outletStartTime : any;
  outletEndTime:any;
  itemOuteletAvailable:boolean = false;
  overRideAvailablity:boolean = false;
  open=true;
  close=false;
  closedOn:any;
  available:any;
  logicType:any;
  overrideAvlFlag:any;
  itemOpenEndTime:any;
	itemOpenStartTime:any;
	itemCloseEndTime:any;
  itemCloseStartTime:any;
  itemWiseOpen:boolean;
	itemWiseClose:boolean;
  logicTypeData={}
  itemLogicType="";
  itemWeeksSelection = [];
  itemQuantity: any;
  itemLiveQuantity: any;
  times=[
		"00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00",
		"08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00",
		"16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"
	]
  constructor(private toastrModule:ToastrManager,private inventoryService: InventoryService,public dialogRef: MatDialogRef<ItemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) { 
      this.itemDetailsGet=data;
      this.itemDetailsId = this.itemDetailsGet.id;
     this.itemDetailsSubMenuId = this.itemDetailsGet.subMenuId;
     this.itemDetailsmallId = this.itemDetailsGet.mallId;
     this.itemDetailsOutletId = this.itemDetailsGet.outletId;
    
   
    this.getItemDetails(this.itemDetailsId,this.itemDetailsmallId);
    }

  ngOnInit() {
    this.itemWeeksSelection = [
      {name:'Sun', value:'item_1', id:'item_1',checked:false},
      {name:'Mon', value:'item_2', id:'item_2',checked:false},
      {name:'Tue', value:'item_3', id:'item_3',checked:false},
      {name:'Wed', value:'item_4', id:'item_4',checked:false},
      {name:'Thu', value:'item_5', id:'item_5',checked:false},
      {name:'Fri', value:'item_6', id:'item_6',checked:false},
      {name:'Sat', value:'item_7', id:'item_7',checked:false}
    ];
  }
  getItemDetails(itemId, mallId) {
    let orderUrl = "/mall/" + mallId + "/item/" + itemId;
    this.showLoader = true;
		this.inventoryService.getItemDetailsManager(orderUrl).subscribe(resp => {
     
      this.itemOpenStartTime = resp['availability']['startHour'];
      this.itemOpenEndTime = resp['availability']['endHour'];
      this.closedOn =  resp["availability"].closedOn;
      this.available= resp["availability"].available; 
        this.weeks= resp["availability"].weeks;
      
        for(var i=0;i<this.itemWeeksSelection.length;i++){
          this.itemWeeksSelection[i].checked = false;
          for(var j=0;j<this.weeks.length;j++){
            if(this.weeks[j]==this.itemWeeksSelection[i].name){
              this.itemWeeksSelection[i].checked = true;
              break;
            }
          }
        }
				this.logicType= resp["availability"].logicType;
        this.overrideAvlFlag =resp["availability"].overrideAvlFlag;
        this.itemCloseStartTime = resp['availability']['closeStartHour'];
        this.itemCloseEndTime = resp['availability']['closeEndHour'];
        this.itemLogicType=resp["availability"].logicType
      if(resp["availability"].logicType=="Open"){
        this.open=true;
        this.close=false;
        this.itemWiseOpen = true;
				this.itemWiseClose = false;
        this.itemOpenStartTime = resp['availability']['startHour'];
      
      this.itemOpenEndTime = resp['availability']['endHour'];
     
      this.logicTypeData={
        
				"startHour": this.itemOpenStartTime, 
				"endHour": this.itemOpenEndTime, 
				"closedOn": resp["availability"].closedOn,
				"available": resp["availability"].available, 
				"weeks": resp["availability"].weeks,
				"logicType": resp["availability"].logicType,
				"overrideAvlFlag": resp["availability"].overrideAvlFlag
				}

			}else{
        this.open=false;
        this.close=true;
        this.itemWiseOpen = false;
				this.itemWiseClose = true;
        this.itemCloseStartTime = resp['availability']['closeStartHour'];
        this.itemCloseEndTime = resp['availability']['closeEndHour'];
        this.logicTypeData={
					"closeStartHour": this.itemCloseStartTime, 
					"closeEndHour": this.itemCloseEndTime, 
					"closedOn": resp["availability"].closedOn,
					"available": resp["availability"].available, 
					"weeks": resp["availability"].weeks, 
					"logicType": resp["availability"].logicType,
					"overrideAvlFlag": resp["availability"].overrideAvlFlag
					}
      }
			
      
      this.weeks = resp['availability']['weeks'];
     
      this.itemAvailability = resp['availability']['available'];
      this.itemOuteletAvailable = this.itemAvailability;
      this.availabilityVeg = resp['veg'];
      this.price = resp['priceBeforeGST'];
      this.itemDetailsname = resp['name'];
      this.img = resp['img'];
      this.preparationTime= resp['preparationTime'];
      this.description = resp['description'];
      this.itemDiscount = resp['supplierDiscount'];
      this.itemQuantity = resp['quantity'];
      this.itemLiveQuantity = resp['liveQuantity'];
      this.showLoader = false;
		});
  }
  updateItem() {
    this.setItemsWeeks = [];   
    
   
    for(var i=0;i<this.itemWeeksSelection.length;i++){
      if(this.itemWeeksSelection[i].checked ==true){
        this.setItemsWeeks.push(this.itemWeeksSelection[i].name);
      }
    }
    if(this.itemLogicType=="Open"){
      this.itemWiseClose = false;
    this.itemWiseOpen = true;
    this.logicTypeData={
      
      "startHour": this.itemOpenStartTime, 
      "endHour": this.itemOpenEndTime, 
      "closedOn": this.closedOn,
      "available":this.available, 
      "weeks": this.setItemsWeeks,
      "logicType": this.itemLogicType,
      "overrideAvlFlag": this.overrideAvlFlag,
      "modifiedBy": this.supplierId
      }

    }else{
      this.itemWiseClose = true;
      this.itemWiseOpen = false;
      this.logicTypeData={
        "closeStartHour": this.itemCloseStartTime, 
        "closeEndHour": this.itemCloseEndTime, 
        "closedOn": this.closedOn,
        "available": this.available, 
        "weeks": this.setItemsWeeks, 
        "logicType": this.itemLogicType,
        "overrideAvlFlag": this.overrideAvlFlag,
        "modifiedBy": this.supplierId
        }

    }
    
    let checkItemAvailabilityUrl = "/validateItemAvailability";
    this.inventoryService.checkItemAvailability(checkItemAvailabilityUrl, this.itemDetailsmallId, this.outletId,  this.itemDetailsId, this.itemDetailsSubMenuId, this.logicTypeData ).subscribe(data => {
     
      if(!data["returnVal"]){
        if(data["reason"] =='Invalid Time'){
          this.toastrModule.errorToastr('Please check your item timings', 'Failure!');
				
				}else{
          this.toastrModule.errorToastr('Please check your item  selected weeks', 'Failure!');
					
				}
        this.itemAvailability= true;        
      }else{
        var updateItemName = this.itemDetailsname;
     
    if(this.itemOuteletAvailable == this.itemAvailability){
      this.overRideAvailablity = false;
    }else{
      this.overRideAvailablity = true;
    }
    this.logicTypeData['available']=this.itemAvailability;
    this.logicTypeData['overrideAvlFlag']=this.overRideAvailablity;
   
    let getUpdateItemUrl = "/item";
    this.inventoryService.getUpdateItem(getUpdateItemUrl, this.itemDetailsOutletId,this.itemDetailsmallId, this.itemDetailsId, this.itemDetailsSubMenuId, this.itemDiscount,this.price, this.availabilityVeg, this.itemDetailsname,this.description,this.preparationTime,this.img,this.logicTypeData, this.supplierId, this.itemQuantity, this.itemLiveQuantity).subscribe(resp => {
        this.getUpdateItem = resp;
        this.toastrModule.successToastr('Item Updated Successfully...', 'Success!');
        this.dialogRef.close();
       
    });
      }
    });
  //   setTimeout(function(){
  //     this.dialogRef.close();
  // },10000);
    
  }
  itemCheckOpen(){
    console.log("itemCheckOpen");
    this.itemWiseClose = true;
    this.itemWiseOpen = false;
		this.open=true;
    this.close=false;
    this.itemLogicType="Open"
    let data={
      "startHour": this.itemOpenStartTime, 
				"endHour": this.itemOpenEndTime, 
				"closedOn": this.closedOn,
				"available":this.available, 
				"weeks":this.weeks,
				"logicType": this.itemLogicType,
				"overrideAvlFlag":this.overrideAvlFlag
    }
    this.logicTypeData = data;
  }
  itemCheckClose(){
    console.log("itemCheckClose");
    this.itemWiseClose = false;
    this.itemWiseOpen = true;
		this.open=false;
    this.close=true;
    this.itemLogicType="Close";
    let data={
      "closeStartHour": this.itemCloseStartTime, 
					"closeEndHour": this.itemCloseEndTime, 
				"closedOn": this.closedOn,
				"available": this.available, 
				"weeks": this.weeks,
				"logicType": this.itemLogicType,
				"overrideAvlFlag": this.overrideAvlFlag
    }
    this.logicTypeData = data;
  }
  itemWeeksSelectionFunction(itemWeeksSelection,j){
  
    this.itemWeeksSelection.forEach((value,m)=>{
      if(j==m){
        value.checked = !value.checked;
      }

    })
 
  }
  modalDismiss() {
    this.dialogRef.close();
  }
}

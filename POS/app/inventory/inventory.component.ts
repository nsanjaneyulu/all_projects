import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog } from '@angular/material/dialog';
import { ItemDetailsComponent } from '../item-details/item-details.component';

@Component({
  selector: 'tafelposapp-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  subMenuPreparationTime =20;
  subMenuOpenStartTime: any;
  subMenuOpenCloseTime: any;
  subMenuCloseStartTime: any;
  subMenuCloseCloseTime: any


  logicType:any;

  outletSelection: boolean = false;
  submenu: any;
  subMenuLogicType = "";
  submenuData = {}
  submenuAvailable: boolean = false;
  submenuDiscount: any;
  preparationTime = 20;
  stockSubMenuMallId: any;
  weeksSelection = [];
  subMenuWeeksSelection = [];
  dropdownSettings = {};
  orderDetailsTableShow = false;
  stockSubMenuId: string;
  stockMenuId: string;
  items: any = [];
  showLoader: boolean;
  subMenuLoader: boolean;
  mallDataResp: any;
  mallDetailsDropdown: any;
  outletIDs: any;
  mallOutletId = "all";
  allPermitted = "Yes"
  outletId = "all";
  mallId: string;
  mallID: any;
  outletDetailsResp: any = {};
  getMallDetailsResp: any;
  originalStockData: any;
  StockData: any;
  stockSubMenus: any;
  panelOpenState = false;
  supplierId: any;
  outletIds: string[];
  outletOpen = false;
  outletClose = false;
  selectedOutlet: any;
  open = true;
  close = false;
  outletDatalogic = {};
  outletLogicType = "";
  outletAvailability = true;
  subMenuAvailability = true;
  availability = true;
  startTime: any;
  endTime: any;
  outletDiscount: any;
  weeks: any[];
  setWeeks:any[];
  setSubMenuWeeks: any[];
  logicTypeData = {}
  text: number = 0;
  overRideAvailablity: boolean = false;
  openEndTime: any;
  openStartTime: any;
  closeEndTime: any;
  closeStartTime: any;
  allpermited: any;
  clonningWeeks:any;
  outletOpenStartTime:any;
  outletOpenEndTime: any;
  outletCloseStartTime: any;
  outletCloseEndTime: any;
  outletWiseClose: any;
  outletWiseOpen: any;
  subMenuOutletOpen: boolean;
  subMenuOutletClose: boolean;
  getMallId:any;
  getOutletId: any;
  mallName: any;
  outletName: any;
  outletOpenStartTimeData = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00",
    "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
  ];
  outletOpenEndTimeData = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00",
    "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
  ];
  outletCloseStartTimeData = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00",
    "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
  ];
  outletCloseEndTimeData = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00",
    "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
  ];

  subMenuOpenStartTimeData = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00",
    "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
  ];
  subMenutOpenEndTimeData = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00",
    "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
  ];
  subMenuCloseStartTimeData = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00",
    "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
  ];
  subMenuCloseEndTimeData = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00",
    "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
  ];
  x:any;
  outletDetails:any=[]
  outeltId=""
  constructor(private inventoryService: InventoryService, private toastrModule:ToastrManager, private dialog: MatDialog) { 
    this.getMallId = localStorage.getItem('mallId');
    this.getOutletId = localStorage.getItem('outletIds');
    this.mallID = localStorage.getItem('mallId');
    this.outletId = localStorage.getItem('outletIds');
    this.outletDetails = JSON.parse(localStorage.getItem('outletDetails'))
    console.log("outletDetails",this.outletDetails)
    this.outeltId= this.outletDetails[0].id
    this.mallName = localStorage.getItem('mallName')
  }

  ngOnInit() {
    this.weeksSelection = [
      {name:'Sun', value:'1', id:'1',checked:false},
      {name:'Mon', value:'2', id:'2',checked:false},
      {name:'Tue', value:'3', id:'3',checked:false},
      {name:'Wed', value:'4', id:'4',checked:false},
      {name:'Thu', value:'5', id:'5',checked:false},
      {name:'Fri', value:'6', id:'6',checked:false},
      {name:'Sat', value:'7', id:'7',checked:false}
    ];
    this.subMenuWeeksSelection = [
      {name:'Sun', value:'subMenu_1', id:'subMenu_1',checked:false},
      {name:'Mon', value:'subMenu_2', id:'subMenu_2',checked:false},
      {name:'Tue', value:'subMenu_3', id:'subMenu_3',checked:false},
      {name:'Wed', value:'subMenu_4', id:'subMenu_4',checked:false},
      {name:'Thu', value:'subMenu_5', id:'subMenu_5',checked:false},
      {name:'Fri', value:'subMenu_6', id:'subMenu_6',checked:false},
      {name:'Sat', value:'subMenu_7', id:'subMenu_7',checked:false}
    ];
    this.mallDetails();
  }
  mallDetails() {
   
        this.getMallDetails(this.getMallId);
       
           
            
            this.setOutletId(this.getMallId, this.outeltId);
         
    

  }
  selectoutLet(outletId){
    console.log("outletId",outletId)
    this.outeltId=outletId;
    this.mallDetails();
  }
  outletWeeksFunction(weeksSelect,i){
   
    this.weeksSelection.forEach((value,k)=>{
      if(i==k){
        value.checked = !value.checked;
      }
    })
  }
  subMenuWeeksFunction(subMenuWeeksSelection,j){
   
    this.subMenuWeeksSelection.forEach((value,m)=>{
      if(j==m){
        value.checked = !value.checked;
      }

    })
   
  }
  getMallDetails(mallId) {
    var getMallDetailsUrl = "/mall/" + mallId;
    this.inventoryService.getMallDetails(getMallDetailsUrl).subscribe(resp => {
      this.getMallDetailsResp = resp;
     
      this.mallName = this.getMallDetailsResp.name;
    });
  }
  getStockMenus(mallId, outletId) {
    var getStockMenusUrl = "/mall/" + mallId + "/outlet/" + outletId;
    this.showLoader = true;
    this.inventoryService.getStockDataManager(getStockMenusUrl).subscribe(data => {
      this.StockData = data;
      this.stockSubMenus = this.StockData[0].subMenus
      this.originalStockData = [...this.StockData];
    });
    this.showLoader = !true;
  }
  subMenuAvailabilityCheck(submenuDetails){
    
    this.weeks = submenuDetails['availability']['weeks'];
    
      for(var i=0;i<this.subMenuWeeksSelection.length;i++){
        this.subMenuWeeksSelection[i].checked = false;
        for(var j=0;j<this.weeks.length;j++){
          if(this.weeks[j]==this.subMenuWeeksSelection[i].name){
            this.subMenuWeeksSelection[i].checked = true;
            break;
          }
        }
      }
      this.subMenuAvailability = submenuDetails['availability']['available'];
      this.submenuAvailable = submenuDetails['availability']['available']
      
      this.submenuDiscount = this.submenuData['discount'];
      this.subMenuPreparationTime = this.submenuData['preparationTime'];
     
      this.subMenuCloseCloseTime = submenuDetails['availability'].closeEndHour;
      this.subMenuCloseStartTime = submenuDetails['availability'].closeStartHour;
      this.subMenuOpenCloseTime = submenuDetails['availability'].endHour;
      this.subMenuOpenStartTime = submenuDetails['availability'].startHour;
      this.subMenuLogicType = submenuDetails['availability'].logicType
      if (submenuDetails['availability'].logicType == 'Open') {
        this.subMenuOutletOpen = true;
        this.subMenuOutletClose = false;
        this.subMenuOpenCloseTime = submenuDetails['availability'].endHour;
        this.subMenuOpenStartTime = submenuDetails['availability'].startHour;
        this.open = true;
        this.close = false;
      } else {
        this.subMenuOutletOpen = false;
        this.subMenuOutletClose = true;
        this.subMenuCloseCloseTime = submenuDetails['availability'].closeEndHour;
        this.closeStartTime = submenuDetails['availability'].closeStartHour;
        this.open = false;
        this.close = true;
      }
  }
  getStockSubMenusItems(stockSubMenu, outletId) {
    this.stockSubMenuId = stockSubMenu.id;
    this.stockSubMenuMallId = stockSubMenu.mallId;
    stockSubMenu.showStockItemsList = !stockSubMenu.showStockItemsList;
    let orderUrl = "/mall/" + stockSubMenu.mallId + "/submenu/" + stockSubMenu.id+'/getItem';
    this.inventoryService.getStockSubMenusManager(orderUrl).subscribe(resp => {
      this.items = resp;
      this.stockSubMenuId = stockSubMenu.id;
      this.stockMenuId = stockSubMenu.menuId;
      this.mallId = stockSubMenu.mallId;
      this.getSubMenuDetails(this.stockSubMenuId, this.stockSubMenuMallId);
     
      if (this.items.length > 0) {
        this.orderDetailsTableShow = true;
      
      }
      else {
        this.orderDetailsTableShow = false;
        
      }
    });
  }

  getSubMenuDetails(mallId, subMenuId) {
    var getSubMenuDetailsUrl = "/mall/" + subMenuId + "/submenu/" + mallId;
    this.inventoryService.getSubMenuDetails(getSubMenuDetailsUrl).subscribe(resp => {
      this.submenuData = resp;
      this.weeks = resp['availability']['weeks'];
      this.subMenuAvailability = resp['availability']['available'];
      this.submenuAvailable=resp['availability']['available']
     
      this.submenuDiscount=this.submenuData['discount'];
      this.subMenuPreparationTime=this.submenuData['preparationTime'];
    
      // if(this.submenu.discount){
        this.submenuDiscount = resp['discount'];
      // }
      // else{
      // this.submenuDiscount ="0";
      // }
     
      this.closeEndTime=resp['availability'].closeEndHour;
			this.closeStartTime=resp['availability'].closeStartHour;
			this.subMenuOpenCloseTime=resp['availability'].endHour;
			this.subMenuOpenStartTime= resp['availability'].startHour;
			this.subMenuLogicType= resp['availability'].logicType
			if(resp['availability'].logicType=='Open'){
				this.subMenuOutletOpen = true;
				this.subMenuOutletClose = false;
				this.subMenuOpenCloseTime=resp['availability'].endHour;
				this.subMenuOpenStartTime= resp['availability'].startHour;
				

			}else{
				this.subMenuOutletOpen = false;
				this.subMenuOutletClose = true;
				this.subMenuCloseCloseTime=resp['availability'].closeEndHour;
				this.subMenuCloseStartTime= resp['availability'].closeStartHour;
			
			}
      
    });
  }
  updateSubMenuDetails() {
    this.setSubMenuWeeks = [];   
    
    for(var i=0;i<this.subMenuWeeksSelection.length;i++){
      if(this.subMenuWeeksSelection[i].checked ==true){
        this.setSubMenuWeeks.push(this.subMenuWeeksSelection[i].name);
      }
    }
   
    if (this.subMenuLogicType == 'Open') {
      this.startTime = this.subMenuOpenStartTime;
      this.endTime = this.subMenuOpenCloseTime;
      this.logicTypeData = {
        "startHour": this.subMenuOpenStartTime,
        "endHour": this.subMenuOpenCloseTime,
        "closedOn": this.submenuData['availability'].closedOn,
        "available": this.submenuData['availability'].available,
        "weeks": this.setSubMenuWeeks,
        "logicType": this.subMenuLogicType,
        "overrideAvlFlag": this.submenuData['availability'].overrideAvlFlag
        // "modifiedBy": this.supplierId
      }
    } else {
      this.startTime = this.subMenuCloseStartTime;
      this.endTime = this.subMenuCloseCloseTime;
      this.logicTypeData = {
        "closeStartHour": this.subMenuCloseStartTime,
        "closeEndHour": this.subMenuCloseCloseTime,
        "closedOn": this.submenuData['availability'].closedOn,
        "available": this.submenuData['availability'].available,
        "weeks": this.setSubMenuWeeks,
        "logicType": this.subMenuLogicType,
        "overrideAvlFlag": this.submenuData['availability'].overrideAvlFlag,
        // "modifiedBy": this.submenuData
      }
    }
    if (this.submenuAvailable == this.subMenuAvailability) {
      this.overRideAvailablity = false;
    } else {
      this.overRideAvailablity = true;
    }
    this.logicTypeData['available'] = this.subMenuAvailability;
    this.logicTypeData['overrideAvlFlag'] = this.overRideAvailablity;
    this.submenuData['availability'] = this.logicTypeData;
    this.submenuData['weeks'] = this.setSubMenuWeeks;
    
    this.submenuData['discount'] = this.submenuDiscount;
    this.submenuData['preparationTime'] = this.subMenuPreparationTime;
    let checkSubmenuAvailabilityUrl = "/validateSubmenuAvailability";
    this.subMenuLoader = true;
    this.inventoryService.checkSubmenuAvailability(checkSubmenuAvailabilityUrl, this.submenuData['mallId'],this.outletId,this.submenuData['id'],this.logicTypeData).subscribe(data => {
      this.subMenuLoader = false;
      if (!data["returnVal"]) {
        if(data["reason"] =='Invalid Time'){
          this.toastrModule.errorToastr('Please check your SubMenu timings', 'Failure!');
				
				}else{
          this.toastrModule.errorToastr('Please check your SubMenu selected weeks', 'Failure!');
					
				}
        this.availability = true;
      
      } else {
        let updateSubMenuMallDetailsUrl = "/submenu/";
        this.subMenuLoader = true;
        this.inventoryService.updateSubMenuMallDetails(updateSubMenuMallDetailsUrl, this.submenuData).subscribe(data => {
          this.subMenuLoader = !true;
          this.toastrModule.successToastr('Submenu Details Updated Successfully', 'Success!');
        })
      }
    })
  }
  setOutletId(mallId, outletId) {
  
    let outletUrl = "/mall/" + mallId + "/outlet/" + outletId;
    
    this.inventoryService.getOutletDetails(outletUrl).subscribe(data => {
      this.outletDatalogic = data;
      this.outletName = this.outletDatalogic['name'];
     
      this.outletId = data['id'];
      this.selectedOutlet = outletId;
      this.outletAvailability = data['availability']['available'];
     
      this.startTime = data['availability']['startHour'];
      this.endTime = data['availability']['endHour'];
      this.weeks = data['availability']['weeks'];      
     
      for(var i=0;i<this.weeksSelection.length;i++){
        this.weeksSelection[i].checked = false;
        for(var j=0;j<this.weeks.length;j++){
          if(this.weeks[j]==this.weeksSelection[i].name){
            this.weeksSelection[i].checked = true;
            break;
          }
        }
      }
      
     
      if (data['discount']) {
        this.outletDiscount = data['discount'];
      }
      else {
        this.outletDiscount = "0";
      }
      this.outletCloseEndTime = data['availability'].closeEndHour;
      this.outletCloseStartTime = data['availability'].closeStartHour;
      this.outletOpenEndTime = data['availability'].endHour;
      this.outletOpenStartTime = data['availability'].startHour;
      this.outletLogicType = data['availability'].logicType
      if (data['availability'].logicType == 'Open') {
        this.outletWiseOpen = true;       
        this.outletWiseClose = false;
        this.outletOpen = true;       
        this.outletClose = false;
      
        this.outletOpenEndTime = data['availability'].endHour;
        this.outletOpenStartTime = data['availability'].startHour;
        this.open = true;
        this.close = false;
      } else {
        this.outletWiseOpen = false;       
        this.outletWiseClose = true;
        this.outletOpen = false;       
        this.outletClose = true;
       
        this.outletCloseEndTime = data['availability'].closeEndHour;
        this.outletCloseStartTime = data['availability'].closeStartHour;
        this.open = false;
        this.close = true;
      }
      this.getStockMenus(mallId, outletId);
    });
  }
  updateOutletDiscount() {
    this.setWeeks = [];   
   
    for(var i=0;i<this.weeksSelection.length;i++){
      if(this.weeksSelection[i].checked ==true){
        this.setWeeks.push(this.weeksSelection[i].name);
      }
    }
    if (this.outletLogicType == 'Open') {
      this.startTime = this.outletOpenStartTime;
      this.endTime = this.outletOpenEndTime
      this.logicTypeData = {
        "startHour": this.outletOpenStartTime,
        "endHour": this.outletOpenEndTime,
        "closedOn": this.outletDatalogic['availability'].closedOn,
        "available": this.outletDatalogic['availability'].available,
        "weeks": this.setWeeks,
        "logicType": this.outletLogicType,
        "overrideAvlFlag": this.outletDatalogic['availability'].overrideAvlFlag,
        "modifiedBy": this.supplierId
      }
     
    } else {
      this.startTime = this.outletCloseStartTime;
      this.endTime = this.outletCloseEndTime;
      this.logicTypeData = {
        "closeStartHour": this.outletCloseStartTime,
        "closeEndHour": this.outletCloseEndTime,
        "closedOn": this.outletDatalogic['availability'].closedOn,
        "available": this.outletDatalogic['availability'].available,
        "weeks": this.setWeeks,
        "logicType": this.outletLogicType,
        "overrideAvlFlag": this.outletDatalogic['availability'].overrideAvlFlag,
        "modifiedBy": this.supplierId
      }
     
    }
    let updateMenuUrl = "/validateOutletAvailability";
    this.inventoryService.checkOutletAvailability(updateMenuUrl, this.mallID, this.outletId, this.logicTypeData).subscribe(data => {
     
      if (!data["returnVal"]) {
        if(data["reason"] =='Invalid Time'){
          this.toastrModule.errorToastr('Please check your outlet timings', 'Failure!');
				
				}else{
          this.toastrModule.errorToastr('Please check your outlet selected weeks', 'Failure!');
					
				}
        this.availability = true;
      
      } else {
        let getOutletDetailsUrl = "/mall/" + this.mallID + "/outlet/" + this.outletId;
        this.showLoader = true;
        this.inventoryService.getOutletDetails(getOutletDetailsUrl).subscribe(data => {
          var outletData = data;
        
          if (outletData["availability"].available == this.outletAvailability) {
            this.overRideAvailablity = false;
          }
          else {
            this.overRideAvailablity = true;
          }
          this.logicTypeData['available'] = this.outletAvailability;
          this.logicTypeData['overrideAvlFlag'] = this.overRideAvailablity;
          let updateMallDetailsUrl = "/outlet";
          this.inventoryService.updateMallDetails(updateMallDetailsUrl, this.mallID, this.outletId, this.outletDiscount,this.logicTypeData).subscribe(data => {
           
           
              this.showLoader = !true;
              this.toastrModule.successToastr('Updated Successfully..!', 'Success!');
        
          })
        });
      }
    });
  }
  subMenuCheckOpen() {
   
   
      this.subMenuOutletOpen = true;
      this.subMenuOutletClose = false;
    
   
    this.open = true;
    this.close = false;
    this.outletLogicType = "Open"
    let data = {
      "startHour": this.closeStartTime,
      "endHour": this.closeEndTime,
      "closedOn": this.outletDatalogic['availability'].closedOn,
      "available": this.outletDatalogic['availability'].available,
      "weeks": this.weeks,
      "logicType": this.outletLogicType,
      "overrideAvlFlag": this.outletDatalogic['availability'].overrideAvlFlag
    }
    this.logicTypeData = data;
  }
  subMenuCheckClose() {
   
    this.subMenuOutletOpen = false;
    this.subMenuOutletClose = true;
    this.open = false;
    this.close = true;
    this.outletLogicType = 'Close';
    let data = {
      "closeStartHour": this.openStartTime,
      "closeEndHour": this.openEndTime,
      "closedOn": this.outletDatalogic['availability'].closedOn,
      "available": this.outletDatalogic['availability'].available,
      "weeks": this.weeks,
      "logicType": this.outletLogicType,
      "overrideAvlFlag": this.outletDatalogic['availability'].overrideAvlFlag
    }
    this.logicTypeData = data;
  }
  outletCheckOpen() {
   
    this.outletWiseOpen = true;
    this.outletWiseClose = false;
    this.outletOpen = true;
    this.outletClose = false;
    this.outletLogicType = "Open"
    let data = {
      "startHour": this.closeStartTime,
      "endHour": this.closeEndTime,
      "closedOn": this.outletDatalogic['availability'].closedOn,
      "available": this.outletDatalogic['availability'].available,
      "weeks": this.weeks,
      "logicType": this.outletLogicType,
      "overrideAvlFlag": this.outletDatalogic['availability'].overrideAvlFlag
    }
    this.logicTypeData = data;
  }
  outletCheckClose() {
    
    this.outletWiseOpen = false;
    this.outletWiseClose = true;
    this.outletOpen = false;
    this.outletClose = true;
    this.outletLogicType = 'Close';
    let data = {
      "closeStartHour": this.openStartTime,
      "closeEndHour": this.openEndTime,
      "closedOn": this.outletDatalogic['availability'].closedOn,
      "available": this.outletDatalogic['availability'].available,
      "weeks": this.weeks,
      "logicType": this.outletLogicType,
      "overrideAvlFlag": this.outletDatalogic['availability'].overrideAvlFlag
    }
    this.logicTypeData = data;
  }
  itemDetailsFunction(item) {
  
    item['outletId']=this.outletId
    const dialogRef = this.dialog.open(ItemDetailsComponent, {
      width: '60%',
     
      data: item,
      
    
     
     
    });
    dialogRef.afterClosed().subscribe(result => {

    });
   
  }

  validateOutletDiscount(outletDiscount) {
		if (outletDiscount > 50 || outletDiscount < 0) {
			this.toastrModule.errorToastr('Please enter between 0 and 50', 'Failure!');
			this.outletDiscount = 0;
		}
  }
  validateSubMenuDiscount(submenuDiscount) {
		if (submenuDiscount > 50 || submenuDiscount < 0) {
			this.toastrModule.errorToastr('Please enter between 0 and 50', 'Failure!');
			this.outletDiscount = 0;
		}
  }
  validateSubMentPreperationTime(subMenuPreparationTime){
    if(subMenuPreparationTime>90 || subMenuPreparationTime < 0){
      this.toastrModule.errorToastr('Please enter between 0 and 90', 'Failure!');
       this.preparationTime=20;
     }
  }
}

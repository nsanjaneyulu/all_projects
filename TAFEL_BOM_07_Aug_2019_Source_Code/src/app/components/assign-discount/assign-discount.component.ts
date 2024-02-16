import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { DiscountsService } from '../../services/discounts.service';
import { DashboardService } from '../../services/dashboard.service';



@Component({
  selector: 'app-assign-discount',
  templateUrl: './assign-discount.component.html',
  styleUrls: ['./assign-discount.component.scss']
})
export class AssignDiscountComponent implements OnInit {
  title = '';
  minDate = new Date();
  hr=new Date().getHours();
  min=new Date().getMinutes() >9 ? new Date().getMinutes(): "0"+new Date().getMinutes();
  buttonName="";
  discountTypes:any=[]
  discountDetails={
    startDate: "",
    startHour: "",
    endDate:"",
    endHour:"",
    status:null,
    "discountID":"",	
    "id":null,	
    "discountName":"",		
    "serviceStationID":"",	
    "serviceStationName":"",	
    "mallID":"",	
    "mallName":"",	
    "budgetConsumed":0,	
    "modifiedBy":"",	
    "isActive":""
  }
  assignedMallList:any={}
  serviceStations:any=[];
  mallList:any=[];
  getUserID:any;
  
  constructor(
    public amazingTimePickerService: AmazingTimePickerService,
    public discountsService: DiscountsService,
    public dashboardService:DashboardService,
    public dialogRef: MatDialogRef<AssignDiscountComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.getUserID = localStorage.getItem('USERID');
    if(Object.entries(data.data).length != 0){
      this.discountDetails=data.data;
    }else{
    }
    this.title=data.title;
    this.buttonName=data.buttonName;
   }
  ngOnInit() {
    this.discountsService.getServiceStations().subscribe(value=>{
      this.serviceStations=value
      this.serviceStations.forEach(value=>{
        value['isChecked']=false;
      })
    })
   let url ='/getAllDiscounts'
    this.discountsService.getAllDiscounts(url).subscribe(resp => {
      this.discountTypes=resp
    })
  }
  selectServiceStation(id){
    // if(this.assignedMallList.servicesStationId.length==0){
      let mallDetailsURL= "/serviceStation/"+id+"/getMallsForDiscount"
      this.dashboardService.mallDetailsService(mallDetailsURL)
      .subscribe(data => {
       this.mallList=data;
       this.mallList.forEach(value=>[
         value["isChecked"]=false
       ])
      })
    // }
    this.serviceStations.forEach(value=>{
      if(value.id==id){
        this.discountDetails.serviceStationName=value.name
      }
    })
  }
  selectMall(id){
    this.mallList.forEach(value=>{
      if(value.id==id){
        this.discountDetails.mallName=value.name
      }
    })
  }
  startDate=""
  startHour=""
  endDate=""
  endHour=""
  selectDiscount(id){
    this.discountTypes.forEach(value=>{
      if(value.id==id){
        this.discountDetails.discountName=value.discountName;
        this.discountDetails.isActive=value.isActive;
        this.discountDetails.startDate=value.startDate;
        this.discountDetails.startHour=value.startHour;
        this.discountDetails.endDate=value.endDate;
        this.discountDetails.endHour=value.endHour
        // this.discountsService.getAllAssignmentsList(id).subscribe(value=>{
        //   this.assignedMallList=value;
        //   console.log("@@@@@@@@@@@@@@@@@@2",this.assignedMallList)
        //   if(this.assignedMallList.mallId.length){
        //     var list=this.mallList.filter(value=>{
        //      if(this.assignedMallList.mallId.includes(value.id)){
        //        return value;
        //      }
        //     })
        //   }
        //   this.mallList=list;
        // })

      }
    })
  }
  selectAllCustomers(){
    this.mallList.forEach(value=>{
      value.isChecked=true;
    })
  }
  selectAllServiceStations(){
    this.serviceStations.forEach(value=>{
      value.isChecked=true;
    })
  }
  toggleVisibility(type,ischecked){

  }
  open() {
    const amazingTimePicker = this.amazingTimePickerService.open();
    amazingTimePicker.afterClose().subscribe(time => {
    });
  }
  opencustom(){
    const amazingTimePicker = this.amazingTimePickerService.open();
    amazingTimePicker.afterClose().subscribe(time => {
     this.startHour=time;
    });
  }
  closeCustome(){
    const amazingTimePicker = this.amazingTimePickerService.open();
    amazingTimePicker.afterClose().subscribe(time => {
     this.endHour=time;
    });
  }
 
  saveDiscounts(){
   
    let list=[]
    
    console.log("this.mallList",this.mallList)
    this.mallList.forEach(value=>{
      if(value.isChecked){
        list.push(
          {
              startDate: this.discountDetails.startDate,
              startHour: this.discountDetails.startHour,
              endDate:this.discountDetails.endDate,
              endHour:this.discountDetails.endHour,
              status:null,
              "discountID":this.discountDetails.discountID,	
              "id":null,	
              "discountName":this.discountDetails.discountName,		
              "serviceStationID":this.discountDetails.serviceStationID,	
              "serviceStationName":this.discountDetails.serviceStationName,		
              "budgetConsumed":0,	
              "modifiedBy":this.getUserID,
              mallID:value.id,
              mallName:value.name,	
              "isActive":this.discountDetails.isActive
            
          }
    

)
}
    })
    
    console.log("@@@@@@@@@@@@",list)
    this.discountsService.createDiscountAssignment(list).subscribe(value=>{
      this.dialogRef.close();
    })
  }
  updateDiscounts(){
    this.discountDetails.status=null
    this.discountsService.updateDiscountAssignment(this.discountDetails).subscribe(value=>{
      this.dialogRef.close();
    })
  }

}


import { Component, OnDestroy, OnInit, Input} from '@angular/core';
import { Subject } from 'rxjs';
import * as $ from 'jquery';
import { DiscountsService } from '../../services/discounts.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDiscountsComponent } from '../../components/add-discounts/add-discounts.component';
import { AssignDiscountComponent } from '../../components/assign-discount/assign-discount.component';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-discounts',
    templateUrl: './discounts.component.html',
    styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  searchValue: any;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  elements: any = [];
  showLoader=true;
  temp:any=[];
  count=0;
  editableRow:any=[]
  currentDate= new Date();
  finalHeaders=[];
  searchType="discountName";
  search="Enter Discount Title"
  persons=[];
  @Input() public fixedHeaders;
  @Input() public headersList;
  @Input() public variableRecieved;
  @Input() public filterColumns;

  
  nonHeadersList=[];

  constructor( 
    public discountsService: DiscountsService, 
    private dialog: MatDialog
    ){ }

  ngOnInit(): void {
    this.getAlldiscountsData()
    this.displayTable();
    // setInterval(() => this.displayTable(),60000);
  }
  getAlldiscountsData(){
    let url=""
  if(this.variableRecieved.pageTitle=="Discounts"){
     url ='/getAllDiscounts';
  }else{
    url="/getAllDiscountAssignments"
  }
  this.discountsService.getAllDiscounts(url).subscribe(resp => {
    this.editableRow=resp;
  })
  }

  searchBasedOnSelected(searchValue,searchType){
    this.dtOptions = {
      paging: true,
      ordering: false,
      searching: false,
    columnDefs: [
      { orderable: false, targets: "_all", visible: true },
    ],
    order: [],
    };
    this.persons = this.elements.filter(value=>{
      if(value[searchType]){
        return value[searchType].toString().toLowerCase().includes(searchValue.toLowerCase())
      }
    })
  }
  id:any
  message=""
  deleteId="";
  url=""
  ok="";
  no="";
  deleteDiscount(discount){
    let isActive=""
    let isAssigned="";
    this.editableRow.forEach(value=>{
      if(value.id==discount.dummyId){
        isActive=value.status;
        isAssigned=value.isAssigned;
      }
    })
    if(this.variableRecieved.pageTitle=="Discounts"){
 
      if(isAssigned=="Yes"){
        this.deleteId=""
         this.message="Discount cannot be deleted since this is assigned.";
         this.ok="OK";
         this.no="";
      }else{
        this.url="/discount/"+discount.dummyId
        this.deleteId=discount.dummyId
        this.message="Are you sure want to delete this discount."
        this.ok="Yes";
        this.no="No";
        
    }
  }else{
    if(isActive!="INACTIVE"){
      this.message="Assignment cannot be deleted since this is Active/ Have Transactions"
      this.deleteId=""
      this.ok="OK";
      this.no="";
    }else{
      this.message="Are you sure want to delete this assignment."
      this.deleteId=discount.dummyId;
      this.url="/discount/"+discount.discountId+'/assignment/'+discount.dummyId;
      this.ok="Yes";
      this.no="No";

  }
 
}
  }
  Yes(){
    if(this.deleteId!=""){
      this.discountsService.deleteDiscount(this.url).subscribe(resp => {
        this.displayTable();
    })
    }
  }

  selectSearchType(){
    this.filterColumns.forEach(value=>{
      if(value.id==this.searchType){
        this.search= "Enter " +""+value.name

      }
    })
  }
  start(discount){
    let discountDetails={}
    this.editableRow.forEach(value=>{
      if(value.id==discount.dummyId){
       value.isActive="Yes";
       value.status=null;
       value['ovdActiveFlag']=true
       discountDetails=value;
      }
   
    })
    this.discountsService.updateDiscountAssignment(discountDetails).subscribe(value=>{
      this.displayTable();
     })
  }
  stop(discount){
    let discountDetails={}
    this.editableRow.forEach(value=>{
      if(value.id==discount.dummyId){
        value.status=null;
       value.isActive="No";
       value['ovdActiveFlag']=true
       discountDetails=value;
      }
    })
    this.discountsService.updateDiscountAssignment(discountDetails).subscribe(value=>{
      this.displayTable();
     })
  }

  displayTable(){
    if(this.count!=0){
    this.dtTrigger.unsubscribe();
    }
    this.count++;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      
      language: {
        searchPlaceholder: "Search records"
      },
    select: true,
    columnDefs: [
      { orderable: false, targets: "_all", visible: true },
    ],
    order: [],
  };

  this.showLoader=true;
  let url=""
  if(this.variableRecieved.pageTitle=="Discounts"){
     url ='/getAllDiscounts'

  }else{
    url="/getAllDiscountAssignments"
  }
  this.discountsService.getAllDiscounts(url).subscribe(resp => {
    console.log(resp)
    this.elements=resp; 
    console.log("@@@@@@@@@@@@@@2",this.elements)
    this.showLoader=false;
    this.nonHeadersList=this.headersList.filter(element=>{
      return element.isChecked==false;
    })
    let listtttt=[]
    this.finalHeaders=[]
    this.headersList.filter(element=>{
      if(element.isChecked){
        listtttt.push(element.name)
      }
    })
    this.finalHeaders.push(Object.assign({}, listtttt))
    
     
      this.temp=resp;
      this.temp.forEach(value=>{
        value['dummyId']=value.id;
      })
       this.nonHeadersList.forEach(nonHeader=>{
         this.temp.forEach(value=>{
            delete value[nonHeader.id]
         })
       })
       this.persons = this.temp;
       this.dtTrigger.next();
     })
}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
 
  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  editDetails(title,discounts?){
  
   
    console.log("this.elements",this.elements)
    let editedDiscounts={
    }
    if(discounts){

      // if(this.variableRecieved.modelComponent!="AddDiscountsComponent"){
      //   this.discountsService.getAssignedDiscountById(discounts.dummyId).subscribe(value=>{
      // })}else{
        this.editableRow.forEach(value=>{ 
          if(value.id==discounts.dummyId){
            editedDiscounts=value
          }
        })
      // }
      
    }
    console.log("editedDiscounts",editedDiscounts)
    let finalData={}
    let data =discounts?editedDiscounts:{};
    if(discounts){
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var editableRowD = new Date(editedDiscounts['startDate'])
      console.log("today",today,date,editableRowD)
      if( editableRowD < today ){  
        finalData["isEditable"]=false
      }else{
        finalData["isEditable"]=true
      }
    }else{
      finalData["isEditable"]=true
    }
    finalData["data"]=data;
    finalData["title"]=title;
    finalData["buttonName"]=title;
    var dialogRef;
    if(this.variableRecieved.modelComponent=="AddDiscountsComponent"){
       dialogRef = this.dialog.open(AddDiscountsComponent, {
        width: '80%',
        data: finalData,
      });
    }else{
      dialogRef =this.dialog.open(AssignDiscountComponent, {
        width: '80%',
        data: finalData,
      });
    }
    dialogRef.afterClosed().subscribe(result => {
     this.dtTrigger.unsubscribe();
      this.getAlldiscountsData()
      this.displayTable();
    });
  }

  toggleVisibility(a,b){
    this.headersList.forEach((value,i)=>{
      if(value.id==b){
        this.headersList.splice(i, 1);
        this.headersList.push(a)
      }
    })
  }

  Ok(){
    this.dtTrigger.unsubscribe();
    this.displayTable();
  }
  
  selectAll(){
    this.headersList.forEach(value=>{
      value.isChecked=true;
    })
  }

  reset(){
    this.headersList.forEach(header=>{
      let isThere=false;
      this.fixedHeaders.forEach((fexedHeader,i)=>{
        if(header.id==fexedHeader.id){
          header.isChecked=true;
          isThere=true;
        }
      })
      if(!isThere){
        header.isChecked=false;
      }
    })
  }
  
  doRefresh(){
    this.dtTrigger.unsubscribe();
    this.displayTable();
  }
}


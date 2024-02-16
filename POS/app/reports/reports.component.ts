import { Component, OnInit, Optional } from '@angular/core';
import { ReportsService } from '../reports.service';
import { MessageService } from '../message.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { element } from 'protractor';
@Component({
  selector: 'tafelposapp-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  getTodayReportResp: any;
  public report: any;
  getMallDetailsResp: any = { address: { area: "", city: "", } };
  outletId: any;
  reportValue = "Today"
  selectedReport = "Today";
  userType: string = "";
  mallId: string;
  imageEndPoint: any;
  supplierId: any;
  topFiveQuantity = [];
  topFiveNames = [];
  topFivePrices = [];
  tableData = [];
  xAxisLables = [];
  topFourQuantity = [];
  topFourNames = [];
  topFourPrices = [];
  topThreeQuantity = [];
  topThreeNames = [];
  topThreePrices = [];
  topTwoQuantity = [];
  topTwoNames = [];
  topTwoPrices = [];
  topOneQuantity = [];
  topOneNames = [];
  topOnePrices = [];
  othersQuantity = [];
  othersPrice = [];
  pendingCount = [];
  pendingPrice = [];
  rejectedCount = [];
  rejectedPrice = [];
  revenuePrice = [];
  canvas: any;
  revenue = [];
  result: any;
  yesterdayResult: any;
  mallTimings: any;
  outletID: any;
  month = '';
  reportTitle = "";
  endOftheReportData: any
  itemList = [];
  orderList = [];
  totalAmount: any;
  tax: any;
  refundedAmount: any;
  packagingCharge: any;
  deliveryCharge: any;
  totalCreditedAmount: any;
  disableOutlet = false
  startTime: any = "10:00";
  endTime: any = "23:00";
  outletTimings: any;
  startDate: any;
  validationStartDate: any;
  endDate: any;
  validationEndstart: any;
  outletStartTime: any;
  outletEndTime: any;
  getOutletDetailsVal: any = { name: "" };
  outletName = "";
  type = "Summary"
  allpermited: any;
  getmallId: any;
  getoutletIds: any;
  // timePeriod: any;
  // reportType: any;
  orderMode = "All";
  // orderModeType: any;
  // orderModeAllType: any;
  itemListData: any;
  timePeriod = [
    { name: 'Today', value: '1', id: '1', checked: false },
    { name: 'Yesterday', value: '2', id: '2', checked: false },
    { name: 'Currentweek', value: '3', id: '3', checked: false },
    { name: 'Lastweek', value: '4', id: '4', checked: false },
    { name: 'CurrentMonth', value: '5', id: '5', checked: false },
    { name: 'LastMonth', value: '6', id: '6', checked: false }
  ];
  reportType = [
    { name: 'Summary', value: '7', id: '7', checked: false },
    { name: 'Transactional', value: '8', id: '8', checked: false }
  ];
  orderModeType = [
    { name: 'All', value: '9', id: '9', checked: true },
    { name: 'POS', value: '10', id: '10', checked: true },
    { name: 'Online', value: '11', id: '11', checked: true }
  ];
  orderModeAllType1 = [
    { name: 'All', value: '12', id: '12', checked: true },
    { name: 'POS-DineIn', value: '13', id: '13', checked: true },
    { name: 'POS-TakeAway', value: '14', id: '14', checked: true },
    { name: 'PickUp', value: '15', id: '15', checked: true },
    { name: 'Delivery', value: '16', id: '16', checked: true }

  ];
  orderModeAllType=[]
  selectedOutlets: any = [];
  message: string;
  outletDetails:any=[]
  outeltId="";
  mallName
  constructor(private reportsService: ReportsService, private messageService: MessageService) { 
    this.getmallId = localStorage.getItem('mallId');
    this.getoutletIds = localStorage.getItem('outletIds');
    this.supplierId = localStorage.getItem('dinerId');
    this.allpermited = localStorage.getItem('allpermited')
    this.outletDetails = JSON.parse(localStorage.getItem('outletDetails'))
    console.log("outletDetails",this.outletDetails)
    this.outeltId= this.outletDetails[0].id
    this.mallName = localStorage.getItem('mallName')
    this.getMallDetails(this.getmallId);
    this.getOutletDetails(this.getmallId, this.outeltId);
    this.orderModeTypeFun(this.orderModeType[0],"mode")
  }

  ngOnInit() {
    this.getMessage();
  }
  selectoutLet(outletId){
    this.outeltId=outletId;
    this.getMallDetails(this.getmallId);
    this.getOutletDetails(this.getmallId, this.outeltId);
    this.orderModeTypeFun(this.orderModeType[0],"mode")
  }
  getMallDetails(mallId) {
    var getMallDetailsUrl = "/mall/" + mallId;
    this.reportsService.getMallDetails(getMallDetailsUrl).subscribe(resp => {
      this.getMallDetailsResp = resp;
    });
  }
  getOutletDetails(mallId, outletId) {
    var getMallDetailsUrl = "/mall/" + mallId + "/outlet/" + outletId;
    this.reportsService.getOutletDetails(getMallDetailsUrl).subscribe(resp => {
      this.getOutletDetailsVal = resp;
      this.outletName = this.getOutletDetailsVal.name;
    });
  }
  getOutletTimings(timePeriod: any = "Today") {
    console.log("")
    var reportUrl = "/supplierid/" + this.supplierId + "/mallid/" + this.getmallId + "/report/" + this.selectedReport + "/outletTiming";
    this.reportsService.getOutletTimings(reportUrl).subscribe(resp => {
      this.outletTimings = resp;
      this.startTime = this.outletTimings.startTime;
      this.endTime = this.outletTimings.endTime;
      this.startDate = this.outletTimings.startDate;
      this.validationStartDate = this.outletTimings.startDate;
      this.validationEndstart = this.outletTimings.endDate;
      this.endDate = this.outletTimings.endDate;
      this.getEndOftheReport(timePeriod);
    })
  }
  showPdf=true;
  showExcel=true;
  sendReportTomailAsPDF() {
    this.showPdf=false;
    var mailUrl = "/mallid/" + this.getmallId + "/supplierid/" + this.supplierId + "/generateReportPDF?report=" + this.reportValue + "&fromdate=" + this.startDate + "&todate=" + this.endDate + "&fromTime=" + this.startTime + "&toTime=" + this.endTime + "&reportType=" + this.type + "&orderType="+this.selectedOrderType + "&orderSubType="+this.selectedOrderMode;
    this.reportsService.sendMail(mailUrl).subscribe(resp => {
      this.showPdf=true;
      if (resp['returnValue'] == "SUCCESS") {
        Swal.fire({
          title: `Status`,
          text: 'Mail sent successfully',
          type: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#5c0632',
        })
      } else {
        Swal.fire({
          title: `Status`,
          text: 'Fialed',
          type: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#5c0632',
        })
      }
    })
  }
  
  sendReportTomailAsExcel() {
    this.showExcel=false;
    var mailUrl = "/mallid/" + this.getmallId + "/supplierid/" + this.supplierId + "/generateReportExcel?report=" + this.reportValue + "&fromdate=" + this.startDate + "&todate=" + this.endDate + "&fromTime=" + this.startTime + "&toTime=" + this.endTime + "&reportType=" + this.type + "&orderType="+this.selectedOrderType + "&orderSubType="+this.selectedOrderMode;
    this.reportsService.sendMail(mailUrl).subscribe(resp => {
      this.showExcel=true;
      if (resp['returnValue'] == "SUCCESS") {
        Swal.fire({
          title: `Status`,
          text: 'Mail sent successfully',
          type: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#5c0632',
        })

      } else {
        Swal.fire({
          title: `Status`,
          text: 'Fialed',
          type: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#5c0632',
        })

      }
    })
  }
  getEndOftheReport(timePeriod: any = null) {
  console.log("selectedOutlets",this.selectedOutlets);
    var reporturl = "/supplierid/" + this.supplierId + "/mallid/" + this.getmallId + "/eodReport?fromDate=" + this.startDate + "&toDate=" + this.endDate + "&fromTime=" + this.startTime + "&toTime=" + this.endTime + "&reportType=" + this.type + "&orderType="+this.selectedOrderType + "&orderSubType="+this.selectedOrderMode;
    this.reportsService.getDataforEndOfthereport(reporturl).subscribe(resp => {
      this.endOftheReportData = resp;
      this.totalAmount = this.endOftheReportData["totalAmount"];
      this.tax = this.endOftheReportData["tax"];
      this.refundedAmount = this.endOftheReportData["refundAmount"];
      this.packagingCharge = this.endOftheReportData["packagingCharge"];
      this.deliveryCharge = this.endOftheReportData["deliveryCharge"];
      this.totalCreditedAmount = this.endOftheReportData["netAmount"];
      this.itemListData = this.endOftheReportData.itemList || [];
      this.itemList = this.endOftheReportData.itemList;
      this.itemList =  this.endOftheReportData.itemList.filter(item => {
        if(this.selectedOutlets.indexOf('All') !== -1) {
          return true;
        }
        return  this.selectedOutlets.map(a => a.toLowerCase()).indexOf( (item.orderType || "").toLowerCase() ) !== -1;
      })
      this.orderList = this.endOftheReportData.orderList;
      this.orderList =  this.endOftheReportData.orderList.filter(item => {
        if(this.selectedOutlets.indexOf('All') !== -1) {
          return true;
        }
        return  this.selectedOutlets.map(a => a.toLowerCase()).indexOf( (item.orderType || "").toLowerCase() ) !== -1;
      })
    })
  }
  generateEndOftheReport() {
    this.getEndOftheReport()
  }
  changeReports(timePeriod) {
    this.selectedReport=timePeriod;
    this.getOutletTimings(timePeriod);
  }
  selectReportType(type) {
    this.getOutletTimings();
  }
  selectedOrderType="";
  selectedOrderMode=""
  orderModeTypeFun(orderMode, type) { 
    if(type == 'mode') {
      if(orderMode.name == "All") {
        this.orderModeType = this.orderModeType.map(order => ({...order, checked: orderMode.checked}));
        this.orderModeAllType = this.orderModeAllType1.map(order => ({...order, checked: orderMode.checked}));

      }
      if(orderMode.name == "POS") {
        this.orderModeType.forEach(orderType => {
          if(orderType.name == "POS") {
            orderType.checked = orderMode.checked;
          }if(orderType.name == "All"){
            orderType.checked = false;
          }
        })
      }
      if(orderMode.name == "Online") {
        this.orderModeType.forEach(orderType => {
          if(orderType.name == "Online") {
            orderType.checked = orderMode.checked;
          }if(orderType.name == "All"){
            orderType.checked = false;
          }
        })
      }
      let list=[]
      this.orderModeType.forEach(data=>{
        if(data.name!="All"){
          list.push(data)
        }
      })
      let k=0;
      list.forEach(value=>{
        if(value.checked){
          k=k+1
        }
      })
      this.orderModeType.forEach(data=>{
        if(k==2 && data.name=="All"){
          data.checked=true;
        }
      })
      let x=0;
      this.orderModeType.forEach(value=>{ 
        if(value.name=="All" && value.checked){
          this.selectedOrderMode="All";
          this.selectedOrderType="All";
          this.orderModeAllType=this.orderModeAllType1;
          x=1;
          return;
        }else if( value.name=="POS" && value.checked && x==0 ){
          this.selectedOrderMode="All";
          this.selectedOrderType="POS"
          this.orderModeAllType=[
            { name: 'All', value: '12', id: '12', checked: true },
            { name: 'POS-DineIn', value: '13', id: '13', checked: true },
            { name: 'POS-TakeAway', value: '14', id: '14', checked: true },
          ]
          x=1;
          return;
        }
        else if( value.name=="Online" && value.checked && x==0 ){
          this.selectedOrderMode="All";
          this.selectedOrderType="Online"
          this.orderModeAllType=[
            { name: 'All', value: '12', id: '12', checked: true },
            { name: 'PickUp', value: '15', id: '15', checked: true },
            { name: 'Delivery', value: '16', id: '16', checked: true }
          ]
          x=1;
          return;
        }
      })
    }else{
      if(orderMode.name=="All"){
        this.orderModeAllType = this.orderModeAllType.map(order => ({...order, checked: orderMode.checked}));
      }
      let  orderModeAllTypeList=[];
      this.orderModeAllType.forEach(data=>{
        if(data.name!="All"){
          orderModeAllTypeList.push(data)
        }
      })
      let z=0;
      orderModeAllTypeList.forEach(element=>{
        if(element.checked){
          z=z+1;
        }
      })
      this.orderModeAllType.forEach(data=>{
        if(data.name=="All" && z==orderModeAllTypeList.length){
         data.checked=true;
        }
      })
      let y =0
      this.selectedOrderMode=""
      this.orderModeAllType.forEach(value=>{
        if(value.name=="All" && value.checked){
          this.selectedOrderMode="All"
          y=1;
        }else if(value.checked && y==0){
          this.selectedOrderMode = this.selectedOrderMode==""?value.name:this.selectedOrderMode+ "," +value.name
        }
      })
    }
    this.selectedOutlets = [...this.orderModeType, ...this.orderModeAllType]
      .filter(item => item.checked)
      .map(item => item.name)
    this.getOutletTimings();
    const outletIndex = this.selectedOutlets.indexOf(orderMode);
  }
  getMessage(): void {
    this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.message = message;
      }
      else {
        this.message = "Internet Connected";
      }
      setTimeout(() => {
        this.message = message;
      }, 1000);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'tafelposapp-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  getTodayReportResp:any;
  public report : any;
  getMallDetailsResp: any = {address:{area: "", city: "",}};
  outletId:any;
  reportValue="Today"
  selectedReport="Today";
  userType: string = "";
  mallId: string;
  imageEndPoint: any;
  supplierId:any;
  topFiveQuantity=[];
  topFiveNames=[];
  topFivePrices=[];
  tableData=[];
  xAxisLables=[];
  topFourQuantity=[];
  topFourNames=[];
  topFourPrices=[];
  topThreeQuantity=[];
  topThreeNames=[];
  topThreePrices=[];
  topTwoQuantity=[];
  topTwoNames=[];
  topTwoPrices=[];
  topOneQuantity=[];
  topOneNames=[];
  topOnePrices=[];
  othersQuantity=[];
  othersPrice=[];
  pendingCount=[];
  pendingPrice=[];
  rejectedCount=[];
  rejectedPrice=[];
  revenuePrice=[];
  canvas:any;
  revenue= [];    
  result:any;
  yesterdayResult:any;
  mallTimings:any;
  outletID:any;
  month='';
  reportTitle = "";
  endOftheReportData:any
  itemList=[];
  orderList=[];
  totalAmount:any;
  tax:any;
  refundedAmount:any;
  packagingCharge:any;
  deliveryCharge:any;
  totalCreditedAmount:any;
  disableOutlet=false
  startTime:any="10:00";
  endTime:any="23:00";
  outletTimings:any;
  startDate:any;
  validationStartDate:any;
  endDate :any;
  validationEndstart:any;
  outletStartTime:any;
  outletEndTime:any;
  getOutletDetailsVal: any = {name:""} ;
  outletName="";
  type="Summary"
  allpermited:any;
  getmallId: any;
  getoutletIds: any;
  timePeriod: any;
  reportType: any;
  constructor(private reportsService: ReportsService) { 
    this.getmallId = localStorage.getItem('mallId');
    // this.getmallId = "2277b28a-0b55-4586-95ba-01b6750975c5";
    this.getoutletIds = localStorage.getItem('outletIds');
    this.supplierId = localStorage.getItem('dinerId');
    console.log("getmallId getoutletIds",this.getmallId, this.getoutletIds);
    this.getMallDetails(this.getmallId);
    this.getOutletDetails(this.getmallId,this.getoutletIds);
    this.getOutletTimings()
  }

  ngOnInit() {
    this.timePeriod = [
      {name:'Today', value:'1', id:'1',checked:false},
      {name:'Yesterday', value:'2', id:'2',checked:false}
      // {name:'This Week', value:'3', id:'3',checked:false},
      // {name:'Last Week', value:'4', id:'4',checked:false},
      // {name:'This Month', value:'5', id:'5',checked:false},
      // {name:'Last Month', value:'6', id:'6',checked:false}
    ];
    this.reportType = [
      {name:'Summary', value:'1', id:'1',checked:false},
      {name:'Transactional', value:'2', id:'2',checked:false}
    ];
  }
  getMallDetails(mallId) {
		var getMallDetailsUrl = "/mall/" + mallId;
		
		this.reportsService.getMallDetails(getMallDetailsUrl).subscribe(resp => {
            this.getMallDetailsResp = resp;
            console.log("this.getMallDetailsResp...", this.getMallDetailsResp);
           
		});
    }
    getOutletDetails(mallId,outletId){
      var getMallDetailsUrl = "/mall/" + mallId+ "/outlet/"+outletId;
      this.reportsService.getOutletDetails(getMallDetailsUrl).subscribe(resp => {
          this.getOutletDetailsVal = resp;
          console.log("this.getOutletDetailsVal", this.getOutletDetailsVal);
          this.outletName=this.getOutletDetailsVal.name
         

      });
  }
  getOutletTimings(){
    var reportUrl ="/supplierid/"+this.supplierId+ "/mallid/" + this.getmallId + "/report/" + this.reportValue+"/outletTiming";
    this.reportsService.getOutletTimings(reportUrl).subscribe(resp => {
       this.outletTimings= resp;
       console.log("this.outletTimings", this.outletTimings);
       this.startTime = this.outletTimings.startTime;
       this.endTime=this.outletTimings.endTime;
       this.startDate = this.outletTimings.startDate;
       this.validationStartDate =this.outletTimings.startDate;
       this.validationEndstart = this.outletTimings.endDate;
       this.endDate = this.outletTimings.endDate;
       console.log("this.startDate", this.startDate, this.startTime);
       this.getEndOftheReport();


     
    })
   }
   sendReportTomailAsPDF(){
    var mailUrl ="/mallid/"+this.getmallId+"/supplierid/"+this.supplierId+"/generateReportPDF?report="+this.reportValue+"&fromdate="+this.startDate+"&todate="+this.endDate+"&fromTime="+this.startTime+"&toTime="+this.endTime+"&reportType="+this.type
    this.reportsService.sendMail(mailUrl).subscribe(resp=>{
      if(resp['returnValue']=="SUCCESS"){
        // this.showToast('bottom', 'Success..!');
      }else{
        // this.showToast('bottom', 'Failed..!');
      }
    })
  }
  sendReportTomailAsExcel(){
    var mailUrl ="/mallid/"+this.getmallId+"/supplierid/"+this.supplierId+"/generateReportExcel?report="+this.reportValue+"&fromdate="+this.startDate+"&todate="+this.endDate+"&fromTime="+this.startTime+"&toTime="+this.endTime+"&reportType="+this.type
    this.reportsService.sendMail(mailUrl).subscribe(resp=>{
      if(resp['returnValue']=="SUCCESS"){
        // this.showToast('bottom', 'Suceess..!');
      }else{
        // this.showToast('bottom', 'Failed..!');
      }
    })
  }
   getEndOftheReport(){
    var reporturl ="/supplierid/"+ this.supplierId+"/mallid/"+this.getmallId+"/eodReport?fromDate="+this.startDate+"&toDate="+this.endDate+"&fromTime="+this.startTime+"&toTime="+this.endTime+"&reportType="+this.type
    this.reportsService.getDataforEndOfthereport(reporturl).subscribe(resp => {
      this.endOftheReportData=resp;
      console.log("this.endOftheReportData", this.endOftheReportData);
      this.totalAmount=this.endOftheReportData["totalAmount"];
      this.tax=this.endOftheReportData["tax"];
      this.refundedAmount=this.endOftheReportData["refundAmount"];
      this.packagingCharge=this.endOftheReportData["packagingCharge"];
      this.deliveryCharge=this.endOftheReportData["deliveryCharge"];
      this.totalCreditedAmount=this.endOftheReportData["netAmount"];
      this.itemList=this.endOftheReportData.itemList;
      console.log("this.itemList", this.itemList);
      this.orderList=this.endOftheReportData.orderList;
    })    
}
generateEndOftheReport(){
  this.getEndOftheReport()
}
changeReports(x){
  
  this.getOutletTimings();
}
selectReportType(type){
  console.log("type", type);
  this.getOutletTimings();
}
}

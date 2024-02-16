import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, App, Label } from 'ionic-angular';
import { ReportsmanagerProvider } from '../../provider/reports/reports';
import {
    Storage
} from '@ionic/storage';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { LoginPage } from '../login/login';
import {
	imageEndPoint
} from '../../common/properties';
import {
	OrdersProvider
} from '../../provider/orders/orders';
import { BackbuttonService } from '../../provider/backbutton/backbutton.service';
import { m } from '@angular/core/src/render3';
import { FromEventObservable } from 'rxjs/observable/FromEventObservable';
import { ValueTransformer } from '@angular/compiler/src/util';


@Component({
    selector: 'page-reports',
    templateUrl: 'reports.html',
})
export class ReportsPage {
    @ViewChild('barChart') barChart;
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
    constructor(
      private oprovider: OrdersProvider, 
      private backbuttonService:BackbuttonService, 
      private appCtrl: App, 
      public navCtrl: NavController, 
      private storage: Storage, 
      private loadingCtrl: LoadingController, 
      public navParams: NavParams, 
      private toastCtrl: ToastController, 
      private reports: ReportsmanagerProvider
      ) {
        //this.getOutletDetailsVal.name ="";
       
        this.storage.get("ALL_PERMITABLE").then((val) => {
          this.allpermited = val;
        
         

      });
        this.storage.get("USER_TYPE").then((val) => {
            this.userType = val;
            this.storage.get("SUPPLIER_ID").then((val) => {
                if(val) {
                    this.supplierId = val;
                }
            });
            this.storage.get("MALL_ID").then((val) => {
                this.mallId = val;
                this.getMallDetails(this.mallId);
            });
            this.storage.get("OUTLET_OBJECT").then((val) => {
             
                this.outletId = val.filter(data=>{
                  return data.id!="All";
                });
                if(this.outletId.length==1){
                  this.disableOutlet=true
                }else{
                  this.disableOutlet=false
                }
                this.outletID=this.outletId[0].id; 
               
                // this.getMalltimings();
               
            });
            this.storage.get("OUTLET_ID").then((val) => {
              
              this.getOutletDetails(this.mallId,val[0]);
              this.getOutletTimings()

          });
            
        });
        this.imageEndPoint = imageEndPoint;
        var date = new Date();
        this.month = this.getMonthName(date.getMonth()-1);
    }
    getOutletDetails(mallId,outletId){
      var getMallDetailsUrl = "/mall/" + mallId+ "/outlet/"+outletId;
      this.oprovider.getOutletDetails(getMallDetailsUrl).subscribe(resp => {
          this.getOutletDetailsVal = resp;
          this.outletName=this.getOutletDetailsVal.name
         

      });
  }
  showToast(position: string, message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 2500,
			position: position,
			cssClass: 'toast-style'
		});
		toast.present(toast);
  }
       
      

   
    sendReportTomailAsPDF(){
      var mailUrl ="/mallid/"+this.mallId+"/supplierid/"+this.supplierId+"/generateReportPDF?report="+this.reportValue+"&fromdate="+this.startDate+"&todate="+this.endDate+"&fromTime="+this.startTime+"&toTime="+this.endTime+"&reportType="+this.type
      this.oprovider.sendMail(mailUrl).subscribe(resp=>{
        if(resp['returnValue']=="SUCCESS"){
          this.showToast('bottom', 'Success..!');
        }else{
          this.showToast('bottom', 'Failed..!');
        }
      })
    }
    sendReportTomailAsExcel(){
      var mailUrl ="/mallid/"+this.mallId+"/supplierid/"+this.supplierId+"/generateReportExcel?report="+this.reportValue+"&fromdate="+this.startDate+"&todate="+this.endDate+"&fromTime="+this.startTime+"&toTime="+this.endTime+"&reportType="+this.type
      this.oprovider.sendMail(mailUrl).subscribe(resp=>{
        if(resp['returnValue']=="SUCCESS"){
          this.showToast('bottom', 'Suceess..!');
        }else{
          this.showToast('bottom', 'Failed..!');
        }
      })
    }
    getEndOftheReport(){
        var reporturl ="/supplierid/"+ this.supplierId+"/mallid/"+this.mallId+"/eodReport?fromDate="+this.startDate+"&toDate="+this.endDate+"&fromTime="+this.startTime+"&toTime="+this.endTime+"&reportType="+this.type
        this.oprovider.getDataforEndOfthereport(reporturl).subscribe(resp => {
          this.endOftheReportData=resp
          this.totalAmount=this.endOftheReportData["totalAmount"];
          this.tax=this.endOftheReportData["tax"];
          this.refundedAmount=this.endOftheReportData["refundAmount"];
          this.packagingCharge=this.endOftheReportData["packagingCharge"];
          this.deliveryCharge=this.endOftheReportData["deliveryCharge"];
          this.totalCreditedAmount=this.endOftheReportData["netAmount"];
          this.itemList=this.endOftheReportData.itemList;
          this.orderList=this.endOftheReportData.orderList;
        })    
    }
    getMonthName(month) {
      var monthNames = [ "January", "February", "March", "April", "May", "June", 
                         "July", "August", "September", "October", "November", "December" ];
      return monthNames[month];
    }
    selectOutlet(){
      this.report.destroy();
      this.getGrpaphsData();
    }
    convertISTtoUST(value){
      if(value<10){
        return "0"+value+":00"
      }else{
        return value+":00"
      }
    }
    getMalltimings(){
        var reportUrl = "/mall/" + this.mallId + "/outlet/" + this.outletID;
        this.oprovider.getMallTimings(reportUrl).subscribe(resp => {
           this.mallTimings= resp;
           this.getGrpaphsData();
        })
    }

   ionViewDidLoad(){}
   noItemService(name){
       if(name=="null"){
        return "No Item";
       }else{
        return name;
       }
   }
   getOutletTimings(){
    var reportUrl ="/supplierid/"+this.supplierId+ "/mallid/" + this.mallId + "/report/" + this.reportValue+"/outletTiming";
    this.oprovider.getOutletTimings(reportUrl).subscribe(resp => {
       this.outletTimings= resp;
       this.startTime = this.outletTimings.startTime;
       this.endTime=this.outletTimings.endTime;
       this.startDate = this.outletTimings.startDate;
       this.validationStartDate =this.outletTimings.startDate;
       this.validationEndstart = this.outletTimings.endDate;
       this.endDate = this.outletTimings.endDate;
       this.getEndOftheReport();


       //this.getGrpaphsData();
    })
   }
   prepareJson(){
     let startIndex =  this.result.labels.indexOf(this.mallTimings.availability.startHour);
     let endIndex = this.result.labels.indexOf(this.mallTimings.availability.endHour);
     if(this.reportValue == "Today"){
      startIndex?this.xAxisLables=this.result.labels.slice(startIndex):this.xAxisLables=this.result.labels
      }else if(this.reportValue == "Yesterday"){
        this.xAxisLables=this.result.labels.slice(startIndex); 
      }else{
        this.xAxisLables=this.result.labels;
      }
    let top1 =[];
    let top2 =[];
    let top3 =[];
    let top4 =[];
    let top5 =[];
    let others=[];
    let pending=[];
    let rejected=[];
    this.xAxisLables.forEach((value,i)=>{ 
        this.topOneQuantity[i]=this.result.dataSets[0].mostvisiteditems[value][0].totalQty;
        this.topTwoQuantity[i]=this.result.dataSets[0].mostvisiteditems[value][1].totalQty; 
        this.topThreeQuantity[i]=this.result.dataSets[0].mostvisiteditems[value][2].totalQty;
        this.topFourQuantity[i]=this.result.dataSets[0].mostvisiteditems[value][3].totalQty;
        this.topFiveQuantity[i]=this.result.dataSets[0].mostvisiteditems[value][4].totalQty; 
        this.othersQuantity[i]=this.result.dataSets[0].mostvisiteditems[value][5].totalQty;
        this.topOneNames[i]=this.result.dataSets[0].mostvisiteditems[value][0].itemName;
        this.topTwoNames[i]=this.result.dataSets[0].mostvisiteditems[value][1].itemName;
        this.topThreeNames[i]=this.result.dataSets[0].mostvisiteditems[value][2].itemName;
        this.topFourNames[i]=this.result.dataSets[0].mostvisiteditems[value][3].itemName;
        this.topFiveNames[i]=this.result.dataSets[0].mostvisiteditems[value][4].itemName;
        this.topOnePrices[i]=this.result.dataSets[0].mostvisiteditems[value][0].totalPrice;
        this.topTwoPrices[i]=this.result.dataSets[0].mostvisiteditems[value][1].totalPrice;
        this.topThreePrices[i]=this.result.dataSets[0].mostvisiteditems[value][2].totalPrice;
        this.topFourPrices[i]=this.result.dataSets[0].mostvisiteditems[value][3].totalPrice;
        this.topFivePrices[i]=this.result.dataSets[0].mostvisiteditems[value][4].totalPrice;
        this.othersPrice[i]=this.result.dataSets[0].mostvisiteditems[value][5].totalPrice;
        this.pendingCount[i]=this.result.dataSets[0].qtyPendingorderlets[value];
        this.pendingPrice[i]=this.result.dataSets[0].pricePendingorderlets[value];
        this.rejectedCount[i]=this.result.dataSets[0].qtyRejectedorderlets[value];
        this.rejectedPrice[i]=this.result.dataSets[0].priceRejectedorderlets[value];
        this.revenuePrice[i]=this.result.dataSets[0].revenueGenerated.withGST[value];
        top1[i]=(this.noItemService(this.result.dataSets[0].mostvisiteditems[value][0].itemName) + "("+this.result.dataSets[0].mostvisiteditems[value][0].totalQty+")"+ " " + "Rs:"+this.result.dataSets[0].mostvisiteditems[value][0].totalPrice);
        top2[i]=(this.noItemService(this.result.dataSets[0].mostvisiteditems[value][1].itemName) + "("+this.result.dataSets[0].mostvisiteditems[value][1].totalQty+")"+ " " + "Rs:"+this.result.dataSets[0].mostvisiteditems[value][1].totalPrice);
        top3[i]=(this.noItemService(this.result.dataSets[0].mostvisiteditems[value][2].itemName) + "("+this.result.dataSets[0].mostvisiteditems[value][2].totalQty+")"+ " " + "Rs:"+this.result.dataSets[0].mostvisiteditems[value][2].totalPrice);
        top4[i]=(this.noItemService(this.result.dataSets[0].mostvisiteditems[value][3].itemName) + "("+this.result.dataSets[0].mostvisiteditems[value][3].totalQty+")"+ " " + "Rs:"+this.result.dataSets[0].mostvisiteditems[value][3].totalPrice);
        top5[i]=(this.noItemService(this.result.dataSets[0].mostvisiteditems[value][4].itemName) + "("+this.result.dataSets[0].mostvisiteditems[value][4].totalQty+")"+ " " + "Rs:"+this.result.dataSets[0].mostvisiteditems[value][4].totalPrice);
        others[i]=("others"+ "("+this.result.dataSets[0].mostvisiteditems[value][5].totalQty+")"+ " " + "Rs:"+this.result.dataSets[0].mostvisiteditems[value][5].totalPrice);
        pending[i]=("Pending Item"+ "("+this.result.dataSets[0].qtyPendingorderlets[value]+")"+ " " + "Rs:"+this.result.dataSets[0].pricePendingorderlets[value]);
        rejected[i]=("Rejected Item"+ "("+this.result.dataSets[0].qtyRejectedorderlets[value]+")"+ " " + "Rs:"+this.result.dataSets[0].priceRejectedorderlets[value]);
    })
    let topOneItem =Object.assign({}, top1.length>0?["Top 1 Orders"].concat(top1):top1);
    let toptowItem =Object.assign({}, top2.length>0?["Top 2 Orders"].concat(top2):top2);
    let topThreeNames =Object.assign({}, top3.length>0?["Top 3 Orders"].concat(top3):top3);
    let topFourNames =Object.assign({}, top4.length>0?["Top 4 Orders"].concat(top4):top4);
    let topFiveNames =Object.assign({}, top5.length>0?["Top 5 Orders"].concat(top5):top5);
    let otherNames = Object.assign({}, others.length>0?["Other Orders"].concat(others):others);
    let pendingItem =Object.assign({}, pending.length>0?["Pending Orders"].concat(pending):pending);
    let rejectedItem = Object.assign({}, rejected.length>0?["Rejected Orders"].concat(rejected):rejected);
    if(this.reportValue=="Month"){
     var minValue= Number(Math.min(...this.xAxisLables))
      let value=this.xAxisLables.map(value=>{
        let week=parseInt(value)+1-minValue
        return "Week-"+ week;
      })
      this.xAxisLables=value
      this.reportTitle= "Monthly Report( " + this.month + ")";
    }
    if(this.reportValue == "Week"){
      this.reportTitle= "Last Week Report ";
    }
    if(this.reportValue == "Today" || this.reportValue == "Yesterday" || this.reportValue == "Year" || this.reportValue == "LastYear"){
      this.reportTitle= this.reportValue+ " "+" Report ";
    }
    let labels= Object.assign({}, this.xAxisLables.length>0?[""].concat(this.xAxisLables):this.xAxisLables)
    this.tableData.push(labels,topOneItem,toptowItem,topThreeNames,topFourNames,topFiveNames,otherNames,pendingItem,rejectedItem);
    this.generateReport();
   }
   getGrpaphsData(){
    this.tableData=[]
    var reportUrl = "/getReports/mall/" + this.mallId + "/outlet/" + this.outletID + "/report/" + this.reportValue;
    this.oprovider.getreportsData(reportUrl).subscribe(resp => {
        this.result = resp; 
        this.prepareJson();
    });
   }

   generateReport()
   {
    var config = {
        type: "bar",
        data: {
          labels: this.xAxisLables,
          datasets: [
            { 
                label: "Revenue",
                type: "line",
                name:"Revenue",
                price: this.revenuePrice,
                yAxisID: 'B',
                backgroundColor: "rgb(153, 0, 204)",
                borderColor: "#8e5ea2",
                data: this.revenuePrice,
                fill: false
         },{
                label: "others",
                name:"other",
                backgroundColor: "#8FBC8F",
                yAxisID: 'A',
                price:this.othersPrice,
                data: this.othersQuantity,
                stack: 6,
          }, {
                label: "top 5 item",
                name:this.topFiveNames,
                price:this.topFivePrices,
                backgroundColor: "#9ACD32",
                yAxisID: 'A',
                data: this.topFiveQuantity,
                stack: 6
          }, {
                label: "top 4 item",
                yAxisID: 'A',
                name:this.topFourNames,
                price:this.topFourPrices,
                backgroundColor: "#3CB371",
                data: this.topFourQuantity,
                stack: 6
        },{
                label: "Top 3 item",
                yAxisID: 'A',
                name:this.topThreeNames,
                price:this.topThreePrices,
                backgroundColor: "#00FF7F",
                data: this.topThreeQuantity,
                stack: 6
          }, {
                label: "Top 2 item",
                yAxisID: 'A',
                name:this.topTwoNames,
                price:this.topTwoPrices,
                backgroundColor: "#32CD32",  
                data: this.topTwoQuantity,
                stack: 6
          },{
                label: "Top 1 item",
                yAxisID: 'A',
                name:this.topOneNames,
                price:this.topOnePrices,
                backgroundColor: "#008000",
                data: this.topOneQuantity,
                stack: 6
          },{
                label: "Pending",
                type: "bar",
                yAxisID: 'A',
                name:"Pending",
                legend: false,
                backgroundColor: "#ADD8E6",
                price:this.pendingPrice,
                data: this.pendingCount,
                stack: 1
          },{
                label: "rejected",
                type: "bar",
                yAxisID: 'A',
                name:"Rejected",
                legend: false,
                backgroundColor: "#F08080",
                price:this.rejectedPrice,
                data: this.rejectedCount,
                stack: 0
          }]
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function(tooltipItem,data) {
                        let name = "";
                        let quantity = "";
                        let price = "";
                        if(data.datasets[tooltipItem.datasetIndex].label=="rejected" ||  data.datasets[tooltipItem.datasetIndex].label=="Pending"
                         || data.datasets[tooltipItem.datasetIndex].label =='others'){
                             name = data.datasets[tooltipItem.datasetIndex].name;
                             quantity = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                             price = data.datasets[tooltipItem.datasetIndex].price[tooltipItem.index];
                             return ""+name + "("+quantity +")"+";"+ " " +"Rs:"+""+price; 
                         }else if(data.datasets[tooltipItem.datasetIndex].label =="Revenue"){
                            name = data.datasets[tooltipItem.datasetIndex].name;
                             quantity = "";
                             price = data.datasets[tooltipItem.datasetIndex].price[tooltipItem.index];
                             return ""+name +  " " +"Rs:"+""+price;
                         }
                         else{
                            name = data.datasets[tooltipItem.datasetIndex].name[tooltipItem.index];
                            quantity = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            price = data.datasets[tooltipItem.datasetIndex].price[tooltipItem.index];
                            return ""+name + "("+quantity +")"+";"+ " " +"Rs:"+""+price;
                         }
                        }
                }
            },
            title: {
                    display: true,
                     text: this.reportTitle
                    },
            legend: { 
                display: false
             },
          scales: {
            yAxes: [{
              type: 'linear',
              position: "left",
              id: 'A',
              stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Items Count'
              }, gridLines : {
                display : false
            }
            }, {
                stacked: false,
                position: "right",
                id: 'B',
                ticks: {
                    max: Math.round(Number(Math.max(...this.revenuePrice))/100)*100>1000?Math.round(Number(Math.max(...this.revenuePrice))/100)*100+1000:Math.round(Number(Math.max(...this.revenuePrice))/100)*100+100,
                    min: 0
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Revenue'
                  },
                  gridLines : {
                    display : false
                }
              }],
            xAxes: [{
              position: "bottom",
              stacked: true,
              display: true,
              stepSize: 1,
              gridLines : {
                display : false
            }
            }]
          }
        }
      };
      var chartElement = document.getElementById("mixed-chart");
      this.report = new Chart(chartElement, config); 
   }
    getMallDetails(mallId) {
		var getMallDetailsUrl = "/mall/" + mallId;
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
        });
        loading.present();
		this.oprovider.getMallDetails(getMallDetailsUrl).subscribe(resp => {
            this.getMallDetailsResp = resp;
            loading.dismiss();
		});
    }

    changeReports(x){
            // this.report.destroy();
            // this.getGrpaphsData();;
            this.getOutletTimings();
    }
    ionViewWillEnter(){
      this.reportValue="Today"
      this.selectedReport="Today";
      this.type="Summary"
      this.getOutletTimings();
    }
    logoutSupplier(){
        let deviceRegistrationId="";
        this.storage.get("DEVICE_REG_ID").then((val)=>{
          deviceRegistrationId=val;
          this.storage.clear().then(val=>{
            this.setOnlyDeviceRegistrationId(deviceRegistrationId);
            this.appCtrl.getRootNav().setRoot(LoginPage);
            this.backbuttonService.popAllPages();
          });
        })      
      } 
      setOnlyDeviceRegistrationId(deviceRegistrationId){
        this.storage.set("DEVICE_REG_ID",deviceRegistrationId);
      }

      // endOftheReport
      generateEndOftheReport(){
        this.getEndOftheReport()
      }
      selectReportType(type){
        this.getOutletTimings();
      }
}

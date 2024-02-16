import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, App } from 'ionic-angular';
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
const xAxesOptions = [{
    ticks: {
        fontSize: 9,
        color: '#34495e'
    }
}];
const registerLabelValues = () => {
    Chart.plugins.register({
        afterDraw: function(chartInstance) {
            if (chartInstance.config.options.showDatapoints) {
                var helpers = Chart.helpers;
                var ctx = chartInstance.chart.ctx;
                var fontColor = helpers.getValueOrDefault(chartInstance.config.options.showDatapoints.fontColor, chartInstance.config.options.defaultFontColor);
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'bold', Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = fontColor;
                chartInstance.data.datasets.forEach(function(dataset) {
                    for (var i = 0; i < dataset.data.length; i++) {
                        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                        var scaleMax = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
                        var yPos = (scaleMax - model.y) / scaleMax >= 0.93 ? model.y + 20 : model.y - 5;
                        ctx.fillText(dataset.data[i], model.x, yPos);
                    }
                });
            }
        }
    });
}
@Component({
    selector: 'page-reports',
    templateUrl: 'reports.html',
})
export class ReportsPage {
    @ViewChild('lastDayCanvas') lastDayCanvas;
    @ViewChild('lastWeekCanvas') lastWeekCanvas;
    @ViewChild('lastMonthCanvas') lastMonthCanvas;
    userType: string = "";
    mallId: string;
    lastDayChartElement: any;
    lastWeekChartElement: any;
    lastMonthChartElement: any;
    getReportDayWiseResp: any;
    getReportWeekWiseResp: any;
    getReportMonthWiseResp: any;
    lastDayTotalRevenue: any;
    lastWeekTotalRevenue: any;
    lastMonthTotalRevenue: any;
    imageEndPoint: any;
    originalPendingOrdersStore: any;
    getMallDetailsResp: any = {address:{area: "", city: "",}};
    sendReportDetails: any = { fromDate: null, toDate: null, reportType: null, email: null };
    sendReportError: boolean = false;
    errorMessage: String = "Please provide valid Date Range.";
    constructor(private oprovider: OrdersProvider, private backbuttonService:BackbuttonService, private appCtrl: App, public navCtrl: NavController, private storage: Storage, private loadingCtrl: LoadingController, public navParams: NavParams, private toastCtrl: ToastController, private reports: ReportsmanagerProvider) {
        this.storage.get("USER_TYPE").then((val) => {
            this.userType = val;
            this.storage.get("MALL_ID").then((val) => {
                this.mallId = val;
                this.getMallDetails(this.mallId);
                this.getReportDayWise(this.mallId);
                this.getReportWeekWise(this.mallId);
                this.getReportMonthWise(this.mallId);
            });
        });
        this.imageEndPoint = imageEndPoint;
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
    getReportDayWise(mallId) {

        var getReportDayWise = "/pieChartData/" + mallId;
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        this.reports.getReportDayWise(getReportDayWise,"all").subscribe(resp => {
          this.getReportDayWiseResp = resp;
          this.lastDayTotalRevenue = this.getReportDayWiseResp[0].totalRevenue;
          const { pendingorders, completedorders, rejectorders } = this.getReportDayWiseResp[0];
          this.lastDayChartElement = new Chart(this.lastDayCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: [' ', ' ', ' '],
                datasets: [{
                    data: [pendingorders, completedorders, rejectorders],
                    duration: 2000,
                    easing: 'easeInQuart',
                    backgroundColor: ['#fc9e4f', '#11BA91', '#ec6767'],
                    hoverBackgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 128, 0, 0.5)', 'rgba(255, 0, 0, 0.5)']
                }]
            },
            options: {
                maintainAspectRatio: true,
                showDatapoints: true,
                scales: {
                    xAxes: xAxesOptions
                },
                legend: {
                    display: false,
                    boxWidth: 80,
                    fontSize: 15,
                    padding: 0
                },
                tooltips: {
                    enabled: true,
                    mode: 'nearest'
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                animation: {
                    duration: 3000
                }
            }

        });
          
          console.log("this.getReportDayWiseResp", this.getReportDayWiseResp);
          this.originalPendingOrdersStore = [...this.getReportDayWiseResp];
          loading.dismiss();
        });
    }
    getReportWeekWise(mallId) {
        var getReportWeekWise = "/pieChartData/" + mallId;
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.reports.getReportWeekWise(getReportWeekWise, "all").subscribe(resp => {
            this.getReportWeekWiseResp = resp || [];
            this.lastWeekTotalRevenue = this.getReportWeekWiseResp[0].totalRevenue;
            console.log("this.getReportWeekWiseResp", this.getReportWeekWiseResp);
          
            const { pendingorders, completedorders, rejectorders } = this.getReportWeekWiseResp[0]; //data;
    
            registerLabelValues();
            this.lastWeekChartElement = new Chart(this.lastWeekCanvas.nativeElement, {
                type: 'bar',
                data: {
                    labels: [' ', ' ', ' '],
                    datasets: [{
                        data: [pendingorders, completedorders, rejectorders],
                        duration: 2000,
                        easing: 'easeInQuart',
                        backgroundColor: ['#fc9e4f', '#11BA91', '#ec6767'],
                        hoverBackgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 128, 0, 0.5)', 'rgba(255, 0, 0, 0.5)']
                    }]
                },
                options: {
                    maintainAspectRatio: true,
                    showDatapoints: true,
                    scales: {
                        xAxes: xAxesOptions
                    },
                    legend: {
                        display: false,
                        boxWidth: 80,
                        fontSize: 15,
                        padding: 0
                    },
                    tooltips: {
                        enabled: true,
                        mode: 'nearest'
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    },
                    animation: {
                        duration: 3000
                    }
                }

            });
           
            loading.dismiss();
        });
    }
    getReportMonthWise(mallId) {
        var getReportMonthWise = "/pieChartData/" + mallId;
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.reports.getReportMonthWise(getReportMonthWise, "all").subscribe(resp => {
            this.getReportMonthWiseResp = resp;
            this.lastMonthTotalRevenue = this.getReportMonthWiseResp[0].totalRevenue;
            console.log("this.getReportMonthWiseResp", this.getReportMonthWiseResp);
            const { pendingorders, completedorders, rejectorders } = this.getReportMonthWiseResp[0];
            this.lastMonthChartElement = new Chart(this.lastMonthCanvas.nativeElement, {
                type: 'bar',
                data: {
                    labels: [' ', ' ', ' '],
                    datasets: [{
                        data: [pendingorders, completedorders, rejectorders],
                        duration: 2000,
                        easing: 'easeInQuart',
                        backgroundColor: ['#fc9e4f', '#11BA91', '#ec6767'],
                        hoverBackgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 128, 0, 0.5)', 'rgba(255, 0, 0, 0.5)']
                    }]
                },
                options: {
                    maintainAspectRatio: true,
                    showDatapoints: true,
                    scales: {
                        xAxes: xAxesOptions
                    },
                    legend: {
                        display: false,
                        boxWidth: 80,
                        fontSize: 15,
                        padding: 0
                    },
                    tooltips: {
                        enabled: true,
                        mode: 'nearest'
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    },
                    animation: {
                        duration: 3000
                    }
                }

            });
            loading.dismiss();
        });
    }
    ionViewDidLoad() {
       
        this.sendReportDetails.reportType = 'all';
        this.sendReportDetails.email = null;
    }
    ionViewDidEnter() {
        
        this.sendReportDetails.reportType === null ? 'all' : this.sendReportDetails.reportType;
    }
    sendReports() {
        if (this.sendReportDetails && this.sendReportDetails.reportType) {
            if (this.sendReportDetails.reportType === 'other') {
                if (this.sendReportDetails.fromDate && this.sendReportDetails.toDate) {
                    var fromDate = moment(this.sendReportDetails.fromDate);
                    var toDate = moment(this.sendReportDetails.toDate);
                    if (fromDate.isAfter(toDate)) {
                        this.sendReportError = true;
                        this.errorMessage = "From Date should not be greater than To Date";
                    }
                    else {
                        this.sendReportError = false;
                        this.showToast('bottom', 'Report Sent successfully to the registered mail id.');
                    }
                }
                else {
                    this.sendReportError = true;
                    if (!this.sendReportDetails.fromDate && !this.sendReportDetails.toDate) {
                        this.errorMessage = "Please provide valid Date Range.";
                    }
                    else if (!this.sendReportDetails.fromDate) {
                        this.errorMessage = "From Date should not be empty.";
                    }
                    else if (!this.sendReportDetails.toDate) {
                        this.errorMessage = "To Date should not be empty.";
                    }
                }
            }
            else {
                this.sendReportError = false;
                this.showToast('bottom', 'Report Sent successfully to the registered mail id.');
            }
        }
        else {
            this.sendReportError = true;
        }
    }
    onReportTypeChange($event) {

        if (this.sendReportDetails.reportType !== 'other') {
            this.sendReportError = false;
        }
    }
    showSendReport() {
        this.showToast('bottom', 'Swipe left to delete.')
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
}

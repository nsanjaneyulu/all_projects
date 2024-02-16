import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  outletId: string;
  mallID: string;
  allPermitted: string;
  mallDataResp: any;
  outletDetailsResp: any = [];
  timePeriodGet: string;
  supplierId: string;
  outletTimings: any;
  startTime: any = "10:00";
  endTime: any = "23:00";
  validationEndsDate: string
  validationStartDate: string;
  endDate: string;
  startDate: string;
  possuppliersGet: any;
  orderModeAllType = [];
  selectedOutlets: any;
  endOftheReportData: any;
  itemList = [];
  orderList = [];
  totalAmount: string;
  tax: string;
  refundedAmount: string;
  packagingCharge: string;
  deliveryCharge: string;
  totalCreditedAmount: string;
  itemListData: any = [];
  orderModeType = [
    { name: 'All', value: '9', id: '9', checked: true },
    { name: 'POS', value: '10', id: '10', checked: true },
    { name: 'Online', value: '11', id: '11', checked: true }
  ];
  constructor(public dashboardService: DashboardService) { }

  ngOnInit() {
    this.mallDetails();
  }
  mallDetails() {
    const mallDetailsURL = '/userid/' + "00ae9fbf-e7f8-469e-81da-3ce16cb4c126" + '/getMalls';
    this.dashboardService.getMallDetails(mallDetailsURL)
      .subscribe(data => {
        this.mallDataResp = data;
        this.mallID = this.mallDataResp[0].mallId;
        this.allPermitted = this.mallDataResp[0].allPermitted;
        if (this.allPermitted == 'No') {
          let getOutletDetailsURL = 'mall/' + this.mallID + '/getOutletByMallID';
          this.dashboardService.outletDetailsService(getOutletDetailsURL)
            .subscribe(data => {
              this.outletDetailsResp = data;
              let outletId = this.outletDetailsResp['jmoutlet'][0].id;
              this.outletId = outletId;
              this.orderModeTypeFun(this.orderModeType[0], "mode");
            });
        }
        else {
          this.outletId = this.outletId;
        }
      },
        error => console.log(error));
  }
  mallNameChange(mallID) {
    this.mallID = mallID;
    this.mallDataResp.forEach(element => {
      if (element.mallId == mallID) {
        this.allPermitted = element.allPermitted;
        let getOutletDetailsURL = 'mall/' + mallID + '/getOutletByMallID';
        this.dashboardService.outletDetailsService(getOutletDetailsURL)
          .subscribe(data => {
            this.outletDetailsResp = data;
            let outlerId = this.outletDetailsResp['jmoutlet'][0].id;
            this.outletId = outlerId;
            this.orderModeTypeFun(this.orderModeType[0], "mode");
          });
      }
    });
  }
  outletNameChange(outletId) {
    this.outletId = outletId;
  }
  getOutletTimings(timePeriod: any = "Today") {
    if (this.timePeriodGet === undefined) {
      this.timePeriodGet = "Today";
    }
    this.getPosSuppliers().subscribe(possuppliersGet => {
      possuppliersGet.forEach(posSupplieroutlet => {
        if (posSupplieroutlet['outletIds'].length >= 1) {
          posSupplieroutlet['outletIds'].forEach(posSupplieroutletGet => {
            if (posSupplieroutletGet === this.outletId) {
              this.supplierId = posSupplieroutlet['id'];
              console.log("this.supplierId", this.supplierId);
            }
          });
        }
      });
      var reportUrl = "/supplierid/" + this.supplierId + "/mallid/" + this.mallID + "/report/" + this.timePeriodGet + "/outletTiming?outletId=" + this.outletId;
      this.dashboardService.getOutletTimings(reportUrl).subscribe(resp => {
        this.outletTimings = resp;
        this.startTime = this.outletTimings.startTime;
        this.endTime = this.outletTimings.endTime;
        this.startDate = this.outletTimings.startDate;
        this.validationStartDate = this.outletTimings.startDate;
        this.validationEndsDate = this.outletTimings.endDate;
        this.endDate = this.outletTimings.endDate;
        this.getReport(timePeriod);
      });
    });
  }
  getReport(timePeriod: any = null) {
    var reporturl = "/supplierid/" + this.supplierId + "/mallid/" + this.mallID + "/eodReport?fromDate=" + this.startDate + "&toDate=" + this.endDate + "&fromTime=" + this.startTime + "&toTime=" + this.endTime + "&reportType=" + "Summary" + "&OrderType=" + "All" + "&orderSubType=" + "All" + "&outletId=" + "c413354e-f044-46c6-8628-323875eab9e3";
    ;
    this.dashboardService.getDataforEndOfthereport(reporturl).subscribe(resp => {
      this.endOftheReportData = resp;
      this.totalAmount = this.endOftheReportData["totalAmount"];
      this.tax = this.endOftheReportData["tax"];
      this.refundedAmount = this.endOftheReportData["refundAmount"];
      this.packagingCharge = this.endOftheReportData["packagingCharge"];
      this.deliveryCharge = this.endOftheReportData["deliveryCharge"];
      this.totalCreditedAmount = this.endOftheReportData["netAmount"];
      this.itemListData = this.endOftheReportData.itemList || [];
      this.itemList = this.endOftheReportData.itemList;
      this.itemList = this.endOftheReportData.itemList.filter(item => {
        if (this.selectedOutlets.indexOf('All') !== -1) {
          return true;
        }
        return this.selectedOutlets.map(a => a.toLowerCase()).indexOf((item.orderType || "").toLowerCase()) !== -1;
      })
      this.orderList = this.endOftheReportData.orderList;
      this.orderList = this.endOftheReportData.orderList.filter(item => {
        if (this.selectedOutlets.indexOf('All') !== -1) {
          return true;
        }
        return this.selectedOutlets.map(a => a.toLowerCase()).indexOf((item.orderType || "").toLowerCase()) !== -1;
      })
    })
  }
  public getPosSuppliers(): Observable<any> {
    const subject$ = new Subject();
    const posLoginUsersURL = '/allSuppliers';
    this.dashboardService.posLoginUsersServices(posLoginUsersURL)
      .subscribe(data => {
        this.possuppliersGet = data;
        subject$.next(this.possuppliersGet);
      })
    return subject$;
  }
  orderModeTypeFun(orderMode, type) {
    if (type == 'mode') {
      if (orderMode.name == "All") {
        this.orderModeType = this.orderModeType.map(order => ({ ...order, checked: orderMode.checked }));
        this.orderModeAllType = this.orderModeAllType.map(order => ({ ...order, checked: orderMode.checked }));
        console.log("this.orderModeAllType",this.orderModeAllType);
      }
      if (orderMode.name == "POS") {
        this.orderModeAllType.forEach(orderType => {
          if (orderType.name == "POS-DineIn" || orderType.name == "POS-TakeAway") {
            orderType.checked = orderMode.checked;
          }
        })
      }
      if (orderMode.name == "Online") {
        this.orderModeAllType.forEach(orderType => {
          if (orderType.name == "PickUp" || orderType.name == "Delivery") {
            orderType.checked = orderMode.checked;
          }
        })
      }
    }
    this.selectedOutlets = [...this.orderModeType, ...this.orderModeAllType]
      .filter(item => item.checked)
      .map(item => item.name)
    this.getOutletTimings();
  }
}

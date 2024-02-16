import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as $ from 'jquery';
import * as moment from 'moment';
import { endpoints } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormControl, FormArray, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { masterData } from "../../../environments/masterdata/masterdata";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isDefaultView = true;
  public CorrespondanceGlobalChart;
  public otherGlobalChart;
  public filterForm: FormGroup;
  public userList;
  public locationsList;
  public storesList;
  public filterValuesArray;
  DefaultValue: any;
  DefaultValueFilter: any;
  recentData: any;
  //filterForm;
  filterTypes: ['location', 'store', 'user'];
  correspondanceChartData = {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Correspondence Letters',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
  otherChartData = {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Other Letters',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
  filtersFormView = false;
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private http: HttpClient
  ) { }
  showFilters() {
    this.filtersFormView = !this.filtersFormView;
  }
  ngOnInit() {
    this.filterValuesArray = [{ "id": 0, "displayName": "Select Filter Text" }];
    this.getCmsData();
    this.getUsersList();
    this.DefaultValue = 'user';

    this.loadCharts();
    this.loadActivities();
    this.filterTypes = ['location', 'store', 'user'];
    this.filterForm = this.formBuilder.group({
      filterType: new FormControl(),
      filterFromDate: new FormControl(),
      filterToDate: new FormControl(),
      filterText: new FormControl()
    });
  }
  getCmsData() {
    this.httpService.doGet(endpoints.get.getMasterData).subscribe((result: any) => {
      if (result.status === 'success') {
        this.locationsList = result.data.countriesInfo;
        this.storesList = result.data.companiesInfo;
        console.log(this.storesList);
      }
    }, err => {
      console.log(err);
    });
  }
  getUsersList() {
    this.httpService.doGet(endpoints.get.getAllUsers).subscribe((result: any) => {
      if (result.status === 'success') {
        this.userList = result.data;
        console.log(this.userList);
      }
    }, err => {
      console.log(err);
    });
  }
  loadCharts() {
    const ctx: any = $('#myChart');
    const ctx2: any = $('#myChart2');
    new Chart(ctx, this.correspondanceChartData).destroy();
    return (new Chart(ctx, this.correspondanceChartData), new Chart(ctx2, this.otherChartData));
  }
  loadActivities() {
    this.httpService.doGet(endpoints.get.getRecentActivityData).subscribe((result: any) => {
      console.log('result', result);
      this.recentData = result.data;
    }, err => {
      console.log(err);
    });
  }
  changeFilterType($event, type) {
    var filterValues = [];
    if ($event == 'user') {
      this.userList.forEach(item => {
        filterValues.push({ "id": item.user_id, "displayName": item.user_first_name + " " + item.user_last_name });
      });
      this.filterValuesArray = filterValues;
    }
    if ($event == 'location') {
      this.locationsList.forEach(item => {
        filterValues.push({ "id": item.country_id, "displayName": item.country_name });
      });
      this.filterValuesArray = filterValues;
    }
    if ($event == 'store') {
      this.storesList.forEach(item => {
        filterValues.push({ "id": item.company_id, "displayName": item.company_name });
      });
      this.filterValuesArray = filterValues;
    }
    this.DefaultValueFilter = this.filterValuesArray[0].id;
  }
  getFormValues(form: NgForm) {
    this.isDefaultView = false;
    form.value.filterFromDate = moment(form.value.filterFromDate).format('YYYY MM DD');
    form.value.filterToDate = moment(form.value.filterToDate).format('YYYY MM DD');
    console.log(form.value);
    this.http.post(endpoints.post.getFilteredData, form.value).subscribe((filterResult: any) => {
      console.log('result', filterResult);
      this.recentData = filterResult.filterData.data.tableResult;
      var correpChartData = filterResult.filterData.data.correspondanceGraphData;
      var otherLettersChartLabelsCorresp = [];
      var otherLettersChartValuesCorresp = [];
      var backgroundColorsArrayCorresp = [];
      var borderColorsArrayCorresp = [];
      correpChartData.forEach(element => {
        otherLettersChartLabelsCorresp.push(element.monthName);
        otherLettersChartValuesCorresp.push(element.total);
        backgroundColorsArrayCorresp.push('rgba(255, 206, 86, 0.2)');
        borderColorsArrayCorresp.push('rgba(255, 206, 86, 1)');
      });

      var otherChartDataResult = filterResult.filterData.data.otherGraphData;
      var otherLettersChartLabels = [];
      var otherLettersChartValues = [];
      var otherBackgroundColorsArray = [];
      var otherBorderColorsArray = [];
      otherChartDataResult.forEach(element => {
        otherLettersChartLabels.push(element.monthName);
        otherLettersChartValues.push(element.total);
        otherBackgroundColorsArray.push('rgba(255, 206, 86, 0.2)');
        otherBorderColorsArray.push('rgba(255, 206, 86, 1)');
      });
      this.correspondanceChartData = {
        type: 'bar',
        data: {
          labels: otherLettersChartLabelsCorresp,
          datasets: [{
            label: 'Correspondence Letters',
            data: otherLettersChartValuesCorresp,
            backgroundColor: backgroundColorsArrayCorresp,
            borderColor: borderColorsArrayCorresp,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      };
      this.otherChartData = {
        type: 'line',
        data: {
          labels: otherLettersChartLabels,
          datasets: [{
            label: 'Other Letters',
            data: otherLettersChartValues,
            backgroundColor: otherBackgroundColorsArray,
            borderColor: otherBorderColorsArray,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      };
      this.loadCharts();
    }, err => {
      console.log(err);
    });
  }
}

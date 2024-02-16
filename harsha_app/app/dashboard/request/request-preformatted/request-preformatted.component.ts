import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormArray, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { masterData } from '../../../../environments/masterdata/masterdata';
import { endpoints } from '../../../../environments/environment';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DropdownModule } from 'angular-custom-dropdown';

@Component({
  selector: 'app-request-preformatted',
  templateUrl: './request-preformatted.component.html',
  styleUrls: ['./request-preformatted.component.css']
})
export class RequestPreformattedComponent implements OnInit {
  request: any;
  public letterType = 'employmentLetter';
  userid = JSON.parse(localStorage.getItem('userData')).user_id;
  constructor(
    private httpService: HttpService,
    public toastr: ToastrService,
    private route: Router,
    private ActivatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe((parmas) => { this.letterType = parmas['letterType'] });
    this.loadRequest();
  }

  loadRequest() {
    this.httpService.doGet(endpoints.get.getPreFormLettersList + this.userid).subscribe((result: any) => {
      console.log('result', result.data);
      this.request = result.data[0];
      // this.request.request_body_content = result.data[0].request_body_content;
      // this.bindFormData();
    }, err => {
      console.log(err);
    });
  }
}

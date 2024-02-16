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
  selector: 'app-request.form',
  templateUrl: './request.form.component.html',
  styleUrls: ['./request.form.component.scss']
})
export class RequestFormComponent implements OnInit {
  public selectedCountry = "Choose Country";
  public options: Object = {
    charCounterCount: false,
    toolbarButtons: ['bold', 'italic', '|', 'alert'],
    toolbarButtonsXS: ['bold', 'italic', '|', 'alert'],
    toolbarButtonsSM: ['bold', 'italic', '|', 'alert'],
    toolbarButtonsMD: ['bold', 'italic', '|', 'alert']
  };
  public masterData = masterData;
  ckEditorConfig: {} = {
    'uiColor': "#111111",
    "toolbarGroups": [
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'clipboard', groups: ['clipboard', 'undo'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
      { name: 'forms', groups: ['forms'] },
      '/',
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
      { name: 'links', groups: ['links'] },
      { name: 'insert', groups: ['insert'] },
      '/',
      { name: 'styles', groups: ['styles'] },
      { name: 'colors', groups: ['colors'] },
      { name: 'tools', groups: ['tools'] },
      { name: 'others', groups: ['others'] },
      { name: 'about', groups: ['about'] }
    ],
    // tslint:disable-next-line:max-line-length
    "removeButtons": 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Replace,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Unlink,Anchor,Flash,HorizontalRule,Smiley,PageBreak,Maximize,ShowBlocks,About,Iframe,Subscript,Superscript,Strike,Language'
  }
  name = 'ng2-ckeditor';
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;

  requestForm;
  uploadFileForm;
  serviceMasterData = JSON.parse(localStorage.getItem('masterData'));
  companiesInfo = [];
  pageTitle = 'New Request';
  countries;
  public request_id;
  request = {
    request_company_id: null,
    request_company_name: 'Choose Company',
    request_country_id: null,
    request_country_name: 'Choose Country',
    request_type: null,
    request_type_name: 'Choose type',
    request_subject: null,
    request_purpose: null,
    request_body_heading: null,
    request_conclusion_statement: null,
    request_created_by: null,
    request_body_content: null,
  };
  uploadFile = {
    file: null
  };
  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    public toastr: ToastrService,
    private route: Router,
    private ActivatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe((parmas) => { this.request_id = parmas['id'] });
    console.log(!!this.request_id);
    if (this.request_id) {
      this.requestForm = this.formBuilder.group({
        request_body_content: new FormControl(this.request.request_body_content),
      });
      this.pageTitle = "Edit Request";
      this.loadRequest();
    } else {
      this.pageTitle = "New Request";
      this.requestForm = this.formBuilder.group({
        request_company_id: new FormControl(this.request.request_company_id),
        request_country_id: new FormControl(this.request.request_company_id),
        request_type: new FormControl(this.request.request_type),
        request_subject: new FormControl(this.request.request_subject),
        request_purpose: new FormControl(this.request.request_purpose),
        request_body_heading: new FormControl(this.request.request_body_heading),
        request_conclusion_statement: new FormControl(this.request.request_conclusion_statement),
        request_body_content: new FormControl(this.request.request_body_content),
        request_file: new FormControl(this.request.request_body_content)
      });
    }
    this.uploadFileForm = this.formBuilder.group({
      file: new FormControl(this.uploadFile.file),
    });
  }
  loadRequest() {
    this.httpService.doGet(endpoints.get.getRequestDataForPDF + this.request_id).subscribe((result: any) => {
      console.log('result', result.data);
      this.request = result.data[0];
      this.request.request_body_content = result.data[0].request_body_content;
      this.requestForm = this.formBuilder.group({
        request_body_content: new FormControl(this.request.request_body_content),
      });
      // this.bindFormData();
    }, err => {
      console.log(err);
    });
  }
  createRequestForm(requestForm) {
    // const values = Object.keys(requestForm).filter(key => {
    //   if (key !== 'request_body_data') {
    //     return !requestForm[key];
    //   }
    // });
    // console.log(requestForm);
    // if (!values.length) {
    requestForm.user_id = JSON.parse(localStorage.getItem('userData')).user_id;
    requestForm.request_id = JSON.parse(this.request_id);
    console.log(requestForm);
    this.httpService.doPost(endpoints.post.updateRequest,
      requestForm).subscribe((result: any) => {
        console.log('result', result);
        if (result.status == "success") {
          this.toastr.success(masterData.toastMessages.requestSuccess);
          // this.route.navigate(['/dashboard/request/list']);
        }
      }, err => {
        this.toastr.error(masterData.toastMessages.requestFail);
        console.log(err);
      });
    // } else {
    //   this.toastr.error('all fields are mandatory');
    // }
  }
  createBodyText(): FormGroup {
    return this.formBuilder.group({
      request_body_text: '',
    });
  }


  getCompaniesInfo(request_company_id) {
    this.companiesInfo = [];
    this.serviceMasterData.companiesInfo.filter((item) => {
      return JSON.parse(request_company_id) === item.company_country_id ? this.companiesInfo.push(item) : [];
    });
  }

  uploadPdf(files: File[]) {
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f));
    console.log("formData", formData);
    this.http.post(endpoints.post.uploadReqFile, formData)
      .subscribe(event => {
        console.log('done')
      })
  }
}

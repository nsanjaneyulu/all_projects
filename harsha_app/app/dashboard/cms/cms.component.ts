import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { masterData } from "../../../environments/masterdata/masterdata";
import { FormControl, FormArray, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { endpoints } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {
  public isCollapsed = true;
  public masterData = masterData;
  public cmsData;
  private userId;
  modalReference: any;
  closeResult: string;
  cmsForm;
  cmsFormFields = {
    country_name: null,
    company_display: "Country",
    company_name: null,
    role_name: null,
    country_code: null,
    company_country_id: null,
    company_address: null,
    picture: null
  };
  image: string | ArrayBuffer;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private httpService: HttpService, ) { }

  ngOnInit() {
    this.cmsForm = this.formBuilder.group({
      country_name: new FormControl(this.cmsFormFields.country_name),
      company_name: new FormControl(this.cmsFormFields.country_name),
      role_name: new FormControl(this.cmsFormFields.country_name),
      country_code: new FormControl(this.cmsFormFields.country_code),
      company_country_id: new FormControl(this.cmsFormFields.company_country_id),
      company_address: new FormControl(this.cmsFormFields.company_address),
      picture: new FormControl(this.cmsFormFields.picture)
    });
    this.userId = JSON.parse(localStorage.getItem('userData')).user_id;
    this.getCmsData();
  }
  open(content, modal: any) {
    console.log("modal", modal);
    this.modalReference = this.modalService.open(content, modal === 'stores' ? { size: 'lg' } : {});

    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getCmsData() {
    this.httpService.doGet(endpoints.get.getMasterData).subscribe((result: any) => {
      if (result.status === 'success') {
        this.cmsData = result.data;
        console.log(this.cmsData);
        localStorage.removeItem('masterData');
        localStorage.setItem('masterData', JSON.stringify(result.data));
      }
    }, err => {
      console.log(err);
    });
  }
  cmsFormSubmit(cmsForm, cmsType) {
    console.log(cmsForm, cmsType);
    let payload;
    let url;
    switch (cmsType) {
      case 'country':
        url = endpoints.post.createCountry;
        payload = {
          "country_name": cmsForm.country_name,
          "country_code": cmsForm.country_code,
        }
        if (!cmsForm.country_name && !cmsForm.country_code) {
          this.toastr.error('Please enter all fields');
          return;
        }
        this.doPostCmsHttpService(url, payload);
        break;
      case 'role':
        url = endpoints.post.createRole;
        payload = {
          "role_name": cmsForm.role_name
        }
        if (!cmsForm.country_name && !cmsForm.role_name) {
          this.toastr.error('Please enter all fields');
          return;
        }
        this.doPostCmsHttpService(url, payload);
        break;
      case 'store':
        url = endpoints.post.createStore;
        payload = {
          "company_name": cmsForm.company_name,
          "company_country_id": cmsForm.company_country_id,
          "company_logo": this.cmsForm.picture,
          "company_address": cmsForm.company_address
        }
        console.log(payload);
        if (!cmsForm.company_name && !cmsForm.company_country_id) {
          this.toastr.error('Please enter all fields');
          return;
        }
        this.doUploadCmsHttpService(url, payload);
        break;
      default:
        break;
    }
    payload.user_id = this.userId;
    console.log(payload);
  }
  doPostCmsHttpService(url, payload) {
    this.httpService.doPost(url,
      payload).subscribe((result: any) => {
        console.log('result', result);
        if (result.status == "success") {
          this.getCmsData();
          this.modalReference.close();
        }
      }, err => {
        console.log(err);
      });
  }
  doUploadCmsHttpService(url, payload) {
    console.log(payload);
    this.httpService.doUpload(url,
      payload).subscribe((result: any) => {
        console.log('result', result);
        if (result.status == "success") {
          this.toastr.success(masterData.toastMessages.userSuccess);
          this.getCmsData();
          this.modalReference.close();
        }
      }, err => {
        this.toastr.error(masterData.toastMessages.requestFail);
        console.log(err);
      });
  }
  changeListener($event): void {
    this.cmsForm.picture = $event.target.files[0];
    console.log(this.cmsForm.picture);
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    // if (file.size < 1024) {
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image);
    }
    myReader.readAsDataURL(file);
    console.log(myReader.result);
    // } else {
    //   this.toastr.error('File size is too large');
    // }
  }
  // dropDownSelect(previewValue, selectedId, modal, displayModal) {
  //   console.log(previewValue, selectedId, modal, displayModal);
  //   this.cmsFormFields[displayModal] = previewValue;
  //   this.cmsFormFields[modal] = selectedId;
  //   console.log(this.cmsFormFields);
  // }
}

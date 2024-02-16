import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { masterData } from "../../../../environments/masterdata/masterdata";
import { endpoints } from '../../../../environments/environment';
import { HttpService } from '../../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.css']
})
export class RequestViewComponent implements OnInit {
  requestData;
  request_id;
  pageTitle = 'Request Info';
  user_id;
  uploadResponseBtn = false;
  uploadResponseName = null;
  responseFile = null;
  public masterData = masterData;
  upload_response_pdf = false;
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.user_id = JSON.parse(localStorage.getItem('userData')).user_id;
    this.route.params.subscribe((parmas) => { this.request_id = parmas['id'] });
    console.log(this.request_id);
    this.loadRequest();
  }
  loadRequest() {
    this.httpService.doGet(endpoints.get.getRequestDataForPDF + this.request_id).subscribe((result: any) => {
      console.log('result', result);
      this.requestData = result.data[0];
    }, err => {
      console.log(err);
    });
  }
  generatePdf(id) {
    this.httpService.doGet(endpoints.get.generatePdf + id).subscribe((result: any) => {
      console.log('result', result);
      console.log(this.requestData);
      downloadPDF(result, this.requestData[0].request_body_heading); // Generated PDF
    }, err => {
      console.log(err);
    });
  };
  generateBlob() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      const position = 0;
      pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight);
      // output as blob
      var pdf2 = pdf.output('blob');
      // localStorage.setItem('pdf', pdf.save(this.requestData[0].request_body_heading + '.pdf'));
      // var data = new FormData();
      // data.append('data', pdf);
      const payLoad = {
        "file": pdf2,
        "name": 'reqFile'
      };
      // console.log(payLoad);
      // this.httpService.doUpload(endpoints.post.uploadReqFile, payLoad).subscribe((result: any) => {
      //   console.log('createEntryInGeneration', result);
      //   console.log(this.requestData);
      //   if (result.status == "success") {
      //     ; // Generated PDF   
      //   }
      // }, err => {
      //   console.log(err);
      // });
      var formData = new FormData();
      formData.append('file', pdf);
      console.log("formData", formData);
      this.http.post(endpoints.post.uploadReqFile, formData)
        .subscribe(event => {
          console.log('done')
        });
    });
  }
  changeListener($event): void {
    // this.readThis($event.target);
    console.log($event);
    this.responseFile = $event.target.files[0];
    this.uploadResponseName = $event.target.files[0].name;
    this.uploadResponseBtn = this.responseFile ? true : false;
  }
  uploadResponse() {
    console.log(this.responseFile);
    const payload = {
      "userId": this.user_id,
      "requestId": JSON.parse(this.request_id),
      "responseFile": this.responseFile
    }
    console.log(payload);
    this.httpService.doUpload(endpoints.uploads.updateRequestResponseAttachment,
      payload).subscribe((result: any) => {
        console.log('result', result);
        if (result.status == "success") {
          this.toastr.success(masterData.toastMessages.userSuccess);
          this.loadRequest();
        }
      }, err => {
        this.toastr.error(masterData.toastMessages.requestFail);
        console.log(err);
      });
  }
  removeAttachment() {
    this.responseFile = null;
    this.uploadResponseBtn = false;
    this.uploadResponseName = null;
  }
}

function downloadPDF(pdf, fileName) {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

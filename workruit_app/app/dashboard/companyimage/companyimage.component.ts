import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { endpoints, baseUrl } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-companyimage',
  templateUrl: './companyimage.component.html',
  styleUrls: ['./companyimage.component.css']
})
export class CompanyimageComponent implements OnInit {
  name = 'Angular';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }
  fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        console.log("imageChangedEvent", this.imageChangedEvent);
  }
  imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        console.log("croppedImage", this.croppedImage);
  }
  imageLoaded() {
        // show cropper
  }
  cropperReady() {
        // cropper ready
  }
  loadImageFailed() {
        // show message
  }
  uploadFile() {
    var blob = this.dataURItoBlob(this.croppedImage);
    var fd = new FormData();
    fd.append('file', blob);
    const companyId = 1225
    const _postjobUrl = baseUrl + "uploadCompanyLogo?companyId=" + companyId;
    this.httpService.doPost(_postjobUrl, fd).subscribe((response: any) => {
      if (response.status === 'success') { 
      }

      });
  }
  dataURItoBlob(dataURI: any) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

    return new Blob([ia], {
      type: mimeString
    });
  }


}

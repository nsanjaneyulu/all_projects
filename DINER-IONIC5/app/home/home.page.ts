import { Component } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Storage } from '@ionic/storage';
import { HomeService } from '../services/home.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';



declare var SMS: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  splash = true;
  phoneNumber: any = "";
  facebook = {
    loggedIn: false,
    name: '',
    email: '',
    profilePicture: ''
  }
  showOTP: boolean = false;
  showLoginButton: boolean = false;
  dinerId: any;
  deviceId: any;
  loading: any;
  platform: any;
  showLoginPage: boolean = false;
  isLoading: boolean = false;

  deviceType: string;
  deviceRegisteredId: string;
  code: string = '';
  validData: any;
  isDisable: boolean = false;
  supplierId: any;
  gotOTP: any;
  otpNumber1: any;
  otpNumber2: any;
  otpNumber3: any;
  otpNumber4: any;
  otpNumber5: any;
  otpNumber6: any;
  userDetails: any;
  showEmail: boolean;
  emailId: string = '';
  //window: any;

  countryCode: string = "+91";
  constructor(private router: Router, private homeService: HomeService, private platforms: Platform, private storage: Storage, private uniqueDeviceID: UniqueDeviceID, private utilitiesService: UtilitiesService) {
    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        this.deviceId = uuid;
        this.storage.set('DEVICEID', uuid);
      }
      )
      .catch((error: any) => {
        this.deviceId = '1111-2222-5555';
        this.storage.set('DEVICEID', '1111-2222-5555');
        this.utilitiesService.toastFunction('No Device please restart the app');
      });

    this.platforms.ready().then(() => {
      if (this.platforms.is('android')) {
        this.platform = "android";
      } else if (this.platforms.is('ios')) {
        this.platform = "ios";
      } else {
        this.platform = "browser";
      }
    });

  }

  checkOTP() {
    console.log(this.phoneNumber);
    this.showLoginButton = true;
    this.isLoading = true;
    this.showOTP = false;
    this.code = '';
    this.otpNumber1 = '';
    this.otpNumber2 = '';
    this.otpNumber3 = '';
    this.otpNumber4 = '';
    this.otpNumber5 = '';
    this.otpNumber6 = '';
    if (this.phoneNumber.length == 10) {

      let registrationDetails = {
        platform: this.platform,
        phoneNumber: this.countryCode + this.phoneNumber,
        deviceId: this.deviceId
      };
      this.utilitiesService.userDetails(this.countryCode + this.phoneNumber).subscribe(userData => {
        let userDetailsValue: any = [];
        userDetailsValue = userData;
        this.userDetails = {};
        for (var i = 0; i < userDetailsValue.length; i++) {
          if (userDetailsValue[i].userType == 'DINER' && userDetailsValue[i].email != '') {
            this.userDetails = userDetailsValue[i];
            this.emailId = this.userDetails.email;
            this.storage.set("USERDETAILS", this.userDetails);
            break;
          }
        }

        this.homeService.createOTP(registrationDetails).subscribe(otpData => {
          if (Object.keys(this.userDetails).length === 0) {
            this.showEmail = true;
          } else {
            this.emailId = '';
            this.showEmail = false;
          }
          this.showOTP = true;
          this.showLoginButton = true;
          this.isLoading = false;
          console.log(otpData);
          this.gotOTP = '';
          this.watchSMSList();
        }, error => {
          this.utilitiesService.toastFunction("No OTP has been sent.");
          this.showOTP = false;
          this.showLoginButton = false;
          this.isLoading = false;
        })
      })

      this.storage.set("SKIP", false);

    } else {
      this.showOTP = false;
      this.showLoginButton = false;
      this.utilitiesService.toastFunction('Provide correct phone number.');
    }

  }

  watchSMSList() {
    if (SMS) SMS.startWatch(() => {
      console.log('watching started');
    }, Error => {
      console.log('failed to start watching');
    });

    document.addEventListener('onSMSArrive', (e: any) => {
      if (!this.gotOTP) {
        var sms = e.data;
        console.log(sms);
        if (sms.address.includes("TAFELZ")) {
          var splitSMS = sms.body.split(" ");
          this.gotOTP = splitSMS[0];
          this.otpNumber1 = this.gotOTP[0]
          this.otpNumber2 = this.gotOTP[1]
          this.otpNumber3 = this.gotOTP[2]
          this.otpNumber4 = this.gotOTP[3]
          this.otpNumber5 = this.gotOTP[4]
          this.otpNumber6 = this.gotOTP[5]

          console.log(this.gotOTP);
          this.loginFunction();
          SMS.stopWatch(() => {
            console.log("Stoped Watching")
          }, () => {
            console.log("Stopping Watch")
          });
        }

      }


    });


  }


  loginFunction() {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(this.emailId) == false && this.showEmail==true) {
      this.utilitiesService.toastFunction("Email is not Valid");
      return false;
    } else {
      if(this.code==''){
        this.utilitiesService.toastFunction("Please fill OTP.");
      }else{
        let paramsToSend = { "emailId": this.emailId, "code": this.code, "platform": this.platform, "phoneNumber": this.countryCode + this.phoneNumber, "deviceId": this.deviceId };
      this.homeService.validateOTP(paramsToSend).subscribe(validatingData => {
        this.validData = validatingData;
        console.log(validatingData)
        if (this.validData.id != null) {
          this.storage.set("LOGIN", true);
          this.storage.set("DINNERID", this.validData.id);
          this.storage.set("PHONENUMBER", this.countryCode + this.phoneNumber);
          this.utilitiesService.userDetails(this.countryCode + this.phoneNumber).subscribe(userData => {
            let userDetailsValue: any = [];
            userDetailsValue = userData;
            this.userDetails = {};
            for (var i = 0; i < userDetailsValue.length; i++) {
              if (userDetailsValue[i].userType == 'DINER' && userDetailsValue[i].email != '') {
                this.userDetails = userDetailsValue[i];
                this.storage.set("USERDETAILS", this.userDetails);
                break;
              }
            }
          });
          this.router.navigate(['dashboard'])
        } else {
          //this.loading.dismiss();
          this.utilitiesService.toastFunction('Invalid OTP.');
        }
      })
      }
    }


  }
  exploreDiner(){
    this.storage.set("LOGIN", false);
    this.router.navigate(['dashboard'])
  }
  createOTP() {
    console.log("sdjgaksjfdsad")
  }
  otpController(event, next, prev) {
    console.log(next)
    if (next == '') {
      this.code = this.code + event.target.value;
    }
    if (event.target.value.length < 1 && prev) {
      this.code = this.code.substring(0, this.code.length - 1);
      prev.setFocus();
    }
    else if (next && event.target.value.length > 0) {
      this.code = this.code + event.target.value
      next.setFocus();
    }
    else {
      return 0;
    }
  }

  phoneNumberLength() {
    if (this.phoneNumber.length == 10) {
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { SetGetMallsService } from '../../services/set-get-malls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DashboardService } from '../../services/dashboard.service';
import { UtilitiesService } from '../../services/utilities.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mallselection',
  templateUrl: './mallselection.page.html',
  styleUrls: ['./mallselection.page.scss'],
})
export class MallselectionPage implements OnInit {
  mallList:any;
  dinningType:any;
  mallData:any[];
  imageEndPoint:any;
  mallDataCount:number;
  constructor(private dashboardService:DashboardService,
    private storage:Storage,
    private route: ActivatedRoute, 
    private router: Router,
    private setGetMallsService:SetGetMallsService,
    private alertController: AlertController,
    private utilitiesService:UtilitiesService) {
      this.imageEndPoint = this.utilitiesService.imageEndPoint;
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getMallDetailsForPage();
  }

  getMallDetailsForPage(){
    this.dinningType = this.utilitiesService.mallDataDetails.mallTypeData;//this.route.snapshot.paramMap.get("mallTypeData");
    this.storage.set("TYPEOFDINING",this.dinningType);
    let mallListData = this.utilitiesService.mallDataDetails.mallList;//this.route.snapshot.paramMap.get("mallList");
    this.mallData = mallListData;
    this.mallDataCount = this.mallData.length;
    console.log(this.mallData);
  }
  goToDashBoard(){
    this.router.navigate(['dashboard']);
  }

  async openOutletsPage(mallDetails){
    console.log(mallDetails);
    if((mallDetails.distanceFromUser*1000) >1000){
      const alert = await  this.alertController.create({
        header: 'Hey!!!',
        subHeader: "You don't seem to be at "+mallDetails.name + ' (' + mallDetails.address.line2 + '). Do you still want to continue?',
        buttons: [
          {
            text: "No",
            role: "cancel",
            handler: () => {
            }
          },
          {
            text: "Yes",
            handler: () => {
              this.changeMallSelection(mallDetails);
            }
          }
        ]
      });
      await alert.present();
    }else{
        this.changeMallSelection(mallDetails);
    }
  }

  changeMallSelection(mallDetailData){
    let mallData = {
      mallId: mallDetailData.id,
      mallName: mallDetailData.name,
      mallAddress: mallDetailData.address//,
      //link: link
    }
    this.utilitiesService.setTogetOutletDetail(mallDetailData);
    console.log(mallDetailData)
    this.storage.set('MALLDETAILS',mallDetailData)
    this.router.navigate(['items'])
  }
}

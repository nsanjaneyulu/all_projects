import { Component, OnInit } from '@angular/core';
import { NavController,  LoadingController,ModalController } from '@ionic/angular';
import { UserDetailsService } from '../../services/userDetails.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
// import { PaymentLoginModalPage } from '../payment-login-modal/payment-login-modal';

// import {  env, imageEndPoint } from '../../';

@Component({
  selector: 'app-tipspay',
  templateUrl: './tipspay.page.html',
  styleUrls: ['./tipspay.page.scss'],
})
export class TipspayPage implements OnInit {
  pointsEarned=true;
  pointsRedeem=false;
  k=-1;
  ordersList=[]
  dinerId="";
  details={};
  itemWithoutDiscout=0;
  orderDetails:any={};
  walletInfo={}
  showWalletPage=false;
  walletData:any=[]
  imageEndPoint:any;
  itemsCountDetails:number=0;
  constructor(private router:Router,public navCtrl: NavController, private user: UserDetailsService,private storage: Storage,private loadingCtrl: LoadingController,private modalCtrl: ModalController) {
    this.getWalletDetails();


  }

  ngDoCheck(){
  
  }

  ngOnInit() {
    console.log("hello ngOnInit")
    this.getWalletDetails();
    this.storage.get("ITEMSCOUNT").then(displayItems=>{
      console.log(displayItems);
      if(!displayItems || displayItems==0){
        this.itemsCountDetails = 0;
      }else{
        this.itemsCountDetails = displayItems;
      }
    })
  }
  ionViewWillEnter() {
    console.log("hello ngOnInit")
    this.getWalletDetails();
  }
  ionViewDidEnter() {
    console.log("hello ngOnInit")
    this.getWalletDetails();
  }
  ionViewWillLeave() {
    console.log("hello ngOnInit")
    this.getWalletDetails();
  }


  goToBack() {
    
  }

 
 

  viewCart() {
    
    // this.router.navigate(['view-cart']);
  }
  getFormattedDate(date){
    let time = new Date(date);
    return time.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',month: 'long', day: 'numeric',year: 'numeric', hour:'numeric', minute:'numeric' });    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }
  routerChange(pageName){
    console.log('sdkjfhsdj,fksdfhj')
    this.router.navigate(['/'+pageName]);
  }

 
  getWalletDetails(){
this.storage.get('DINNERID').then(dinerId => { 
    this.dinerId=dinerId
    if(this.dinerId!=undefined){
      this.showWalletPage=true
      let loading = this.loadingCtrl.create({
        // content: 'Please wait...'
      });
      // loading.present();
      let walletInfoUrl = '/getWalletByDinerId/'+dinerId;
      this.user.getWalletInfo(walletInfoUrl).subscribe(walletInfo => {
        this.walletInfo=walletInfo;
        let pointsEarnedUrl = '/getWalletTransactionsByDinerId/'+this.dinerId+'/type/credit'
        this.user.getWalletPoints(pointsEarnedUrl).subscribe(points => {
      console.log(points)
      this.walletData=points;
      // loading.dismissAll();
        })
      })
    }
   
	  })
  }
  getPointsEarned(){
    console.log("getPointsEarned");
    this.walletData=[];
	  this.k=-1;
    this.pointsEarned=true;
    this.pointsRedeem=false;
    this.storage.get('DINNERID').then(dinerId => { 
      this.dinerId=dinerId
      if(this.dinerId!=undefined){
        let loading = this.loadingCtrl.create({
          // content: 'Please wait...'
        });
        // loading.present();
        let walletInfoUrl = '/getWalletByDinerId/'+dinerId;
        this.user.getWalletInfo(walletInfoUrl).subscribe(walletInfo => {
          this.walletInfo=walletInfo;
          let pointsEarnedUrl = '/getWalletTransactionsByDinerId/'+this.dinerId+'/type/credit'
          this.user.getWalletPoints(pointsEarnedUrl).subscribe(points => {
        console.log(points)
        this.walletData=points;
        // loading.dismissAll();
          })
        })
      }
      })
  }
  getPointsRedeem(){
    console.log("getPointsRedeem");
    this.walletData=[];
	this.k=-1;
    this.pointsEarned=false;
    this.pointsRedeem=true;
    this.storage.get('DINNERID').then(dinerId => { 
      this.dinerId=dinerId
      if(this.dinerId){
        let loading = this.loadingCtrl.create({
          // content: 'Please wait...'
        });
        // loading.present();
        let walletInfoUrl = '/getWalletByDinerId/'+dinerId;
        this.user.getWalletInfo(walletInfoUrl).subscribe(walletInfo => {
          this.walletInfo=walletInfo;
          let pointsEarnedUrl = '/getWalletTransactionsByDinerId/'+this.dinerId+'/type/debit'
          this.user.getWalletPoints(pointsEarnedUrl).subscribe(points => {
        console.log(points)
        this.walletData=points;
        // loading.dismissAll();
          })
        })
      }
      
      })
  }
  getImage(imageLink){
    return this.imageEndPoint + imageLink;
  }
  slectRow(index,ssId,mallId,fullOrderId){
    if(this.k==index){
      this.k=-1;
    }else{
      this.k=index;
    }
    let loading = this.loadingCtrl.create({
      // content: 'Please wait...'
    });
    // loading.present();
	let orderUrl="/serviceStations/"+ssId+"/malls/"+mallId+"/ssFullOrders/"+fullOrderId
    this.user.getOrdersList(orderUrl).subscribe(orderDetails => {
      console.log(orderDetails)
      // loading.dismissAll();
      this.details=orderDetails
      this.orderDetails=orderDetails['orders'][0];
      this.itemWithoutDiscout=0;
      this.details['orders'].forEach(data=>{
        data['orderlets'].forEach(element => {
					this.itemWithoutDiscout = this.itemWithoutDiscout + element.item.price
			
			});	
      })
		
			});
		
  }
}

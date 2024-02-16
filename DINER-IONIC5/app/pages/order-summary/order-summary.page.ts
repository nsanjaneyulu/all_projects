import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { OrderSummaryService } from '../../services/order-summary.service';
import { UtilitiesService } from '../../services/utilities.service';
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {
  fullOrderDetailsGet: any;
  fullOrderDetails:any;
  placeInterval:any;
  userDetails:any;
  orderInfo:any;
  specialInstructions:any;
  information: Array<any>;
  supplierDeliveryCharges: any;
  tafelDeliveryCharges: any;
  preparationTime = 0;
  showOrderSummary:boolean=false;
  automatiClose: boolean = true;
  imageEndPoint: any;
  constructor(private utilitiesService:UtilitiesService,private router:Router,private storage:Storage,private orderSummaryService:OrderSummaryService) {
    this.imageEndPoint = this.utilitiesService.imageEndPoint;
   }

  ngOnInit() {
    this.getOrderDetailsPage();
    
  }

  ionViewWillEnter(){
    
  }

  getOrderDetailsPage(){
    this.storage.get("FULLORDER").then(orderDetails=>{
      this.fullOrderDetails = orderDetails.fullOrderDetails.fullOrderDetails;
      console.log(orderDetails)
      this.userDetails = orderDetails.fullOrderDetails.userDetails
      this.placeInterval = orderDetails.placeInterval;
      this.getDetails(this.fullOrderDetails);
      let prevPage = orderDetails.prevPage;
      if(prevPage === "CartPage"){
        this.orderSummaryService.sendRcvdMsg("Received",'',this.fullOrderDetails.id,this.fullOrderDetails.mallId,this.userDetails.id).subscribe(dataVal=>{
        });
      }
    })
  }

  goToBack(){
    this.router.navigate(['dashboard'])
  }

  getDetails(fullOrderDetails){    
    this.showOrderSummary = false;
    this.orderSummaryService.getPostOrderDetails(fullOrderDetails.id,fullOrderDetails.mallId,this.userDetails.id).subscribe((res) =>{
      console.log("res********************");  
      console.log(res);      
      this.orderInfo = res;
      //this.showOrderSummary = true;      
    });
    //this.showOrderSummary = false;
    this.storage.get('SERVICESTTIONID').then(serviceStation=>{
      this.orderSummaryService.getOrderDetailsInfo(fullOrderDetails,this.userDetails.id,serviceStation).subscribe((res) =>{
        let getspecialInstructions:any = res
        this.specialInstructions = getspecialInstructions.specialInstructions;
  
        this.information = getspecialInstructions.orders;
        this.information[0].open = true;
        this.fullOrderDetailsGet = getspecialInstructions;
        this.supplierDeliveryCharges = parseFloat(this.fullOrderDetailsGet.supplierDeliveryCharge);
        this.tafelDeliveryCharges = parseFloat(this.fullOrderDetailsGet.tafelDeliveryCharge);
        this.specialInstructions = getspecialInstructions.specialInstructions;
  
        console.log("this.supplierDeliveryCharges", this.supplierDeliveryCharges, typeof(this.supplierDeliveryCharges));
        console.log("this.tafelDeliveryCharges", this.tafelDeliveryCharges, typeof(this.tafelDeliveryCharges));
        console.log("this.fullOrderDetailsGet", this.fullOrderDetailsGet);
        if(this.information.length){
          this.information[0].open = true;
          
        } 
        for(var i=0;i<this.information.length;i++){
          let orderLets = this.information[i]['orderlets'];
          for(var k=0;k<orderLets.length;k++){
            if(this.preparationTime <= orderLets[k]['item']['preparationTime']){
              this.preparationTime = orderLets[k]['item']['preparationTime'];
            }
          }
        }
        this.showOrderSummary = true;
         console.log(this.fullOrderDetails.amount+this.fullOrderDetails.packagingCharge+ this.fullOrderDetails.cgst + this.fullOrderDetails.sgst + this.fullOrderDetails.convenience + this.supplierDeliveryCharges + this.tafelDeliveryCharges)
      });
    })
    

   
  }
  toggleSection(index){
    this.information[index].open = !this.information[index].open;
    if (this.automatiClose && this.information[index].open) {
      this.information
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => item.open = false);
    }
  }
  toggleItem(index,childIndex){
    this.information[index].consolidatedOrderlets[childIndex].open = !this.information[index].consolidatedOrderlets[childIndex].open;
  }
  getFormattedDate(date){    
    let time = new Date(date);    
    return time.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',month: 'short', day: 'numeric',year: 'numeric' });
    //return time.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }

}

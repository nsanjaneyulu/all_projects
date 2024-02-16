import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';
import { UserDetailsService } from '../../services/userDetails.service';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  showEditPage:boolean=true;
  userDetailsData:any={};
  constructor(private userDetailsService:UserDetailsService,private router:Router,private storage:Storage,private utilitiesService:UtilitiesService) { }

  ngOnInit() {
  }

  goToBack(){
    this.router.navigate(['profile'])
  }

  ionViewWillEnter(){
    this.showEditPage = false;
    this.storage.get('USERDETAILS').then(userData=>{
      this.userDetailsData = userData;
      if(!this.userDetailsData.firstName){
        this.userDetailsData.firstName="Guest";
      }
      this.showEditPage = true;
    })
  }

  saveUserDetails(userDetails){
    this.showEditPage = false;
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    if(!userDetails.email){
      this.utilitiesService.toastFunction("Email is empty.");
      return;
    }else{
      if(pattern.test(userDetails.email)){
        console.log("ok")
      }else{
        this.utilitiesService.toastFunction("Email is not valid");
        return;
      }
    }
    this.userDetailsService.updateUserDetails(userDetails).subscribe(doneData=>{
      this.utilitiesService.toastFunction("User details updated");
      this.showEditPage = true;
      this.storage.set("USERDETAILS",userDetails);
      this.router.navigate(['profile']);
    },error=>{
      this.utilitiesService.toastFunction("Error in update user details.");
      this.showEditPage = true;
    });
    
  }

}

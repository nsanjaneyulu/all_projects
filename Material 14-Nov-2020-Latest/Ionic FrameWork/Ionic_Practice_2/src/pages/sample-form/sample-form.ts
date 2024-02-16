import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators  } from '@angular/forms';

/**
 * Generated class for the SampleFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sample-form',
  templateUrl: 'sample-form.html',
})
export class SampleFormPage {
  sampleForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sampleForm = new FormGroup(
      {
        registerDetails : new FormGroup({
          userName: new FormControl(null, Validators.required),
          nickName: new FormControl(),
          email: new FormControl(),
          password: new FormControl(),
          cPassword: new FormControl(),
          zipCode: new FormControl(),
          gender: new FormControl(),
          state: new FormControl(),
          country: new FormControl()
        })
        
      }
      
      
    )
    console.log('::: Registration FORM :::', this.sampleForm);
    
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SampleFormPage');
    
  }

}

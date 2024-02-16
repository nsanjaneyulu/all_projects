import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Http} from "@angular/http";

@Component({
  selector: 'app-moretableadd',
  templateUrl: './moretableadd.component.html',
  styleUrls: ['./moretableadd.component.css']
})
export class MoretableaddComponent implements OnInit {

  public mortableAdd: FormGroup;
  public addtestForm: FormGroup;
  public contactAdd: FormGroup;
  public personAdd: FormGroup;
  public sex: String[] = ["Male", "Female"];

  constructor(private _fb: FormBuilder, private http: Http) {
    this.mortableAdd = _fb.group({
       
    });

    this.addtestForm = _fb.group({
       "uniquenumber" : ["anjaneyulu@gmail.com", Validators.required],
       "sex" : ["anjaneyulu", Validators.required],
       "religion" : ["v", Validators.required],
       "socialstatus" : ["v", Validators.required]
    });
    this.personAdd = _fb.group({
      "personname" : ["", Validators.compose([Validators.required])],
      "lastname" : ["", Validators.required],
     
    });
    this.contactAdd = _fb.group({
      "contactName" : ["", Validators.compose([Validators.required])],
      "email" : ["", Validators.required],
      "cnumber" : ["", Validators.required],
      "address" : ["", Validators.required]
    })


  }
 
  submitForm() {
    let request = {};
    /*Object.assign(request, this.formOne.value);
    Object.assign(request, this.formTwo.value);
    Object.assign(request, this.formThree.value);*/
    request["addtestForm"] = this.addtestForm.value;
    request["personAdd"] = this.personAdd.value;
    request["contactAdd"] = this.contactAdd.value;
  	console.log(request);
    this.http
        .post('http://localhost:3000/mortableAdd',
            request)
        .subscribe(data => {
          console.log('Server Response', data)
        }, error => {
          console.log(JSON.stringify(error.json()));
        });

  }

  ngOnInit() {
  }

}

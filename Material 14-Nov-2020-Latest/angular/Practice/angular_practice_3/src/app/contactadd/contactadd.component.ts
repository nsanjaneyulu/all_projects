import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Http} from "@angular/http";

@Component({
  selector: 'app-contactadd',
  templateUrl: './contactadd.component.html',
  styleUrls: ['./contactadd.component.css']
})
export class ContactaddComponent implements OnInit {

  public contactAdd: FormGroup;

  constructor(private _fb: FormBuilder, private http: Http) {
    this.contactAdd = _fb.group({
      "contactName" : ["", Validators.compose([Validators.required])],
      "email" : ["", Validators.required],
      "cnumber" : ["", Validators.required],
      "address" : ["", Validators.required]
    })
  }
  formSubmit(value) {
    console.log("FORM", value);

    this.http
        .post('http://localhost:3000/contactAdd',
            value)
        .subscribe(data => {
          console.log('Server Response', data)
        }, error => {
          console.log(JSON.stringify(error.json()));
        });


  }

  ngOnInit() {
  }

}


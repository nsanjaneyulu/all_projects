import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Http} from "@angular/http";

@Component({
  selector: 'app-personadd',
  templateUrl: './personadd.component.html',
  styleUrls: ['./personadd.component.css']
})
export class PersonaddComponent implements OnInit {

  public personAdd: FormGroup;

  constructor(private _fb: FormBuilder, private http: Http) {
    this.personAdd = _fb.group({
      "personname" : ["", Validators.compose([Validators.required])],
      "firstname" : ["", Validators.required],
      "lastname" : ["", Validators.required]
    })
  }

  formSubmit(value) {
    console.log("FORM", value);

    this.http
        .post('http://localhost:3000/personadd',
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

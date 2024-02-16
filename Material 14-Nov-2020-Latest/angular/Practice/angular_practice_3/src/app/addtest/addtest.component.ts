import { Component, OnInit , OnChanges} from '@angular/core';


import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Addtest } from '../modal/addtest';
import { Router } from '@angular/router';
import { AddtestService } from '../services/addtest';

@Component({
  selector: 'app-addtest',
  templateUrl: './addtest.component.html',
  styleUrls: ['./addtest.component.css']
})
export class AddtestComponent implements OnInit , OnChanges{
  public addtestForm: FormGroup;
  public sex: String[] = ["Male", "Female"];
  public checkoption = [
    {name:'OptionA', value:'1'},
    {name:'OptionB', value:'2'},
    {name:'OptionC', value:'3'}
  ]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private addtestService: AddtestService
  ) { }
  ngOnChanges() {
    console.log("this.initAccountDetailsForm();", this.initAccountDetailsForm());
  }
  ngOnInit() {
    this.initAccountDetailsForm();
  }
  initAccountDetailsForm() {
    this.addtestForm = this.formBuilder.group({
    uniquenumber: [null, Validators.required],
    age: [null, Validators.required],
    sex: [null, Validators.required],
    religion: [null, Validators.required],
    socialstatus: [null, Validators.required]
  
    });
    console.log('::: SALE ORDER FORM :::', this.addtestForm);
  }
  addtest() {
    const formValues = this.addtestForm.value;
    console.log('formValues', formValues);
    this.addtestService.postAddtest(formValues['addtest']).subscribe(res => {
      const response = res.json();
      if (response && (response['success']) === true) {
        console.log('test');
        
      }
    });
  }
}


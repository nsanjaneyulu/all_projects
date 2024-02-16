import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service'
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  public customers : any;
  constructor(public customerService : CustomerService) {
    this.getCustomerDetails();
   }

  ngOnInit(): void {
  }
  getCustomerDetails() 
  {
    let mallDetailsURL ="";
    // getCustomerDetailsURL= '/userid/' + "00ae9fbf-e7f8-469e-81da-3ce16cb4c126" + '/getMalls';
    this.customerService.getCustomerDetails().subscribe(data => {
        console.log("data", data);
        this.customers = data;
    });
  }
}

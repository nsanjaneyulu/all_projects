import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carddetails',
  templateUrl: './carddetails.component.html',
  styleUrls: ['./carddetails.component.css']
})
export class CarddetailsComponent implements OnInit {

  @Input() cardView: any;
  constructor() {
    // this.cardView;
   }

  ngOnInit(): void {
    console.log("card view",this.cardView);


  }

}

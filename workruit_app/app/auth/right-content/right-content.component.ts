import { Component, OnInit, Input, Output } from '@angular/core';
import { authDataInfo } from '../../../environments/textual-changes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-right-content',
  templateUrl: './right-content.component.html',
  styleUrls: ['./right-content.component.css']
})
export class RightContentComponent implements OnInit {
  @Input() type = '';
  authDataInfo = authDataInfo;
  public location = '' ;
  constructor(private  _router : Router) {
    this.location = _router.url;
    console.log("this", this.type);
   }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { authDataInfo } from '../../../environments/textual-changes';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  authDataInfo = authDataInfo;
  constructor() { }

  ngOnInit(): void {
  }

}

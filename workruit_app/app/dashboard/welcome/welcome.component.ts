import { Component, OnInit } from '@angular/core';
import { authDataInfo } from '../../../environments/textual-changes';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  authDataInfo = authDataInfo;
  public stateGet: any;
  constructor(
    private router:Router,
  ) { 
    this.stateGet = this.router.getCurrentNavigation()?.extras.state;
    console.log("stateGet", this.stateGet);
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  mySubjectVal: string;
  @Input('myInputVal') myInputVal: string;
  
  @Output('myOutputVal') myOutputVal = new EventEmitter(); 
  constructor(public dashboardService : DashboardService) { 
   
  }

  ngOnInit() {
    this.dashboardService.stringSubject.subscribe(
      data => {
        this.mySubjectVal = data;
        
        //emitting value to parent component using event emitter
        this.myOutputVal.emit(this.myInputVal + ' from child.');
      }
    );
  }

}

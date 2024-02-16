import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-listtest',
  templateUrl: './listtest.component.html',
  styleUrls: ['./listtest.component.css']
})
export class ListtestComponent implements OnInit {
  public students: Array<any>;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(json => {
      console.log('RESPONSE', json.json());
      if(json.toString() !== "FAIL") {
        this.students = json.json();
        console.log(this.students);
      }
    })
    
  }

}
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-moretablelist',
  templateUrl: './moretablelist.component.html',
  styleUrls: ['./moretablelist.component.css']
})
export class MoretablelistComponent implements OnInit {

  public all: Array<any>;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get("http://localhost:3000/all").subscribe(json => {
      console.log('RESPONSE', json.json());
      if(json.toString() !== "FAIL") {
        this.all = json.json();
      }
    })
  }

}
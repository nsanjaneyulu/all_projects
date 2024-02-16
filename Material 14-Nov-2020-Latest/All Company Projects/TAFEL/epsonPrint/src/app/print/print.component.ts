import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  headers = new HttpHeaders().set('Content-Type', 'application/xml'); 
  constructor(private http: HttpClient) { 
    this.headers = this.getHeadersForService();
  }
  getHeadersForService() {
		let headers = new HttpHeaders({
			'content-type': 'application/xml'
		});
		return headers;
  }
  ngOnInit() {
  }
  printGo() {
    var data = 
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">\n' +
      '<s:Body>\n' +
    '<epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print">\n' +
        '<feed unit="30"/>\n' +
        '<text>Hello TAFEL &#10;</text>\n' + 
        '<text>Welcome to POS &#10;</text>\n' +                
        '<feed line="3"/>\n' +
        '<cut type="feed"/>\n' +
        '</epos-print>\n' +
        '</s:Body>\n' +
        '</s:Envelope>\n' 
    var urldata = 'http://192.168.0.162/cgi-bin/epos/service.cgi?devid=local_printer';
    let localData = this.http.post(urldata,data, {
        headers: this.headers
    }).subscribe(data => {                   
    });
    return localData;
  }
}

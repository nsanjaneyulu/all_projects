import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-attendance-file-import',
  templateUrl: './attendance-file-import.component.html',
  styleUrls: ['./attendance-file-import.component.css']
})
export class AttendanceFileImportComponent implements OnInit {
  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;
  dataString: any;
  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
  }
  fileChangeImport(ev) {
    // console.log("file captured", event);
    console.log("file captured", ev.target.files[0]);
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.dataString = jsonData.Sheet1;
      console.log("dataString",this.dataString);
    
      this.dataString.forEach((value)=>{
        console.log("value",value);
        console.log("value",value.AttendanceDate);
        var getdate = value.AttendanceDate;
        var ddMMyyyy = this.datePipe.transform(getdate,"dd-MM-yyyy");
        console.log(ddMMyyyy); //output - 14-02-2019
  
      })
     
     
    }
    reader.readAsBinaryString(file);
   
  }
  
}

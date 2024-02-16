import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Columns } from '../columns';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  @Input() tableColumns: Array<Columns> = [];
  // @Input() matchedColumns: Array<Columns> = [];

  @Input() tableData: Array<any> = [];
  @Input() activeTab: any = {};
  isInterviewButton: any;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("row data", this.tableData);
    // this.isInterviewButton = !!this.tableColumns.find(o => o.header === "Interview");
    console.log("colums data", this.tableColumns);
    // if (this.isInterviewButton) {
    //   this.tableData.map((e, i) => {
    //     console.log(e);
    //     e.interViewLink = {
          
    //     }
    //   })
    // }
  }
  navigateWithState(tableColumns: any, tableRow: any ) {
    console.log("tableRow", tableRow);
    this.router.navigateByUrl(tableColumns.isLinkActions.link, { state: tableRow });
  }

}

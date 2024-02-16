import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenLayoutService } from '../../services/screen-layout.service';
import { Storage } from '@ionic/storage';
import { UtilitiesService } from '../../services/utilities.service';
@Component({
  selector: 'app-screen-layout',
  templateUrl: './screen-layout.page.html',
  styleUrls: ['./screen-layout.page.scss'],
})
export class ScreenLayoutPage implements OnInit {
  screenData: any;
  rowData: any;
  seatData: any;
  noOfScreens = [];
  selectedScreen = 0;
  selectedRow = 0;
  selectedSeat = 0;
  noOfSeats = {};
  a1selectedadress: String = "";
  a2selectedadress: String = "";
  a3selectedadress: String = "";
  mallDataDetails: any = {};
  noOfRows = {};
  specialRows = [];
  specialRowLength = 0;
  rowOneLength = 0;
  rowTwoLength = 0;
  rowThreeLength = 0;
  rowFourLength = 0;
  rowFiveLength = 0;
  rowSixLength = 0;
  rowOneSeats = 0;
  rowTwoSeats = 0;
  rowThreeSeats = 0;
  rowFourSeats = 0;
  rowFiveseats = 0;
  rowsixSeats = 0;
  rowSevenseats = 0;
  rowEightSeats = 0;
  rowAndSeat = "";
  showTheaterModule = false;
  selectedDetails:any;
  backScreenValidate:string;
  constructor(private utilitiesService:UtilitiesService,private router: Router, private screenLayoutService: ScreenLayoutService, private storage: Storage) {
  }

  ngOnInit() {
    this.a1selectedadress = "";
    this.a2selectedadress = '';
    this.a3selectedadress = '';
    this.storage.set('COMSEATROW',"")
    this.storage.set('SEATROW',"")
    this.storage.get("CARTITEMS").then(mallData => {
      this.mallDataDetails = mallData
      this.screenLayoutService.getUniqueAdressForA1(this.mallDataDetails.mallId).subscribe((res) => {

        this.screenData = {
          seatNumbers: []
        };
        for (var i = 0; i < res['response'].length; i++) {
          var iValue = i + 1;
          this.screenData.seatNumbers.push({ description: iValue + '' })
        }
        console.log(this.screenData.seatNumbers)
        this.noOfScreens = this.screenData.seatNumbers


        //this.a1selectedadress = this.aladress[0];
      });
    })

  }

  resetAndGoBack() {
    if(this.utilitiesService.screenGetPageData=="OC"){
      this.router.navigate(['cart'])
    }
    if(this.utilitiesService.screenGetPageData=="VC"){
      this.router.navigate(['view-cart'])
    }
    
  }

  chooseScreen_New(screen) {
    this.selectedScreen = screen;
    this.selectedRow = 0;
    this.selectedSeat = 0;
    this.noOfSeats = {
      row1: [],
      row2: [],
      row3: [],
      row4: [],
      row5: [],
      row6: [],
    }
    this.a1selectedadress = screen;
    this.a2selectedadress = '';
    this.a3selectedadress = '';
    this.screenLayoutService.getUniqueAdressForA2(this.mallDataDetails.mallId, screen).subscribe((res) => {
      this.rowData = {
        seatNumbers: [],
        specialRows: []
      };
      for (var i = 0; i < res['response'].length; i++) {
        if (res['response'][i].length > 1) {
          this.rowData.specialRows.push({ description: res['response'][i] })
        } else {
          this.rowData.seatNumbers.push({ description: res['response'][i] })
        }
      }
      console.log(this.rowData.seatNumbers)
      console.log(this.rowData.specialRows)
      this.noOfRows = {
        row1: [],
        row2: [],
        row3: [],
        row4: [],
        row5: [],
        row6: []
      }
      this.rowData.seatNumbers.forEach((element, i) => {
        if (i <= 6) {
          this.noOfRows['row1'].push(element)
        }
        if (i >= 7 && i <= 13) {
          this.noOfRows['row2'].push(element)
        }
        if (i >= 14 && i <= 20) {
          this.noOfRows['row3'].push(element)
        }
        if (i >= 21 && i <= 27) {
          this.noOfRows['row4'].push(element)
        }
        if (i >= 28 && i <= 34) {
          this.noOfRows['row5'].push(element)
        }
        if (i >= 35 && i <= 41) {
          this.noOfRows['row6'].push(element)
        }

      });
      this.specialRows = this.rowData.specialRows;
      console.log(this.specialRows)
      this.specialRowLength = this.rowData.specialRows;
      this.rowOneLength = this.noOfRows['row1'].length;
      this.rowTwoLength = this.noOfRows['row2'].length;
      this.rowThreeLength = this.noOfRows['row3'].length;
      this.rowFourLength = this.noOfRows['row4'].length;
      this.rowFiveLength = this.noOfRows['row5'].length;
      this.rowSixLength = this.noOfRows['row6'].length;

    });
  }

  chooseRow_New(row) {
    this.selectedRow = row;
    this.selectedSeat = 0;
    this.a2selectedadress = row;
    this.a3selectedadress = '';
    this.screenLayoutService.getUniqueAdressForA3(this.mallDataDetails.mallId, this.a1selectedadress, this.a2selectedadress).subscribe((res) => {
      this.seatData = {
        seatNumbers: []
      };
      for (var i = 0; i < res['response'].length; i++) {
        var iValue = i + 1;
        this.seatData.seatNumbers.push({ description: iValue + '' })
      }
      console.log(this.seatData.seatNumbers);
      this.noOfSeats = {
        row1: [],
        row2: [],
        row3: [],
        row4: [],
        row5: [],
        row6: [],
        row7: [],
        row8: []
      }
      this.seatData.seatNumbers.forEach((element, i) => {
        if (i <= 5) {
          this.noOfSeats['row1'].push(element)
        }
        if (i >= 6 && i <= 11) {
          this.noOfSeats['row2'].push(element)
        }
        if (i >= 12 && i <= 17) {
          this.noOfSeats['row3'].push(element)
        }
        if (i >= 18 && i <= 23) {
          this.noOfSeats['row4'].push(element)
        }
        if (i >= 24 && i <= 29) {
          this.noOfSeats['row5'].push(element)
        }
        if (i >= 30 && i <= 35) {
          this.noOfSeats['row6'].push(element)
        }
        if (i >= 36 && i <= 41) {
          this.noOfSeats['row7'].push(element)
        }
        if (i >= 42 && i <= 47) {
          this.noOfSeats['row8'].push(element)
        }
      });
      console.log(this.noOfSeats, '4456566666666');

      this.rowOneSeats = this.noOfSeats['row1'].length;
      this.rowTwoSeats = this.noOfSeats['row2'].length
      this.rowThreeSeats = this.noOfSeats['row3'].length
      this.rowFourSeats = this.noOfSeats['row4'].length
      this.rowFiveseats = this.noOfSeats['row5'].length
      this.rowsixSeats = this.noOfSeats['row6'].length
      this.rowSevenseats = this.noOfSeats['row7'].length
      this.rowEightSeats = this.noOfSeats['row8'].length


    });
  }
  chooseSeat_New(seat) {
    this.selectedSeat = seat;
    console.log(this.selectedSeat);
    console.log(seat);
    setTimeout(() => {
      this.a3selectedadress = seat;
      let row = this.a2selectedadress.includes("Rec") ? "REC" : this.a2selectedadress;
      this.selectedDetails = this.a1selectedadress + "," + row + "," +seat;
      this.rowAndSeat = "scr-" + this.a1selectedadress + "," + "Seat-" + row + seat;
      this.storage.set("SEATROW", this.rowAndSeat);
      this.storage.set("COMSEATROW",this.selectedDetails)
      this.showTheaterModule = false
      setTimeout(() => {
        if(this.utilitiesService.screenGetPageData=="OC"){
          this.router.navigate(['cart'])
        }
        if(this.utilitiesService.screenGetPageData=="VC"){
          this.router.navigate(['view-cart'])
        }
        // var elem: any = this.nameValue;
        // elem._native.nativeElement.focus();
        // return false;
      }, 100);

    }, 1000);
  }


}

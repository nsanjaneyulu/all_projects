import {
	Injectable
}
from "@angular/core";
import {
	Globals
}
from "../../app/app.config";
@Injectable()
export class BackbuttonService {
	pageNumberStack = [];
	constructor() {}
	pushPage(pageNumber, navCtrl) {
		if(navCtrl) {
			Globals.navCtrls[pageNumber] = navCtrl;
		}
		Globals.tabIndex = pageNumber;
		let indexOfPageNumber = this.pageNumberStack.indexOf(pageNumber);
		if(indexOfPageNumber >= 0) {
			this.pageNumberStack.splice(indexOfPageNumber, 1);
		}
		this.pageNumberStack.push(pageNumber);
	}
	popPage() {
		if(this.pageNumberStack.length > 0) this.pageNumberStack.pop();
		if(this.pageNumberStack.length > 0) return this.pageNumberStack[this.pageNumberStack.length - 1];
		else {
			this.pageNumberStack.push(0);
			return -1;
		}
	}
	popAllPages() {
		this.pageNumberStack = [];
	}
}
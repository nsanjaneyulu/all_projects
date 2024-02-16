import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  users = [];

   
    constructor(
        public http: HttpClient
    ) {

        console.log('User Services HTTP', this.http)
    }
    ngOnInit() {
    	this.getHeroes();
    }

    getHeroes(): void {
    	const URL = 'https://jsonplaceholder.typicode.com/users';
        this.http.get(URL)
            .subscribe((response: any) => {
                const responseData = response;
                //console.log(responseData);
                this.users = responseData;
            });

            
            // u.id = 343;
    }
}

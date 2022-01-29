import { Component, NgZone, OnInit } from '@angular/core';
import { PAGES } from '../constants/constants';
import { NgxSpinnerService } from "ngx-spinner";
import { SupportsService } from 'src/app/services/supports.service';
import { AuthService } from 'src/app/auth/auth.service';
import { formatDate } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  currentUser: any ;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;
  username: string;
  user_id: number;
  flag = true;
  display = false;

  password: string;
  first_name: string;
  last_name: string;
  pages: any[];

  firstName = "John";
  lastName = "Doe";
  supportsCount: any;
  myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
  notify$ = new Subject();

  constructor(  private spinner: NgxSpinnerService,
    private supportsService: SupportsService,
    private authService: AuthService,
    private zone: NgZone
    ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    //console.log(this.currentUser);


    this.pages = PAGES;

    localStorage.setItem(
      'expiredDate',
      this.addMinutes(new Date(), 60).getTime().toString()
    );
    this.zone.runOutsideAngular(() => {
      const i = setInterval(() => {
        const expiredDate = +localStorage.getItem('expiredDate');
        console.log(new Date().getTime() - expiredDate);

        if (new Date().getTime() - expiredDate > 0) {
          this.zone.run(() => {
            this.notify$.next();
          });
          clearInterval(i);
        }
      }, 60000);
    });
  } 


  

  ngOnInit() {
    
    this.notify$.subscribe(() => {
      localStorage.removeItem('expiredDate');
      this.logout();
    });

    this.spinner.show();
    const userId = this.currentUser.user_id;
    this.getSupportsCount();

    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    }

    

    public get getInitialsBgColor(): string {
      var s = 30;
      var l = 47;
  
      if (this.firstName) {
        s = this.getSaturationByName(this.firstName, this.lastName);
        l = this.getLightnessByName(this.firstName, this.lastName);
      }
  
      var color = this.stringToHslColor(this.firstName + " " + this.lastName, l, s);
      return color;
    }


    addMinutes(date, minutes) {
      return new Date(date.getTime() + minutes * 60000);
    }

    getSupportsCount() {
      this.supportsService.count().subscribe(data => {
        this.supportsCount = data;
        error => this.error = error
      });
    }

    logout() {
      this.authService.logout();
    }

    getInitialsTextColor(firstName: string, lastName: string): string {
      var s = this.getSaturationByName(firstName, lastName);
      var l = this.getLightnessByName(firstName, lastName);
      if (l >= 40) return "black";
      else return "white";
    }
    getLightnessByName(firstName: string, lastName: string): number {
      var num =
        firstName.toUpperCase().charCodeAt(0) +
        lastName.toUpperCase().charCodeAt(0);
      return this.scaleBetween(num, 5, 95, 65 * 2, 97 * 2);
    }
    getSaturationByName(firstName: string, lastName: string): number {
      var num =
        firstName.toUpperCase().charCodeAt(0) +
        lastName.toUpperCase().charCodeAt(0);
      return this.scaleBetween(num, 30, 75, 65 * 2, 97 * 2);
    }
    scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max): number {
      var res =
        ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) +
        minAllowed;
      return parseInt(res);
    }
    stringToHslColor(str: string, saturation: number, lightness: number): string {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      var h = hash % 360;
      return "hsl(" + h + ", " + saturation + "%, " + lightness + "%)";
    }

}

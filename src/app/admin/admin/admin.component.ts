import { Component, OnInit } from '@angular/core';
import { PAGES } from '../constants/constants';
import { NgxSpinnerService } from "ngx-spinner";

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

  password: string;
  first_name: string;
  last_name: string;
  pages: any[];

  constructor(  private spinner: NgxSpinnerService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    //console.log(this.currentUser);


    this.pages = PAGES;

  }


  

  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    }


}

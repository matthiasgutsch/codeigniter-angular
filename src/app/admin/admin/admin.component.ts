import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PAGES } from '../constants/constants';

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

  password: string;
  first_name: string;
  last_name: string;
  pages: any[];

  constructor(  public translate: TranslateService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    //console.log(this.currentUser);

    translate.addLangs(['it', 'en']);
    translate.setDefaultLang('it');

    this.pages = PAGES;

  }


  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit() {

  
    }


}

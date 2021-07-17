import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
  password: string;
  first_name: string;
  last_name: string;
  
  constructor(  public translate: TranslateService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    //console.log(this.currentUser);

    translate.addLangs(['it', 'en']);
    translate.setDefaultLang('it');
  }


  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit() {

  
    }


}

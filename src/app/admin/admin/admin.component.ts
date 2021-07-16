import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  currentUser: any[] ;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;
  username: string;
  password: string;

  constructor() { 
  }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    console.log(this.currentUser);
    }


}


import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;

  @ViewChild('menuItems') menu: MenuItem[];
  
  constructor(private titleService: Title, private authService: AuthService) { }

  ngOnInit() {

    this.items = [
      {label: 'Clienti', icon: 'pi pi-fw pi pi-users', routerLink: '/admin/clients/'},
      {label: 'Appuntamenti', icon: 'pi pi-fw pi pi-calendar-plus', routerLink: '/admin/appointments/'},
      {label: 'Calendario', icon: 'pi pi-fw pi-calendar', routerLink: '/admin/appointments/calendar'},
      {label: 'Progetti', icon: 'pi pi-fw pi pi-clone', routerLink: '/admin/projects'},
      {label: 'Fatturazione', icon: 'pi pi-fw ppi pi-credit-card', routerLink: '/admin/billings'},
      {label: 'Timesheet', icon: 'pi pi-fw ppi pi-clock', routerLink: '/admin/timesheets'},


  ];

  this.activeItem = this.items[0];

  }

  get isLoggedIn() { return this.authService.isLoggedIn(); }

  setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }

  activateMenu() {
    this.activeItem =this.menu['activeItem'];
 }

}

import { Component, NgZone, OnInit } from '@angular/core';
import { LANG_IT, PAGES } from '../constants/constants';
import { NgxSpinnerService } from "ngx-spinner";
import { SupportsService } from 'src/app/services/supports.service';
import { AuthService } from 'src/app/auth/auth.service';
import { formatDate } from '@angular/common';
import { Subject } from 'rxjs';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { event } from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  currentUser: any;
  currentLang: string;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;
  username: string;
  user_id: number;
  flag = true;
  display = false;
  light = true;
  items: MenuItem[];

  password: string;
  first_name: string;
  last_name: string;
  pages: any[];

  firstName = "John";
  lastName = "Doe";
  supportsCount: any;
  myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
  notify$ = new Subject();

  constructor(private spinner: NgxSpinnerService,
    private supportsService: SupportsService,
    private authService: AuthService,
    public primengConfig: PrimeNGConfig,
    public translate: TranslateService,
    private zone: NgZone
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    this.currentLang = this.currentUser.lang;
    //console.log(this.currentUser);
    this.primengConfig.setTranslation(LANG_IT);

    translate.addLangs([this.currentLang]);
    translate.setDefaultLang(this.currentLang);

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(this.currentLang) ? browserLang : this.currentLang);
    console.log(this.currentLang);

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
            this.notify$.next(event);
          });
          clearInterval(i);
        }
      }, 60000);
    });
  }




  ngOnInit() {

    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-pw pi-inbox',
        routerLink: '/admin'

      },
      {
        label: 'ERP',
        icon: 'pi pi-fw pi-calendar',
        items: [
          { label: 'Clienti', icon: 'pi pi-fw pi-user', routerLink: '/admin/clients/' },
          { label: 'Appuntamenti', icon: 'pi pi-fw pi-calendar-plus', routerLink: '/admin/appointments/' },
          { label: 'Calendario', icon: 'pi pi-fw pi-calendar', routerLink: '/admin/appointments/calendar/' }
        ]
      },

      {
        label: 'Commerciale',
        icon: 'pi pi-fw pi-credit-card',
        items: [
          { label: 'Preventivi', icon: 'pi pi-fw pi-briefcase', routerLink: '/admin/quotes/' },
          { label: 'Ordini', icon: 'pi pi-fw pi-book', routerLink: '/admin/orders/' },
          { label: 'Fatturazione', icon: 'pi pi-fw pi-credit-card', routerLink: '/admin/billings/' },
          { label: 'Ordini Fornitori', icon: 'pi pi-fw pi-book', routerLink: '/admin/purchase-orders/' }

        ]
      },
      {
        label: 'Prodotti',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: '/admin/products/'
      },

      {
        label: 'Magazzino',
        icon: 'pi pi-fw pi-table',
        items: [
          { label: 'Checkin', icon: 'pi pi-fw pi-arrow-circle-right', routerLink: '/admin/checkins/' },
          { label: 'Checkout', icon: 'pi pi-fw pi-arrow-circle-left', routerLink: '/admin/checkouts/' },
          { label: 'Fornitori', icon: 'pi pi-fw pi-table', routerLink: '/admin/suppliers/' },
          { label: 'DDT', icon: 'pi pi-fw pi-compass', routerLink: '/admin/transport-documents/' }

        ]
      },

      {
        label: 'HR',
        icon: 'pi pi-fw pi-user',
        items: [
          { label: 'Timesheet', icon: 'pi pi-fw pi-clock', routerLink: '/admin/timesheets/' },
          { label: 'Dipendenti', icon: 'pi pi-fw pi-user', routerLink: '/admin/employees/' }
        ]
      },
      {
        label: 'Progetti',
        icon: 'pi pi-fw pi-clone',
        routerLink: '/admin/projects/'
      },
      {
        label: 'Documenti',
        icon: 'pi pi-fw pi-book',
        routerLink: '/admin/documents/'
      },
      {
        label: 'Helpdesk',
        icon: 'pi pi-fw pi-info-circle',
        routerLink: '/admin/support/'
      },
      {
        label: 'Configurazioni',
        icon: 'pi pi-fw pi-cog',
        routerLink: '/admin/settings/'
      },

      {
        label: 'Logout',
        icon: 'pi pi-sign-in',
        command: (event) => { this.logout(); }
      },


     


    ];

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

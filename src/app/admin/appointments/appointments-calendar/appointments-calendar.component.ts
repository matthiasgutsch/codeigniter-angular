import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DASHBOARD, PAGES, TYPE_LIST } from '../../constants/constants';
import { CategoryService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClientsService } from 'src/app/services/clients.service';
import { Clients } from 'src/app/models/clients';
import { ComuniService } from 'src/app/services/comuni.service';
import { Comuni } from 'src/app/models/comuni';
import { Appointments } from 'src/app/models/appointments';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { CalendarComponent } from 'ng-fullcalendar';
import * as $ from 'jquery';
import { formatDate } from '@angular/common';
import { Locations } from 'src/app/models/locations';
import { Employees } from 'src/app/models/employees';
import { WorksService } from 'src/app/services/works.service';
import { LocationsService } from 'src/app/services/locations.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { Works } from 'src/app/models/works';
import * as moment from 'moment';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/products';
import { BillingsService } from 'src/app/services/billings.service';
import { Billings } from 'src/app/models/billings';
import { NgxSpinnerService } from "ngx-spinner";
import { ChartsService } from 'src/app/services/charts.service';
import { Charts } from 'src/app/models/charts';
import 'moment/locale/it'  // without this line it didn't work
import { SupportsService } from 'src/app/services/supports.service';
import { Supports } from 'src/app/models/supports';
import { ProjectsService } from 'src/app/services/projects.service';
import { Projects } from 'src/app/models/projects';

import { WarehouseCheckins } from 'src/app/models/warehouse_checkins';
import { WarehousesCheckinsService } from 'src/app/services/warehouses_checkins.service';

moment.locale('it')

@Component({
  selector: 'app-appointments-calendar',
  templateUrl: './appointments-calendar.component.html'
})
export class AppointmentsCalendarComponent implements OnInit {

  calendarOptions: any;
  events: any;
  appointments: any = [];
  appointment: Appointments;
  appointmentsToday:  any = [];
  locations: any = [];
  location: Locations;

  employees: any = [];
  employee: Employees;
  warehouseCheckins: any = [];
  warehouseCheckin: WarehouseCheckins;
  works: any = [];
  work: Works;
  clientsCount: any;
  supports: any = [];
  support: Supports;
  productsCount: any;
  error: string;
  blogForm: FormGroup;
  typeList: any;
  cities: Blog[];
  format1: string = "";
  format2: string = "";
  selectedCity: Blog;
  uploadError: string;
  selectedCategories: Category;
  selectedDate: Date;
  date: Date;
  selectedWorks: any[];
  categories: any = [];
  category: Category;
  productDialog: boolean = false;
  appointmentsDialog: boolean = false;
  clients: any = [];
  client: Clients;
  comuni: any = [];
  displayEvent: any;
  currentUser: any;
  items: any;
  appointmentsCount: Appointments;
  billingsCount: Billings;
  billingsCountTotal: Billings;
  projects: any = [];
  project: Projects;
  billingsCountTotalNotPaid: Billings;
  category_id: string;
  canvas: any;
  ctx: any;
  yAxes: [];
  xAxes: [];
  chartsCount: any;
  chartsCountNone: any;
  chartsCountData: any = [];
  chartsCountDataTotal: string;
  data1 = [];
  data2 = [];
  count = 0;
  pageSize = 3;
  page = 1;
  myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
  searchDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  trackByFn(index, item) {
    return item.id;
  }

  myMonth = formatDate(new Date(), 'dd/MM/yyyy', 'en');
  nameFilter: string;
  descriptionFilter: string;
  dateFromFilter: string;
  dateToFilter: string;
  currentDate: moment.Moment = moment();
  currentTime: string = moment().format(' MMMM YYYY');

  @ViewChild('mychart') mychart;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private blogService: BlogService,
    private clientsService: ClientsService,
    private appointmentsService: AppointmentsService,
    private billingsService: BillingsService,
    private chartsService: ChartsService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private worksService: WorksService,
    private router: Router,
    private productsService: ProductsService,
    private warehousesCheckinsService: WarehousesCheckinsService,
    private messageService: MessageService,
    private supportsService: SupportsService,
    private route: ActivatedRoute
  ) {
    this.typeList = TYPE_LIST;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    this.events = this.appointments;
    this.items = DASHBOARD;



  }

  ngOnInit() {

    const userId = this.currentUser.user_id;

    const params = this.getRequestParams(
      this.nameFilter = '',
      this.descriptionFilter = '',
      this.page = 1,
      this.pageSize = 200
    );
    this.appointmentsService.getAllListCalendar(params).subscribe((data) => {      
      this.projects = data;
      this.count = this.projectsService.size;
    


      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        timeFormat: 'HH:mm',
        weekNumbers: false,
        
        header: {
          right: 'prev,next',
          left: 'title',

        },

        events: data,
        eventRender: (v,el) => {console.log(v, el)},
        locale: 'it',
        timezone: 'UTC',
        selectable: true,
      };
      this.spinner.hide();

    });

  }



  getRequestParams(page, searchTitle, categoryTitle, pageSize): any {
    // tslint:disable-next-line:prefer-const
    const params = {};
    let adder = '?';
    if (page) {
      params[`page`] = page - 1;
      adder + 'page=' + (page - 1);
      adder = '&';
    }
    if (searchTitle) {
      params[`name`] = searchTitle;
      adder + 'date_from=' + searchTitle;
      adder = '&';
    }
    if (categoryTitle) {
      params[`description`] = categoryTitle;
      adder + 'date_to=' + categoryTitle;
      adder = '&';
    }
    if (pageSize) {
      params[`size`] = pageSize;
      adder + 'size=' + pageSize;
    }
    
    
    return params;
    
  }



  getProjects() {
    const params = this.getRequestParams(
      this.nameFilter = '',
      this.descriptionFilter = '',
      this.page = 1,
      this.pageSize = 2
    );
    this.projectsService.getAllListNew(params, this.currentUser.user_id).subscribe((pData) => {      
      this.projects = pData;
      this.count = this.projectsService.size;
      
    });
  }


  getLastWarehouseCheckins() {
    const params = this.getRequestParams(
      this.nameFilter,
      this.descriptionFilter,
      this.page,
      this.pageSize
    );
    this.warehousesCheckinsService.getAllListNew(params, this.currentUser.user_id).subscribe((pData) => {      
      this.warehouseCheckins = pData;
      this.count = this.warehousesCheckinsService.size;
      
    });
  }


  getSupports() {
    const params = this.getRequestParams(
      this.nameFilter = '',
      this.descriptionFilter = '',
      this.page = 1,
      this.pageSize = 3
    );
    this.supportsService.getAllListNew(params, this.currentUser.user_id).subscribe((pData) => {      
      this.supports = pData;
      this.count = this.supportsService.size;
      
    });
  }





  getChartsCount() {

    this.chartsService.countCharts().subscribe(data => {
      this.chartsCount = data;
      var StringifyData = JSON.stringify(this.chartsCount)
      this.chartsCount.forEach((item, index) => {
        var obj;
        obj = {
          x: item.x,
          y: item.y,
        }
        this.data1.push(obj)
      });

      console.log(this.chartsCountData)
      error => this.error = error
    });
  }


  getChartsCountNone() {

    this.chartsService.countChartsNone().subscribe(data => {
      this.chartsCountNone = data;
      var StringifyData = JSON.stringify(this.chartsCountNone)
      this.chartsCountNone.forEach((item, index) => {
        var obj;
        obj = {
          x: item.x,
          y: item.y,
        }
        this.data2.push(obj)
      });

      console.log(this.chartsCountData)
      error => this.error = error
    });
  }

  getClientsCount() {
    const userId = this.currentUser.user_id;
    this.clientsService.count().subscribe(
      (data: Clients) => this.clientsCount = data,
      error => this.error = error
    );
  }

  getWorks() {
    this.worksService.getAllListbyUser().subscribe(
      (data: Works) => this.works = data,
      error => this.error = error
    );
  }


  getProductsCount() {
    this.productsService.count().subscribe(data => {
      this.productsCount = data;
      error => this.error = error
    });
  }



  getAppointmentsCount() {
    const userId = this.currentUser.user_id;
    this.appointmentsService.count().subscribe(
      (data: Appointments) => this.appointmentsCount = data,
      error => this.error = error
    );
  }

  getBillingsCount() {
    const userId = this.currentUser.user_id;
    this.billingsService.count().subscribe(
      (data: Billings) => this.billingsCount = data,
      error => this.error = error
    );
  }


  getBillingsCountTotal() {
    const userId = this.currentUser.user_id;
    this.billingsService.countTotal(+userId).subscribe(
      (data: Billings) => this.billingsCountTotal = data,
      error => this.error = error
    );
  }


  getBillingsCountTotalNotPaid() {
    const userId = this.currentUser.user_id;
    this.billingsService.countTotalNotPaid(+userId).subscribe(
      (data: Billings) => this.billingsCountTotalNotPaid = data,
      error => this.error = error
    );
  }


  getAppointmentsToday() {
    const params = this.getRequestParams(
      this.page,
      this.nameFilter = formatDate(new Date(), 'yyyy-MM-dd 00:00', 'en'),
      this.descriptionFilter = formatDate(new Date(), 'yyyy-MM-dd 23:59', 'en'),
      this.pageSize
      
    );
    this.appointmentsService.getAllListNew(params, this.currentUser.user_id).subscribe((pData) => {      
      this.appointmentsToday = pData;
      this.count = this.appointmentsService.size;
      
    });
  }





  getWorksItem(works_id: string, id: string) {
    return this.works.find(item => item.id === works_id);
  }


  editProduct(appointment: Appointments) {
    this.appointment = { ...appointment };
    this.selectedWorks = this.appointment.works_id.split(',');
    this.appointmentsDialog = true;
  }



  showDialog() {
    this.productDialog = true;
  }

  clickButton(model: any) {
    this.displayEvent = model;

  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        title: model.event.title,
        works_id: model.event.works_id.split(','),
        location_id: model.event.location_id,
        employee_id: model.event.employee_id,
        allDay: model.event.allDay,
        description: model.event.description,
        category_id: model.event.category_id,
        client: model.event.client

        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
    this.productDialog = true;

  }

  eventRender(event) {
    const html = `<div>
      <div class="event-time"><i class="pi pi-clock"></i> ${event.event.time}</div>
      <div class="event-client-name"><strong>${event.event.client.name}</strong><br>${event.event.client.surname}</div>

    </div>`;
    event.element.html(html)
  }

  dayClick(event) {
    console.log('dayClick', event);
  }




}

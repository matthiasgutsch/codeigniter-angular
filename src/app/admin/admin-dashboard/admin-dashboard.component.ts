import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from 'primeng/api';
import { Appointments } from 'src/app/models/appointments';
import { Billings } from 'src/app/models/billings';
import { Category } from 'src/app/models/category';
import { Clients } from 'src/app/models/clients';
import { Employees } from 'src/app/models/employees';
import { Locations } from 'src/app/models/locations';
import { Products } from 'src/app/models/products';
import { Projects } from "src/app/models/projects";
import { Supports } from "src/app/models/supports";
import { Works } from 'src/app/models/works';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { BillingsService } from 'src/app/services/billings.service';
import { ClientsService } from 'src/app/services/clients.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProjectsService } from "src/app/services/projects.service";
import { SupportsService } from "src/app/services/supports.service";
import { WorksService } from 'src/app/services/works.service';
import { Blog } from '../../models/blog';
import { DASHBOARD, TYPE_LIST } from '../constants/constants';

import { User } from "src/app/auth/auth.type";
import { WarehouseCheckins } from "src/app/models/warehouse_checkins";
import { WarehousesCheckinsService } from "src/app/services/warehouses_checkins.service";
import { AuthService } from "../../auth/auth.service";
import { Comuni } from 'src/app/models/comuni';

moment.locale("it");

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
})
export class AdminDashboardComponent implements OnInit {
  calendarOptions: any;
  events: any;
  appointments: any = [];
  appointment: Appointments;
  appointmentsToday: any = [];
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

  products: any = [];
  product: Products;

  billings: any = [];
  billing: Billings;

  productsCount: any;
  error: string;
  blogForm: UntypedFormGroup;
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
  comuni: Comuni[] = [];
  displayEvent: any;
  currentUser: User;
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
  myDate = formatDate(new Date(), "dd/MM/yyyy", "en");
  searchDate = formatDate(new Date(), "yyyy-MM-dd", "en");

  trackByFn(index, item) {
    return item.id;
  }

  myMonth = formatDate(new Date(), "dd/MM/yyyy", "en");
  nameFilter: string;
  descriptionFilter: string;
  dateFromFilter: string;
  dateToFilter: string;
  currentDate: moment.Moment = moment();
  currentTime: string = moment().format(" MMMM YYYY");

  @ViewChild("mychart") mychart;

  @ViewChild(FullCalendarComponent) ucCalendar: FullCalendarComponent;

  constructor(
    private clientsService: ClientsService,
    private appointmentsService: AppointmentsService,
    private billingsService: BillingsService,
    private spinner: NgxSpinnerService,
    private fb: UntypedFormBuilder,
    private projectsService: ProjectsService,
    private worksService: WorksService,
    private router: Router,
    private productsService: ProductsService,
    private warehousesCheckinsService: WarehousesCheckinsService,
    private messageService: MessageService,
    private supportsService: SupportsService,
    private route: ActivatedRoute,
    private readonly authService: AuthService
  ) {
    this.typeList = TYPE_LIST;
    this.currentUser = authService.getUser();
    this.events = this.appointments;
    this.items = DASHBOARD;
  }

  ngOnInit() {
    const userId = this.currentUser.id;
    this.spinner.show();

    this.getClientsCount();
    this.getProductsCount();
    this.getBillingsCountTotal();
    this.getBillingsCountTotalNotPaid();
    this.getLastWarehouseCheckins();
    this.getBillingsCount();
    this.getAppointmentsToday();
    this.getAppointmentsCount();
    this.getWorks();
    this.getProjects();
    this.getSupports();
    this.getProducts();
    this.getBillings();
    this.spinner.hide();
  }

  getRequestParams(page, searchTitle, categoryTitle, pageSize): any {
    // tslint:disable-next-line:prefer-const
    const params = {};
    let adder = "?";
    if (page) {
      params[`page`] = page - 1;
      adder + "page=" + (page - 1);
      adder = "&";
    }
    if (searchTitle) {
      params[`name`] = searchTitle;
      adder + "date_from=" + searchTitle;
      adder = "&";
    }
    if (categoryTitle) {
      params[`description`] = categoryTitle;
      adder + "date_to=" + categoryTitle;
      adder = "&";
    }
    if (pageSize) {
      params[`size`] = pageSize;
      adder + "size=" + pageSize;
    }

    return params;
  }

  getProjects() {
    const params = this.getRequestParams(
      (this.nameFilter = ""),
      (this.descriptionFilter = ""),
      (this.page = 1),
      (this.pageSize = 2)
    );
    this.projectsService.getAllListNew(params).subscribe((pData) => {
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
    this.warehousesCheckinsService.getAllListNew(params).subscribe((pData) => {
      this.warehouseCheckins = pData;
      this.count = this.warehousesCheckinsService.size;
    });
  }

  getSupports() {
    const params = this.getRequestParams(
      (this.nameFilter = ""),
      (this.descriptionFilter = ""),
      (this.page = 0),
      (this.pageSize = 4)
    );
    this.supportsService.getAllListNew(params).subscribe((pData) => {
      this.supports = pData;
      this.count = this.supportsService.size;
    });
  }

  getProducts() {
    const params = this.getRequestParams(
      (this.nameFilter = ""),
      (this.descriptionFilter = ""),
      (this.page = 0),
      (this.pageSize = 4)
    );
    this.productsService.getAllListNew(params).subscribe((pData) => {
      this.products = pData;
      this.count = this.productsService.size;
    });
  }

  getBillings() {
    const params = this.getRequestParams(
      (this.nameFilter = ""),
      (this.descriptionFilter = ""),
      (this.page = 0),
      (this.pageSize = 4)
    );
    this.billingsService.getAllListNew(params).subscribe((pData) => {
      this.billings = pData;
      this.count = this.billingsService.size;
    });
  }

  getClientsCount() {
    const userId = this.currentUser.id;
    this.clientsService.count().subscribe(
      (data: Clients) => (this.clientsCount = data),
      (error) => (this.error = error)
    );
  }

  getWorks() {
    this.worksService.getAllListbyUser().subscribe(
      (data: Works) => (this.works = data),
      (error) => (this.error = error)
    );
  }

  getProductsCount() {
    this.productsService.count().subscribe((data) => {
      this.productsCount = data;
      (error) => (this.error = error);
    });
  }

  getAppointmentsCount() {
    const userId = this.currentUser.id;
    this.appointmentsService.count().subscribe(
      (data: Appointments) => (this.appointmentsCount = data),
      (error) => (this.error = error)
    );
  }

  getBillingsCount() {
    const userId = this.currentUser.id;
    this.billingsService.count().subscribe(
      (data: Billings) => (this.billingsCount = data),
      (error) => (this.error = error)
    );
  }

  getBillingsCountTotal() {
    const userId = this.currentUser.id;
    this.billingsService.countTotal(+userId).subscribe(
      (data: Billings) => (this.billingsCountTotal = data),
      (error) => (this.error = error)
    );
  }

  getBillingsCountTotalNotPaid() {
    const userId = this.currentUser.id;
    this.billingsService.countTotalNotPaid(+userId).subscribe(
      (data: Billings) => (this.billingsCountTotalNotPaid = data),
      (error) => (this.error = error)
    );
  }

  getAppointmentsToday() {
    const params = this.getRequestParams(
      this.page,
      (this.nameFilter = formatDate(new Date(), "yyyy-MM-dd 00:00", "en")),
      (this.descriptionFilter = formatDate(
        new Date(),
        "yyyy-MM-dd 23:59",
        "en"
      )),
      this.pageSize
    );
    this.appointmentsService.getAllListNew(params).subscribe((pData) => {
      this.appointmentsToday = pData;
      this.count = this.appointmentsService.size;
    });
  }

  getWorksItem(works_id: string, id: string) {
    return this.works.find((item) => item.id === works_id);
  }

  editProduct(appointment: Appointments) {
    this.appointment = { ...appointment };
    this.selectedWorks = this.appointment.works_id.split(",");
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
        works_id: model.event.works_id.split(","),
        location_id: model.event.location_id,
        employee_id: model.event.employee_id,
        allDay: model.event.allDay,
        description: model.event.description,
        category_id: model.event.category_id,
        client: model.event.client,

        // other params
      },
      duration: {},
    };
    this.displayEvent = model;
    this.productDialog = true;
  }

  eventRender(event) {
    const html = `<div>
      <div><i class="pi pi-clock"></i> ${event.event.time}</div>
      <hr classs="small">
      <div><strong>${event.event.client.name}</strong></div>
    <div><strong>${event.event.client.surname}</strong></div>

    </div>`;
    event.element.html(html);
  }

  dayClick(event) {
    console.log("dayClick", event);
  }
}

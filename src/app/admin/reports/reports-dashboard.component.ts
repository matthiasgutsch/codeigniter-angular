import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DASHBOARD, PAGES, TYPE_LIST } from '../constants/constants';
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
import {formatDate} from '@angular/common';
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
moment.locale('it')

@Component({
  selector: 'app-reports-dashboard',
  templateUrl: './reports-dashboard.component.html'
})
export class ReportsDashboardComponent implements OnInit {

  calendarOptions: any;
  events: any;
  appointments: any = [];
  appointment: Appointments;
  appointmentsToday: any = [];
  locations: any = [];
  location: Locations;

  employees: any = [];
  employee: Employees;
  
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
  currentUser: any ;
  items: any;
  appointmentsCount: Appointments;
  billingsCount: Billings;
  billingsCountTotal:  Billings;
  category_id: string;
  canvas: any;
  ctx: any;
  yAxes: [];
  xAxes: [];
  chartsCount: any;
  chartsCountData: any = [];
  chartsCountDataTotal: string;
  data1=[];

  trackByFn(index, item) {
    return item.id;
  }
  
  myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en')  ;
  myMonth = formatDate(new Date(), 'dd/MM/yyyy', 'en')  ;

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
    private comuniService: ComuniService,
    private worksService: WorksService,
    private locationsService: LocationsService, 
    private employeesService: EmployeesService,
    private categoryService: CategoryService,
    private router: Router,
    private productsService: ProductsService,
    private messageService: MessageService,
    private supportsService: SupportsService,
    private route: ActivatedRoute
  ) {
    this.typeList = TYPE_LIST;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    this.events = this.appointments;
    this.items = DASHBOARD;
    const userId = this.currentUser.user_id;


    
  }

  ngOnInit() {

    this.spinner.show();
      this.getClientsCount();
      this.getClients();
       this.getProductsCount();
       this.getBillingsCountTotal();
       this.getBillingsCount();
       this.getAppointmentsToday();
       this.getAppointmentsCount();
       this.getWorks();
       this.getChartsCount();

    this.spinner.hide();

  }




  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 

    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'line',
      
      data: {
        datasets: [{
          backgroundColor: "rgba(64, 162, 191,0.4)",
          borderColor: "rgb(64, 162, 191, 0.8)",
          fill: true,
          data: this.data1,
          steppedLine: false,
        }]
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        title: {
          display: false,
          text: 'Fatturato',
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',

            tooltips: {
              mode: 'index',
              intersect: true,
              callbacks: {
                label: function(tooltipItem) {
                       return tooltipItem.yLabel;
                }
             }
            },

            ticks: {
              beginAtZero: false,
              max: 12,
              min: 1,
              stepSize: 1
            },  

          
          }],
          yAxes: [{
            type: 'linear',
            ticks: {
              userCallback: function (tick) {
                return tick.toString() + '€';
              }
            },

     
            scaleLabel: {
              labelString: 'Höhe',
              display: false
            }
          }]
        }
      }
    });


  }


  
  getChartsCount() {

    this.chartsService.countCharts().subscribe(data => {
      this.chartsCount = data;
      var StringifyData = JSON.stringify(this.chartsCount)
      this.chartsCount.forEach((item,index)=>{
          var obj;
          obj={
            x:item.x,
            y:item.y,
          }
        this.data1.push(obj)
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

      

    getClients() {
      this.clientsService.getAllListbyUser().subscribe(data => {
        this.clients = data;
        error => this.error = error
      });
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


    getAppointmentsToday() {
      const userId = this.currentUser.user_id; 
    this.appointmentsService.getToday(+userId).subscribe(
      (data: Appointments) => this.appointmentsToday = data,
      error => this.error = error
      );
    }




}

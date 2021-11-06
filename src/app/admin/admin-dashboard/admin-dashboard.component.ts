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

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
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
  
  works: any = [];
  work: Works;
  clientsCount: any;

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
    private route: ActivatedRoute
  ) {
    this.typeList = TYPE_LIST;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    this.events = this.appointments;
    this.items = DASHBOARD;


    
  }

  ngOnInit() {

    this.spinner.show();
    const userId = this.currentUser.user_id;

  
    this.appointmentsService.getAllListbyUser().subscribe(data => {

      this.getClientsCount();
      this.getClients();
       this.getProductsCount();
       this.getBillingsCountTotal();
       this.getBillingsCount();
       this.getAppointmentsToday();
       this.getAppointmentsCount();
       this.getWorks();
       this.getChartsCount();

      this.calendarOptions = {
    
        editable: true,
        eventLimit: false,
        timeFormat: 'HH:mm', 
        weekNumbers: true,
        header: {
          right: 'prev,next',
          left: 'title',

        },
        
        events: data,
        locale: 'it',
        timezone: 'UTC',
        selectable: true,
      };
    });
    this.spinner.hide();

  }




  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'line',
      
      data: {
        datasets: [{
          label: 'Fatturazione',
          backgroundColor: "rgba(64, 162, 191,0.4)",
          borderColor: "rgb(64, 162, 191, 0.8)",
          fill: true,
          data: this.data1,
        }]
      },

      
      options: {
        responsive: true,
        title: {
          display: false,
          text: 'Fatturato questo mese'
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',

            scaleLabel: {
              labelString: 'Länge',
              display: false,
            }
          }],
          yAxes: [{
            type: 'linear',
            ticks: {
              userCallback: function (tick) {
                return tick.toString();
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
      this.chartsCountData = JSON.stringify(this.chartsCount);
      this.chartsCountDataTotal = this.chartsCountData.toString()

      var StringifyData=JSON.stringify(this.chartsCount)
      console.log(this.chartsCount)
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





    getCategoryItem(category_id: string, id: string) {
      return this.clients.find(item => item.id === category_id);
    }


    getComuniItem(province: string, id: string) {
      return this.comuni.find(item => item.id === province);
    }

    getEmployeeItem(employee_id: string, id: string) {
      return this.employees.find(item => item.id === employee_id);
    }

    

    getLocationItem(location_id: string, id: string) {
      return this.locations.find(item => item.id === location_id);
    }



    getWorksItem(works_id: string, id: string) {
      return this.works.find(item => item.id === works_id);
    }

    
  editProduct(appointment: Appointments) {
    this.appointment = {...appointment};
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
        category_id: model.event.category_id

        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
    this.productDialog = true;

  }

  dayClick(event) {
    console.log('dayClick', event);
  }




}

import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TYPE_LIST } from '../constants/constants';
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

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {

  calendarOptions: any;
  events: any;
  appointments: any = [];
  appointment: Appointments;
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
  categories: any = [];
  category: Category;
  productDialog: boolean = false;
  appointmentsDialog: boolean = false;
  clients: any = [];
  client: Clients;
  comuni: any = [];
  displayEvent: any;
  currentUser: any ;
  trackByFn(index, item) {
    return item.id;
  }
  
  myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en')  ;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private blogService: BlogService,
    private clientsService: ClientsService,
    private appointmentsService: AppointmentsService,
    private fb: FormBuilder,
    private comuniService: ComuniService,
    private categoryService: CategoryService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.typeList = TYPE_LIST;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    this.events = this.appointments;

  }

  ngOnInit() {


    this.appointmentsService.getAllList().subscribe(data => {
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        timeFormat: 'HH:mm', 
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

    this.clientsService.getAllList().subscribe(
      (data: Clients) => this.clients = data,
      error => this.error = error
    );


    this.appointmentsService.getToday().subscribe(
      (data: Appointments) => this.appointments = data,
      error => this.error = error
    );

    this.comuniService.getAllList().subscribe(
      (data: Comuni) => this.comuni = data,
      error => this.error = error
    );


    this.categoryService.getAllList().subscribe(
      (data: Category) => this.categories = data,
      error => this.error = error
    );


    this.blogForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      is_featured: ['0'],
      category_id: ['', Validators.required],
      is_active: ['0'],
      image: [''],
      date: ['', Validators.required]
    });

  }


  getCategoryItem(category_id: string, id: string) {
    return this.clients.find(item => item.id === category_id);
  }


  getComuniItem(province: string, id: string) {
    return this.comuni.find(item => item.id === province);
  }



    
  editProduct(appointment: Appointments) {
    this.appointment = {...appointment};
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

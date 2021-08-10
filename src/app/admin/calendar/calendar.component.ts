import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { BlogService } from '../../services/blog.service';
import { AppointmentsService } from '../../services/appointments.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Blog } from '../../models/blog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TYPE_LIST } from '../constants/constants';
import { CategoryService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Appointments } from 'src/app/models/appointments';
import * as $ from 'jquery';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class AdminCalendarComponent implements OnInit {

  calendarOptions: any;
  events: any;
  blogs: Blog;
  error: string;
  blogForm: FormGroup;
  typeList: any;
  cities: Blog[];
  format1: string = "";
  appointments: Appointments;
  displayEvent: any;

  format2: string = "";
  selectedCity: Blog;
  uploadError: string;
  selectedCategories: Category;
  selectedDate: Date;
  date: Date;
  categories: Category;
  productDialog: boolean = false;
  @ViewChild(CalendarComponent) ucCalendaradmin: CalendarComponent;

  constructor(private employeesService: EmployeesService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    private appointmentsService: AppointmentsService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.typeList = TYPE_LIST;

    this.events = this.appointments;

  }

  ngOnInit() {
    this.categoryService.getAllList().subscribe(
      (data: Category) => this.categories = data,
      error => this.error = error
    );


    this.appointmentsService.getAllList().subscribe(data => {
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        locale: "it",
        timeFormat: 'H(:mm)', 
        header: {
          right: "prev,next",
          left: "title",
        },
        events: data,
        timezone: "UTC",
        selectable: true,
      };
    });




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
        allDay: model.event.allDay
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

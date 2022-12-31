import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PAGES_COMPANY, PAGES_PRODUCT, TYPE_LIST } from '../constants/constants';
import { CategoryService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { Router, ActivatedRoute } from '@angular/router';
import {MessageService} from 'primeng/api';
import { ClientsService } from 'src/app/services/clients.service';
import { Clients } from 'src/app/models/clients';
import { ComuniService } from 'src/app/services/comuni.service';
import { Comuni } from 'src/app/models/comuni';
import { Appointments } from 'src/app/models/appointments';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { CalendarComponent } from 'ng-fullcalendar';
import * as $ from 'jquery';
import { PAGES } from '../constants/constants';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  calendarOptions: any;
  events: any;
  appointments: Appointments;
  error: string;
  blogForm: UntypedFormGroup;
  typeList: any;
  settingsPages: any;
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
  productDialog:boolean = false;
  appointmentsDialog: boolean = false;
  clients: any = [];
  client: Clients;
  comuni: any = [];
  items: any = [];
  itemsProduct: any = [];
  itemsCompany: any = [];

trackByFn(index, item) {
  return item.id;
}

@ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private blogService: BlogService,     
    private clientsService: ClientsService,
    private appointmentsService: AppointmentsService,
    private fb: UntypedFormBuilder,
    private comuniService: ComuniService,
    private categoryService: CategoryService, 
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
    ) {
      this.items = [];
      this.itemsProduct = [];
      this.itemsCompany = [];

   }

  ngOnInit() {
    this.items = PAGES;
    this.itemsProduct = PAGES_PRODUCT;
    this.itemsCompany = PAGES_COMPANY;


} 

  
}

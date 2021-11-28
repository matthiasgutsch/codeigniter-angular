import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DASHBOARD, PAGES, TYPE_LIST } from '../constants/constants';
import { CategoryService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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


export interface BoardCol {
  heading:string;
  tasks: Task[];
}

export interface Task{
  id:number,
  value:string
}


@Component({
  selector: 'app-drag-dashboard',
  templateUrl: './drag-dashboard.component.html'
})
export class DragDashboardComponent implements OnInit {

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

  products: any = [];
  availableProducts:  any = [];
  selectedProducts: any = [];
  draggedProduct: any;
  product: Products;

  public boardData: BoardCol[] = [];
  public currentColIndex: number;
  public currentTaskDragged: Task;


  
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
    private confirmationService: ConfirmationService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private supportsService: SupportsService,
    private route: ActivatedRoute
  ) {
    this.typeList = TYPE_LIST;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    this.items = DASHBOARD;
    const userId = this.currentUser.user_id;

    this.selectedProducts = [];


    
  }


  ngOnInit() {

    this.spinner.show();
    this.getProducts();
    this.spinner.hide();
    this.initializeBoardData();

  }


  public initializeBoardData(): void {
    this.boardData =
      [
        { heading: "Started",  tasks: [{ id: 1, value: "Task 1" }, { id: 2, value: "Task 2" }, { id: 3, value: "Task 3" }] },
        { heading: "25% Done", tasks: [{ id: 4, value: "Task 4" }, { id: 5, value: "Task 5" }, { id: 6, value: "Task 6" }] },
        { heading: "75% Done", tasks: [{ id: 7, value: "Task 7" }, { id: 8, value: "Task 8" }, { id: 9, value: "Task 9" }] },
        { heading: "Finished", tasks: [{ id: 10, value: "Task 10" }, { id: 11, value: "Task 11" }, { id: 12, value: "Task 12" }] },
        
      ]
  }

  public onTaskDragStart(event: any, task: Task, colIndex: number): void {
    this.currentColIndex = colIndex;
    this.currentTaskDragged = task;
  }

  public onTaskDrop(event: any, colIndex: number): void {
    if(this.currentColIndex != colIndex){
      this.boardData[this.currentColIndex].tasks.splice(this.boardData[this.currentColIndex].tasks.indexOf(this.currentTaskDragged),1);
      this.boardData[colIndex].tasks.unshift(this.currentTaskDragged);
    }else{
      
    }
  }

 
  getProducts() {

    this.productsService.getAllListbyUser().subscribe(
      (products: Products) => this.availableProducts = products,
      error => this.error = error
    );
    
  
    }

    

}

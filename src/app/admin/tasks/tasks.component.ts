import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
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
import { Projects } from 'src/app/models/projects';
import { BillingsService } from 'src/app/services/billings.service';
import { Billings } from 'src/app/models/billings';
import { NgxSpinnerService } from "ngx-spinner";
import { ChartsService } from 'src/app/services/charts.service';
import { Charts } from 'src/app/models/charts';
import 'moment/locale/it'  // without this line it didn't work
import { SupportsService } from 'src/app/services/supports.service';
import { Supports } from 'src/app/models/supports';
import { ProjectsService } from 'src/app/services/projects.service';
moment.locale('it')
import { Subscription } from 'rxjs';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/tasks';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

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


  highPriorityTasks: Task[] = [];
  backupHighPriorityTasks: Task[] = [];
  mediumPriorityTasks: Task[] = [];
  backupMediumPriorityTasks: Task[] = [];
  lowPriorityTasks: Task[] = [];
  backupLowPriorityTasks: Task[] = [];
  busy: Subscription;
  busy1: Subscription;
  busy2: Subscription;


  trackByFn(index, item) {
    return item.id;
  }
  
  myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en')  ;
  myMonth = formatDate(new Date(), 'dd/MM/yyyy', 'en')  ;

  projects: any = [];
  availableProducts:  any = [];
  selectedProducts: any = [];
  draggedProduct: any;
  project: Projects;
  boardData: any = [];
  skills = [];


  
  constructor(private blogService: BlogService,
    private clientsService: ClientsService,
    private appointmentsService: AppointmentsService,
    private billingsService: BillingsService,
    private chartsService: ChartsService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private comuniService: ComuniService,
    private worksService: WorksService,
    private tasksService: TasksService,
    private locationsService: LocationsService, 
    private employeesService: EmployeesService,
    private categoryService: CategoryService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private projectsService: ProjectsService,
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
    this.getTasks();
     this.spinner.hide();

  }



  goToAddTaskPage() {
    this.router.navigate(['/add-task']);
  }

  getTasks() {
    this.busy = this.tasksService.getAllListbyUser().subscribe({
      next: (response: any) => {
        if (response.error) {
          
        } else {
          response.forEach((task) => {
            if (task.priority === '3') {
              this.highPriorityTasks.push(task);
            } else if (task.priority === '2') {
              this.mediumPriorityTasks.push(task);
            } else if (task.priority === '1') {
              this.lowPriorityTasks.push(task);
            }
          });
        }
      },
    });
    this.backupHighPriorityTasks = this.highPriorityTasks;
    this.backupLowPriorityTasks = this.lowPriorityTasks;
    this.backupMediumPriorityTasks = this.mediumPriorityTasks;
  }

  deleteTask(event) {
    this.confirmationService.confirm({
      message: 'Are you sure want to delete it = ' + event.title,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.busy1 = this.tasksService.delete(event.id).subscribe({
          next: (response: any) => {
            if (response.error) {
            } else {
              this.getTasks();
              this.deleteFromLocalData(event.type, event.index);
            this.messageService.add({key: 'myKey1', severity:'warn', summary: 'Attenzione', detail: 'Cancellazione avvenuto con successo'});
          }
        },
      });
    },
  });
  };

  editItem(task) {
    window.localStorage.setItem('task', JSON.stringify(task));
    this.router.navigate(['/edit-task']);
  }

  deleteFromLocalData(type, index) {
    // This is used to avoid unnecessary API call for getTasks() which will result in better performance
    if (type === 'high') {
      this.highPriorityTasks.splice(index, 1);
      this.backupHighPriorityTasks.splice(index, 1);
    } else if (type === 'medium') {
      this.mediumPriorityTasks.splice(index, 1);
      this.backupMediumPriorityTasks.splice(index, 1);
    } else {
      this.lowPriorityTasks.splice(index, 1);
      this.backupLowPriorityTasks.splice(index, 1);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  dropHighPriorityTasksList(event: CdkDragDrop<string[]>) {
    event.item.data.priority = 3;
    this.updatePriority(event);
  }

  updatePriority(event) {
    const id = event.item.data.id;
    const formData = new FormData();
    formData.set('priority', event.item.data.priority);
    this.busy2 = this.tasksService.update_priority(formData, +id).subscribe({
      next: (response: any) => {
        if (response.error) {
        } else {
          this.drop(event);
        }
      },
    });
  }

  dropMediumPriorityTasksList(event: CdkDragDrop<string[]>, id) {
    event.item.data.priority = 2;
    this.updatePriority(event);
  }

  dropLowPriorityTasksList(event: CdkDragDrop<string[]>) {
    event.item.data.priority = 1;
    this.updatePriority(event);
  }

  ngOnDestroy() {
    this.busy1 ? this.busy1.unsubscribe() : '';
    this.busy2 ? this.busy2.unsubscribe(): '';
    this.busy ? this.busy.unsubscribe(): '';
  }


  search(event) {
    this.highPriorityTasks = this.backupHighPriorityTasks.filter((task) => {
      return task.message
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    this.lowPriorityTasks = this.backupLowPriorityTasks.filter((task) => {
      return task.message
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    this.mediumPriorityTasks = this.backupMediumPriorityTasks.filter((task) => {
      return task.message
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
  }

}

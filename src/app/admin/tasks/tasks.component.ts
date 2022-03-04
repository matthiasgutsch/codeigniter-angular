import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DASHBOARD, PAGES, PRIORITY_LIST, TYPE_LIST } from '../constants/constants';
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
export class TasksComponent implements OnInit, OnDestroy {

  @Input() cancel: boolean = false;
  @Input() edit: boolean = false;

  
  calendarOptions: any;
  events: any;
  appointments: any = [];
  appointment: Appointments;
  appointmentsToday: any = [];
  locations: any = [];
  location: Locations;
  employees: any = [];
  employee: Employees;
  task: Task;
  works: any = [];
  work: Works;
  clientsCount: any;
  supports: any = [];
  support: Supports;
  productsCount: any;
  error: string;
  blogForm: FormGroup;
  typeList: any;
  priorityList: any;
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
  productDialogAdd: boolean = false;
  productDialogView: boolean = false;
  appointmentsDialog: boolean = false;
  clients: any = [];
  project_id: string;
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


  donePriorityTasks: Task[] = [];
  backupDonePriorityTasks: Task[] = [];
  highPriorityTasks: Task[] = [];
  backupHighPriorityTasks: Task[] = [];
  mediumPriorityTasks: Task[] = [];
  backupMediumPriorityTasks: Task[] = [];
  lowPriorityTasks: Task[] = [];
  backupLowPriorityTasks: Task[] = [];

  busy: Subscription;
  busy1: Subscription;
  busy2: Subscription;
  subscription: Subscription;

  trackByFn(index, item) {
    return item.id;
  }
  
  myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en')  ;
  myMonth = formatDate(new Date(), 'dd/MM/yyyy', 'en')  ;
  valueProcess: number;
  projects: any = [];
  project: Projects;
  availableProducts:  any = [];
  selectedProducts: any = [];
  draggedProduct: any;

  boardData: any = [];
  skills = [];

  taskId: string;

  taskForm = this.fb.group({
    title: ['', Validators.required],
    due_date: [''],
    priority: [''],
    assigned_to: [''],
  });

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
    private cd: ChangeDetectorRef,
    private router: Router,
    private confirmationService: ConfirmationService,
    private projectsService: ProjectsService,
    private messageService: MessageService,
    private supportsService: SupportsService,
    private route: ActivatedRoute
  ) {
    this.typeList = TYPE_LIST;
    this.priorityList = PRIORITY_LIST;

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    this.items = DASHBOARD;
    const userId = this.currentUser.user_id;
    this.selectedProducts = [];
    
    }


  ngOnInit() {
    
    this.spinner.show();

    
    this.projects ={
      id:this.route.snapshot.params['project_id'],
    }

    this.projectsService.getId(this.projects.id).subscribe(value => {
      this.project = value;



    });
    this.getTasks();
    this.getEmployees();

    this.spinner.hide();

  }



  getEmployees() {
    this.employeesService.getAllListbyUser().subscribe(data => {
      this.clients = data;
    });


  }

  goToAddTaskPage() {
    this.productDialogAdd = true;

    this.blogForm = this.fb.group({
      id: [""],
      title: ["", Validators.required],
      description: [""],
      priority: [""],
      employee_id: [""],
      user_id: [this.currentUser.user_id],

  });

  }



  deleteFromLocalData(type, index) {
    // This is used to avoid unnecessary API call for getTasks() which will result in better performance
   
      this.donePriorityTasks.splice(index);
      this.backupDonePriorityTasks.splice(index);
      this.highPriorityTasks.splice(index);
      this.backupHighPriorityTasks.splice(index);
      this.mediumPriorityTasks.splice(index);
      this.backupMediumPriorityTasks.splice(index);
      this.lowPriorityTasks.splice(index);
      this.backupLowPriorityTasks.splice(index);
      
  }



onSubmit(task: Task, index) {
  const formData = new FormData();

  formData.append("title", this.blogForm.get("title").value);
  formData.append("priority", this.blogForm.get("priority").value);
  formData.append("description", this.blogForm.get("description").value);
  formData.append('user_id', this.blogForm.get('user_id').value);
  formData.append('employee_id', this.blogForm.get('employee_id').value);

  formData.append('project_id', this.projects.id);
  const id = task.id;

  if (id) {
    this.busy1 = this.tasksService.update(formData, +id).subscribe(
      (res) => {
        if (res.status == "error") {
          this.uploadError = res.message;
        } else {
          this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Salvato con sucesso' });
          //this.router.navigate(['/admin/products']);
          this.deleteFromLocalData(task, index);
          this.getTasks();
        }
      },
      (error) => (this.error = error)
    );
  } else {
    this.tasksService.create(formData).subscribe(
      (res) => {
        if (res.status === "error") {
          this.uploadError = res.message;
        } else {
          this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Salvato con sucesso' });
          this.cd.detectChanges()

        }
      },
      (error) => (this.error = error)
    );
  }
}


onSubmitAdd(task: Task, index) {
  const formData = new FormData();

  formData.append("title", this.blogForm.get("title").value);
  formData.append("description", this.blogForm.get("description").value);
  formData.append("priority", this.blogForm.get("priority").value);
  formData.append("employee_id", this.blogForm.get("employee_id").value);

  formData.append('user_id', this.blogForm.get('user_id').value);
  formData.append('project_id', this.projects.id);

  
    this.tasksService.create(formData).subscribe(
      (res) => {
        if (res.status === "error") {
          this.uploadError = res.message;
        } else {
          this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Salvato con sucesso' });
          this.deleteFromLocalData(task, index);
          this.getTasks();
        }
      },
    );
}



    changedNumber(value){
    this.task.title = value.item.data.title;
    }  

    getTasks() {
      this.spinner.show();
      this.subscription = this.tasksService.getAllTasksListbyUser(this.projects.id).subscribe({
      next: (response: any) => {
        if (response.error) {
          
        } else {
          response.forEach((task) => {
            if (task.priority === '4') {
              this.donePriorityTasks.push(task);
            } else if (task.priority === '3') {
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

    this.backupDonePriorityTasks = this.donePriorityTasks;
    this.backupHighPriorityTasks = this.highPriorityTasks;
    this.backupLowPriorityTasks = this.lowPriorityTasks;
    this.backupMediumPriorityTasks = this.mediumPriorityTasks;




    this.spinner.hide();

  }

  deleteTask(event, task: Task, index) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di volerlo cancellare = ' + event.title,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.busy1 = this.tasksService.delete(event.id).subscribe({
          next: (response: any) => {
            if (response.error) {
            } else {
              this.deleteFromLocalData(task, index);

              this.getTasks();
              
            this.messageService.add({key: 'myKey1', severity:'warn', summary: 'Attenzione', detail: 'Cancellazione avvenuto con successo'});
          }
        },
      });
    },
  });
  };


  editItem(task: Task) {
    this.task = { ...task };
    const id = task.id;

    if (id) {
      
      this.tasksService.getId(+id).subscribe((res) => {
        if (res.user_id == this.currentUser.user_id) {
          this.blogForm.patchValue({
          title: res.title,
          description: res.description,
          priority: res.priority,
          employee_id: res.employee_id,

          user_id: this.currentUser.user_id,
        });
      }
      else {
        this.productDialog = false;
      }
        this.task.id = res.id;
      });
    } else {

    }
    
    this.blogForm = this.fb.group({
        id: [""],
        title: ["", Validators.required],
        description: ["", Validators.required],
        priority: ["", Validators.required],
        employee_id: [""],
        user_id: [this.currentUser.user_id],

    });

    this.productDialog = true;
  }




  
  viewItem(task: Task) {
    this.task = { ...task };
    const id = task.id;

    this.tasksService.getId(+id).subscribe((data) => {
     this.task = data,
      error => this.error = error
     });

    this.productDialogView = true;
  }

  getPerformaceCount():number{
    let pendingTasks = JSON.parse(localStorage.getItem('pendingTaskList')).length;
    let inProgressTasks = JSON.parse(localStorage.getItem('inProgressTaskList')).length;
    let completedTasks = JSON.parse(localStorage.getItem('completedTaskList')).length;
    return Math.round((completedTasks / (pendingTasks + inProgressTasks + completedTasks)) * 100);
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


  dropDonePriorityTasksList(event: CdkDragDrop<string[]>) {
    event.item.data.priority = 4;
    this.updatePriority(event);
  }


  dropHighPriorityTasksList(event: CdkDragDrop<string[]>) {
    event.item.data.priority = 3;
    this.updatePriority(event);
  }

  dropMediumPriorityTasksList(event: CdkDragDrop<string[]>, id) {
    event.item.data.priority = 2;
    this.updatePriority(event);
  }

  dropLowPriorityTasksList(event: CdkDragDrop<string[]>) {
    event.item.data.priority = 1;
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
          this.messageService.add({key: 'myKey1', severity:'success', summary: 'Conferma', detail: 'Salvato con successo'});

        }
      },
    });
  }

  ngOnDestroy() {
    this.busy1 ? this.busy1.unsubscribe() : '';
    this.busy2 ? this.busy2.unsubscribe(): '';
    this.busy ? this.busy.unsubscribe(): '';
    this.subscription.unsubscribe();
  }


  getEmployeeItem(task: Task, id: string) {
    return this.clients.find((item) => item.id === task);
  }

}

import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { EmployeesService } from '../../../services/employees.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Clients } from '../../../models/clients';
import { Category } from '../../../models/category';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../../services/categories.service';
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import * as moment from 'moment';
import { FISCAL_CODE_VALIDATOR_REGEX, SEX_LIST, STATE_LIST, BUSINESS_STATE_LIST } from '../../constants/constants';
import { ComuniService } from 'src/app/services/comuni.service';
import { Comuni } from 'src/app/models/comuni';
import {Location} from '@angular/common';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Appointments } from 'src/app/models/appointments';
import { BillingsService } from 'src/app/services/billings.service';
import { Billings } from 'src/app/models/billings';
import { PersonalDataService } from 'src/app/services/personal_data.service';
import { Personal_data } from 'src/app/models/personal_data';
import { NgxSpinnerService } from "ngx-spinner";
import { Task } from 'src/app/models/tasks';
import { TasksService } from 'src/app/services/tasks.service';
import { Employees } from 'src/app/models/employees';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employees-tasks',
  templateUrl: './employees-tasks.component.html'
})
export class EmployeesTasksComponent implements OnInit {
  @Input() cancel: boolean = false;
  @Input() edit: boolean = false;

  
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  clients: Clients;
  client: Clients;

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

  
  clientsList: any = [];
  clientList: Clients;


  categories: any = [];
  category: Category;
  checked: boolean = true;
  selectedValue: string;
  comuni: Comuni;

  blogForm: FormGroup;
  typeList: any[];

  cities: Clients[];
  format1: string = "";
  format2: string = "";
  selectedCity: Clients;
  selectedCategories: Category;
  selectedDate: Date;
  date: Date;
  appointments: any = [];
  is_featured = '0';
  deleteButton: boolean;
  billings: any = [];
  billing: Billings;
  currentUser: any;
  addForm: FormGroup;
  rows: FormArray;
  itemForm: FormGroup;
  skillsForm: FormGroup;
  skillsValues: any = [];
  stateOptions: any[];
  cols: any[];
  exportColumns: any[];
  _selectedColumns: any[];
  businessStateOptions: any[]; 
  personal_datas: any = [];
  personal_data: Personal_data;
  personName: string;
  tasks: any = [];
  task: Task;

  employees: any = [];
  employee: Employees;

  productDialogView:  boolean = false;

  trackByFn(index, item) {
    return item.id;
  }

  constructor(
    private fb: FormBuilder,
    private employeesService: EmployeesService,
    private messageService: MessageService,
    private personalDataService: PersonalDataService,
    private categoryService: CategoryService,
    private comuniService: ComuniService,    
    private _location: Location,
    private appointmentsService: AppointmentsService,
    private tasksService: TasksService,
    private spinner: NgxSpinnerService,

    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    this.typeList = SEX_LIST;
    this.stateOptions = STATE_LIST;
    this.businessStateOptions = BUSINESS_STATE_LIST;

  }

  ngOnInit() {

    this.spinner.show();

    const userId = this.currentUser.user_id;

    this.employees = {
      id:this.route.snapshot.params['id'],
    }

    this.employeesService.getId(this.employees.id).subscribe(value => {
      this.employee = value;
    });


    this.comuniService.getAllList().subscribe(
      (data: Comuni) => (this.comuni = data),
      (error) => (this.error = error)
    );

    this.personalDataService.getAllListbyUser().subscribe(
      (data: Personal_data) => (this.personal_datas = data),
      (error) => (this.error = error)
    );



    const id = this.route.snapshot.paramMap.get("id");

    this.getTasks(id);
    this.spinner.hide();
 


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
    
    this.busy2 = this.tasksService.update_priority_employee(formData, +id).subscribe({
      next: (response: any) => {
        if (response.error) {
        } else {
          this.drop(event);
          this.messageService.add({key: 'myKey1', severity:'success', summary: 'Conferma', detail: 'Salvato con successo'});

        }
      },
    });
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


  ngOnDestroy() {
    this.busy1 ? this.busy1.unsubscribe() : '';
    this.busy2 ? this.busy2.unsubscribe(): '';
    this.busy ? this.busy.unsubscribe(): '';
    this.subscription.unsubscribe();
  }


  getTasks(id) {
    this.spinner.show();
    this.subscription = this.tasksService.find_tasks_employee(+id).subscribe({
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


  getCategoryItem(category_id: string, id: string) {
    return this.categories.find((item) => item.id === category_id);
  }



  onDelete(id: number, title: string) {

    this.confirmationService.confirm({
      message: 'Are you sure want to delete',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeesService.delete(+id).subscribe(
          res => {
            console.log(res);
            this.messageService.add({ key: 'cancel', severity: 'success', summary: 'Attenzione', detail: 'Cancellazione avvenuto con successo' });
           this._location.back();

          },
          error => {
            this.error = error;
            this.messageService.add({ key: 'cancel', severity: 'warn', summary: 'Attenzione', detail: 'Errore backend' });
          });
      },

    });


  }


   

  get title() {
    return this.blogForm.get("title");
  }

  

  get id() {
    return this.blogForm.get("id").value;
  }


  get description() {
    return this.blogForm.get("description");
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("name", this.blogForm.get("name").value);
    formData.append("surname", this.blogForm.get("surname").value);
    formData.append("username", this.blogForm.get("username").value);
    formData.append("city", this.blogForm.get("city").value);
    formData.append("zip", this.blogForm.get("zip").value);
    formData.append("address", this.blogForm.get("address").value);
    formData.append("province", this.blogForm.get("province").value);
    formData.append("region", this.blogForm.get("region").value);
    formData.append("email", this.blogForm.get("email").value);
    formData.append("phone", this.blogForm.get("phone").value);
    formData.append("fiscalcode", this.blogForm.get("fiscalcode").value);
    formData.append("fiscalnumber", this.blogForm.get("fiscalnumber").value);
    formData.append("description", this.blogForm.get("description").value);
    formData.append("is_featured", this.blogForm.get("is_featured").value);
    formData.append("category_id", this.blogForm.get("category_id").value);
    formData.append('user_id', this.blogForm.get('user_id').value);
    formData.append("is_active", this.blogForm.get("is_active").value);
    formData.append("image", this.blogForm.get("image").value);
    formData.append("date", this.blogForm.get("date").value);

    const id = this.blogForm.get("id").value;

    if (id) {
      this.employeesService.update(formData, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Attenzione', detail: 'Salvato con sucesso' });
           // this._location.back();

          }
        },
        (error) => (this.error = error)
      );
    } else {
      this.employeesService.create(formData).subscribe(
        (res) => {
          if (res.status === "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Attenzione', detail: 'Salvato con sucesso' });
            this.router.navigate(['/admin/employees']);

          }
        },
        (error) => (this.error = error)
      );
    }
  }
}



export function codFisc(c: FormControl): { [s: string]: boolean } {
  if (c.value && !c.value.match(FISCAL_CODE_VALIDATOR_REGEX)) {
    return { invalidCF: true };
  }
}

import { Component, ElementRef, OnInit } from '@angular/core';
import { EmployeesService } from '../../../services/employees.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup, UntypedFormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Clients } from '../../../models/clients';
import { Category } from '../../../models/category';
import { UntypedFormControl } from '@angular/forms';
import { CategoryService } from '../../../services/categories.service';
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import * as moment from 'moment';
import { FISCAL_CODE_VALIDATOR_REGEX, SEX_LIST, STATE_LIST, BUSINESS_STATE_LIST, EMPLOYEE_TYPE_LIST } from '../../constants/constants';
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


@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html'
})
export class EmployeesFormComponent implements OnInit {
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  clients: Clients;
  client: Clients;


  clientsList: any = [];
  clientList: Clients;


  categories: any = [];
  category: Category;
  checked: boolean = true;
  selectedValue: string;
  comuni: Comuni;

  blogForm: UntypedFormGroup;
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
  addForm: UntypedFormGroup;
  rows: UntypedFormArray;
  itemForm: UntypedFormGroup;
  skillsForm: UntypedFormGroup;
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


  productDialogView:  boolean = false;

  trackByFn(index, item) {
    return item.id;
  }

  constructor(
    private fb: UntypedFormBuilder,
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
    this.businessStateOptions = EMPLOYEE_TYPE_LIST;


    this.route.paramMap.subscribe((params) => {
      this.ngOnInit();
    });

  }

  ngOnInit() {

    this.spinner.show();

    const userId = this.currentUser.id;
    this.getClientList();

    this.comuniService.getAllList().subscribe(
      (data: Comuni) => (this.comuni = data),
      (error) => (this.error = error)
    );

    this.personalDataService.getAllListbyUser().subscribe(
      (data: Personal_data) => (this.personal_datas = data),
      (error) => (this.error = error)
    );



    const id = this.route.snapshot.paramMap.get("id");


    this.tasksService.find_tasks_employee(+id).subscribe(
      (data: Task) => (this.tasks = data),
      (error) => (this.error = error)
    );



    if (id) {
      this.pageTitle = "Modifica Dipendente";
      this.deleteButton = true;



      this.employeesService.getId(+id).subscribe((res) => {
        if (res.user_id == this.currentUser.id) {
        this.blogForm.patchValue({
          name: res.name,
          surname: res.surname,
          username: res.name + ' ' + res.surname,
          city: res.city,
          zip: res.zip,
          address: res.address,
          province: res.province,
          region: res.region,
          email: res.email,
          phone: res.phone,
          contract: res.contract,
          vacations: res.vacations,
          permissions: res.permissions,

          fiscalcode: res.fiscalcode,
          fiscalnumber: res.fiscalnumber,
          description: res.description,
          user_id: this.currentUser.id,
          category_id: res.category_id,
          is_featured: res.is_featured,
          is_active: res.is_active,
          date: res.date,
          id: res.id,
        });
        }
        else {
          this.router.navigate(['/admin/employees']);

        }
        this.imagePath = res.image;
        this.personName = res.name + ' ' + res.surname;

      });
    } else {
      this.deleteButton = false;
      this.pageTitle = "Aggiungi Dipendente";
    }




    this.blogForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      username: [""],
      city: ["", Validators.required],
      zip: ["", Validators.required],
      address: ["", Validators.required],
      province: ["", Validators.required],
      region: [""],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      fiscalcode: new UntypedFormControl("",Validators.compose([codFisc])),
      fiscalnumber: new UntypedFormControl(""),
      description: [""],
      is_featured: ["0"],
      user_id: [this.currentUser.id],
      category_id: ["", Validators.required],
      is_active: ["0"],
      image: [""],
      contract: [""],
      vacations: [""],
      permissions: [""],
      date: ["", Validators.required],
    });


  this.spinner.hide();



  }


  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogForm.get("image").setValue(file);

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imagePath = reader.result;
      };
    }
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

  getClientList() {
  this.employeesService.getAllListbyUser().subscribe(data => {
    this.clientsList = data;
    this.cols = [
      { field: "username", header: "Nome" },
    ];
    this._selectedColumns = this.cols;
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
  });
  }


  removeQuantity(i:number) {

    this.skills.removeAt(i);
  }

  getCategoryItem(category_id: string, id: string) {
    return this.categories.find((item) => item.id === category_id);
  }



  onDelete(id: number, title: string) {

    this.confirmationService.confirm({
      message: 'Sei sicuro di volerlo cancellare',
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


  initSkill() {
    var formArray = this.fb.array([]);
    const id = this.route.snapshot.paramMap.get("id");

    this.employeesService.skills(+id).subscribe(
      (res)=>{
        this.skillsValues = res;

        this.skillsValues.forEach((e)=>{
          formArray.push(this.fb.group({
            qty: [e.qty],
            price: [e.price]
          }))
        })
      }
    )

    /*formArray.push(this.fb.group({
      qty: [''],
      price: ['']
    })) */


    return formArray;
  }


  private createSkillFormGroup(skill:any): UntypedFormGroup{
    return new UntypedFormGroup({'qty':new UntypedFormControl(skill.qty),'price':new UntypedFormControl(skill.price)})
  }

  public addSkill(skill:any){
    this.skills.push(this.createSkillFormGroup(skill));
  }


  get skills() {
    return this.blogForm.get('skills') as UntypedFormArray;
  }


  newQuantity(): UntypedFormGroup {
    return this.fb.group({
      qty: "",
      price: "",
    })
  }

  addQuantity() {
    this.skills.push(this.newQuantity());
  }



  removeImageFile() {
    this.imagePath = "";
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
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
    formData.append("contract", this.blogForm.get("contract").value);
    formData.append("vacations", this.blogForm.get("vacations").value);
    formData.append("permissions", this.blogForm.get("permissions").value);

    const id = this.blogForm.get("id").value;

    if (id) {
      this.employeesService.update(formData, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Attenzione', detail: 'Salvato con sucesso' });
           // this._location.back();
           this.getClientList();

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



export function codFisc(c: UntypedFormControl): { [s: string]: boolean } {
  if (c.value && !c.value.match(FISCAL_CODE_VALIDATOR_REGEX)) {
    return { invalidCF: true };
  }
}

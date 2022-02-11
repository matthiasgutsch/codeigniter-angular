import { Component, ElementRef, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../../services/appointments.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Blog } from '../../../../models/blog';
import { Category } from '../../../../models/category';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../../../services/categories.service';
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import * as moment from 'moment';
import { TYPE_LIST, STATUS_PRODUCTS, STATE_LIST } from '../../../constants/constants';
import { Clients } from 'src/app/models/clients';
import { ClientsService } from 'src/app/services/clients.service';
import { Location } from '@angular/common';
import { WorksService } from 'src/app/services/works.service';
import { Works } from 'src/app/models/works';
import { EmployeesService } from 'src/app/services/employees.service';
import { Employees } from 'src/app/models/employees';
import { Locations } from 'src/app/models/locations';
import { LocationsService } from 'src/app/services/locations.service';
import { Appointments } from 'src/app/models/appointments';
import { SumPipe } from '../../../pipe/sum.pipe';
import { TimesheetsService } from 'src/app/services/timesheets.service';
import { Products } from 'src/app/models/products';
import { SkillsService } from 'src/app/services/skills.service';
import { map, tap } from 'rxjs/operators';
import { Technical_data } from 'src/app/models/technical_data';
import { TechnicalDataService } from 'src/app/services/technical_data.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { Projects } from 'src/app/models/projects';


export interface fPairs {
  qty: number,
  price: number,
}

@Component({
  selector: "app-warehouses-checkins-form",
  templateUrl: "./warehouses-checkins-form.component.html",
})
export class WarehousesCheckinsFormComponent implements OnInit {
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  blogs: Blog;
  blog: Blog;
  id: number
  appointments: Appointments;
  appointment: any;

  categories: any = [];
  category: Category;

  works: any = [];
  work: Works;

  checked: boolean = true;
  selectedValue: string;
  products: any = [];
  product: Products;
  blogForm: FormGroup;
  typeList: any[];
  projects: any = [];
  stateOptions: any[];

  clients: any = [];
  client: Clients;
  arrString: string;

  employees: any = [];
  employee: Employees;

  description: any;
  selectedWorks: SelectItem[] = [];
  selectedSkills: SelectItem[] = [];
  selectedWorks2: SelectItem[];
  selectedCategories: SelectItem[] = [];

  locations: any = [];
  location: Locations;
  
  cities: Blog[];
  format1: string = "";
  format2: string = "";
  selectedCity: Blog;
  selectedClients: SelectItem[];
  
  selectedDate: Date;
  date: Date;
  works_id: any;
  category_id: any;
  public dataValues: object;
  pages: any;
  currentUser: any;
  fPairs: any;
  addForm: FormGroup;
  rows: FormArray;
  itemForm: FormGroup;
  skillsForm: FormGroup;
  skillsValues: any = [];
  
  trackByFn(index, item) {
    return item.id;
  }

 

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
    private technicalDataService: TechnicalDataService,
    private messageService: MessageService,
    private clientsService: ClientsService,
    private _location: Location,
    private timesheetsService: TimesheetsService,
    private skillsService: SkillsService,
    private employeesService: EmployeesService,
    private worksService: WorksService,
    private categoryService: CategoryService,
    private projectsService: ProjectsService,

    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }
    this.typeList = TYPE_LIST;
    this.stateOptions = STATE_LIST;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
  }

  ngOnInit() {
    const userId = this.currentUser.user_id;

    this.getselectedWorks;
    this.getselectedCategories;

   

    this.projectsService.getAllListbyUser().subscribe(
      (data: Projects) => (this.projects = data),
      (error) => (this.error = error)
    );


    this.employeesService.getAllListbyUser().subscribe(
      (data: Employees) => (this.employees = data),
      (error) => (this.error = error)
    );


    this.worksService.getAllListbyUser().subscribe(
      (data: Works) => (this.works = data),
      (error) => (this.error = error)
    );


    this.categoryService.getAllListbyUser().subscribe(
      (data: Category) => (this.categories = data),
      (error) => (this.error = error)
    );




    const id = this.route.snapshot.paramMap.get("id");

    this.timesheetsService.skills(+id).subscribe(value => {
      this.skillsValues = value;
    });




    if (id) {
      this.pageTitle = "Modifica Prodotto";
      
      this.timesheetsService.getId(+id).subscribe((res) => {

        
        if (res.user_id == this.currentUser.user_id) {
        this.blogForm.patchValue({
          title: res.title,
          description: res.description.split(','),
          category_id: res.category_id.split(','),
          status: res.status,
          employee_id: res.employee_id,
          is_featured: res.is_featured,
          is_active: res.is_active,
          code: res.code,
          user_id: this.currentUser.user_id,
          description_full: res.description_full,
          code_int: res.code_int,
          price: res.price,
          price_extra: res.price_extra,
          id: res.id,
          data: res.data,
        });

        
      }
      else {
        this.router.navigate(['/admin/products']);
      }
        this.imagePath = res.image;
        this.id = res.id;
      });
    } else {
      this.pageTitle = "Aggiungi Prodotto";
    }



    this.blogForm = this.fb.group({
      id: [""],
      title: ["", Validators.required],
      description: [""],
      description_full: [""],
      is_featured: ["0"],
      category_id: [""],
      status: [""],
      employee_id: [""],
      is_active: ["0"],
      image: [""],
      code: [""],
      user_id: [this.currentUser.user_id],
      code_int: [""],
      price: [""],
      price_extra: [""],
      
  });

  }


  

  getWorksItem(works_id: string, id: string) {
    return this.works.find(item => item.id === works_id);
  }

  getselectedWorks() {
  this.selectedWorks = this.works_id.split(',');
  }



  getCategoryItem(category_id: string, id: string) {
    return this.categories.find((item) => item.id === category_id);
  }


  getselectedCategories() {
    this.selectedCategories = this.category_id.split(',');
    }

  goback() {
    this._location.back();
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




  removeImageFile() {
    this.imagePath = "";
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
  }

  get title() {
    return this.blogForm.get("title");
  }


  onSubmit() {
    const formData = new FormData();

    formData.append("title", this.blogForm.get("title").value);
    formData.append("description", this.blogForm.get("description").value);
    formData.append("description_full", this.blogForm.get("description_full").value);
    formData.append("is_featured", this.blogForm.get("is_featured").value);
    formData.append("category_id", this.blogForm.get("category_id").value);
    formData.append("employee_id", this.blogForm.get("employee_id").value);
    formData.append("is_active", this.blogForm.get("is_active").value);
    formData.append("image", this.blogForm.get("image").value);
    formData.append("code", this.blogForm.get("code").value);
    formData.append("code_int", this.blogForm.get("code_int").value);
    formData.append("price", this.blogForm.get("price").value);
    formData.append("price_extra", this.blogForm.get("price_extra").value);
    formData.append("status", this.blogForm.get("status").value);
    formData.append('user_id', this.blogForm.get('user_id').value);


    const id = this.blogForm.get("id").value;

    if (id) {
      this.timesheetsService.update(formData, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Salvato con sucesso' });
            //this.router.navigate(['/admin/products']);

          }
        },
        (error) => (this.error = error)
      );
    } else {
      this.timesheetsService.create(formData).subscribe(
        (res) => {
          if (res.status === "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Salvato con sucesso' });
            this.router.navigate(['/admin/products']);

          }
        },
        (error) => (this.error = error)
      );
    }
  }
}

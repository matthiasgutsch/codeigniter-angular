import { Component, ElementRef, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../services/appointments.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup, UntypedFormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Blog } from '../../../models/blog';
import { Category } from '../../../models/category';
import { UntypedFormControl } from '@angular/forms';
import { CategoryService } from '../../../services/categories.service';
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import * as moment from 'moment';
import { TYPE_LIST, STATUS_PRODUCTS, STATE_LIST, STATUS_PROJECTS } from '../../constants/constants';
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
import { SumPipe } from '../../pipe/sum.pipe';
import { ProductsService } from 'src/app/services/products.service';
import { Projects } from 'src/app/models/projects';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brands.service';
import { SkillsService } from 'src/app/services/skills.service';
import { map, tap } from 'rxjs/operators';
import { Technical_data } from 'src/app/models/technical_data';
import { TechnicalDataService } from 'src/app/services/technical_data.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { Timesheets } from 'src/app/models/timesheets';
import { TimesheetsService } from 'src/app/services/timesheets.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ComuniService } from 'src/app/services/comuni.service';
import { Comuni } from 'src/app/models/comuni';

export interface fPairs {
  qty: number,
  price: number,
}

@Component({
  selector: "app-projects-form",
  templateUrl: "./projects-form.component.html",
})
export class ProjectsFormComponent implements OnInit {
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  blogs: Blog;
  blog: Blog;
  id: number;
  price: any;
  appointments: Appointments;
  appointment: any;

  categories: any = [];
  category: Category;

  works: any = [];
  work: Works;

  checked: boolean = true;
  selectedValue: string;
  products: any = [];
  product: Projects;
  blogForm: UntypedFormGroup;
  typeList: any[];
  status: any[];
  stateOptions: any[];

  clients: any = [];
  client: Clients;
  brands: any = [];

  employee: Employees;
  employees: any = [];
  arrString: string;

  timesheetsEmployee: any = [];
  brand: Brand;
  technical_datas: any = [];
  technical_data: Technical_data;

  tags: any = [];


  description: any;
  selectedWorks: SelectItem[] = [];
  selectedSkills: SelectItem[] = [];
  selectedWorks2: SelectItem[];
  selectedCategories: SelectItem[] = [];

  locations: any = [];
  location: Locations;
  total:number;

  cities: Blog[];
  format1: string = "";
  format2: string = "";
  selectedCity: Blog;
  selectedClients: SelectItem[];
  comuni: Comuni;

  selectedDate: Date;
  selectedDateFrom: Date;
  selectedDateTo: Date;

  date: Date;
  works_id: any;
  category_id: any;
  public dataValues: object;
  pages: any;
  currentUser: any;
  fPairs: any;
  addForm: UntypedFormGroup;
  rows: UntypedFormArray;
  itemForm: UntypedFormGroup;
  skillsForm: UntypedFormGroup;
  skillsValues: any = [];

  trackByFn(index, item) {
    return item.id;
  }



  constructor(
    private fb: UntypedFormBuilder,
    private timesheetsService: TimesheetsService,
    private technicalDataService: TechnicalDataService,
    private messageService: MessageService,
    private clientsService: ClientsService,
    private employeesService: EmployeesService,
    private _location: Location,
    private projectsService: ProjectsService,
    private skillsService: SkillsService,
    private brandsService: BrandService,
    private comuniService: ComuniService,    
    private worksService: WorksService,
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }
    this.typeList = TYPE_LIST;
    this.status = STATUS_PROJECTS;
    this.stateOptions = STATE_LIST;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
  }

  ngOnInit() {
    const userId = this.currentUser.user_id;
    this.spinner.show();



    const id = this.route.snapshot.paramMap.get("id");


    if (id) {
      this.pageTitle = "Modifica Progetto";
      this.projectsService.getId(+id).subscribe((res) => {

        
        if (res.user_id == this.currentUser.user_id) {
          this.blogForm.patchValue({
            title: res.title,
            description: res.description.split(','),
            category_id: res.category_id.split(','),
            status: res.status,
            employee_id: res.employee_id,
            client_id: res.client_id,
            is_featured: res.is_featured,
            is_active: res.is_active,
            code: res.code,
            date_from: res.date_from,
            date_to: res.date_to,
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
        this.price = res.price;

      });
    } else {
      this.pageTitle = "Aggiungi Progetto";
    }



    this.blogForm = this.fb.group({
      id: [""],
      title: ["", Validators.required],
      description: [""],
      description_full: [""],
      is_featured: ["0"],
      category_id: [""],
      status: [""],
      works_id: [""],
      date_from: [""],
      date_to: [""],
      brand_id: [""],
      is_active: ["0"],
      image: [""],
      code: [""],
      user_id: [this.currentUser.user_id],
      code_int: [""],
      price: [""],
      price_extra: [""],

    });

    
    this.getselectedWorks;
    this.getselectedCategories;
    this.getBrands();
    this.getCategories();
    this.getComuni();
    this.getEmployees();
    this.spinner.hide();




  }


  getComuni() {
    const userId = this.currentUser.user_id;
    this.comuniService.getAllList().subscribe(
      (data: Comuni) => this.comuni = data,
      error => this.error = error
    );
  }


  getTimesheet_by_project_employee(id) {
  this.timesheetsService.timesheet_by_project_employee(+id).subscribe(
    (data: Timesheets) => (this.timesheetsEmployee = data),
    (error) => (this.error = error)
  )};



  public locationsSum() {
    return this.timesheetsEmployee.map(data => data.id).reduce((a, b) => a + b);
  }
  
  initSkill() {
    var formArray = this.fb.array([]);
    const id = this.route.snapshot.paramMap.get("id");

    this.projectsService.skills(+id).subscribe(
      (res) => {
        this.skillsValues = res;

        this.skillsValues.forEach((e) => {
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


  private createSkillFormGroup(skill: any): UntypedFormGroup {
    return new UntypedFormGroup({ 'qty': new UntypedFormControl(skill.qty), 'price': new UntypedFormControl(skill.price) })
  }

  public addSkill(skill: any) {
    this.skills.push(this.createSkillFormGroup(skill));
  }


  get skills() {
    return this.blogForm.get('skills') as UntypedFormArray;
  }



  getTechnicalDataItem(employee_id: string) {
    return this.employees.find(item => item.id === employee_id);
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

  removeQuantity(i: number) {
    this.skills.removeAt(i);
  }

  getWorksItem(works_id: string, id: string) {
    return this.works.find(item => item.id === works_id);
  }

  getselectedWorks() {
    this.selectedWorks = this.works_id.split(',');
  }




  getTechnicalDatas() {
    this.technicalDataService.getAllListbyUser().subscribe(
      (data: Technical_data) => (this.technical_datas = data),
      (error) => (this.error = error)
    )
  };

  getBrands() {
    this.brandsService.getAllListbyUser().subscribe(
      (data: Brand) => (this.brands = data),
      (error) => (this.error = error)
    )
  };


  getWorks() {
    this.worksService.getAllListbyUser().subscribe(
      (data: Works) => (this.works = data),
      (error) => (this.error = error)
    )
  };

  getEmployees() {
    this.employeesService.getAllListbyUser().subscribe(
      (data: Employees) => (this.employees = data),
      (error) => (this.error = error)
    )
  };


  getCategories() {
    this.categoryService.getAllListbyUser().subscribe(
      (data: Category) => (this.categories = data),
      (error) => (this.error = error)
    )
  };



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
    formData.append("works_id", this.blogForm.get("works_id").value);
    formData.append("date_from", this.blogForm.get("date_from").value);
    formData.append("date_to", this.blogForm.get("date_to").value);
    formData.append("brand_id", this.blogForm.get("brand_id").value);
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
      this.projectsService.update(formData, +id).subscribe(
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
      this.projectsService.create(formData).subscribe(
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

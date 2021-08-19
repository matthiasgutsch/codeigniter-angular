import { Component, ElementRef, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../services/appointments.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Blog } from '../../../models/blog';
import { Category } from '../../../models/category';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../../services/categories.service';
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import * as moment from 'moment';
import { TYPE_LIST } from '../../constants/constants';
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

@Component({
  selector: "app-appointments-form",
  templateUrl: "./appointments-form.component.html",
})
export class AppointmentsFormComponent implements OnInit {
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  blogs: Blog;
  blog: Blog;

  appointments: Appointments;
  appointment: Appointments;

  categories: any = [];
  category: Category;

  works: any = [];
  work: Works;

  checked: boolean = true;
  selectedValue: string;

  blogForm: FormGroup;
  typeList: any[];
  clients: any = [];
  client: Clients;
  arrString: string;

  employees: any = [];
  employee: Employees;

  description: any;
  selectedWorks: SelectItem[] = [];
  selectedWorks2: SelectItem[];
  locations: any = [];
  location: Locations;


  cities: Blog[];
  format1: string = "";
  format2: string = "";
  selectedCity: Blog;
  selectedCategories: Category;
  selectedClients: Clients;
  selectedDate: Date;
  date: Date;
  works_id: any;

  trackByFn(index, item) {
    return item.id;
  }

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
    private messageService: MessageService,
    private clientsService: ClientsService,
    private _location: Location,
    private locationsService: LocationsService,
    private worksService: WorksService,
    private employeesService: EmployeesService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }
    this.typeList = TYPE_LIST;

  }

  ngOnInit() {

    this.getselectedWorks;

    this.appointmentsService.getAllList().subscribe(
      (data: Appointments) => (this.appointments = data),
      (error) => (this.error = error)
    );

    this.categoryService.getAllList().subscribe(
      (data: Category) => (this.categories = data),
      (error) => (this.error = error)
    );


    this.employeesService.getAllList().subscribe(
      (data: Employees) => (this.employees = data),
      (error) => (this.error = error)
    );


    this.worksService.getAllList().subscribe(
      (data: Works) => (this.works = data),
      (error) => (this.error = error)
    );

    this.locationsService.getAllList().subscribe(
      (data: Locations) => (this.locations = data),
      (error) => (this.error = error)
    );

    this.clientsService.getAllList().subscribe(
      (data: Clients) => (this.clients = data),
      (error) => (this.error = error)
    );

    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.pageTitle = "Modifica Appuntamento";
      
      this.appointmentsService.getId(+id).subscribe((res) => {
        this.blogForm.patchValue({
          title: res.title,
          description: res.description.split(','),
          category_id: res.category_id,
          works_id: res.works_id.split(','),
          employee_id: res.employee_id,
          location_id: res.location_id,
          is_featured: res.is_featured,
          is_active: res.is_active,
          date: res.date,
          id: res.id,
        });
        this.imagePath = res.image;
        

      });
    } else {
      this.pageTitle = "Aggiungi Appuntamento";
    }



    this.blogForm = this.fb.group({
      id: [""],
      title: ["", Validators.required],
      description: [""],
      is_featured: ["0"],
      category_id: ["", Validators.required],
      works_id: [""],
      location_id: [""],
      employee_id: [""],
      is_active: ["0"],
      image: [""],
      date: ["", Validators.required],
    });
  }


  navigate() {
    // this.router.navigate(['other']);
    this.router.navigate(['admin/billings/create'], {
      state: { selectedClients: '111', selectedWorks: '7,14' }
    });
  }

  getWorksItem(works_id: string, id: string) {
    return this.works.find(item => item.id === works_id);
  }

  getselectedWorks() {
  this.selectedWorks = this.works_id.split(',');
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

  getCategoryItem(category_id: string, id: string) {
    return this.clients.find((item) => item.id === category_id);
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
    formData.append("is_featured", this.blogForm.get("is_featured").value);
    formData.append("category_id", this.blogForm.get("category_id").value);
    formData.append("works_id", this.blogForm.get("works_id").value);
    formData.append("location_id", this.blogForm.get("location_id").value);
    formData.append("employee_id", this.blogForm.get("employee_id").value);
    formData.append("is_active", this.blogForm.get("is_active").value);
    formData.append("image", this.blogForm.get("image").value);
    formData.append("date", this.blogForm.get("date").value);

    const id = this.blogForm.get("id").value;

    if (id) {
      this.appointmentsService.update(formData, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this._location.back();
          }
        },
        (error) => (this.error = error)
      );
    } else {
      this.appointmentsService.create(formData).subscribe(
        (res) => {
          if (res.status === "error") {
            this.uploadError = res.message;
          } else {
            this._location.back();
          }
        },
        (error) => (this.error = error)
      );
    }
  }
}

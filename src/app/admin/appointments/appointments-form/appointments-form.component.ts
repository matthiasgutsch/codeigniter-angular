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
import { SumPipe } from '../../pipe/sum.pipe';
import { BillingsService } from 'src/app/services/billings.service';
import { Billings } from 'src/app/models/billings';
import { AppointmentTypeService } from 'src/app/services/appointment_type.service';
import { Appointment_type } from 'src/app/models/appointment_type';

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
  id: number
  appointments: Appointments;
  appointment: any;

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
  billings: any = [];
  public dataValues: object;
  pages: any;

  public element: Billings;
  billings_id: any;
  appointmentId: string;
  currentUser: any;
  appointment_type: Appointment_type;
  appointment_typ: Appointment_type;

  trackByFn(index, item) {
    return item.id;
  }

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
    private messageService: MessageService,
    private clientsService: ClientsService,
    private billingsService: BillingsService,
    private _location: Location,
    private locationsService: LocationsService,
    private worksService: WorksService,
    private employeesService: EmployeesService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
    private appointmentTypeService: AppointmentTypeService, 
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }
    this.typeList = TYPE_LIST;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

  }

  ngOnInit() {

    this.getselectedWorks;
    

    this.appointmentTypeService.getAllListbyUser().subscribe(
      (data: Appointment_type) => (this.appointment_type = data),
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

    this.locationsService.getAllListbyUser().subscribe(
      (data: Locations) => (this.locations = data),
      (error) => (this.error = error)
    );

    const userId = this.currentUser.user_id;
    this.clientsService.getAllListbyUser().subscribe(
      (data: Clients) => (this.clients = data),
      (error) => (this.error = error)
    );


  

    const id = this.route.snapshot.paramMap.get("id");


    

    this.billingsService.find_billings_by_appointments(+id).subscribe(
      (data: Billings) => (this.billings = data),
      (error) => (this.error = error)
    );


    this.billingsService
      .find_billings_by_appointment_id(+id)
      .subscribe(data => {
        this.pages = data[0];
        return this.pages.id;
      }, err => {
    });


    this.appointmentsService
      .getId(+id)
      .subscribe(data => {
        this.appointment = data;

      }, err => {
    });
    
    this.billingsService.find_billings_by_appointments(+id).subscribe(
      (data: Billings) => (this.billings = data),
      (error) => (this.error = error)
    );


    if (id) {
      this.pageTitle = "Modifica Appuntamento";
      
      this.appointmentsService.getId(+id).subscribe((res) => {
        if (res.user_id == this.currentUser.user_id) {
        this.blogForm.patchValue({
          title: res.title,
          description: res.description.split(','),
          category_id: res.category_id,
          works_id: res.works_id.split(','),
          employee_id: res.employee_id,
          location_id: res.location_id,
          is_featured: res.is_featured,
          is_active: res.is_active,
          user_id: this.currentUser.user_id,
          date: res.date,
          id: res.id,
        });
      }
      else {
        this.router.navigate(['/admin/appointments']);

      }
        this.imagePath = res.image;
        this.id = res.id;


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
      user_id: [this.currentUser.user_id],
      employee_id: [""],
      is_active: ["0"],
      image: [""],
      date: ["", Validators.required],
    });
  }

  



createBilling() {
  const formData = new FormData();

  formData.append("title", this.blogForm.get("title").value);
  formData.append("description", this.blogForm.get("description").value);
  formData.append("appointment_id", this.blogForm.get("id").value);
  formData.append("is_featured", this.blogForm.get("is_featured").value);
  formData.append("category_id", this.blogForm.get("category_id").value);
  formData.append("works_id", this.blogForm.get("works_id").value);
  formData.append("location_id", this.blogForm.get("location_id").value);
  formData.append("employee_id", this.blogForm.get("employee_id").value);
  formData.append("is_active", this.blogForm.get("is_active").value);
  formData.append("image", this.blogForm.get("image").value);
  formData.append("date", this.blogForm.get("date").value);
  formData.append("user_id", this.blogForm.get("user_id").value);

  const id = this.blogForm.get("id").value;
  this.billingsService
      .find_billings_by_appointment_id(+id)
      .subscribe(data => {
        this.pages = data[0];
        return data.id;
        console.log(data[0])
      }, err => {
    });

  if (id ) {
    this.confirmationService.confirm({
      message: 'Vorresti creare la Fattua/ Ricevuta ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.billingsService.create(formData).subscribe(
          (res) => {
            if (res.status === "error") {
              this.uploadError = res.message;
            } else {
              const currentUrl = this.router.url;
    
              
              this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Attenzione', detail: 'Futtura / Ricevuta creata con successo' });
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate([currentUrl]);
                
            });
            }
          },
          error => this.error = error
        );
      },
    });
  } else {
    this.router.navigate(['/admin/billings/edit/', this.pages.id]);
  }
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


  fillClients(): void {
    this.client.id = this.selectedClients.id;
    this.client.name = this.selectedClients.name;
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
    formData.append("user_id", this.blogForm.get("user_id").value);


    const id = this.blogForm.get("id").value;

    if (id) {
      this.appointmentsService.update(formData, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Attenzione', detail: 'Salvato con sucesso' });
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
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Attenzione', detail: 'Salvato con sucesso' });
            this._location.back();

          }
        },
        (error) => (this.error = error)
      );
    }
  }

}
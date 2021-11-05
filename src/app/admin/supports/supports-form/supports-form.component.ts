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
import { Contact } from 'src/app/models/contact';
import { CmspageService } from 'src/app/cmspage/cmspage.service';
import { Title } from '@angular/platform-browser';
import { SupportsService } from 'src/app/services/supports.service';
import { Supports } from 'src/app/models/supports';
import { Observable } from "rxjs";

@Component({
  selector: "app-supports-form",
  templateUrl: "./supports-form.component.html",
})
export class SupportsFormComponent implements OnInit {

  title = 'Support';
  model = new Contact();
  submitted = false;
  error = {};
  success: any;
  id: number;
  blogForm: FormGroup;
  currentUser: any;
  contactForm: FormGroup;
  uploadError: string;

  support: Supports;
  supports: Observable<Supports[]>;
  supportsList: any;

  constructor(
    private router: Router,
    private cmspageService: CmspageService,
    private titleService: Title,
    protected route: ActivatedRoute,
    private supportsService: SupportsService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _location: Location,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    const id = this.route.snapshot.paramMap.get("id");

  }

  ngOnInit() {
    this.titleService.setTitle(this.title);

    const userId = this.currentUser.user_id;


    const id = this.route.snapshot.paramMap.get("id");


    if (id) {
      this.supportsService.getId(+id).subscribe((res) => {
        if (res.user_id == this.currentUser.user_id) {
          this.blogForm.patchValue({
            title: res.title,
            phone: res.phone,
            email: res.email,
            name: res.name,
            user_id: this.currentUser.user_id,
            ref_id: res.id,
            id: res.id,
            data: res.data
          });


          this.route.paramMap.subscribe((params) => {
            this.supportsService.getId(+id)
              .subscribe(data => {
                this.support = data;
              }, error => console.log(error));
          });


          this.supportsService.find_tickets_support_id(+id).subscribe(
            (data: Billings) => (this.supportsList = data),
            (error) => (this.error = error)
          );


        }
        else {
          this.router.navigate(['/admin/products']);
        }
        this.id = res.id;
      });
    } else {
    }


    this.blogForm = this.fb.group({
      id: [""],
      title: ["", Validators.required],
      phone: [""],
      message: [""],
      name: [this.currentUser.first_name + this.currentUser.last_name],
      email: [""],
      ref_id: [this.id],
      user_id: [this.currentUser.user_id],
    });
  }



  onDelete(id: number, title: string) {

    this.confirmationService.confirm({
      message: 'Are you sure want to delete it = ' + id,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.supportsService.delete(+id).subscribe(
          res => {
            console.log(res);
            this.ngOnInit();
            this.messageService.add({ key: 'myKey1', severity: 'warn', summary: 'Attenzione', detail: 'Cancellazione avvenuto con successo' });

          },
          error => this.error = error
        );
      },
    });
  }

  onSubmit() {
    const formData = new FormData();

    formData.append("title", this.blogForm.get("title").value);
    formData.append("email", this.blogForm.get("email").value);
    formData.append("message", this.blogForm.get("message").value);
    formData.append("name", this.blogForm.get("name").value);

    formData.append("ref_id", this.blogForm.get("ref_id").value);
    formData.append("phone", this.blogForm.get("phone").value);
    formData.append('user_id', this.blogForm.get('user_id').value);
    const id = this.blogForm.get("id").value;

    if (id) {
      this.supportsService.create(formData).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.supportsService.find_tickets_support_id(+id).subscribe(
              (data: Billings) => (this.supportsList = data),
              (error) => (this.error = error)
            );
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Richiesta inviata con sucesso' });

  
          }
        },
        (error) => (this.error = error)
      );
    } else {
      formData.append("ref_id", '0');

      this.supportsService.create(formData).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Richiesta inviata con sucesso' });
            this.router.navigate(['/admin/support']);

  
          }
        },
        (error) => (this.error = error)
      );

    }
  }


  onSubmit_old() {
    this.submitted = true;
    return this.cmspageService.contactForm(this.model).subscribe(
      data => this.success = data,
      error => this.error = error
    );
    this.router.navigate(['/admin/support/']);

  }

  gotoHome() {
    this.router.navigate(['/']);
  }
}

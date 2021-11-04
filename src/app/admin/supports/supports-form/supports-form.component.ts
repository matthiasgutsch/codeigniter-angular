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
    private _location: Location,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    
    const id = this.route.snapshot.paramMap.get("id");


    if (id) {
      this.supportsService.getId(+id).subscribe((res) => {
        if (res.user_id == this.currentUser.user_id) {
          this.blogForm.patchValue({
            title: res.title,
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
      description: [""],
      description_full: [""],
      is_featured: ["0"],
      category_id: [""],
      status: [""],
      works_id: [""],
      brand_id: [""],
      is_active: ["0"],
      image: [""],
      code: [""],
      user_id: [this.currentUser.user_id],
      code_int: [""]
    });
  }


  onSubmit() {
    this.submitted = true;
    return this.cmspageService.contactForm(this.model).subscribe(
      data => this.success = data,
      error => this.error = error
    );
    this._location.back();
  }

  gotoHome() {
    this.router.navigate(['/']);
  }
}

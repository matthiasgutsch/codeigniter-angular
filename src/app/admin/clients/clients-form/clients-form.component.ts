import { Component, ElementRef, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Clients } from '../../../models/clients';
import { Category } from '../../../models/category';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../../services/categories.service';
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import * as moment from 'moment';
import { FISCAL_CODE_VALIDATOR_REGEX, SEX_LIST } from '../../constants/constants';
import { ComuniService } from 'src/app/services/comuni.service';
import { Comuni } from 'src/app/models/comuni';
import {Location} from '@angular/common';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Appointments } from 'src/app/models/appointments';



@Component({
  selector: "app-clients-form",
  templateUrl: "./clients-form.component.html",
})

export class ClientsFormComponent implements OnInit {
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  clients: Clients;
  client: Clients;

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
  appointments: Appointments;

  trackByFn(index, item) {
    return item.id;
  }

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private comuniService: ComuniService,
    private _location: Location,
    private appointmentsService: AppointmentsService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }

    this.typeList = SEX_LIST;
  }

  ngOnInit() {
    this.clientsService.getAllList().subscribe(
      (data: Clients) => (this.clients = data),
      (error) => (this.error = error)
    );

    this.categoryService.getAllList().subscribe(
      (data: Category) => (this.categories = data),
      (error) => (this.error = error)
    );

    this.comuniService.getAllList().subscribe(
      (data: Comuni) => (this.comuni = data),
      (error) => (this.error = error)
    );

    const id = this.route.snapshot.paramMap.get("id");

    if (id) {
      this.pageTitle = "Modifica Cliente";

      this.appointmentsService.find_client(+id).subscribe(
        (data: Appointments) => (this.appointments = data),
        (error) => (this.error = error)
      );

      this.clientsService.getId(+id).subscribe((res) => {
        this.blogForm.patchValue({
          name: res.name,
          city: res.city,
          zip: res.zip,
          address: res.address,
          province: res.province,
          region: res.region,
          email: res.email,
          phone: res.phone,
          fiscalcode: res.fiscalcode,
          fiscalnumber: res.fiscalnumber,
          description: res.description,
          category_id: res.category_id,
          is_featured: res.is_featured,
          is_active: res.is_active,
          date: res.date,
          id: res.id,
        });
        this.imagePath = res.image;
      });
    } else {
      this.pageTitle = "Aggiungi Cliente";
    }

    this.blogForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      city: ["", Validators.required],
      zip: ["", Validators.required],
      address: ["", Validators.required],
      province: ["", Validators.required],
      region: [""],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      fiscalcode: new FormControl(
        "",
        Validators.compose([codFisc])
      ),
      fiscalnumber: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      description: [""],
      is_featured: ["0"],
      category_id: ["", Validators.required],
      is_active: ["0"],
      image: [""],
      date: ["", Validators.required],
    });
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
    return this.categories.find((item) => item.id === category_id);
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

  get description() {
    return this.blogForm.get("description");
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("name", this.blogForm.get("name").value);
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
    formData.append("is_active", this.blogForm.get("is_active").value);
    formData.append("image", this.blogForm.get("image").value);
    formData.append("date", this.blogForm.get("date").value);

    const id = this.blogForm.get("id").value;

    if (id) {
      this.clientsService.update(formData, +id).subscribe(
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
      this.clientsService.create(formData).subscribe(
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



export function codFisc(c: FormControl): { [s: string]: boolean } {
  if (c.value && !c.value.match(FISCAL_CODE_VALIDATOR_REGEX)) {
    return { invalidCF: true };
  }
}

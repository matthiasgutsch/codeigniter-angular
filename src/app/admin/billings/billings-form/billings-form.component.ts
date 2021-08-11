import { Component, ElementRef, OnInit } from '@angular/core';
import { BillingsService } from '../../../services/billings.service';
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
import {Location} from '@angular/common';

@Component({
  selector: "app-billings-form",
  templateUrl: "./billings-form.component.html",
})
export class BillingsFormComponent implements OnInit {
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  blogs: Blog;
  blog: Blog;

  categories: any = [];
  category: Category;
  checked: boolean = true;
  selectedValue: string;

  blogForm: FormGroup;
  typeList: any[];
  clients: any = [];
  client: Clients;

  cities: Blog[];
  format1: string = "";
  format2: string = "";
  selectedCity: Blog;
  selectedCategories: Category;
  selectedDate: Date;
  date: Date;

  trackByFn(index, item) {
    return item.id;
  }

  constructor(
    private fb: FormBuilder,
    private billingsService: BillingsService,
    private messageService: MessageService,
    private clientsService: ClientsService,
    private _location: Location,

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
    this.billingsService.getAllList().subscribe(
      (data: Blog) => (this.blogs = data),
      (error) => (this.error = error)
    );

    this.categoryService.getAllList().subscribe(
      (data: Category) => (this.categories = data),
      (error) => (this.error = error)
    );

    this.clientsService.getAllList().subscribe(
      (data: Clients) => (this.clients = data),
      (error) => (this.error = error)
    );

    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.pageTitle = "Modifica Appuntamento";
      this.billingsService.getId(+id).subscribe((res) => {
        this.blogForm.patchValue({
          title: res.title,
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
      this.pageTitle = "Aggiungi Appuntamento";
    }

    this.blogForm = this.fb.group({
      id: [""],
      title: ["", Validators.required],
      description: ["", Validators.required],
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

  get description() {
    return this.blogForm.get("description");
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("title", this.blogForm.get("title").value);
    formData.append("description", this.blogForm.get("description").value);
    formData.append("is_featured", this.blogForm.get("is_featured").value);
    formData.append("category_id", this.blogForm.get("category_id").value);
    formData.append("is_active", this.blogForm.get("is_active").value);
    formData.append("image", this.blogForm.get("image").value);
    formData.append("date", this.blogForm.get("date").value);

    const id = this.blogForm.get("id").value;

    if (id) {
      this.billingsService.update(formData, +id).subscribe(
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
      this.billingsService.create(formData).subscribe(
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
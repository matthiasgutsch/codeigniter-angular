import { Component, ElementRef, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Blog } from '../../../../models/blog';
import { Category } from '../../../../models/category';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../../../services/categories.service';
import { ComuniService } from '../../../../services/comuni.service';

import { MessageService, SelectItem } from "primeng/api";
import * as moment from 'moment';
import { Comuni } from 'src/app/models/comuni';
import { STATE_LIST } from 'src/app/admin/constants/constants';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  categories: Category;
  category: Category;

  comuni: Comuni;

  checked: boolean = true;
  selectedValue: string;

  categoryForm: UntypedFormGroup;

  cities: Blog[];
  format1: string = "";
  format2: string = "";
  selectedCity: Blog;
  selectedCategories: Category;
  selectedDate: Date;
  date: Date;
  currentUser: any;
  stateOptions: any[];

  constructor(
    private fb: UntypedFormBuilder,
    private categoryService: CategoryService,
    private comuniService: ComuniService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    this.stateOptions = STATE_LIST;
  }

  ngOnInit() {


    this.comuniService.getAllList().subscribe(
      (data: Comuni) => this.comuni = data,
      error => this.error = error
    );


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {


      this.pageTitle = 'Modifica Categoria';
      this.categoryService.getId(+id).subscribe(
        res => {
          this.categoryForm.patchValue({
            category_name: res.category_name,
            category_description: res.category_description,
            category_seo_url: res.category_seo_url,
            is_active: res.is_active,
            user_id: this.currentUser.user_id,
            id: res.id
          });

        }
      );
    } else {
      this.pageTitle = 'Aggiungi Category';
    }

    this.categoryForm = this.fb.group({
      id: [''],
      category_name: ['', Validators.required],
      category_description: [''],
      category_seo_url: [''],
      is_active: ["0"],
      user_id: [this.currentUser.user_id]

    });
  }


  get category_name() {
    return this.categoryForm.get('category_name');
    return this.categoryForm.get('category_description');

  }


  onSubmit() {

    const formData = new FormData();

    formData.append('category_name', this.categoryForm.get('category_name').value);
    formData.append('category_description', this.categoryForm.get('category_description').value);
    formData.append('category_seo_url', this.categoryForm.get('category_seo_url').value);
    formData.append("is_active", this.categoryForm.get("is_active").value);
    formData.append('user_id', this.categoryForm.get('user_id').value);

    const id = this.categoryForm.get('id').value;

    if (id) {
      this.categoryService.update(formData, +id).subscribe(
        res => {
          if (res.status == 'error') {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Attenzione', detail: 'Salvato con sucesso' });
            this.router.navigate(['/admin/settings/categories']);
          }
        },
        error => this.error = error
      );
    } else {
      this.categoryService.create(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/settings/categories']);
          }
        },
        error => this.error = error
      );
    }

  }

}

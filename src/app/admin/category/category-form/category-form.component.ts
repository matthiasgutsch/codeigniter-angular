import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Blog } from '../../../models/blog';
import { Category } from '../../../models/category';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../../services/categories.service';
import { SelectItem } from "primeng/api";
import * as moment from 'moment';
import { COLORI_ITEMS, LINGUE_ITEMS } from 'src/app/admin/constants/constants';

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

  checked: boolean = true;
  selectedValue: string;

  categoryForm: FormGroup;
  lingueItems: any[];

  cities: Blog[];
  format1: string = "";
  format2: string = "";
  selectedCity: Blog;
  selectedCategories: Category;
  selectedDate: Date;
  date: Date;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,

    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }

    this.lingueItems = LINGUE_ITEMS;

  }

  ngOnInit() {


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {

      
      this.pageTitle = 'Edit Category';
      this.categoryService.getCategory(+id).subscribe(
        res => {
          this.categoryForm.patchValue({
            category_name: res.category_name,
            category_address: res.category_address,
            category_region: res.category_region,

            category_description: res.category_description,
            id: res.id
          });

        }
      );
    } else {
      this.pageTitle = 'Create Category';
    }

    this.categoryForm = this.fb.group({
      id: [''],
      category_name: ['', Validators.required],
      category_address: ['', Validators.required],
      category_region: ['', Validators.required],

      category_description: ['']

    });
  }


  get category_name() {
    return this.categoryForm.get('category_name');
    return this.categoryForm.get('category_description');

  }


  onSubmit() {
    
    const formData = new FormData();
    
    formData.append('category_name', this.categoryForm.get('category_name').value);
    formData.append('category_address', this.categoryForm.get('category_address').value);
    formData.append('category_region', this.categoryForm.get('category_region').value);

    formData.append('category_description', this.categoryForm.get('category_description').value);

    const id = this.categoryForm.get('id').value;

    if (id) {
      this.categoryService.updateCategory(formData, +id).subscribe(
        res => {
          if (res.status == 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/categories']);
          }
        },
        error => this.error = error
      );
    } else {
      this.categoryService.createCategory(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/categories']);
          }
        },
        error => this.error = error
      );
    }

  }

}

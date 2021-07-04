import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Blog } from '../../models/blog';
import { Category } from '../../models/category';
import {FormControl} from '@angular/forms';
import { CategoryService } from '../../services/categories.service';
import { SelectItem } from "primeng/api";
import * as moment from 'moment';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @ViewChild("myInput",{static:false}) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  categories: Category;
  category: Category;

  checked: boolean = true;
  selectedValue: string;

  categoryForm: FormGroup;

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
  }

  ngOnInit() {


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Category';
      this.categoryService.getCategory(+id).subscribe(
        res => {
          this.categoryForm.patchValue({
            category_name: res.category_name,
            id: res.id
          });
          
        }
      );
    } else {
      this.pageTitle = 'Create Category';
    }

    this.categoryForm = this.fb.group({
      id: [''],
      category_name: ['', Validators.required]
    });
  }


  get category_name() {
    return this.categoryForm.get('category_name');
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('category_name', this.categoryForm.get('category_name').value);
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

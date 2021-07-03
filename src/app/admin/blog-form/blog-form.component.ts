import { Component, ElementRef, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Blog } from '../../models/blog';
import { Category } from '../../models/category';
import {FormControl} from '@angular/forms';
import { CategoryService } from '../../services/categories.service';
import { SelectItem } from "primeng/api";

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {
  @ViewChild("myInput",{static:false}) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  blogs: Blog;
  blog: Blog;

  categories: Category;
  category: Category;
  checked: boolean = true;
  selectedValue: string;

  blogForm: FormGroup;

  cities: Blog[];

  selectedCity: Blog;
  selectedCategories: string;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private categoryService: CategoryService,

    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {


    this.blogService.getBlogs().subscribe(
      (data: Blog) => this.blogs = data,
      error => this.error = error
    );


    this.categoryService.getCategories().subscribe(
      (data: Category) => this.categories = data,
      error => this.error = error
    );


    


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Blog';
      this.blogService.getBlog(+id).subscribe(
        res => {
          this.blogForm.patchValue({
            title: res.title,
            description: res.description,
            category_id: res.category_id,
            is_featured: res.is_featured,
            is_active: res.is_active,
            date: res.date,

            id: res.id
          });
          this.imagePath = res.image;
        }
      );
    } else {
      this.pageTitle = 'Create Blog';
    }

    this.blogForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      is_featured: ['0'],
      category_id: [''],
      is_active: ['0'],
      image: ['']
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogForm.get('image').setValue(file);

      let reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = (_event) => {
        this.imagePath = reader.result; 
      }

    }
  }

  removeImageFile() {
    this.imagePath = '';
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
  }

  get title() {
    return this.blogForm.get('title');
  }

  get description() {
    return this.blogForm.get('description');
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.blogForm.get('title').value);
    formData.append('description', this.blogForm.get('description').value);
    formData.append('is_featured', this.blogForm.get('is_featured').value);
    formData.append('category_id', this.blogForm.get('category_id').value);
    formData.append('is_active', this.blogForm.get('is_active').value);
    formData.append('image', this.blogForm.get('image').value);
    formData.append('date', this.blogForm.get('date').value);

    const id = this.blogForm.get('id').value;

    if (id) {
      this.blogService.updateBlog(formData, +id).subscribe(
        res => {
          if (res.status == 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/blogs']);
          }
        },
        error => this.error = error
      );
    } else {
      this.blogService.createBlog(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/blogs']);
          }
        },
        error => this.error = error
      );
    }

  }

}

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
import { TYPE_LIST } from '../../constants/constants';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html'
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

  blogForm: FormGroup;
  typeList: any[];

  cities: Clients[];
  format1: string = "";
  format2: string = "";
  selectedCity: Clients;
  selectedCategories: Category;
  selectedDate: Date;
  date: Date;

  trackByFn(index, item) {
    return item.id;
  }

  
  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private messageService: MessageService,
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

    this.clientsService.getAllList().subscribe(
      (data: Clients) => this.clients = data,
      error => this.error = error
    );


    this.categoryService.getAllList().subscribe(
      (data: Category) => this.categories = data,
      error => this.error = error
    );



    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Blog';
      this.clientsService.getId(+id).subscribe(
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
      category_id: ['', Validators.required],
      is_active: ['0'],
      image: [''],
      date: ['', Validators.required]
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

  getCategoryItem(category_id: string, id: string) {
    return this.categories.find(item => item.id === category_id);
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
      this.clientsService.update(formData, +id).subscribe(
        res => {
          if (res.status == 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/clients']);
          }
        },
        error => this.error = error
      );
    } else {
      this.clientsService.create(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/clients']);
          }
        },
        error => this.error = error
      );
    }

  }

}

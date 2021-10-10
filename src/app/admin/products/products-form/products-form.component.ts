import { Component, ElementRef, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../services/appointments.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Blog } from '../../../models/blog';
import { Category } from '../../../models/category';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../../services/categories.service';
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import * as moment from 'moment';
import { TYPE_LIST, STATUS_PRODUCTS } from '../../constants/constants';
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
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/products';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brands.service';
import { TagsService } from 'src/app/services/tags.service';
import { Tags } from 'src/app/models/tags';


@Component({
  selector: "app-products-form",
  templateUrl: "./products-form.component.html",
})
export class ProductsFormComponent implements OnInit {
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
  products: any = [];
  product: Products;
  blogForm: FormGroup;
  typeList: any[];
  status: any[];

  clients: any = [];
  client: Clients;
  arrString: string;

  brands: any = [];
  brand: Brand;
  tags: any = [];


  description: any;
  selectedWorks: SelectItem[] = [];
  selectedWorks2: SelectItem[];
  selectedCategories: SelectItem[] = [];

  locations: any = [];
  location: Locations;
  
  cities: Blog[];
  format1: string = "";
  format2: string = "";
  selectedCity: Blog;
  selectedClients: SelectItem[];
  
  selectedDate: Date;
  date: Date;
  works_id: any;
  category_id: any;
  public dataValues: object;
  pages: any;
  currentUser: any;
  addForm: FormGroup;
  rows: FormArray;
  itemForm: FormGroup;

  
  trackByFn(index, item) {
    return item.id;
  }

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
    private messageService: MessageService,
    private clientsService: ClientsService,
    private _location: Location,
    private productsService: ProductsService,
    private brandsService: BrandService,
    private worksService: WorksService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private tagsService: TagsService,
    private route: ActivatedRoute
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }
    this.typeList = TYPE_LIST;
    this.status = STATUS_PRODUCTS;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required],
    });

    this.rows = this.fb.array([]);

  }

  ngOnInit() {
    const userId = this.currentUser.user_id;

    this.getselectedWorks;
    this.getselectedCategories;

    this.addForm.addControl('rows', this.rows);

    this.brandsService.getAllListbyUser().subscribe(
      (data: Brand) => (this.brands = data),
      (error) => (this.error = error)
    );


    this.worksService.getAllListbyUser().subscribe(
      (data: Works) => (this.works = data),
      (error) => (this.error = error)
    );


    this.categoryService.getAllListbyUser().subscribe(
      (data: Category) => (this.categories = data),
      (error) => (this.error = error)
    );


    this.tagsService.getAllListbyUser().subscribe(
      (data: Tags) => this.tags = data,
      error => this.error = error
    );

    const id = this.route.snapshot.paramMap.get("id");

    if (id) {
      this.pageTitle = "Modifica Prodotto";
      
      this.productsService.getId(+id).subscribe((res) => {
        if (res.user_id == this.currentUser.user_id) {
        this.blogForm.patchValue({
          title: res.title,
          description: res.description.split(','),
          category_id: res.category_id.split(','),
          status: res.status,
          works_id: res.works_id.split(','),
          brand_id: res.brand_id,
          is_featured: res.is_featured,
          is_active: res.is_active,
          code: res.code,
          user_id: this.currentUser.user_id,
          description_full: res.description_full,
          code_int: res.code_int,
          id: res.id,
          data: res.data,

        });
      }
      else {
        this.router.navigate(['/admin/products']);

      }
        this.imagePath = res.image;
        this.id = res.id;


      });
    } else {
      this.pageTitle = "Aggiungi Prodotto";
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
      code_int: [""],
      data: [""],

    });
  }

  
 
  getWorksItem(works_id: string, id: string) {
    return this.works.find(item => item.id === works_id);
  }

  getselectedWorks() {
  this.selectedWorks = this.works_id.split(',');
  }

  getselectedCategories() {
    this.selectedCategories = this.category_id.split(',');
    }

  goback() {
    this._location.back();
  }

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      name: '',
      description: '',
      qty: '',
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





  onSubmit() {
    const formData = new FormData();

    formData.append("title", this.blogForm.get("title").value);
    formData.append("description", this.blogForm.get("description").value);
    formData.append("description_full", this.blogForm.get("description_full").value);
    formData.append("is_featured", this.blogForm.get("is_featured").value);
    formData.append("category_id", this.blogForm.get("category_id").value);
    formData.append("works_id", this.blogForm.get("works_id").value);
    formData.append("brand_id", this.blogForm.get("brand_id").value);
    formData.append("is_active", this.blogForm.get("is_active").value);
    formData.append("image", this.blogForm.get("image").value);
    formData.append("code", this.blogForm.get("code").value);
    formData.append("code_int", this.blogForm.get("code_int").value);
    formData.append("status", this.blogForm.get("status").value);
    formData.append('user_id', this.blogForm.get('user_id').value);
    formData.append('data', this.blogForm.get('data').value);


    const id = this.blogForm.get("id").value;

    if (id) {
      this.productsService.update(formData, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Attenzione', detail: 'Salvato con sucesso' });
            this.router.navigate(['/admin/products']);

          }
        },
        (error) => (this.error = error)
      );
    } else {
      this.productsService.create(formData).subscribe(
        (res) => {
          if (res.status === "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Attenzione', detail: 'Salvato con sucesso' });
            this.router.navigate(['/admin/products']);

          }
        },
        (error) => (this.error = error)
      );
    }
  }

}
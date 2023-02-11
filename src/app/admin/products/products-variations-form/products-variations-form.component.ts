import { Component, ElementRef, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../services/appointments.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup, UntypedFormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Blog } from '../../../models/blog';
import { Category } from '../../../models/category';
import { UntypedFormControl } from '@angular/forms';
import { CategoryService } from '../../../services/categories.service';
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import * as moment from 'moment';
import { TYPE_LIST, STATUS_PRODUCTS, STATE_LIST } from '../../constants/constants';
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
import { SkillsService } from 'src/app/services/skills.service';
import { map, tap } from 'rxjs/operators';
import { Technical_data } from 'src/app/models/technical_data';
import { TechnicalDataService } from 'src/app/services/technical_data.service';
import { ProductsVariationsService } from 'src/app/services/products_variations.service';
import { ProductsVariations } from 'src/app/models/products_variations';
import { WarehousesCheckinsService } from 'src/app/services/warehouses_checkins.service';


export interface fPairs {
  qty: number,
  price: number,
}

@Component({
  selector: "app-products-variations-form",
  templateUrl: "./products-variations-form.component.html",
})
export class ProductsVariationsFormComponent implements OnInit {
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  productTitle: any;
  productPieces: any;
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
  blogForm: UntypedFormGroup;
  typeList: any[];
  status: any[];
  stateOptions: any[];

  clients: any = [];
  client: Clients;
  arrString: string;
  productsVariations: any = [];
  productVariations: ProductsVariations;
  brands: any = [];
  brand: Brand;
  technical_datas: any = [];
  technical_data: Technical_data;
  tags: any = [];
  description: any;
  selectedWorks: SelectItem[] = [];
  selectedSkills: SelectItem[] = [];
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
  fPairs: any;
  addForm: UntypedFormGroup;
  rows: UntypedFormArray;
  itemForm: UntypedFormGroup;
  skillsForm: UntypedFormGroup;
  skillsValues: any = [];
  warehouseMovements: any = [];
  productName: any;
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];

  trackByFn(index, item) {
    return item.id;
  }



  constructor(
    private fb: UntypedFormBuilder,
    private appointmentsService: AppointmentsService,
    private technicalDataService: TechnicalDataService,
    private messageService: MessageService,
    private clientsService: ClientsService,
    private _location: Location,
    private productsService: ProductsService,
    private skillsService: SkillsService,
    private brandsService: BrandService,
    private worksService: WorksService,
    private productsVariationsService: ProductsVariationsService,
    private categoryService: CategoryService,
    private warehousesCheckinsService: WarehousesCheckinsService,
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
    this.stateOptions = STATE_LIST;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
  }


  getRequestParams(page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    const params = {};
    let adder = '?';
    if (page) {
      params[`page`] = page - 1;
      adder + 'page=' + (page - 1);
      adder = '&';
    }
    if (pageSize) {
      params[`size`] = pageSize;
      adder + 'size=' + pageSize;
    }
    window.history.replaceState({}, '');

    return params;

  }

  ngOnInit() {
    const userId = this.currentUser.id;

    this.getselectedWorks;
    this.getselectedCategories;




    this.technicalDataService.getAllListbyUser().subscribe(
      (data: Technical_data) => (this.technical_datas = data),
      (error) => (this.error = error)
    );


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


    const product_id = this.route.snapshot.paramMap.get("product_id");

    this.productsService.getId(+product_id).subscribe((res) => {

      this.product = res;

    });



    const id = this.route.snapshot.paramMap.get("id");

    this.productsVariationsService.skills(+id).subscribe(value => {
      this.skillsValues = value;
    });


    this.load();


    if (id) {
      this.pageTitle = "Modifica Variante";

      this.productsVariationsService.getId(+id).subscribe((res) => {

        this.productName = res.title;

        if (res.user_id == this.currentUser.id) {
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
          user_id: this.currentUser.id,
          description_full: res.description_full,
          code_int: res.code_int,
          price: res.price,
          price_extra: res.price_extra,
          id: res.id,
          data: res.data,
          product_id: res.product_id,
          skills: this.skillsValues,
        });


      }
      else {
        this.router.navigate(['/admin/products']);
      }
        this.imagePath = res.image;
        this.productTitle = res.title;
        this.productPieces = res.pieces;

        this.id = res.id;
      });
    } else {
      this.pageTitle = "Aggiungi Variante";
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
      user_id: [this.currentUser.id],
      code_int: [""],
      price: [""],
      product_id: [""],
      price_extra: [""],
      skills: this.initSkill(),

  });

  }




  load(): void {
    const id = this.route.snapshot.paramMap.get("id");
    const params = this.getRequestParams(
      this.page,
      this.pageSize
    );
    this.warehousesCheckinsService.warehouse_movement_by_product(params, +id).subscribe((pData) => {
      this.warehouseMovements = pData;
      this.count = this.warehousesCheckinsService.size;

    });
  }

  initSkill() {
    var formArray = this.fb.array([]);
    const id = this.route.snapshot.paramMap.get("id");

    this.productsVariationsService.skills(+id).subscribe(
      (res)=>{
        this.skillsValues = res;

        this.skillsValues.forEach((e)=>{
          formArray.push(this.fb.group({
            qty: [e.qty],
            price: [e.price]
          }))
        })
      }
    )

    /*formArray.push(this.fb.group({
      qty: [''],
      price: ['']
    })) */


    return formArray;
  }


  public handlePageChange(event): void {
    const id = this.route.snapshot.paramMap.get("id");

    this.page = event;
    this.load();

  }




  private createSkillFormGroup(skill:any): UntypedFormGroup{
    return new UntypedFormGroup({'qty':new UntypedFormControl(skill.qty),'price':new UntypedFormControl(skill.price)})
  }

  public addSkill(skill:any){
    this.skills.push(this.createSkillFormGroup(skill));
  }


  get skills() {
    return this.blogForm.get('skills') as UntypedFormArray;
  }


  newQuantity(): UntypedFormGroup {
    return this.fb.group({
      qty: "",
      price: "",
    })
  }

  addQuantity() {
    this.skills.push(this.newQuantity());
  }

  removeQuantity(i:number) {
    this.skills.removeAt(i);
  }

  getWorksItem(works_id: string, id: string) {
    return this.works.find(item => item.id === works_id);
  }

  getselectedWorks() {
  this.selectedWorks = this.works_id.split(',');
  }



  getCategoryItem(category_id: string, id: string) {
    return this.categories.find((item) => item.id === category_id);
  }


  getselectedCategories() {
    this.selectedCategories = this.category_id.split(',');
    }

  goback() {
    this._location.back();
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

  changeName(value){
    this.productTitle = value.target.value;
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
    formData.append("price", this.blogForm.get("price").value);
    formData.append("price_extra", this.blogForm.get("price_extra").value);
    formData.append("status", this.blogForm.get("status").value);
    formData.append('user_id', this.blogForm.get('user_id').value);
    formData.append('product_id', this.blogForm.get('product_id').value);

    formData.append('skills', JSON.stringify(this.blogForm.get('skills').value));


    const id = this.blogForm.get("id").value;

    if (id) {
      this.productsVariationsService.update(formData, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Salvato con sucesso' });
            //this.router.navigate(['/admin/products']);
            this.ngOnInit;
          }
        },
        (error) => (this.error = error)
      );
    } else {
      this.productsVariationsService.create(formData).subscribe(
        (res) => {
          if (res.status === "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Salvato con sucesso' });
            this.router.navigate(['/admin/products']);

          }
        },
        (error) => (this.error = error)
      );
    }
  }
}

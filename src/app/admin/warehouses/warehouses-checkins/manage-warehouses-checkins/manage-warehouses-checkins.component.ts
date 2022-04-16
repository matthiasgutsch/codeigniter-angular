import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppointmentsService } from '../../../../services/appointments.service';
import { Blog } from '../../../../models/blog';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { CategoryService } from '../../../../services/categories.service';
import { Category } from '../../../../models/category';
import { MessageService } from 'primeng/api';
import { Clients } from 'src/app/models/clients';
import { ClientsService } from 'src/app/services/clients.service';
import { ComuniService } from 'src/app/services/comuni.service';
import { Comuni } from 'src/app/models/comuni';
import { WorksService } from 'src/app/services/works.service';
import { Works } from 'src/app/models/works';
import { LocationsService } from 'src/app/services/locations.service';
import { Locations } from 'src/app/models/locations';
import { Employees } from 'src/app/models/employees';
import { EmployeesService } from 'src/app/services/employees.service';
import { Appointments } from 'src/app/models/appointments';
import { formatDate } from '@angular/common';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { TimesheetsService } from 'src/app/services/timesheets.service';
import { Products } from 'src/app/models/products';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brands.service';
import { PARAM_CHECKINS_PATH, PARAM_WORKS_PATH, STATUS_PRODUCTS } from '../../../constants/constants';
import { Table } from 'primeng/table';
import { NgxSpinnerService } from "ngx-spinner";
import { TagsService } from 'src/app/services/tags.service';
import { Tags } from 'src/app/models/tags';
import { KeyValue } from '@angular/common';
import { Technical_data } from 'src/app/models/technical_data';
import { TechnicalDataService } from 'src/app/services/technical_data.service';
import 'moment/locale/it'  // without this line it didn't work
import { Projects } from 'src/app/models/projects';
import { ProjectsService } from 'src/app/services/projects.service';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { WarehouseCheckins } from 'src/app/models/warehouse_checkins';
import { WarehousesCheckinsService } from 'src/app/services/warehouses_checkins.service';
import { WarehousesService } from 'src/app/services/warehouses.service';
import { Warehouses } from 'src/app/models/warehouses';
import { ProductsVariationsService } from 'src/app/services/products_variations.service';
import { Suppliers } from 'src/app/models/suppliers';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { ProductsVariations } from 'src/app/models/products_variations';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { AutoComplete } from 'primeng/autocomplete';

@Component({
  selector: 'app-manage-warehouses-checkins',
  templateUrl: './manage-warehouses-checkins.component.html'
})
export class ManageWarehousesCheckinsComponent implements OnInit {
  blogs: Blog;
  blog: Blog;

  works: any = [];
  work: Works;
  calendarOptions: any;
  uploadError: string;
  locations: any = [];
  location: Locations;
  cols: any[];
  colsData: any[];
  selectedWorks: any[];
  exportColumns: any[];
  _selectedColumns: any[];
  selectedEmployee: any[];
  selectedSupplier: any[];
  selectedSkills: any[];
  brand: Brand;
  tags: any = [];
  tag: Tags;
  selectedBrands: Brand;
  loading: boolean;
  currentIndex = 1;
  displayEvent: any;
  productsData: any = [];
  warehouseCheckins: any = [];
  warehouseCheckin: WarehouseCheckins;
  date: Date;
  skillsArray: any = [];
  categories: any = [];
  category: Category;
  error: string;
  private id: number;
  clients: any = [];
  client: Clients;
  imagePath: any;

  suppliers: any = [];
  supplier: Suppliers;

  productDialog: boolean = false;
  works_id: any;
  category_id: any;
  status: any;
  currentUser: any;
  technical_datas: any = [];
  technical_data: Technical_data;
  skills: any[] = [];
  batches: any[];
  productDialogAdd: boolean = false;
  blogForm: FormGroup;
  projects: any = [];
  project: Projects;
  employees: any = [];
  employee: Employees;

  products: any = [];
  product: Products;
  options = [];


  pageTitle: string;
  warehouses: any = [];
  warehouse: Warehouses;
  updateProductQuantity: any;
  pieces: string;

  filteredProductsVariations: any = [];
  productsVariations: any = [];
  productsVariation: ProductsVariations;


  startDate: Date;
  bsValue: Date = new Date();
  tues = new Date();
  weekNo: number;
  inputNum: any;
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];
  public base_path: string;
  basePath: string;
  pageOfItems: Array<any>;
  searchWrapper: boolean = false;
  nameFilter: string;
  descriptionFilter: string;
  brands: string[] = ['100000','100001','100002','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];
    
  filteredBrands: any[];
  dataSelect: any;
  dataSelectTrue: number;
  showDialog() {
    this.productDialog = true;
  }

  myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');

  trackByFn(index, item) {
    return item.id;
  }


  @ViewChild("dt", { static: false }) public dt: Table;

  constructor(
    private warehousesCheckinsService: WarehousesCheckinsService,
    private suppliersService: SuppliersService,
    private messageService: MessageService,
    private warehousesService: WarehousesService,
    private employeesService: EmployeesService,
    private tagsService: TagsService,
    private fb: FormBuilder,
    private productsVariationsService: ProductsVariationsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private projectsService: ProjectsService,
    private confirmationService: ConfirmationService,) {
    this.status = STATUS_PRODUCTS;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');


    this.pageTitle = "Aggiungi Prodotti / Magazzino";

    this.blogForm = this.fb.group({
      id: [""],
      warehouse_id: ["", Validators.required],
      product_id: ["", Validators.required],
      supplier_id: ["", Validators.required],
      pieces: ["", Validators.required],
      boxes: ["", Validators.required],
      user_id: [this.currentUser.user_id],
    });

  }



    @ViewChild('autoCompleteObject') private autoCompleteObject: AutoComplete ;

    ngAfterContentChecked() {
      this.dataSelect = this.dataSelect;
      this.dataSelectTrue = this.dataSelectTrue;
    }
    
  ngOnInit() {

    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);

    const userId = this.currentUser.user_id;
    this.spinner.show();
    this.getEmployees();
    this.getWarehouses();
    this.getSuppliers();



    this.cols = [
      { field: "product_id", header: "titolo" },
      { field: "code", header: "Codice" },
      { field: "status", header: "Status" },
      { field: "employee_id", header: "Ore" },
      { field: "code_int", header: "Codice interno" },
      { field: "brand_id", header: "Brand" }
    ];
    this.cols = [
      { field: "employee_id", header: "Dipendente" },
      { field: "product_id", header: "Progetto" },
    ];
    this._selectedColumns = this.cols;
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));


    this.basePath = window.location.pathname;
    if (this.route.snapshot.queryParamMap.has('page')) {
      this.page = +this.route.snapshot.queryParamMap.get('page');
    }
    if (this.route.snapshot.queryParamMap.has('size')) {
      this.pageSize = +this.route.snapshot.queryParamMap.get('size');
    }
    if (this.route.snapshot.queryParamMap.has('name')) {
      this.nameFilter = this.route.snapshot.queryParamMap.get('name');
    }
    if (this.route.snapshot.queryParamMap.has('description')) {
      this.descriptionFilter = this.route.snapshot.queryParamMap.get('description');
    }

    this.load();

    this.spinner.hide();

  }


  public handlePageChange(event): void {
    this.page = event;
    this.load();
  
  }
  
    public selectionItemForFilter(e) {
      const colsTempor = e.value;
      colsTempor.sort(function (a, b) {
        return a.index - b.index;
      });
      this.cols = [];
      this.cols = colsTempor;
      if (e.value.length > 10) {
        e.value.pop();
      }
    }

  getRequestParams(searchTitle, categoryTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let path = PARAM_CHECKINS_PATH;
    const params = {};
    let adder = '?';
    if (page) {
      params[`page`] = page - 1;
      path += adder + 'page=' + (page - 1);
      adder = '&';
    }
    if (searchTitle) {
      params[`name`] = searchTitle;
      path += adder + 'date_from=' + searchTitle;
      adder = '&';
    }
    if (categoryTitle) {
      params[`description`] = categoryTitle;
      path += adder + 'date_to=' + categoryTitle;
      adder = '&';
    }
    if (pageSize) {
      params[`size`] = pageSize;
      path += adder + 'size=' + pageSize;
    }
    window.history.replaceState({}, '', path);

    return params;

  }


  load(): void {

    const params = this.getRequestParams(
      this.nameFilter,
      this.descriptionFilter,
      this.page,
      this.pageSize
    );
    this.warehousesCheckinsService.getAllListNew(params).subscribe((pData) => {
      this.warehouseCheckins = pData;
      this.count = this.warehousesCheckinsService.size;

    });
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.load();
  }

  reset(): void {
    this.nameFilter = '';
    this.descriptionFilter = '';
    this.load();
    
  }
  
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

  private onChange(item: string): void {
    this.load();

  }





  editItem(warehouseCheckin: WarehouseCheckins) {
    this.warehouseCheckin = { ...warehouseCheckin };
    const id = warehouseCheckin.id;

    if (id) {
      this.pageTitle = "Modifica Ingresso Magazzino";
      this.warehousesCheckinsService.getId(+id).subscribe((res) => {
        this.blogForm.patchValue({
          warehouse_id: res.warehouse_id,
          supplier_id: res.supplier_id,
          product_id: res.product_id,
          pieces: res.pieces,
          boxes: res.boxes,
          user_id: this.currentUser.user_id,
          id: res.id,
        });

      });
    } else {

    }

    this.blogForm = this.fb.group({
      id: [""],
      warehouse_id: ["", Validators.required],
      product_id: ["", Validators.required],
      supplier_id: ["", Validators.required],
      pieces: ["", Validators.required],
      boxes: ["", Validators.required],
      user_id: [this.currentUser.user_id],
    });

    this.productDialogAdd = true;
  }




  getWarehouses() {
    this.warehousesService.getAllListbyUser().subscribe(
      (data: Warehouses) => this.warehouses = data,
    );
  }

  getEmployees() {
    this.employeesService.getAllListbyUser().subscribe(
      (data: Employees) => this.employees = data,
    );
  }


  getProjectItem(product_id: string, id: string) {
    return this.projects.find(item => item.id === product_id);
  }


  getWarehouseItem(warehouse_id: string, id: string) {
    return this.warehouses.find(item => item.id === warehouse_id);
  }

  getEmployeeItem(employee_id: string, id: string) {
    return this.employees.find(item => item.id === employee_id);
  }

  clickButton(model: any) {
    this.displayEvent = model;

  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        title: model.event.title,
        works_id: model.event.works_id.split(','),
        location_id: model.event.location_id,
        employee_id: model.event.employee_id,
        allDay: model.event.allDay,
        description: model.event.description,
        category_id: model.event.category_id

        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
    this.productDialog = true;

  }

  dayClick(event) {
    console.log('dayClick', event);
  }


  getTags() {
    this.tagsService.getAllListbyUser().subscribe(
      (data: Tags) => this.tags = data,
      error => this.error = error
    );
  }

  getCategories() {

    this.categoryService.getAllListbyUser().subscribe(
      (data: Category) => this.categories = data,
      error => this.error = error
    );
  }

  getSuppliers() {

    this.suppliersService.getAllListbyUser().subscribe(
      (data: Suppliers) => this.suppliers = data,
      error => this.error = error
    );
  }


  clear(table: any) {

    //  THIS DOES NOT WORK!!   Filter stops working after clearing
    table.clear();

  }



  getCategoryItem(category_id: string, id: string) {
    return this.categories.find(item => item.id === category_id);
  }


  getTechnicalDataItem(category_id: string, id: string) {
    return this.technical_datas.find(item => item.id === category_id);
  }


  getLocationItem(location_id: string, id: string) {
    return this.locations.find(item => item.id === location_id);
  }


  getTagsItem(works_id: string, id: string) {
    return this.tags.find(item => item.id === works_id);
  }

  getWorksItem(works_id: string, id: string) {
    return this.works.find(item => item.id === works_id);
  }


 




    filterCountry(event) {
      this.productsVariationsService.find(event.query).subscribe(data => {
        this.productsVariations = data

      //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
      let filtered: any[] = [];
      let query = event.query;
      for (let i = 0; i < this.productsVariations.length; i++) {
        let productsVariation = this.productsVariations[i];
        if (productsVariation.code.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(productsVariation);
        }
      }
  
      this.filteredProductsVariations = filtered;
    }	)};

    
    change(eventi){

      console.log(this.dataSelect);
      let obj = this.dataSelect;
      console.log(obj.id); // 1
      this.dataSelectTrue = obj.id;

    }


  filterBrands(event) {
    this.productsVariationsService.find(event.query).subscribe(
      res => {
			const result = (<any>res).filter(productsVariation => productsVariation.code.includes(event.query));
			console.log(result);
			this.productsVariations = result;
		});
}


  view(warehouseCheckin: WarehouseCheckins) {
    this.warehouseCheckin = { ...warehouseCheckin };

    const id = this.warehouseCheckin.product_id;

    this.productsVariationsService.getId(+id).subscribe((res) => { 
      this.product = res;
    });
    
    this.productDialog = true;
  }



  exportPdf() {
    // const doc = new jsPDF();
    const doc = new jsPDF('l', 'pt', 'A4');
    doc['autoTable'](this.exportColumns, this.warehouseCheckins);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("timesheets.pdf");
  }



  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.warehouseCheckins);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "timesheets");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


  updateQuantity(formData) {
    formData = new FormData();
    const id = this.blogForm.get("product_id").value;

    this.productsVariationsService.getId(+id).subscribe(data => {
      this.productsVariation = data;
      this.pieces = this.productsVariation.pieces;
      this.updateProductQuantity = +this.pieces + +this.blogForm.get("pieces").value;
      formData.append('pieces', this.updateProductQuantity);

      this.productsVariationsService.update_quantity(formData, +id).subscribe({
        next: (response: any) => {
          if (response.error) {
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Conferma', detail: 'Quantita aggiornata con successo' });
            this.ngOnInit();
            this.blogForm.reset();
          }
        },
      });
    })


  }

  

  onSubmit() {
    const formData = new FormData();

    formData.append("warehouse_id", this.blogForm.get("warehouse_id").value);
    formData.append('user_id', this.currentUser.user_id);
    formData.append("product_id", this.blogForm.get("product_id").value);
    formData.append("supplier_id", this.blogForm.get("supplier_id").value);
    formData.append("pieces", this.blogForm.get("pieces").value);
    formData.append("boxes", this.blogForm.get("boxes").value);

    const id = this.blogForm.get("id").value;

    if (id) {
      this.warehousesCheckinsService.update(formData, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Salvato con sucesso' });
            this.productDialogAdd = false;
            this.ngOnInit();
            this.blogForm.reset();
          }
        },
        (error) => (this.error = error)
      );
    } else {
      this.warehousesCheckinsService.create(formData).subscribe(
        (res) => {
          if (res.status === "error") {
            this.uploadError = res.message;
          } else {
            this.updateQuantity(formData);
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Salvato con sucesso' });
            this.productDialogAdd = false;
            this.ngOnInit();
            this.blogForm.reset();
          }
        },
        (error) => (this.error = error)
      );
    }

  }


  hideDialog() {
    this.productDialog = false;
  }

  onDelete(id: number, title: string) {

    this.confirmationService.confirm({
      message: 'Sei sicuro di volerlo cancellare = ' + id,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.warehousesCheckinsService.delete(+id).subscribe(
          res => {
            console.log(res);
            this.ngOnInit();
            this.messageService.add({ key: 'myKey1', severity: 'warn', summary: 'Attenzione', detail: 'Cancellazione avvenuto con successo' });

          },
          error => this.error = error
        );
      },

    });


  }

}

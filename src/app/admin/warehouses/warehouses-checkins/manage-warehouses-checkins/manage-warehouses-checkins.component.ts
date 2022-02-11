import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentsService } from '../../../../services/appointments.service';
import { Blog } from '../../../../models/blog';
import {ConfirmationService, SelectItem} from 'primeng/api';
import { CategoryService } from '../../../../services/categories.service';
import { Category } from '../../../../models/category';
import {MessageService} from 'primeng/api';
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
import {formatDate} from '@angular/common';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { TimesheetsService } from 'src/app/services/timesheets.service';
import { Products } from 'src/app/models/products';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brands.service';
import { STATUS_PRODUCTS } from '../../../constants/constants';
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
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { WarehouseCheckins } from 'src/app/models/warehouse_checkins';
import { WarehousesCheckinsService } from 'src/app/services/warehouses_checkins.service';
import { WarehousesService } from 'src/app/services/warehouses.service';
import { Warehouses } from 'src/app/models/warehouses';
import { ProductsVariationsService } from 'src/app/services/products_variations.service';

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
  selectedSkills: any[];
  brands: any = [];
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
  productDialog:boolean = false;
  works_id: any;
  category_id: any;
  status: any;
  currentUser: any;
  technical_datas: any = [];
  technical_data: Technical_data;
  skills:  any[] = [];
  batches: any[];
  productDialogAdd: boolean = false;
  blogForm: FormGroup;
  projects: any = [];
  project: Projects;
  employees: any = [];
  employee: Employees;
  pageTitle: string;
  warehouses: any = [];
  warehouse: Warehouses;
  productsVariations: any = [];

  
  showDialog() {
    this.productDialog = true;
}

myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en')  ;

trackByFn(index, item) {
  return item.id;
}

startDate: Date;
bsValue: Date = new Date();
tues = new Date();
weekNo: number;

@ViewChild("dt", { static: false }) public dt: Table;

  constructor(
    private clientsService: ClientsService,
    private warehousesCheckinsService: WarehousesCheckinsService,
    private worksService: WorksService,
    private locationsService: LocationsService, 
    private messageService: MessageService,
    private warehousesService: WarehousesService,
    private employeesService: EmployeesService,
    private tagsService: TagsService,
    private fb: FormBuilder,
    private productsVariationsService: ProductsVariationsService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService, 
    private projectsService: ProjectsService,
    private confirmationService: ConfirmationService,) { 
      this.status = STATUS_PRODUCTS;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
  }

  ngOnInit() {

    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);

    const userId = this.currentUser.user_id;
    this.spinner.show();
    this.getProjects();
    this.getEmployees();
    this.getWarehouses();
    this.getProductsVariations();

    this.warehousesCheckinsService.getAllListbyUser().subscribe(data => {
      this.warehouseCheckins = data;
      this.cols = [
        { field: "product_id", header: "titolo" },
        { field: "code", header: "Codice" },
        { field: "status", header: "Status" },
        { field: "employee_id", header: "Ore" },
        { field: "code_int", header: "Codice interno" },
        { field: "brand_id", header: "Brand" }
      ];
 this.cols = [
      { field: "date_from", header: "Da" },
      { field: "date_from", header: "A" },
      { field: "employee_id", header: "Dipendente" },
      { field: "product_id", header: "Progetto" },
    ];
    this._selectedColumns = this.cols;
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
      this.spinner.hide();
    });
  }


  getProductsVariations() {
    this.productsVariationsService.getAllListbyUser().subscribe(data => {
      this.productsVariations = data })
    };
  
  editItem(warehouseCheckin: WarehouseCheckins) {
    this.warehouseCheckin = { ...warehouseCheckin };
    const id = warehouseCheckin.id;

    if (id) {
      this.pageTitle = "Modifica Ingresso Magazzino";
      this.warehousesCheckinsService.getId(+id).subscribe((res) => {
        this.blogForm.patchValue({
          warehouse_id: res.warehouse_id,
          date_from: res.date_from,
          date_to: res.date_to,
          product_id: res.product_id,
          hours: res.hours,
          employee_id: res.employee_id,
          hours_extra: res.hours_extra,
          user_id: this.currentUser.user_id,
          id: res.id,
        });

      });
    } else {

    }

    this.blogForm = this.fb.group({
      id: [""],
      warehouse_id: ["", Validators.required],
      date_from: ["", Validators.required],
      date_to: ["", Validators.required],
      product_id: ["", Validators.required],
      hours: ["", Validators.required],
      hours_extra: ["", Validators.required],
      employee_id: ["", Validators.required],
      user_id: [this.currentUser.user_id],
    });

    this.productDialogAdd = true;
  }
  
  createTimesheets(employee: Employees) {
    this.productDialogAdd = true;
    this.pageTitle = "Aggiungi Timesheet";

    this.blogForm = this.fb.group({
      id: [""],
      warehouse_id: ["", Validators.required],
      date_from: ["", Validators.required],
      date_to: [""],
      product_id: [""],
      hours: [""],
      hours_extra: [""],
      employee_id: [""],
      user_id: [this.currentUser.user_id],
    });
  }

  getProjects() {

  this.projectsService.getAllListbyUser().subscribe(
    (data: Projects) => this.projects = data,
    );
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


  clear(table: any) 
  {
    
      //  THIS DOES NOT WORK!!   Filter stops working after clearing
      table.clear();
      
	} 
    
 

  getBrandItem(brand_id: string, id: string) {
    return this.brands.find(item => item.id === brand_id);
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

  



view(warehouseCheckin: WarehouseCheckins) {
  this.warehouseCheckin = { ...warehouseCheckin };
  
  this.productDialog = true;
}



exportPdf() {
  // const doc = new jsPDF();
  const doc = new jsPDF('l','pt','A4');
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

onSubmit() {
  const formData = new FormData();

  formData.append("warehouse_id", this.blogForm.get("warehouse_id").value);
  formData.append("date_from", this.blogForm.get("date_from").value);
  formData.append("date_to", this.blogForm.get("date_to").value);
  formData.append('user_id', this.blogForm.get('user_id').value);
  formData.append("product_id", this.blogForm.get("product_id").value);
  formData.append("hours", this.blogForm.get("hours").value);
  formData.append("hours_extra", this.blogForm.get("hours_extra").value);
  formData.append('employee_id', this.blogForm.get('employee_id').value);
  
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
          this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Salvato con sucesso' });
          this.productDialogAdd = false;
          this.ngOnInit();

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
      message: 'Are you sure want to delete it = ' + id,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.warehousesCheckinsService.delete(+id).subscribe(
          res => {
            console.log(res);
            this.ngOnInit();
            this.messageService.add({key: 'myKey1', severity:'warn', summary: 'Attenzione', detail: 'Cancellazione avvenuto con successo'});

          },
          error => this.error = error
        );
      },
     
  });

   
  }

}

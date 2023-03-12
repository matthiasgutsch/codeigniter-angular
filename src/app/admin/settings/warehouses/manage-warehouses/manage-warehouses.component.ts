import { Component, OnInit, ViewChild } from '@angular/core';
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
import { NgxSpinnerService } from "ngx-spinner";
import { Appointment_type } from 'src/app/models/appointment_type';
import { AppointmentTypeService } from 'src/app/services/appointment_type.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { LazyLoadEvent } from 'primeng/api';
import { WarehousesService } from 'src/app/services/warehouses.service';
import { Warehouses } from 'src/app/models/warehouses';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAM_WAREHOUSES_PATH, PARAM_WORKS_PATH } from 'src/app/admin/constants/constants';

@Component({
  selector: 'app-manage-warehouses',
  templateUrl: './manage-warehouses.component.html'
})
export class ManageWarehousesComponent implements OnInit {
  blogs: Blog;
  blog: Blog;

  works: any = [];
  work: Works;
  events: any;
  virtualDatabase: Appointments[];
  displayFilter: boolean;
  locations: any = [];
  location: Locations;
  cols: any[];
  exportColumns: any[];
  _selectedColumns: any[];
  selectedWorks: any[];
  calendarOptions: any;
  displayEvent: any;

  employees: any = [];
  employee: Employees;
  Symbols_Array: any = [];
  warehouses: any = [];
  warehouse: Warehouses;
  date: Date;
  categories: any = [];
  category: Category;
  error: string;
  private category_id: number;
  private id: number;
  clients: any = [];
  client: Clients;
  appointmenttype: any = [];
  appointment_typ: Appointment_type;
  comuni: Comuni[] = [];
  productDialog: boolean = false;
  calendarDialog: boolean = false;
  loading: boolean;

  works_id: any;
  showDialog() {
    this.productDialog = true;
  }
  currentUser: any;
  nameFilter: string;
  descriptionFilter: string;
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];
  public base_path: string;
  basePath: string;
  pageOfItems: Array<any>;


  myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');

  trackByFn(index, item) {
    return item.id;
  }

  @ViewChild(FullCalendarComponent) ucCalendar: FullCalendarComponent;

  constructor(
    private locationsService: LocationsService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private employeesService: EmployeesService,
    private warehousesService: WarehousesService,
    private confirmationService: ConfirmationService,) {


    this.cols = [
      { field: "title", header: "titolo" },
      { field: "descriprion", header: "Descrizione" },

      { field: "category_id", header: "Cliente" }

    ];
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    this._selectedColumns = this.cols;
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));

  }

  ngOnInit() {


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


    const userId = this.currentUser.id;
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
  let path = PARAM_WAREHOUSES_PATH;
  const params = {};
  let adder = '?';
  if (page) {
    params[`page`] = page - 1;
    path += adder + 'page=' + (page - 1);
    adder = '&';
  }
  if (searchTitle) {
    params[`name`] = searchTitle;
    path += adder + 'name=' + searchTitle;
    adder = '&';
  }
  if (categoryTitle) {
    params[`description`] = categoryTitle;
    path += adder + 'description=' + categoryTitle;
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
  this.warehousesService.getAllListNew(params).subscribe((pData) => {
    this.warehouses = pData;
    this.count = this.warehousesService.size;

  });
}

private onChange(item: string): void {
  this.load();

}

  editProduct(warehouse: Warehouses) {
    this.warehouse = { ...warehouse };
    this.selectedWorks = this.warehouse.works_id.split(',');
    this.productDialog = true;
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
        this.warehousesService.delete(+id).subscribe(
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

import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../services/appointments.service';
import { Blog } from '../../../models/blog';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { CategoryService } from '../../../services/categories.service';
import { Category } from '../../../models/category';
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
import { SupportsService } from 'src/app/services/supports.service';
import { Supports } from 'src/app/models/supports';
import { PARAM_APPOINTMENTS_PATH, PARAM_SUPPORTS_PATH } from '../../constants/constants';

@Component({
  selector: 'app-manage-supports',
  templateUrl: './manage-supports.component.html'
})
export class ManageSupportsComponent implements OnInit {


  supports: any = [];
  support: Supports;

  works: any = [];
  work: Works;

  locations: any = [];
  location: Locations;
  cols: any[];
  exportColumns: any[];
  _selectedColumns: any[];
  selectedWorks: any[];

  appointments: any = [];
  appointment: Appointments;
  date: Date;
  categories: any = [];
  category: Category;
  error: string;
  private category_id: number;
  private id: number;
  clients: any = [];
  client: Clients;
  comuni: any = [];
  productDialog: boolean = false;
  works_id: any;
  currentUser: any;
  showDialog() {
    this.productDialog = true;
  }

  myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');

  trackByFn(index, item) {
    return item.id;
  }

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

  
  constructor(
    private clientsService: ClientsService,
    private supportsService: SupportsService,
    private worksService: WorksService,
    private locationsService: LocationsService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private employeesService: EmployeesService,
    private comuniService: ComuniService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,) {


    this.cols = [
      { field: "date", header: "Data" },
      { field: "title", header: "titolo" },
      { field: "category_id", header: "Cliente" }

    ];

    this._selectedColumns = this.cols;
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));

  }

  ngOnInit() {

    this.load();

  }



  getRequestParams(searchTitle, categoryTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let path = PARAM_SUPPORTS_PATH;
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
    this.supportsService.getAllListNew(params).subscribe((pData) => {
      this.supports = pData;
      this.count = this.supportsService.size;

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
  
  public handlePageChange(event): void {
    this.page = event;
    this.load();
  
  }
  


  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

  private onChange(item: string): void {
    this.load();

  }


  getCategoryItem(category_id: string, id: string) {
    return this.clients.find(item => item.id === category_id);
  }


  getClients() {
  this.clientsService.getAllList().subscribe(
    (data: Clients) => this.clients = data,
    error => this.error = error
  );

  }



  getWorks() {
    this.worksService.getAllList().subscribe(
      (data: Works) => this.works = data,
      error => this.error = error
    );
  }

  getLocations() {
    this.locationsService.getAllList().subscribe(
      (data: Locations) => this.locations = data,
      error => this.error = error
    );
  }

 




  editProduct(appointment: Appointments) {
    this.appointment = { ...appointment };
    this.selectedWorks = this.appointment.works_id.split(',');
    this.productDialog = true;
  }


  exportPdf() {
    // const doc = new jsPDF();
    const doc = new jsPDF('l', 'pt', 'A4');
    doc['autoTable'](this.exportColumns, this.appointments);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("appointments.pdf");
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
        this.supportsService.delete(+id).subscribe(
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

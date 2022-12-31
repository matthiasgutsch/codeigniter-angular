import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../../services/employees.service';
import { Blog } from '../../../models/blog';
import { Clients } from '../../../models/clients';
import { ConfirmationService } from 'primeng/api';
import { CategoryService } from '../../../services/categories.service';
import { Category } from '../../../models/category';
import { MessageService } from 'primeng/api';
import { ComuniService } from 'src/app/services/comuni.service';
import { Comuni } from 'src/app/models/comuni';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { NgxSpinnerService } from "ngx-spinner";
import { PARAM_EMPLOYEES_PATH, PARAM_PRODUCTS_PATH } from '../../constants/constants';
import { Employees } from 'src/app/models/employees';


@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html'
})
export class ManageEmployeesComponent implements OnInit {
  employees: any = [];
  employee: Employees;
  categories: any = [];
  category: Category;
  error: string;
  comuni: any = [];
  cols: any[];
  exportColumns: any[];
  _selectedColumns: any[];
  loading: boolean;
  totalRecords: string;
  currentUser: any;
  page = 1;
  filterSidebar: boolean;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];
  public base_path: string;
  basePath: string;
  pageOfItems: Array<any>;
  searchWrapper: boolean = false;
  nameFilter: string;
  descriptionFilter: string;
  codeFilter: string;
  codeIntFilter: string;
  brandFilter: string;

  private category_id: number;
  private id: number;

  productDialog: boolean = false;
  showDialog() {
    this.productDialog = true;
  }


  trackByFn(index, item) {
    return item.id;
  }


  constructor(
    private employeesService: EmployeesService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private comuniService: ComuniService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,) {
    const doc = new jsPDF();

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    const userId = this.currentUser.user_id;



    this.spinner.show();
    this.load();

    this.cols = [
      { field: "name", header: "Nome" },
      { field: "surname", header: "Cognome" },
      { field: "fiscalnumber", header: "Codice Cliente" },

      { field: "date", header: "Data di nascità" },

    ];
    this._selectedColumns = this.cols;
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
    this.getComuni();
    this.spinner.hide();

  }




  getRequestParams(searchTitle, categoryTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let path = PARAM_EMPLOYEES_PATH;
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

  reset(): void {
    this.nameFilter = '';
    this.descriptionFilter = '';
    this.codeFilter = '';
    this.codeIntFilter = '';
    this.brandFilter = '';
    this.load();

  }

  load(): void {

    const params = this.getRequestParams(
      this.nameFilter,
      this.descriptionFilter,
      this.page,
      this.pageSize
    );
    this.employeesService.getAllListNew(params).subscribe((pData) => {
      this.employees = pData;
      this.count = this.employeesService.size;
    });
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

  getComuni() {
    this.comuniService.getAllList().subscribe(
      (data: Comuni) => this.comuni = data,
      error => this.error = error
    );
  }


  getCategoryItem(category_id: string, id: string) {
    return this.employees.find(item => item.id === category_id);
  }


  edit(employee: Employees) {
    this.employee = { ...employee };
    this.productDialog = true;
  }


  hideDialog() {
    this.productDialog = false;
  }

  exportPdf() {
    // const doc = new jsPDF();
    const doc = new jsPDF('l', 'pt', 'A4');
    doc['autoTable'](this.exportColumns, this.employees);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("clients.pdf");
  }




  onDelete(id: number, title: string) {

    this.confirmationService.confirm({
      message: 'Sei sicuro di volerlo cancellare',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeesService.delete(+id).subscribe(
          res => {
            console.log(res);
            this.ngOnInit();
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Attenzione', detail: 'Cancellazione avvenuto con successo' });

          },
          error => {
            this.error = error;
            this.messageService.add({ key: 'myKey2', severity: 'warn', summary: 'Attenzione', detail: 'Errore backend' });
          });
      },

    });


  }

}

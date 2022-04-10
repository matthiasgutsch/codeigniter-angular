import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Blog } from '../../../models/blog';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { CategoryService } from '../../../services/categories.service';
import { Category } from '../../../models/category';
import { MessageService } from 'primeng/api';
import { Clients } from 'src/app/models/clients';
import { ClientsService } from 'src/app/services/clients.service';
import { ComuniService } from 'src/app/services/comuni.service';
import { Comuni } from 'src/app/models/comuni';
import { BillingsService } from 'src/app/services/billings.service';
import { jsPDF } from "jspdf";
import { NgxSpinnerService } from "ngx-spinner";
import { Orders } from 'src/app/models/orders';
import { OrdersService } from 'src/app/services/orders.service';
import { PARAM_BILLINGS_PATH, PARAM_DOCUMENTS_PATH, PARAM_ORDERS_PATH } from '../../constants/constants';

@Component({
  selector: "app-manage-documents",
  templateUrl: "./manage-documents.component.html",
})
export class ManageDocumentsComponent implements OnInit {

  orders: any = [];
  order: Orders;
  categories: any = [];
  category: Category;
  error: string;
  private category_id: number;
  private id: number;
  clients: any = [];
  client: Clients;
  comuni: any = [];
  productDialog: boolean = false;
  selectedSkills: any[];
  skills: any[] = [];
  skillsArray: any = [];

  cols: any[];
  exportColumns: any[];
  _selectedColumns: any[];

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
  @ViewChild("content", { static: false }) content: ElementRef;
  currentUser: any;
  files: TreeNode[];

  showDialog() {
    this.productDialog = true;
  }

  trackByFn(index, item) {
    return item.id;
  }

  constructor(
    private clientsService: ClientsService,
    private ordersService: OrdersService,
    private messageService: MessageService,
    private comuniService: ComuniService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
  ) {

    this.files =
      [
        {
          "label": "Documents",
          "data": "Documents Folder",
          "expandedIcon": "pi pi-folder-open",
          "collapsedIcon": "pi pi-folder",
          "children": [{
            "label": "Work",
            "data": "Work Folder",
            "expandedIcon": "pi pi-folder-open",
            "collapsedIcon": "pi pi-folder",
            "children": [{ "label": "Expenses.doc", "icon": "pi pi-file", "data": "Expenses Document" }, { "label": "Resume.doc", "icon": "pi pi-file", "data": "Resume Document" }]
          },
          {
            "label": "Home",
            "data": "Home Folder",
            "expandedIcon": "pi pi-folder-open",
            "collapsedIcon": "pi pi-folder",
            "children": [{ "label": "Invoices.txt", "icon": "pi pi-file", "data": "Invoices for this month" }]
          }]
        },
        {
          "label": "Pictures",
          "data": "Pictures Folder",
          "expandedIcon": "pi pi-folder-open",
          "collapsedIcon": "pi pi-folder",
          "children": [
            { "label": "barcelona.jpg", "icon": "pi pi-image", "data": "Barcelona Photo" },
            { "label": "logo.jpg", "icon": "pi pi-file", "data": "PrimeFaces Logo" },
            { "label": "primeui.png", "icon": "pi pi-image", "data": "PrimeUI Logo" }]
        },
        {
          "label": "Movies",
          "data": "Movies Folder",
          "expandedIcon": "pi pi-folder-open",
          "collapsedIcon": "pi pi-folder",
          "children": [{
            "label": "Al Pacino",
            "data": "Pacino Movies",
            "children": [{ "label": "Scarface", "icon": "pi pi-video", "data": "Scarface Movie" }, { "label": "Serpico", "icon": "pi pi-file-video", "data": "Serpico Movie" }]
          },
          {
            "label": "Robert De Niro",
            "data": "De Niro Movies",
            "children": [{ "label": "Goodfellas", "icon": "pi pi-video", "data": "Goodfellas Movie" }, { "label": "Untouchables", "icon": "pi pi-video", "data": "Untouchables Movie" }]
          }]
        }
      ]
  }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    const userId = this.currentUser.user_id;
    this.spinner.show();
    this.cols = [
      { field: "category_id", header: "Cliente" },
      { field: 'client.username', header: 'Nome Cliente' },
      { field: "id", header: "Numero Fattura" },
    ];
    this._selectedColumns = this.cols;
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
    this.getComuni();
    this.getClients();
    this.load();
    this.spinner.hide();


  }



  getRequestParams(searchTitle, categoryTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let path = PARAM_DOCUMENTS_PATH;
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
    this.ordersService.getAllListNew(params).subscribe((pData) => {
      this.orders = pData;
      this.count = this.ordersService.size;

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



  getClients() {
    const userId = this.currentUser.user_id;
    this.clientsService.getAllListbyUser().subscribe(
      (data: Clients) => this.clients = data,
      error => this.error = error
    );

  }

  getComuni() {
    this.comuniService.getAllList().subscribe(
      (data: Comuni) => (this.comuni = data),
      (error) => (this.error = error)
    );

  }


  getCategoryItem(category_id: string, id: string) {
    return this.clients.find((item) => item.id === category_id);
  }

  getComuniItem(category_id: string, id: string) {
    return this.comuni.find((item) => item.id === category_id);
  }




  edit(order: Orders) {
    this.order = { ...order };
    this.selectedSkills = JSON.parse("" + this.order.skills + "");
    this.productDialog = true;
  }




  hideDialog() {
    this.productDialog = false;
  }

  onDelete(id: number, title: string) {
    this.confirmationService.confirm({
      message: "Sei sicuro di volerlo cancellare = " + id,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.ordersService.delete(+id).subscribe(
          (res) => {
            console.log(res);
            this.ngOnInit();
            this.messageService.add({
              key: "myKey1",
              severity: "warn",
              summary: "Attenzione",
              detail: "Cancellazione avvenuto con successo",
            });
          },
          (error) => (this.error = error)
        );
      },
    });
  }
}

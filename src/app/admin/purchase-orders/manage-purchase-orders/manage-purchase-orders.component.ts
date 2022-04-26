import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Blog } from '../../../models/blog';
import {ConfirmationService} from 'primeng/api';
import { CategoryService } from '../../../services/categories.service';
import { Category } from '../../../models/category';
import {MessageService} from 'primeng/api';
import { Clients } from 'src/app/models/clients';
import { ClientsService } from 'src/app/services/clients.service';
import { ComuniService } from 'src/app/services/comuni.service';
import { Comuni } from 'src/app/models/comuni';
import { BillingsService } from 'src/app/services/billings.service';
import { jsPDF } from "jspdf";
import { NgxSpinnerService } from "ngx-spinner";
import { Orders } from 'src/app/models/orders';
import { OrdersService } from 'src/app/services/orders.service';
import { PurchaseOrdersService } from 'src/app/services/purchase_orders.service';
import { PARAM_BILLINGS_PATH, PARAM_PURCHASE_ORDERS_PATH } from '../../constants/constants';
import { Purchase_orders } from 'src/app/models/purchase_orders';
import { Suppliers } from 'src/app/models/suppliers';
import { SuppliersService } from 'src/app/services/suppliers.service';

@Component({
  selector: "app-manage-purchase-orders",
  templateUrl: "./manage-purchase-orders.component.html",
})
export class ManagePurchaseOrdersComponent implements OnInit {

  purchaseOrders: any = [];
  purchaseOrder: Orders;

  suppliers: any = [];
  supplier: Suppliers;
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
  skills:  any[] = [];
  skillsArray: any = [];

  cols: any[];
  exportColumns: any[];
  _selectedColumns: any[];

  
  @ViewChild("content", { static: false }) content: ElementRef;
  currentUser: any;
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
  clientFilter: string;
  showDialog() {
    this.productDialog = true;
  }

  trackByFn(index, item) {
    return item.id;
  }

  constructor(
    private supplierService: SuppliersService,
    private purchaseOrdersService: PurchaseOrdersService,
    private messageService: MessageService,
    private comuniService: ComuniService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
  ) {


  }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    const userId = this.currentUser.user_id;

    


    this.spinner.show();

      this.cols = [
        { field: "category_id", header: "Cliente" },
        { field: 'client.username',  header: 'Nome Cliente'  },
        { field: "id", header: "Numero Fattura" },
      ];
      this._selectedColumns = this.cols;
      this.exportColumns = this.cols.map(col => ({
        title: col.header,
        dataKey: col.field
      }));
      this.getComuni();
      this.getSuppliers();
      this.load();
      this.spinner.hide();


   

  }




  getRequestParams(searchTitle, categoryTitle, clientTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let path = PARAM_PURCHASE_ORDERS_PATH;
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
    if (clientTitle) {
      params[`client`] = clientTitle;
      path += adder + 'client=' + clientTitle;
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
      this.clientFilter,
      this.page,
      this.pageSize
    );
    this.purchaseOrdersService.getAllListNew(params, this.currentUser.user_id).subscribe((pData) => {
      this.purchaseOrders = pData;
      this.count = this.purchaseOrdersService.size;

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
    this.clientFilter = '';

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
  
    getSuppliers() {
    const userId = this.currentUser.user_id;
    this.supplierService.getAllListbyUser().subscribe(
      (data: Suppliers) => this.suppliers = data,
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

  


edit(purchaseOrder: Purchase_orders) {
  this.purchaseOrder = { ...purchaseOrder};
  this.selectedSkills = JSON.parse("" + this.purchaseOrder.skills + "");
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
        this.purchaseOrdersService.delete(+id).subscribe(
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

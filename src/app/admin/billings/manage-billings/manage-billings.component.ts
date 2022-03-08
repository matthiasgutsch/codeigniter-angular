import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { NgxSpinnerService } from "ngx-spinner";
import { Billings } from 'src/app/models/billings';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { PARAM_BILLINGS_PATH, PARAM_CHECKINS_PATH } from '../../constants/constants';

@Component({
  selector: "app-manage-billings",
  templateUrl: "./manage-billings.component.html",
})
export class ManageBillingsComponent implements OnInit {

  billings: any = [];
  billingsAll: any = [];
  billing: Billings;
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
  filterSidebar: boolean = false;
  exportColumns: any[];
  _selectedColumns: any[];
  statuses: any[];
  @Input() exportable: boolean = true;

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

  @ViewChild("content", { static: false }) content: ElementRef;
  currentUser: any;

  showDialog() {
    this.productDialog = true;
  }

  trackByFn(index, item) {
    return item.id;
  }

  constructor(
    private clientsService: ClientsService,
    private billingsService: BillingsService,
    private messageService: MessageService,
    private comuniService: ComuniService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
  ) {

    this.statuses = [{label: 'Pagato', value: '1'},{label: 'Non Pagato', value: '0'}]

  }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    const userId = this.currentUser.user_id;

    this.spinner.show();
    this.load();

    this.cols = [
          { field: 'is_paid', header: 'Stato' },
          { field: 'client.username',  header: 'Nome Cliente'  },
          { field: 'number', header: 'Numero Fattura' },
      ];
      this._selectedColumns = this.cols;
      this.exportColumns = this.cols.map(col => ({
        title: col.header,
        dataKey: col.field
      }));
      this.getComuni();
      this.getClients();
      this.spinner.hide();
  
  }


  getRequestParams(searchTitle, categoryTitle, clientTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let path = PARAM_BILLINGS_PATH;
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
    this.billingsService.getAllListNew(params).subscribe((pData) => {
      this.billings = pData;
      this.count = this.billingsService.size;

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

  

  closeBilling(billing: Billings) {
    const formData = new FormData();
    formData.set('is_paid', '0');
      this.billingsService.billingStatus(formData, billing.id).subscribe(
        (res) => {
          this.load();
          this.messageService.add({
            key: "myKey1",
            severity: "success",
            summary: "Attenzione",
            detail: "Aggiornato con success",
          });
        },
        (error) => (this.error = error)
      );
  }

  openBilling(billing: Billings) {
    const formData = new FormData();
    formData.set('is_paid', '1');
      this.billingsService.billingStatus(formData, billing.id).subscribe(
        (res) => {
          this.load();
          this.messageService.add({
            key: "myKey1",
            severity: "success",
            summary: "Attenzione",
            detail: "Aggiornato con success",
          });
        },
        (error) => (this.error = error)
      );
  }

  exportPdf() {
    // const doc = new jsPDF();
    const doc = new jsPDF('l','pt','A4');
    doc['autoTable'](this.exportColumns, this.billings);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("Fatture_"  + new Date().toLocaleString() + ".pdf");
  }
  


edit(billing: Billings) {
  this.billing = { ...billing};
  this.selectedSkills = JSON.parse("" + this.billing.skills + "");
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
        this.billingsService.delete(+id).subscribe(
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

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
import { Billings } from 'src/app/models/billings';
import { Quotes } from 'src/app/models/quotes';
import { QuotesService } from 'src/app/services/quotes.service';
import { PARAM_BILLINGS_PATH, PARAM_QUOTES_PATH } from '../../constants/constants';

@Component({
  selector: "app-manage-quotes",
  templateUrl: "./manage-quotes.component.html",
})
export class ManageQuotesComponent implements OnInit {

  quotes: any = [];
  quote: Quotes;
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

  showDialog() {
    this.productDialog = true;
  }

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
    private quotesService: QuotesService,
    private messageService: MessageService,
    private comuniService: ComuniService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    const userId = this.currentUser.user_id;

    this.spinner.show();
      this.load();
      this.cols = [
        { field: "category_id", header: "Cliente" },
        { field: "id", header: "Numero Fattura" },
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



  getRequestParams(searchTitle, categoryTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let path = PARAM_QUOTES_PATH;
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
    this.quotesService.getAllListNew(params, this.currentUser.user_id).subscribe((pData) => {
      this.quotes = pData;
      this.count = this.quotesService.size;

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

  


edit(quote: Quotes) {
  this.quote = { ...quote};
  this.selectedSkills = JSON.parse("" + this.quote.skills + "");
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
        this.quotesService.delete(+id).subscribe(
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

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

@Component({
  selector: "app-manage-billings",
  templateUrl: "./manage-billings.component.html",
})
export class ManageBillingsComponent implements OnInit {

  billings: any = [];
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

  constructor(
    private clientsService: ClientsService,
    private billingsService: BillingsService,
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
    this.billingsService.getAllListbyUser().subscribe(data => {
      this.billings = data;
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
    });

   

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
      message: "Are you sure want to delete it = " + id,
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

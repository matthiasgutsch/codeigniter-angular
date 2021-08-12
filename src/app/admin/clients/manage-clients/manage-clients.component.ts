import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
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


@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html'
})
export class ManageClientsComponent implements OnInit {
  clients: any = [];
  client: Clients;
  categories: any = [];
  category: Category;
  error: string;
  comuni: any = [];
  cols: any[];
  exportColumns: any[];
  _selectedColumns: any[];
  
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
    private clientsService: ClientsService,
    private messageService: MessageService,
    private comuniService: ComuniService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,) {
      const doc = new jsPDF();

  }

  ngOnInit() {

    this.cols = [
      { field: "name", header: "Nome" },
      { field: "email", header: "Email" },
      { field: "date", header: "Data di nascità" }

    ];

    this._selectedColumns = this.cols;
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));


    this.clientsService.getAllList().subscribe(
      (data: Clients) => this.clients = data,
      error => this.error = error
    );


    this.comuniService.getAllList().subscribe(
      (data: Comuni) => this.comuni = data,
      error => this.error = error
    );


  }

  getCategoryItem(category_id: string, id: string) {
    return this.comuni.find(item => item.id === category_id);
  }

  edit(client: Clients) {
    this.client = { ...client };
    this.productDialog = true;
  }


  hideDialog() {
    this.productDialog = false;
  }

  exportPdf() {
    // const doc = new jsPDF();
    const doc = new jsPDF('p','pt');
    doc['autoTable'](this.exportColumns, this.clients);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("clients.pdf");
  }




  onDelete(id: number, title: string) {

    this.confirmationService.confirm({
      message: 'Are you sure want to delete',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientsService.delete(+id).subscribe(
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

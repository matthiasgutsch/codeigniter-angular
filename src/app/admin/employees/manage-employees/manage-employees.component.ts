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


@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html'
})
export class ManageEmployeesComponent implements OnInit {
  clients: any = [];
  client: Clients;
  categories: any = [];
  category: Category;
  error: string;
  comuni: any = [];
  cols: any[];
  exportColumns: any[];
  _selectedColumns: any[];
  loading: boolean;
  totalRecords: string;
  currentUser: any ;

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
    this.employeesService.getAllListbyUser().subscribe(data => {
      this.clients = data;
      this.cols = [
        { field: "name", header: "Nome" },
        { field: "surname", header: "Cognome" },

        { field: "date", header: "Data di nascità" },
        { field: "phone", header: "Cellulare" },
        { field: "city", header: "Indirizzo" }
  
      ];
      this._selectedColumns = this.cols;
      this.exportColumns = this.cols.map(col => ({
        title: col.header,
        dataKey: col.field
      }));
      this.getComuni();
      this.spinner.hide();
    });

  }


  getComuni() {
    this.comuniService.getAllList().subscribe(
      (data: Comuni) => this.comuni = data,
      error => this.error = error
    );
  }


  getCategoryItem(category_id: string, id: string) {
    return this.clients.find(item => item.id === category_id);
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
    const doc = new jsPDF('l','pt','A4');
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

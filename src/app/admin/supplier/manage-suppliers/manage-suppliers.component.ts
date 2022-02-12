import { Component, OnInit } from '@angular/core';
import { Suppliers } from '../../../models/suppliers';
import { ConfirmationService } from 'primeng/api';
import { CategoryService } from '../../../services/categories.service';
import { Category } from '../../../models/category';
import { MessageService } from 'primeng/api';
import { ComuniService } from 'src/app/services/comuni.service';
import { Comuni } from 'src/app/models/comuni';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { NgxSpinnerService } from "ngx-spinner";
import { SuppliersService } from 'src/app/services/suppliers.service';


@Component({
  selector: 'app-manage-suppliers',
  templateUrl: './manage-suppliers.component.html'
})
export class ManageSuppliersComponent implements OnInit {
  suppliers: any = [];
  supplier: Suppliers;
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
    private suppliersService: SuppliersService,
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
    this.suppliersService.getAllListbyUser().subscribe(data => {
      this.suppliers = data;
      this.cols = [
        { field: "name", header: "Nome" },

        { field: "address", header: "Indirizzo" },
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
    return this.suppliers.find(item => item.id === category_id);
  }


  edit(supplier: Suppliers) {
    this.supplier = { ...supplier };
    this.productDialog = true;
  }


  hideDialog() {
    this.productDialog = false;
  }

  exportPdf() {
    // const doc = new jsPDF();
    const doc = new jsPDF('l','pt','A4');
    doc['autoTable'](this.exportColumns, this.suppliers);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("clients.pdf");
  }




  onDelete(id: number, title: string) {

    this.confirmationService.confirm({
      message: 'Are you sure want to delete',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.suppliersService.delete(+id).subscribe(
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

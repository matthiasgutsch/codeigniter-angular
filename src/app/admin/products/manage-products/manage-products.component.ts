import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../services/appointments.service';
import { Blog } from '../../../models/blog';
import {ConfirmationService, SelectItem} from 'primeng/api';
import { CategoryService } from '../../../services/categories.service';
import { Category } from '../../../models/category';
import {MessageService} from 'primeng/api';
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
import {formatDate} from '@angular/common';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/products';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brands.service';
import { STATUS_PRODUCTS } from '../../constants/constants';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html'
})
export class ManageProductsComponent implements OnInit {
  blogs: Blog;
  blog: Blog;

  works: any = [];
  work: Works;

  locations: any = [];
  location: Locations;
  cols: any[];
  exportColumns: any[];
  _selectedColumns: any[];
  selectedWorks: any[];

  brands: any = [];
  brand: Brand;
  selectedBrands: Brand;

  products: any = [];
  product: Products;
  date: Date;
  categories: any = [];
  category: Category;
  error: string;
  private category_id: number;
  private id: number;
  clients: any = [];
  client: Clients;
  comuni: any = [];
  productDialog:boolean = false;
  works_id: any;
  status: any;
  showDialog() {
    this.productDialog = true;
}

myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en')  ;

trackByFn(index, item) {
  return item.id;
}


  constructor(
    private clientsService: ClientsService,
    private productsService: ProductsService,
    private worksService: WorksService,
    private locationsService: LocationsService, 
    private messageService: MessageService,
    private employeesService: EmployeesService,
    private comuniService: ComuniService,
    private brandService: BrandService,

    private categoryService: CategoryService, 
    private confirmationService: ConfirmationService,) { 
      this.status = STATUS_PRODUCTS;

  }

  ngOnInit() {

    this.cols = [
      { field: "title", header: "titolo" },
      { field: "code", header: "Codice" },
      { field: "status", header: "Status" },

      { field: "code_int", header: "Codice interno" },
      { field: "brand_id", header: "Brand" }

    ];

    this._selectedColumns = this.cols;
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));


    this.productsService.getAllList().subscribe(
      (data: Products) => this.products = data,
      error => this.error = error
    );


    this.categoryService.getAllList().subscribe(
      (data: Category) => this.categories = data,
      error => this.error = error
    );

    this.locationsService.getAllList().subscribe(
      (data: Locations) => this.locations = data,
      error => this.error = error
    );


    this.worksService.getAllList().subscribe(
      (data: Works) => this.works = data,
      error => this.error = error
    );


    this.brandService.getAllList().subscribe(
      (data: Brand) => this.brands = data,
      error => this.error = error
    );

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
    return this.clients.find(item => item.id === category_id);
  }



    
  getBrandItem(brand_id: string, id: string) {
    return this.brands.find(item => item.id === brand_id);
  }

  

  getLocationItem(location_id: string, id: string) {
    return this.locations.find(item => item.id === location_id);
  }



  getWorksItem(works_id: string, id: string) {
    return this.works.find(item => item.id === works_id);
  }


  getComuniItem(category_id: string, id: string) {
    return this.comuni.find(item => item.id === category_id);
  }
  
  
  view(product: Products) {
    this.product = {...this.product};
    this.productDialog = true;
}


exportPdf() {
  // const doc = new jsPDF();
  const doc = new jsPDF('l','pt','A4');
  doc['autoTable'](this.exportColumns, this.products);
  // doc.autoTable(this.exportColumns, this.products);
  doc.save("prodotti.pdf");
}


hideDialog() {
  this.productDialog = false;
}

  onDelete(id: number, title: string) {

    this.confirmationService.confirm({
      message: 'Are you sure want to delete it = ' + id,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.delete(+id).subscribe(
          res => {
            console.log(res);
            this.ngOnInit();
            this.messageService.add({key: 'myKey1', severity:'warn', summary: 'Attenzione', detail: 'Cancellazione avvenuto con successo'});

          },
          error => this.error = error
        );
      },
     
  });

   
  }

}

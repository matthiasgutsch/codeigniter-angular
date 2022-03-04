import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Projects } from 'src/app/models/projects';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brands.service';
import { STATUS_PRODUCTS } from '../../constants/constants';
import { Table } from 'primeng/table';
import { NgxSpinnerService } from "ngx-spinner";
import { TagsService } from 'src/app/services/tags.service';
import { Tags } from 'src/app/models/tags';
import { KeyValue } from '@angular/common';
import { Technical_data } from 'src/app/models/technical_data';
import { TechnicalDataService } from 'src/app/services/technical_data.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html'
})
export class ManageProjectsComponent implements OnInit {
  blogs: Blog;
  blog: Blog;

  works: any = [];
  work: Works;

  locations: any = [];
  location: Locations;
  cols: any[];
  colsData: any[];

  exportColumns: any[];
  _selectedColumns: any[];
  selectedWorks: any[];
  selectedSkills: any[];
  brands: any = [];
  brand: Brand;

  tags: any = [];
  tag: Tags;

  selectedBrands: Brand;
  loading: boolean;
  currentIndex = 1;

  productsData: any = [];
  projects: any = [];
  project: Projects;
  date: Date;
  skillsArray: any = [];
  categories: any = [];
  category: Category;
  error: string;
  private id: number;
  clients: any = [];
  client: Clients;
  productDialog:boolean = false;
  works_id: any;
  category_id: any;
  status: any;
  currentUser: any;
  technical_datas: any = [];
  technical_data: Technical_data;
  skills:  any[] = [];
  batches: any[];
  showDialog() {
    this.productDialog = true;
}

myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en')  ;

trackByFn(index, item) {
  return item.id;
}



@ViewChild("dt", { static: false }) public dt: Table;

  constructor(
    private clientsService: ClientsService,
    private projectsService: ProjectsService,
    private worksService: WorksService,
    private locationsService: LocationsService, 
    private messageService: MessageService,
    private employeesService: EmployeesService,
    private comuniService: ComuniService,
    private brandService: BrandService,
    private tagsService: TagsService,
    private technicalDataService: TechnicalDataService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService, 
    private confirmationService: ConfirmationService,) { 
      this.status = STATUS_PRODUCTS;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

  }

  ngOnInit() {
    const userId = this.currentUser.user_id;
    this.spinner.show();

    this.projectsService.getAllListbyUser().subscribe(data => {
      this.projects = data;
      this.cols = [
        { field: "title", header: "Nome Progetto" },
        { field: "status", header: "Status" },
        { field: "price", header: "Prezzo" },

      ];
      this.colsData = [
        { field: "title", header: "titolo" },
        { field: "description", header: "Codice" },
  
      ];
      this._selectedColumns = this.cols;
      this.exportColumns = this.cols.map(col => ({
        title: col.header,
        dataKey: col.field
      }));

    

      this.getTags();
      this.getCategories();
      this.getBrands();
      this.getTechnicalData();
      this.spinner.hide();

    });


  }


  getBrands() {
  this.brandService.getAllListbyUser().subscribe(
    (data: Brand) => this.brands = data,
    error => this.error = error
  );
  }


  getTechnicalData() {
  this.technicalDataService.getAllListbyUser().subscribe(
    (data: Technical_data) => (this.technical_datas = data),
    (error) => (this.error = error)
  );
  }


  getTags() {
    this.tagsService.getAllListbyUser().subscribe(
      (data: Tags) => this.tags = data,
      error => this.error = error
    );
  }

  getCategories() {

  this.categoryService.getAllListbyUser().subscribe(
    (data: Category) => this.categories = data,
    error => this.error = error
    );
  }


  clear(table: any) 
  {
    
      //  THIS DOES NOT WORK!!   Filter stops working after clearing
      table.clear();
      
	} 
    
 

  getBrandItem(brand_id: string, id: string) {
    return this.brands.find(item => item.id === brand_id);
  }

  getCategoryItem(category_id: string, id: string) {
    return this.categories.find(item => item.id === category_id);
  }


  getTechnicalDataItem(category_id: string, id: string) {
    return this.technical_datas.find(item => item.id === category_id);
  }


  getLocationItem(location_id: string, id: string) {
    return this.locations.find(item => item.id === location_id);
  }


  getTagsItem(works_id: string, id: string) {
    return this.tags.find(item => item.id === works_id);
  }

  getWorksItem(works_id: string, id: string) {
    return this.works.find(item => item.id === works_id);
  }

  
  view(project: Projects) {
    this.project = {...this.project};
    this.productDialog = true;
}



edit(project: Projects) {
  this.project = { ...project };

  
  this.productDialog = true;
}





exportPdf() {
  // const doc = new jsPDF();
  const doc = new jsPDF('l','pt','A4');
  doc['autoTable'](this.exportColumns, this.projects);
  // doc.autoTable(this.exportColumns, this.products);
  doc.save("prodotti.pdf");
}


hideDialog() {
  this.productDialog = false;
}

  onDelete(id: number, title: string) {

    this.confirmationService.confirm({
      message: 'Sei sicuro di volerlo cancellare = ' + id,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projectsService.delete(+id).subscribe(
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

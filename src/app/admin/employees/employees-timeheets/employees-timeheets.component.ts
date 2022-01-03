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
import { TimesheetsService } from 'src/app/services/timesheets.service';
import { Products } from 'src/app/models/products';
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
import { CalendarComponent } from 'ng-fullcalendar';
import 'moment/locale/it'  // without this line it didn't work
import { Timesheets } from 'src/app/models/timesheets';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-employees-timesheets',
  templateUrl: './employees-timesheets.component.html'
})


export class EmployeesTimesheetsComponent implements OnInit {
  blogs: Blog;
  blog: Blog;

  works: any = [];
  work: Works;
  calendarOptions: any;

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
  displayEvent: any;

  productsData: any = [];
  timesheets: any = [];
  timesheet: Timesheets;
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


startDate: Date;
bsValue: Date = new Date();
tues = new Date();

weekNo: number;
timesheetCountTotalEmployee: Timesheets;

employees: any = [];
employee: Employees;


@ViewChild("dt", { static: false }) public dt: Table;
@ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(
    private clientsService: ClientsService,
    private timesheetsService: TimesheetsService,
    private worksService: WorksService,
    private locationsService: LocationsService, 
    private messageService: MessageService,
    private employeesService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute,
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

    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);

    const userId = this.currentUser.user_id;
    this.spinner.show();
   

    const id = this.route.snapshot.paramMap.get("id");


    this.timesheetsService.find_timesheets_employee(+id).subscribe(data => {
      this.timesheets = data;
      this.cols = [
        { field: "title", header: "titolo" },
        { field: "code", header: "Codice" },
        { field: "status", header: "Status" },
        { field: "hours", header: "Ore" },
        { field: "code_int", header: "Codice interno" },
        { field: "brand_id", header: "Brand" }
      ];
      this.colsData = [
        { field: "title", header: "titolo" },
        { field: "description", header: "Codice" },
  
      ];

      this.timesheetsService.count_total_timesheets_employee(+id).subscribe(
        (data: Timesheets) => this.timesheetCountTotalEmployee = data,
        error => this.error = error
        );

      this._selectedColumns = this.cols;
      this.exportColumns = this.cols.map(col => ({
        title: col.header,
        dataKey: col.field
      }));

      this.spinner.hide();


      this.employees = {
        id:this.route.snapshot.params['id'],
      }
  
      this.employeesService.getId(this.employees.id).subscribe(value => {
        this.employee = value;
  
  
  
      });

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

  clickButton(model: any) {
    this.displayEvent = model;

  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        title: model.event.title,
        works_id: model.event.works_id.split(','),
        location_id: model.event.location_id,
        employee_id: model.event.employee_id,
        allDay: model.event.allDay,
        description: model.event.description,
        category_id: model.event.category_id

        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
    this.productDialog = true;

  }

  dayClick(event) {
    console.log('dayClick', event);
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

  
  view(timesheet: Timesheets) {
    this.timesheet = {...this.timesheet};
    this.productDialog = true;
}



edit(timesheet: Timesheets) {
  this.timesheet = { ...timesheet };
  
  this.selectedSkills = JSON.parse("" + this.timesheet.skills + "");

  
  this.productDialog = true;
}





exportPdf() {
  // const doc = new jsPDF();
  const doc = new jsPDF('l','pt','A4');
  doc['autoTable'](this.exportColumns, this.timesheets);
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
        this.timesheetsService.delete(+id).subscribe(
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

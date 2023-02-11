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
import { PARAM_CHECKINS_PATH, PARAM_PROJECTS_TIMESHEET_PATH, STATUS_PRODUCTS } from '../../constants/constants';
import { Table } from 'primeng/table';
import { NgxSpinnerService } from "ngx-spinner";
import { TagsService } from 'src/app/services/tags.service';
import { Tags } from 'src/app/models/tags';
import { KeyValue } from '@angular/common';
import { Technical_data } from 'src/app/models/technical_data';
import { TechnicalDataService } from 'src/app/services/technical_data.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import 'moment/locale/it'  // without this line it didn't work
import { Timesheets } from 'src/app/models/timesheets';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { Projects } from 'src/app/models/projects';

@Component({
  selector: 'app-projects-timesheets',
  templateUrl: './projects-timesheets.component.html'
})
export class ProjectsTimesheetsComponent implements OnInit {
  blogs: Blog;
  blog: Blog;

  works: any = [];
  work: Works;
  calendarOptions: any;

  locations: any = [];
  location: Locations;
  cols: any[];
  colsData: any[];
  employee: Employees;
  employees: any = [];
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

projects: any = [];
project: Projects;


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


@ViewChild("dt", { static: false }) public dt: Table;
@ViewChild(FullCalendarComponent) ucCalendar: FullCalendarComponent;

  constructor(
    private clientsService: ClientsService,
    private timesheetsService: TimesheetsService,
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
    private router: Router,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,) {
      this.status = STATUS_PRODUCTS;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

  }

  ngOnInit() {

    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);

    const userId = this.currentUser.id;


    this.basePath = window.location.pathname;
    if (this.route.snapshot.queryParamMap.has('page')) {
      this.page = +this.route.snapshot.queryParamMap.get('page');
    }
    if (this.route.snapshot.queryParamMap.has('size')) {
      this.pageSize = +this.route.snapshot.queryParamMap.get('size');
    }
    if (this.route.snapshot.queryParamMap.has('name')) {
      this.nameFilter = this.route.snapshot.queryParamMap.get('name');
    }
    if (this.route.snapshot.queryParamMap.has('description')) {
      this.descriptionFilter = this.route.snapshot.queryParamMap.get('description');
    }


    const id = this.route.snapshot.paramMap.get("id");
    this.projectsService.getId(+id).subscribe((res) => {
      this.project = res;
      this.load();

    });



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
          table.clear();
	}




  public handlePageChange(event): void {
    this.page = event;
    this.load();

  }

    public selectionItemForFilter(e) {
      const colsTempor = e.value;
      colsTempor.sort(function (a, b) {
        return a.index - b.index;
      });
      this.cols = [];
      this.cols = colsTempor;
      if (e.value.length > 10) {
        e.value.pop();
      }
    }

  getRequestParams(searchTitle, categoryTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let path = '/admin/projects/timesheets/' + this.project.id;
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
    this.timesheetsService.getAllTimesheetsbyProject(params, this.project.id).subscribe((pData) => {
      this.timesheets = pData;
      this.count = this.timesheetsService.size;

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

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

  private onChange(item: string): void {
    this.load();

  }


  getEmployees() {
    this.employeesService.getAllListbyUser().subscribe(
      (data: Employees) => (this.employees = data),
      (error) => (this.error = error)
    )
  };

  getBrandItem(brand_id: string, id: string) {
    return this.brands.find(item => item.id === brand_id);
  }

  getCategoryItem(category_id: string, id: string) {
    return this.categories.find(item => item.id === category_id);
  }


  getTechnicalDataItem(employee_id: string) {
    return this.employees.find(item => item.id === employee_id);
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
    this.timesheet = { ...timesheet };
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
      message: 'Sei sicuro di volerlo cancellare = ' + id,
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

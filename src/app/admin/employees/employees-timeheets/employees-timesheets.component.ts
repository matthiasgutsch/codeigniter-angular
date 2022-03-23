import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentsService } from '../../../services/appointments.service';
import { Blog } from '../../../models/blog';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { CategoryService } from '../../../services/categories.service';
import { Category } from '../../../models/category';
import { MessageService } from 'primeng/api';
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
import { formatDate } from '@angular/common';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { TimesheetsService } from 'src/app/services/timesheets.service';
import { Products } from 'src/app/models/products';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brands.service';
import { STATUS_PRODUCTS, TIMESHEETS_TYPE } from '../../constants/constants';
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
import { ProjectsService } from 'src/app/services/projects.service';
import { Projects } from 'src/app/models/projects';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';


@Component({
  selector: 'app-employees-timesheets',
  templateUrl: './employees-timesheets.component.html'
})


export class EmployeesTimesheetsComponent implements OnInit {
  blogs: Blog;
  blog: Blog;
  error: string;
  uploadError: string;
  works: any = [];
  work: Works;
  calendarOptions: any;
  blogForm: FormGroup;
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
  pageTitle: string;
  selectedBrands: Brand;
  loading: boolean;
  currentIndex = 1;
  displayEvent: any;
  timesheets_type: any;
  productsData: any = [];
  timesheets: any = [];
  timesheet: Timesheets;
  date: Date;
  skillsArray: any = [];
  categories: any = [];
  category: Category;
  private id: number;
  clients: any = [];
  client: Clients;
  productDialog: boolean = false;
  productDialogAdd: boolean = false;
  works_id: any;
  category_id: any;
  status: any;
  currentUser: any;
  technical_datas: any = [];
  technical_data: Technical_data;
  skills: any[] = [];
  batches: any[];
  projects: any = [];
  project: Projects;
  vacationsCount: any;
  permissionsCount: any;
  showDialog() {
    this.productDialog = true;
  }

  myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
  trackByFn(index, item) {
    return item.id;
  }
  selectedTimesheetsType = '1';
  startDate: Date;
  bsValue: Date = new Date();
  tues = new Date();
  weekNo: number;
  timesheetCountTotalEmployee: Timesheets;
  employees: any = [];
  employee: Employees;
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
  employeeFilter: string;

  @ViewChild("dt", { static: false }) public dt: Table;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(
    private clientsService: ClientsService,
    private timesheetsService: TimesheetsService,
    private projectsService: ProjectsService,
    private locationsService: LocationsService,
    private messageService: MessageService,
    private fb: FormBuilder,
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
    this.timesheets_type = TIMESHEETS_TYPE;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

  }

  ngOnInit() {

    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);

    const userId = this.currentUser.user_id;
    this.spinner.show();


    const id = this.route.snapshot.paramMap.get("id");


    this.employees = {
      id: this.route.snapshot.params['id'],
    }

    this.employeesService.getId(this.employees.id).subscribe(value => {
      this.employee = value;
    });

    this.load();

    this.cols = [
      { field: "date_from", header: "Da" },
      { field: "date_from", header: "A" },
      { field: "hours", header: "Ore" },
      { field: "project_id", header: "Progetto" },
    ];
    this._selectedColumns = this.cols;
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));


    this.projectsService.getAllListbyUser().subscribe(data => {
      this.projects = data;
    });


    this.getVacationsCountEmployee(+id);
    this.getPermissionsCountEmployee(+id);
    this.spinner.hide();

  }


  getRequestParams(searchTitle, categoryTitle, employeeTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let path = '/admin/employee/timesheets/' + this.employees.id;
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

    if (employeeTitle) {
      params[`project_id`] = employeeTitle;
      path += adder + 'project_id=' + employeeTitle;
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
      this.employeeFilter,
      this.page,
      this.pageSize
    );
    this.timesheetsService.find_timesheets_employee(params, this.employees.id).subscribe((pData) => {
      this.timesheets = pData;
      this.count = this.timesheetsService.size;

      this.timesheetsService.count_total_timesheets_employee(this.employees.id).subscribe(
        (data: Timesheets) => this.timesheetCountTotalEmployee = data,
        error => this.error = error
      );

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
    this.employeeFilter = '';

    this.load();
    
  }
  
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

  private onChange(item: string): void {
    this.load();

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
  

  createTimesheets(employee: Employees) {
    this.productDialogAdd = true;



    this.blogForm = this.fb.group({
      id: [""],
      timesheets_type: ["", Validators.required],
      date_from: ["", Validators.required],
      date_to: ["", Validators.required],
      project_id: ["", Validators.required],
      hours: ["", Validators.required],
      hours_extra: ["", Validators.required],
      employee_id: [this.employee.id],
      user_id: [this.currentUser.user_id],
    });


  }



  getVacationsCountEmployee(id) {
    const userId = this.currentUser.user_id;
    this.timesheetsService.count_total_vacations_timesheets_employee(id).subscribe(
      (data: Timesheets) => this.vacationsCount = data,
      error => this.error = error
    );
  }

  getPermissionsCountEmployee(id) {
    const userId = this.currentUser.user_id;
    this.timesheetsService.count_total_permissions_timesheets_employee(id).subscribe(
      (data: Timesheets) => this.permissionsCount = data,
      error => this.error = error
    );
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


  clear(table: any) {

    //  THIS DOES NOT WORK!!   Filter stops working after clearing
    table.clear();

  }



  getBrandItem(brand_id: string, id: string) {
    return this.brands.find(item => item.id === brand_id);
  }

  getProjectItem(project_id: string, id: string) {
    return this.projects.find(item => item.id === project_id);
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




  editItem(timesheet: Timesheets) {
    this.timesheet = { ...timesheet };
    const id = timesheet.id;

    if (id) {
      this.pageTitle = "Modifica Timesheet";
      this.timesheetsService.getId(+id).subscribe((res) => {
        this.blogForm.patchValue({
          timesheets_type: res.timesheets_type,
          date_from: res.date_from,
          date_to: res.date_to,
          project_id: res.project_id,
          hours: res.hours,
          employee_id: res.employee_id,
          hours_extra: res.hours_extra,
          user_id: this.currentUser.user_id,
          id: res.id,
        });

      });
    } else {

    }

    this.blogForm = this.fb.group({
      id: [""],
      timesheets_type: ["", Validators.required],
      date_from: ["", Validators.required],
      date_to: ["", Validators.required],
      project_id: ["", Validators.required],
      hours: ["", Validators.required],
      hours_extra: ["", Validators.required],
      employee_id: [this.employee.id],
      user_id: [this.currentUser.user_id],
    });

    this.productDialogAdd = true;
  }



  view(timesheet: Timesheets) {
    this.timesheet = { ...timesheet };

    this.productDialog = true;
  }



  exportPdf() {
    // const doc = new jsPDF();
    const doc = new jsPDF('l', 'pt', 'A4');
    doc['autoTable'](this.exportColumns, this.timesheets);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save('timesheet-' + this.employee.name + '-' + this.employee.surname + '.pdf');
  }


  hideDialog() {
    this.productDialog = false;
  }



  onSubmit() {
    const formData = new FormData();

    formData.append("timesheets_type", this.blogForm.get("timesheets_type").value);
    formData.append("date_from", this.blogForm.get("date_from").value);
    formData.append("date_to", this.blogForm.get("date_to").value);
    formData.append('user_id', this.blogForm.get('user_id').value);
    formData.append("project_id", this.blogForm.get("project_id").value);
    formData.append("hours", this.blogForm.get("hours").value);
    formData.append("hours_extra", this.blogForm.get("hours_extra").value);
    formData.append('employee_id', this.blogForm.get('employee_id').value);



    const id = this.blogForm.get("id").value;

    if (id) {
      this.timesheetsService.update(formData, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Salvato con sucesso' });
            this.productDialogAdd = false;
            this.load();
            this.getVacationsCountEmployee(this.employee.id);
            this.getPermissionsCountEmployee(this.employee.id);
          }
        },
        (error) => (this.error = error)
      );
    } else {
      this.timesheetsService.create(formData).subscribe(
        (res) => {
          if (res.status === "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Salvato con sucesso' });
            this.productDialogAdd = false;
            this.load();
            this.getVacationsCountEmployee(+id);
            this.getPermissionsCountEmployee(+id);
          }
        },
        (error) => (this.error = error)
      );
    }

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
            this.messageService.add({ key: 'myKey1', severity: 'warn', summary: 'Attenzione', detail: 'Cancellazione avvenuto con successo' });
            this.load();
          },
          error => this.error = error
        );
      },

    });


  }

}

import { Component, ElementRef, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../services/appointments.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Chart } from "chart.js";

import { Blog } from '../../../models/blog';
import { Category } from '../../../models/category';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../../services/categories.service';
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import * as moment from 'moment';
import { TYPE_LIST, STATUS_PRODUCTS, STATE_LIST } from '../../constants/constants';
import { Clients } from 'src/app/models/clients';
import { ClientsService } from 'src/app/services/clients.service';
import { Location } from '@angular/common';
import { WorksService } from 'src/app/services/works.service';
import { Works } from 'src/app/models/works';
import { EmployeesService } from 'src/app/services/employees.service';
import { Employees } from 'src/app/models/employees';
import { Locations } from 'src/app/models/locations';
import { LocationsService } from 'src/app/services/locations.service';
import { Appointments } from 'src/app/models/appointments';
import { SumPipe } from '../../pipe/sum.pipe';
import { ProductsService } from 'src/app/services/products.service';
import { Projects } from 'src/app/models/projects';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brands.service';
import { SkillsService } from 'src/app/services/skills.service';
import { map, tap } from 'rxjs/operators';
import { Technical_data } from 'src/app/models/technical_data';
import { TechnicalDataService } from 'src/app/services/technical_data.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { Timesheets } from 'src/app/models/timesheets';
import { TimesheetsService } from 'src/app/services/timesheets.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ChartsService } from 'src/app/services/charts.service';
import { Charts } from 'src/app/models/charts';

export interface fPairs {
  qty: number,
  price: number,
}

@Component({
  selector: "app-projects-productivity",
  templateUrl: "./projects-productivity.component.html",
})



export class ProjectsProductivityComponent implements OnInit {

  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;


  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  blogs: Blog;
  blog: Blog;
  id: number;
  price: any;
  appointments: Appointments;
  appointment: any;

  categories: any = [];
  category: Category;

  works: any = [];
  work: Works;

  checked: boolean = true;
  selectedValue: string;
  products: any = [];
  product: Projects;
  blogForm: FormGroup;
  typeList: any[];
  status: any[];
  stateOptions: any[];

  clients: any = [];
  client: Clients;
  brands: any = [];

  employee: Employees;
  employees: any = [];
  arrString: string;

  timesheetsEmployee: any = [];
  brand: Brand;
  technical_datas: any = [];
  technical_data: Technical_data;

  tags: any = [];


  description: any;
  selectedWorks: SelectItem[] = [];
  selectedSkills: SelectItem[] = [];
  selectedWorks2: SelectItem[];
  selectedCategories: SelectItem[] = [];

  locations: any = [];
  location: Locations;
  total: number;

  cities: Blog[];
  format1: string = "";
  format2: string = "";
  selectedCity: Blog;
  selectedClients: SelectItem[];
  yAxes: [];
  xAxes: [];
  selectedDate: Date;
  date: Date;
  works_id: any;
  category_id: any;
  public dataValues: object;
  pages: any;
  currentUser: any;
  fPairs: any;
  addForm: FormGroup;
  rows: FormArray;
  itemForm: FormGroup;
  skillsForm: FormGroup;
  skillsValues: any = [];
  data1 = [];
  project_id: string;
  chartsCount: any;
  chartsCountNone: any;
  chartsCountData: any = [];
  projects: any = [];
  project: Projects;
  dataChart: any = [];
  canvas: any;
  ctx: any;
  dataChart1: any;
  trackByFn(index, item) {
    return item.id;
  }



  constructor(
    private fb: FormBuilder,
    private timesheetsService: TimesheetsService,
    private technicalDataService: TechnicalDataService,
    private messageService: MessageService,
    private clientsService: ClientsService,
    private employeesService: EmployeesService,
    private _location: Location,
    private projectsService: ProjectsService,
    private skillsService: SkillsService,
    private brandsService: BrandService,
    private worksService: WorksService,
    private chartsService: ChartsService,

    private categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }
    this.typeList = TYPE_LIST;
    this.status = STATUS_PRODUCTS;
    this.stateOptions = STATE_LIST;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

  }


  @ViewChild("mychart") mychart;


  ngOnInit() {
    const userId = this.currentUser.user_id;


    this.spinner.show();

    const id = this.route.snapshot.paramMap.get("id");


    this.getChartsCount(id);

    this.projectsService.getId(+id).subscribe((res) => {

      this.project = res;
      this.id = res.id;
      this.price = res.price;
      this.getTotalPercent(this.price);
      this.getEmployees();
      this.getTimesheet_by_project_employee(id);
      this.getTotal();
      this.getTotalPercent;

    });


      this.spinner.hide();


  }



  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext("2d");

    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        label: '(dist: linear)',
        datasets: [{
          label: '',
          data: [{"x":"2022-01-05 00:00","y":"6.00"},{"x":"2022-01-09 00:00","y":"9.00"},{"x":"2022-01-10 00:00","y":"37.00"},{"x":"2022-01-11 00:00","y":"12.00"},{"x":"2022-01-12 00:00","y":"36.00"},{"x":"2022-01-17 00:00","y":"16.00"},{"x":"2022-01-19 00:00","y":"15.00"},{"x":"2022-02-25 00:00","y":"6.00"},{"x":"2022-03-09 00:00","y":"24.00"}],
          lineTension: 0,
          backgroundColor: 'rgba(60, 160, 220, 0.3)',
          borderColor: 'rgba(60, 160, 220, 0.8)'
        }]
      },
      options: {
        title: {
          display: false,
          text: 'Angular & Chart.js'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                'millisecond': 'MMM DD',
                'second': 'MMM DD',
                'minute': 'MMM DD',
                'hour': 'MMM DD',
                'day': 'MMM DD',
                'week': 'MMM DD',
                'month': 'MMM DD',
                'quarter': 'MMM DD',
                'year': 'MMM DD',
              }
            },
            distribution: 'linear',
            scaleLabel: {
              labelString: 'Giornate',
              display: true,
            },
            ticks: {
              source: 'auto'
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              labelString: 'Ore di lavoro',
              display: true,
            }
          }]
        }
      }
    });
  }


  getTimesheet_by_project_employee(id) {
    this.timesheetsService.timesheet_by_project_employee(+id).subscribe(
      (data: Timesheets) => (this.timesheetsEmployee = data),
      (error) => (this.error = error)
    )
  };


  getChartsCount(id) {

    this.projectsService.get_projects_timesheets_chart(+id).subscribe(data => {
      this.chartsCount = data;
      var StringifyData = JSON.stringify(this.chartsCount)
      this.chartsCount.forEach((item, index) => {
        var obj;
        obj = {
          x: item.x,
          y: item.y,
        }
        this.data1.push(obj)
      });

      error => this.error = error
    });
  }


  getTotal() {
    let total = 0;
    this.timesheetsEmployee.forEach((item) => {
      total += Number(item.value * this.getTechnicalDataItem(item.id)?.contract);
    });

    return total;
  }

  getTotalPercent(price: any) {
    let total = 0;
    this.timesheetsEmployee.forEach((item) => {
      total += Number(item.value * this.getTechnicalDataItem(item.id)?.contract);
    });

    return total / this.price * 100;

  }


  getTotalHours() {
    let total = 0;
    this.timesheetsEmployee.forEach((item) => {
      total += Number(item.value);
    });

    return total;
  }

  public locationsSum() {
    return this.timesheetsEmployee.map(data => data.id).reduce((a, b) => a + b);
  }



  getTechnicalDataItem(employee_id: string) {
    return this.employees.find(item => item.id === employee_id);
  }



  getTechnicalDatas() {
    this.technicalDataService.getAllListbyUser().subscribe(
      (data: Technical_data) => (this.technical_datas = data),
      (error) => (this.error = error)
    )
  };

  getBrands() {
    this.brandsService.getAllListbyUser().subscribe(
      (data: Brand) => (this.brands = data),
      (error) => (this.error = error)
    )
  };


  getWorks() {
    this.worksService.getAllListbyUser().subscribe(
      (data: Works) => (this.works = data),
      (error) => (this.error = error)
    )
  };

  getEmployees() {
    this.employeesService.getAllListbyUser().subscribe(
      (data: Employees) => (this.employees = data),
      (error) => (this.error = error)
    )
  };

  getCategoryItem(category_id: string, id: string) {
    return this.categories.find((item) => item.id === category_id);
  }


  getselectedCategories() {
    this.selectedCategories = this.category_id.split(',');
  }

  goback() {
    this._location.back();
  }


}

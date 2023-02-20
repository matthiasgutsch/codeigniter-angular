import { Location } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Chart, Scale } from "chart.js";
import { NgxSpinnerService } from "ngx-spinner";
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { Subscription } from "rxjs";
import { Appointments } from "src/app/models/appointments";
import { Brand } from "src/app/models/brand";
import { Clients } from "src/app/models/clients";
import { Employees } from "src/app/models/employees";
import { Locations } from "src/app/models/locations";
import { Projects } from "src/app/models/projects";
import { Technical_data } from "src/app/models/technical_data";
import { Timesheets } from "src/app/models/timesheets";
import { Works } from "src/app/models/works";
import { BrandService } from "src/app/services/brands.service";
import { ChartsService } from "src/app/services/charts.service";
import { ClientsService } from "src/app/services/clients.service";
import { EmployeesService } from "src/app/services/employees.service";
import { ProjectsService } from "src/app/services/projects.service";
import { SkillsService } from "src/app/services/skills.service";
import { TechnicalDataService } from "src/app/services/technical_data.service";
import { TimesheetsService } from "src/app/services/timesheets.service";
import { WorksService } from "src/app/services/works.service";
import { Blog } from "../../../models/blog";
import { Category } from "../../../models/category";
import { CategoryService } from "../../../services/categories.service";
import {
  STATE_LIST,
  STATUS_PRODUCTS,
  TYPE_LIST,
} from "../../constants/constants";

export interface fPairs {
  qty: number;
  price: number;
}

@Component({
  selector: "app-projects-productivity",
  templateUrl: "./projects-productivity.component.html",
})
export class ProjectsProductivityComponent implements OnInit {
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;

  @ViewChild("mychart") mychart;
  @ViewChild("canvas") canvasEl: ElementRef;

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
  blogForm: UntypedFormGroup;
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
  addForm: UntypedFormGroup;
  rows: UntypedFormArray;
  itemForm: UntypedFormGroup;
  skillsForm: UntypedFormGroup;
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
  subscription: Subscription;
  value: number;
  chart: [];
  totalPrice: number;

  constructor(
    private fb: UntypedFormBuilder,
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
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
    this.value = this.totalPrice;
  }

  ngOnInit() {
    const userId = this.currentUser.id;

    const id = this.route.snapshot.paramMap.get("id");

    this.projectsService.getId(+id).subscribe((res) => {
      this.spinner.show();

      this.project = res;
      this.id = res.id;
      this.price = res.price;
      this.getTotalPercent();
      this.getEmployees();
      this.getTimesheet_by_project_employee(id);
      this.getTotal();
      this.getTotalPercent;
      this.getChartsCount(id);

      this.spinner.hide();
    });
  }

  chartCanvas() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    let myChart = new Chart(this.ctx, {
      type: "bar",
      data: {
        labels: ["(dist: linear)"],
        datasets: [
          {
            label: "",
            data: this.data1,
            // lineTension: 0,
            backgroundColor: "rgba(65, 111, 244, 0.7)",
            borderColor: "rgba(65, 111, 244, 0.8)",
          },
        ],
      },
      options: {
        events: [],
        responsive: true,


        // legend: {
        //   labels: {
        //     boxWidth: 0,
        //   },
        // },
        maintainAspectRatio: true,

        scales: {
          xAxes:
            {
              grid: {
                offset: true,
                drawOnChartArea: true,
              },
              type: "timeseries",
              time: {
                tooltipFormat: "DD/MM/YY",
                unit: "month",
                displayFormats: { month: "MM/YY" },
              },
              // distribution: "left",
              title: {
                text: "Mese",
                display: true,
              },
            },

          yAxes:
            {
              beginAtZero: true,
              title: {
                text: "Ore di lavoro",
                display: true,
              },
            },

        },
      },
    });
    myChart.update();
  }

  getTimesheet_by_project_employee(id) {
    this.timesheetsService.timesheet_by_project_employee(+id).subscribe(
      (data: Timesheets) => (this.timesheetsEmployee = data),
      (error) => (this.error = error)
    );
  }

  getChartsCount(id) {
    this.projectsService
      .get_projects_timesheets_chart(+id)
      .subscribe((data) => {
        this.chartsCount = data;
        var StringifyData = JSON.stringify(this.chartsCount);
        this.chartsCount.forEach((item, index) => {
          var obj;
          obj = {
            x: item.x,
            y: item.y,
          };
          this.data1.push(obj);
          this.chartCanvas();
        });

        (error) => (this.error = error);
      });
  }

  getTotal() {
    let total = 0;
    this.timesheetsEmployee.forEach((item) => {
      total += Number(
        item.value * this.getTechnicalDataItem(item.id)?.contract
      );
    });

    return total;
  }

  getTotalPercent() {
    let total = 0;
    this.timesheetsEmployee.forEach((item) => {
      total += Number(
        item.value * this.getTechnicalDataItem(item.id)?.contract
      );
    });
    return (this.totalPrice = this.numberRoundDecimal(
      (total / this.price) * 100,
      0
    ));
  }

  getTotalHours() {
    let total = 0;
    this.timesheetsEmployee.forEach((item) => {
      total += Number(item.value);
    });

    return total;
  }

  numberRoundDecimal(v, n) {
    return Math.round((v + Number.EPSILON) * Math.pow(10, n)) / Math.pow(10, n);
  }

  public locationsSum() {
    return this.timesheetsEmployee
      .map((data) => data.id)
      .reduce((a, b) => a + b);
  }

  getTechnicalDataItem(employee_id: string) {
    return this.employees.find((item) => item.id === employee_id);
  }

  getTechnicalDatas() {
    this.technicalDataService.getAllListbyUser().subscribe(
      (data: Technical_data) => (this.technical_datas = data),
      (error) => (this.error = error)
    );
  }

  getBrands() {
    this.brandsService.getAllListbyUser().subscribe(
      (data: Brand) => (this.brands = data),
      (error) => (this.error = error)
    );
  }

  getWorks() {
    this.worksService.getAllListbyUser().subscribe(
      (data: Works) => (this.works = data),
      (error) => (this.error = error)
    );
  }

  getEmployees() {
    this.employeesService.getAllListbyUser().subscribe(
      (data: Employees) => (this.employees = data),
      (error) => (this.error = error)
    );
  }

  getCategoryItem(category_id: string, id: string) {
    return this.categories.find((item) => item.id === category_id);
  }

  getselectedCategories() {
    this.selectedCategories = this.category_id.split(",");
  }

  goback() {
    this._location.back();
  }
}

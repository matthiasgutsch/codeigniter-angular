import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { NgxSpinnerService } from "ngx-spinner";
import { ConfirmationService, MessageService } from "primeng/api";
import { Appointments } from "src/app/models/appointments";
import { Clients } from "src/app/models/clients";
import { Locations } from "src/app/models/locations";
import { Supports } from "src/app/models/supports";
import { Works } from "src/app/models/works";
import { ClientsService } from "src/app/services/clients.service";
import { ComuniService } from "src/app/services/comuni.service";
import { EmployeesService } from "src/app/services/employees.service";
import { LocationsService } from "src/app/services/locations.service";
import { SupportsService } from "src/app/services/supports.service";
import { WorksService } from "src/app/services/works.service";
import { Category } from "../../../models/category";
import { CategoryService } from "../../../services/categories.service";
import { PARAM_SUPPORTS_PATH } from "../../constants/constants";
import { Comuni } from "src/app/models/comuni";

@Component({
  selector: "app-manage-supports",
  templateUrl: "./manage-supports.component.html",
})
export class ManageSupportsComponent implements OnInit {
  filterSidebar: boolean;
  supports: any = [];
  support: Supports;

  works: Works[] = [];
  work: Works;

  locations: Locations[] = [];
  location: Locations;
  cols: any[];
  exportColumns: any[];
  _selectedColumns: any[];
  selectedWorks: any[];

  appointments: any = [];
  appointment: Appointments;
  date: Date;
  categories: any = [];
  category: Category;
  error: string;
  private category_id: number;
  private id: number;
  clients: Clients[] = [];
  client: Clients;
  comuni: Comuni[] = [];
  productDialog: boolean = false;
  works_id: any;
  currentUser: any;
  showDialog() {
    this.productDialog = true;
  }

  myDate = formatDate(new Date(), "dd/MM/yyyy", "en");

  trackByFn(index, item) {
    return item.id;
  }

  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 10;
  pageSizes = [5, 10, 15];
  public base_path: string;
  basePath: string;
  pageOfItems: Array<any>;
  searchWrapper: boolean = false;
  nameFilter: string;
  descriptionFilter: string;

  constructor(
    private clientsService: ClientsService,
    private supportsService: SupportsService,
    private worksService: WorksService,
    private locationsService: LocationsService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private employeesService: EmployeesService,
    private comuniService: ComuniService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService
  ) {
    this.cols = [
      { field: "date", header: "Data" },
      { field: "title", header: "titolo" },
      { field: "category_id", header: "Cliente" },
    ];

    this._selectedColumns = this.cols;
    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  ngOnInit() {
    this.load();
  }

  getRequestParams(searchTitle, categoryTitle, page, pageSize): any {
    const path = PARAM_SUPPORTS_PATH;
    const qParmas = new URLSearchParams();
    if (page) {
      qParmas.set("page", page);
    }
    if (searchTitle) {
      qParmas.set("created_at_gte", searchTitle);
    }
    if (categoryTitle) {
      qParmas.set("created_at_lte", categoryTitle);
    }

    if (pageSize) {
      qParmas.set("size", pageSize);
    }
    window.history.replaceState({}, "", `${path}?${qParmas.toString()}`);

    return Object.fromEntries(qParmas as any);
  }

  load(): void {
    const params = this.getRequestParams(
      this.nameFilter,
      this.descriptionFilter,
      this.currentPage,
      this.itemsPerPage
    );
    this.supportsService.getAllListPaginated(params).subscribe((pData) => {
      this.supports = pData.data;
      this.totalItems = pData.meta.totalItems;
      this.itemsPerPage = pData.meta.itemsPerPage;
      // this.currentPage = pData.meta.currentPage;
    });
  }

  handlePageSizeChange(event): void {
    this.itemsPerPage = event.target.value;
    this.currentPage = 1;
    this.load();
  }

  reset(): void {
    this.nameFilter = "";
    this.descriptionFilter = "";
    this.load();
  }

  public handlePageChange(event): void {
    this.currentPage = event;
    this.load();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  private onChange(item: string): void {
    this.load();
  }

  getCategoryItem(category_id: string, id: string) {
    return this.clients.find((item) => item.id.toString() === category_id);
  }

  getClients() {
    this.clientsService.getAllList().subscribe(
      (data) => (this.clients = data),
      (error) => (this.error = error)
    );
  }

  getWorks() {
    this.worksService.getAllList().subscribe(
      (data) => (this.works = data),
      (error) => (this.error = error)
    );
  }

  getLocations() {
    this.locationsService.getAllList().subscribe(
      (data) => (this.locations = data),
      (error) => (this.error = error)
    );
  }

  editProduct(appointment: Appointments) {
    this.appointment = { ...appointment };
    this.selectedWorks = this.appointment.works_id.split(",");
    this.productDialog = true;
  }

  exportPdf() {
    // const doc = new jsPDF();
    const doc = new jsPDF("l", "pt", "A4");
    doc["autoTable"](this.exportColumns, this.appointments);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("appointments.pdf");
  }

  hideDialog() {
    this.productDialog = false;
  }

  onDelete(id: number, title: string) {
    this.confirmationService.confirm({
      message: "Sei sicuro di volerlo cancellare = " + id,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.supportsService.delete(+id).subscribe(
          (res) => {
            this.ngOnInit();
            this.messageService.add({
              key: "myKey1",
              severity: "warn",
              summary: "Attenzione",
              detail: "Cancellazione avvenuto con successo",
            });
          },
          (error) => (this.error = error)
        );
      },
    });
  }
}

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
import { NgxSpinnerService } from "ngx-spinner";
import { Appointment_type } from 'src/app/models/appointment_type';
import { AppointmentTypeService } from 'src/app/services/appointment_type.service';
import { CalendarComponent } from 'ng-fullcalendar';

@Component({
  selector: 'app-manage-appointments',
  templateUrl: './manage-appointments.component.html'
})
export class ManageAppointmentsComponent implements OnInit {
  blogs: Blog;
  blog: Blog;

  works: any = [];
  work: Works;
  events: any;

  locations: any = [];
  location: Locations;
  cols: any[];
  exportColumns: any[];
  _selectedColumns: any[];
  selectedWorks: any[];
  calendarOptions: any;
  displayEvent: any;

  employees: any = [];
  employee: Employees;
  Symbols_Array: any = [];
  appointments: any = [];
  appointment: Appointments;
  date: Date;
  categories: any = [];
  category: Category;
  error: string;
  private category_id: number;
  private id: number;
  clients: any = [];
  client: Clients;
  appointmenttype: any = [];
  appointment_typ: Appointment_type;
  comuni: any = [];
  productDialog: boolean = false;
  calendarDialog: boolean = false;

  works_id: any;
  showDialog() {
    this.productDialog = true;
  }
  currentUser: any;

  myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');

  trackByFn(index, item) {
    return item.id;
  }

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(
    private clientsService: ClientsService,
    private appointmentsService: AppointmentsService,
    private worksService: WorksService,
    private locationsService: LocationsService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private employeesService: EmployeesService,
    private comuniService: ComuniService,
    private appointmentTypeService: AppointmentTypeService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,) {


    this.cols = [
      { field: "date", header: "Data" },
      { field: "title", header: "titolo" },
      { field: "category_id", header: "Cliente" }

    ];

    this._selectedColumns = this.cols;
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    
  }

  ngOnInit() {


    this.spinner.show();
    const userId = this.currentUser.user_id;
    this.appointmentsService.getAllListbyUser().subscribe(data => {
      
      
      this.appointments = data;
      this.getClients();
      this.getWorks();
      this.getAppointmentType();


      this.calendarOptions = {

        editable: false,
        eventLimit: false,
        timeFormat: 'HH:mm',
        weekNumbers: true,
        header: {
          right: 'prev,next',
          left: 'title',

        },

        events: data,
        locale: 'it',
        timezone: 'UTC',
        selectable: false,
      };


      
      this.spinner.hide();


    });
  }





  getClients() {
    const userId = this.currentUser.user_id;
    this.clientsService.getAllListbyUser().subscribe(
      (data: Clients) => this.clients = data,
      error => this.error = error
    );

  }

  getEmployees() {
    const userId = this.currentUser.user_id;
    this.employeesService.getAllList().subscribe(
      (data: Employees) => this.employees = data,
      error => this.error = error
    );
  }

  getWorks() {
    this.worksService.getAllListbyUser().subscribe(
      (data: Works) => this.works = data,
      error => this.error = error
    );
  }

  getLocations() {
    const userId = this.currentUser.user_id;
    this.locationsService.getAllList().subscribe(
      (data: Locations) => this.locations = data,
      error => this.error = error
    );
  }

  getComuni() {
    const userId = this.currentUser.user_id;
    this.comuniService.getAllList().subscribe(
      (data: Comuni) => this.comuni = data,
      error => this.error = error
    );
  }

  getCategories() {
    const userId = this.currentUser.user_id;
    this.categoryService.getAllList().subscribe(
      (data: Category) => this.categories = data,
      error => this.error = error
    );
  }

  getAppointmentType() {
    this.appointmentTypeService.getAllListbyUser().subscribe(
      (data: Appointment_type) => this.appointmenttype = data,
      error => this.error = error
    );
  }



  getCategoryItem(category_id: string, id: string) {
    return this.clients.find(item => item.id === category_id);
  }




  getEmployeeItem(employee_id: string, id: string) {
    return this.employees.find(item => item.id === employee_id);
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


  editProduct(appointment: Appointments) {
    this.appointment = { ...appointment };
    this.selectedWorks = this.appointment.works_id.split(',');
    this.productDialog = true;
  }


  exportPdf() {
    // const doc = new jsPDF();
    const doc = new jsPDF('l', 'pt', 'A4');
    doc['autoTable'](this.exportColumns, this.appointments);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("appointments.pdf");
  }


  showCalendar() {
    this.calendarDialog = true;

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


  hideDialog() {
    this.productDialog = false;
  }

  onDelete(id: number, title: string) {

    this.confirmationService.confirm({
      message: 'Are you sure want to delete it = ' + id,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appointmentsService.delete(+id).subscribe(
          res => {
            console.log(res);
            this.ngOnInit();
            this.messageService.add({ key: 'myKey1', severity: 'warn', summary: 'Attenzione', detail: 'Cancellazione avvenuto con successo' });

          },
          error => this.error = error
        );
      },

    });


  }

}

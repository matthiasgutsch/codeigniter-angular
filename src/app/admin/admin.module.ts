import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from "primeng/chips";
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageCategoriesComponent } from './settings/category/manage-categories/manage-categories.component';
import { NgxSpinnerService } from "ngx-spinner";
import {InputNumberModule} from 'primeng/inputnumber';

import { ManageClientsComponent } from './clients/manage-clients/manage-clients.component';
import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import {TabViewModule} from 'primeng/tabview';
import { DateValidPipe } from "./pipe/date-valid.pipe";
import { JoinPipe } from "./pipe/join.pipe";
import { LimitPipe } from "./pipe/limit.pipe";
import { KeysPipe } from "./pipe/key.pipe";



import {InputTextareaModule} from 'primeng/inputtextarea';

import { ManagePagesComponent } from './manage-pages/manage-pages.component';
import { TableModule } from 'primeng/table';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import {SelectButtonModule} from 'primeng/selectbutton';

import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { FullCalendarModule } from 'ng-fullcalendar';
import { CalendarModule } from 'primeng/calendar';
import { MomentPipe } from './pipe/moment.pipe';
import { InputMaskModule } from 'primeng/inputmask';
import { CategoryFormComponent } from './settings/category/category-form/category-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {MultiSelectModule} from 'primeng/multiselect';
import { NgxBarcode6Module } from "ngx-barcode6";
import {OverlayPanelModule} from 'primeng/overlaypanel';
import * as $ from 'jquery';
import { ManageAppointmentsComponent } from './appointments/manage-appointments/manage-appointments.component';
import { AppointmentsFormComponent } from './appointments/appointments-form/appointments-form.component';
import {TimelineModule} from 'primeng/timeline';
import { TagModule } from 'primeng/tag';
import { NgxSpinnerModule } from "ngx-spinner";
import {PanelModule} from 'primeng/panel';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {KnobModule} from 'primeng/knob';

import { ManageBillingsComponent } from './billings/manage-billings/manage-billings.component';
import { BillingsFormComponent } from './billings/billings-form/billings-form.component';
import { WorksFormComponent } from './settings/works/works-form/works-form.component';
import { ManageWorksComponent } from './settings/works/manage-works/manage-works.component';
import { SettingsComponent } from './settings/settings.component';
import { EmployeesFormComponent } from './employees/employees-form/employees-form.component';
import { ManageEmployeesComponent } from './employees/manage-employees/manage-employees.component';
import { LocationsFormComponent } from './settings/locations/locations-form/locations-form.component';
import { ManageLocationsComponent } from './settings/locations/manage-locations/manage-locations.component';
import { ManageTypeComponent } from './settings/type/manage-type/manage-type.component';
import { TypeFormComponent } from './settings/type/type-form/type-form.component';
import { SumPipeModule } from './pipe/sum.pipe';
import { ShortNumberPipe } from './pipe/short-number.pipe';
import {SplitButtonModule} from 'primeng/splitbutton';

import { CompanyFormComponent } from './settings/company/company-form/company-form.component';
import { ProductsFormComponent } from './products/products-form/products-form.component';
import { ManageProductsComponent } from './products/manage-products/manage-products.component';
import { ManageBrandsComponent } from './settings/brands/manage-brands/manage-brands.component';
import { BrandsFormComponent } from './settings/brands/brands-form/brands-form.component';
import { ManageTagsComponent } from './settings/tags/manage-tags/manage-tags.component';
import { TagsFormComponent } from './settings/tags/tags-form/tags-form.component';
import { ManageAppointmentTypeComponent } from './settings/appointment-type/manage-appointment-type/manage-appointment-type.component';
import { AppointmentTypeFormComponent } from './settings/appointment-type/appointment-type-form/appointment-type-form.component';
import { InitialsAvatarComponent } from './components/initials-avatar/initials-avatar.component';
import { SplitCommaStringPipe } from './pipe/split.pipe';
import { TotalPipe } from './pipe/total.pipe';
import { ManageSupportsComponent } from './supports/manage-supports/manage-supports.component';
import { SupportsFormComponent } from './supports/supports-form/supports-form.component';
import { ManageTechnicalDataComponent } from './settings/technical-data/manage-technical-data/manage-technical-data.component';
import { TechnicalDataFormComponent } from './settings/technical-data/technical-data-form/technical-data-form.component';
import { QuotesFormComponent } from './quotes/quotes-form/quotes-form.component';
import { ManageQuotesComponent } from './quotes/manage-quotes/manage-quotes.component';
import { ManageOrdersComponent } from './orders/manage-orders/manage-orders.component';
import { OrdersFormComponent } from './orders/orders-form/orders-form.component';
import { ReportsDashboardComponent } from './reports/reports-dashboard.component';
import { ManagePersonalDataComponent } from './settings/personal-data/manage-personal-data/manage-personal-data.component';
import { PersonalDataFormComponent } from './settings/personal-data/personal-data-form/personal-data-form.component';
import { ManageProjectsComponent } from './projects/manage-projects/manage-projects.component';
import { ProjectsFormComponent } from './projects/projects-form/projects-form.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { BusyConfig, NgBusyModule } from 'ng-busy';
import {ProgressBarModule} from 'primeng/progressbar';
import { ManageTimesheetsComponent } from './timesheets/manage-timeheets/manage-timesheets.component';
import { TimesheetsFormComponent } from './timesheets/timesheets-form/timesheets-form.component';
import { EmployeesTasksComponent } from './employees/employees-tasks/employees-tasks.component';
import { EmployeesTimesheetsComponent } from './employees/employees-timeheets/employees-timesheets.component';
import { ProjectsProductivityComponent } from './projects/projects-productivity/projects-productivity.component';
import { ProjectsTimesheetsComponent } from './projects/projects-timeheets/projects-timesheets.component';
import { ManageWordpressOrdersComponent } from './orders-wordpress/manage-wordpress-orders/manage-wordpress-orders.component';
import { WordpressOrdersFormComponent } from './orders-wordpress/wordpress-orders-form/wordpress-orders-form.component';
import { EmployeesTimesheetsCalendarComponent } from './employees/employees-timeheets-calendar/employees-timesheets-calendar.component';
import { WarehousesFormComponent } from './settings/warehouses/warehouses-form/warehouses-form.component';
import { ManageWarehousesCheckinsComponent } from './warehouses/warehouses-checkins/manage-warehouses-checkins/manage-warehouses-checkins.component';
import { WarehousesCheckinsFormComponent } from './warehouses/warehouses-checkins/warehouses-checkins-form/warehouses-checkins-form.component';
import { ManageWarehousesComponent } from './settings/warehouses/manage-warehouses/manage-warehouses.component';
import { ManageSuppliersComponent } from './supplier/manage-suppliers/manage-suppliers.component';
import { SuppliersFormComponent } from './supplier/suppliers-form/suppliers-form.component';
import { ManageProductsVariationsComponent } from './products/manage-products-variations/manage-products-variations.component';
import { ProductsVariationsFormComponent } from './products/products-variations-form/products-variations-form.component';
import { ManagePurchaseOrdersComponent } from './purchase-orders/manage-purchase-orders/manage-purchase-orders.component';
import { PurchaseOrdersFormComponent } from './purchase-orders/purchase-orders-form/purchase-orders-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ManageWarehousesCheckoutsComponent } from './warehouses/warehouse-checkouts/manage-warehouses-checkouts/manage-warehouses-checkouts.component';
import { TransportDocumentFormComponent } from './transport-document/transport-document-form/transport-document-form.component';
import { ManageTransportDocumentComponent } from './transport-document/transport-document-billings/manage-transport-document.component';
import { ManageWarehousesMovementsComponent } from './warehouses-movements/manage-warehouses-movements/manage-warehouses-movements.component';
import { WarehousesMovementsFormComponent } from './warehouses-movements/warehouses-movements-form/warehouses-movements-form.component';



@NgModule({
  declarations: [
    ManageProjectsComponent,
    ProjectsFormComponent,   
    AdminDashboardComponent,
    ManageWarehousesMovementsComponent,
    WarehousesMovementsFormComponent,
    ManageWarehousesComponent,
    ManageSuppliersComponent,
    SuppliersFormComponent,
    PurchaseOrdersFormComponent,
    ManageTransportDocumentComponent,
    ManagePurchaseOrdersComponent,
    TransportDocumentFormComponent,
    WarehousesFormComponent,
    ManageProductsVariationsComponent,
    ProductsVariationsFormComponent,
    AdminComponent,
    ManageBillingsComponent,
    BillingsFormComponent,
    ManageCategoriesComponent,
    ManageWarehousesCheckoutsComponent,
    ManageWarehousesCheckinsComponent,
    WarehousesCheckinsFormComponent,
    ManageClientsComponent,
    InitialsAvatarComponent,
    ClientsFormComponent,
    ManageWordpressOrdersComponent,
    EmployeesTimesheetsCalendarComponent,
    WordpressOrdersFormComponent,
    ManageQuotesComponent,
    ProjectsTimesheetsComponent,
    ProjectsProductivityComponent,
    EmployeesTimesheetsComponent,
    ManageTimesheetsComponent,
    TimesheetsFormComponent,
    QuotesFormComponent,
    OrdersFormComponent,
    EmployeesTasksComponent,
    ManageOrdersComponent,
    ManagePersonalDataComponent,
    PersonalDataFormComponent,
    ManageTagsComponent,
    TagsFormComponent,
    ManageTypeComponent,
    ManageBrandsComponent,
    BrandsFormComponent,
    TypeFormComponent,
    ManagePagesComponent,
    TasksComponent,
    TaskDetailsComponent,
    MomentPipe,
    DateValidPipe,
    ManageAppointmentTypeComponent,
    AppointmentTypeFormComponent,
    JoinPipe,
    KeysPipe,
    ShortNumberPipe,
    LimitPipe,
    TotalPipe,
    SplitCommaStringPipe,
    WorksFormComponent,
    ManageWorksComponent,
    ManageSupportsComponent,
    SupportsFormComponent,
    ManageAppointmentsComponent,
    LocationsFormComponent,
    CompanyFormComponent,
    ManageLocationsComponent,
    AppointmentsFormComponent,
    CategoryFormComponent,
    SettingsComponent,
    ReportsDashboardComponent,
    ProductsFormComponent,
    ManageProductsComponent,
    EmployeesFormComponent,
    ManageEmployeesComponent,
    ManageTechnicalDataComponent,
    TechnicalDataFormComponent
    ],
    exports: [
      LimitPipe,
      KeysPipe,
      ShortNumberPipe,
      TotalPipe,
      DragDropModule,
    ],
  imports: [
    CommonModule,
    TableModule,
    MessagesModule,
    SumPipeModule,
    NgxBarcode6Module,
    TooltipModule,
    InputNumberModule,
    SelectButtonModule,
    ProgressBarModule,
    NgxSpinnerModule,
    KnobModule,
   
    InputTextareaModule,
    NgxPaginationModule,
    DragDropModule,
    SplitButtonModule,
    ToastModule,
    TabViewModule,
    OverlayPanelModule,
    MessageModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    PanelModule,
    FullCalendarModule,
    CheckboxModule,
    EditorModule,
    InputMaskModule,
    CardModule,
    ChipsModule,
    TagModule,
    ConfirmDialogModule,
    TimelineModule,
    InputTextModule,
    AdminRoutingModule,
    DialogModule,
    RadioButtonModule,
    CalendarModule,
    DropdownModule,
    HttpClientModule,
    FileUploadModule,
    MultiSelectModule,
    ButtonModule,
    InputSwitchModule,
    AutoCompleteModule,
    SidebarModule,
    NgBusyModule,
    NgBusyModule.forRoot(new BusyConfig({
      message: 'Loading ...',
      backdrop: true
  }))
  ],
  providers: [ConfirmationService, MessageService, SumPipeModule,  NgxSpinnerService]
})
export class AdminModule { }



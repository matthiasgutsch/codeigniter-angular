import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from "primeng/chips";
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCalendarComponent } from './calendar/calendar.component';
import { AdminComponent } from './admin/admin.component';
import { ManageCategoriesComponent } from './category/manage-categories/manage-categories.component';

import { ManageClientsComponent } from './clients/manage-clients/manage-clients.component';
import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import {TabViewModule} from 'primeng/tabview';
import { DateValidPipe } from "./pipe/date-valid.pipe";
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
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { FullCalendarModule } from 'ng-fullcalendar';
import { CalendarModule } from 'primeng/calendar';
import { MomentPipe } from './pipe/moment.pipe';
import { InputMaskModule } from 'primeng/inputmask';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import * as $ from 'jquery';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ManageAppointmentsComponent } from './appointments/manage-appointments/manage-appointments.component';
import { AppointmentsFormComponent } from './appointments/appointments-form/appointments-form.component';
import {TimelineModule} from 'primeng/timeline';

import { ManageBillingsComponent } from './billings/manage-billings/manage-billings.component';
import { BillingsFormComponent } from './billings/billings-form/billings-form.component';
import { WorksFormComponent } from './works/works-form/works-form.component';
import { ManageWorksComponent } from './works/manage-works/manage-works.component';
import { SettingsComponent } from './settings/settings.component';
import { EmployeesFormComponent } from './employees/employees-form/employees-form.component';
import { ManageEmployeesComponent } from './employees/manage-employees/manage-employees.component';
import { LocationsFormComponent } from './locations/locations-form/locations-form.component';
import { ManageLocationsComponent } from './locations/manage-locations/manage-locations.component';

export class I18nModule {
  constructor(translate: TranslateService) {
    translate.addLangs(['it', 'en']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/it|en/) ? browserLang : 'it');
  }
}


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminComponent,
    ManageBillingsComponent,
    BillingsFormComponent,
    ManageCategoriesComponent,
    ManageClientsComponent,
    ClientsFormComponent,
    ManagePagesComponent,
    MomentPipe,
    DateValidPipe,
    WorksFormComponent,
    ManageWorksComponent,
    ManageAppointmentsComponent,
    LocationsFormComponent,
    ManageLocationsComponent,
    AppointmentsFormComponent,
    AdminCalendarComponent,
    CategoryFormComponent,
    SettingsComponent,
    EmployeesFormComponent,
    ManageEmployeesComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    MessagesModule,
    TooltipModule,
    InputTextareaModule,
    ToastModule,
    TabViewModule,
    OverlayPanelModule,
    MessageModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    CheckboxModule,
    EditorModule,
    InputMaskModule,
    CardModule,
    ChipsModule,
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
    ButtonModule,
    InputSwitchModule,
    AutoCompleteModule,
    SidebarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [ConfirmationService, MessageService]
})
export class AdminModule { }


export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
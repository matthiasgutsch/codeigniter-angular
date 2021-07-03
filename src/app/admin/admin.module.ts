import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageBlogsComponent } from './manage-blogs/manage-blogs.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import {TableModule} from 'primeng/table';
import {EditorModule} from 'primeng/editor';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CheckboxModule} from 'primeng/checkbox';
import {InputSwitchModule} from 'primeng/inputswitch';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminComponent,
    ManageBlogsComponent,
    ManageCategoriesComponent,
    ManagePagesComponent,
    BlogFormComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    EditorModule,
    InputTextModule,
    AdminRoutingModule,
    DialogModule,
    RadioButtonModule,
    CalendarModule,
    DropdownModule,
    HttpClientModule,
    FileUploadModule,
    FullCalendarModule,
    ButtonModule,
    InputSwitchModule,
    AutoCompleteModule,
    SidebarModule
  ]
})
export class AdminModule { }

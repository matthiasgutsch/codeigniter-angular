import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageCategoriesComponent } from './settings/category/manage-categories/manage-categories.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';

import { CategoryFormComponent } from './settings/category/category-form/category-form.component';
import { ManageClientsComponent } from './clients/manage-clients/manage-clients.component';
import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import { ManageAppointmentsComponent } from './appointments/manage-appointments/manage-appointments.component';
import { AppointmentsFormComponent } from './appointments/appointments-form/appointments-form.component';
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
import { CompanyFormComponent } from './settings/company/company-form/company-form.component';
import { ManageProductsComponent } from './products/manage-products/manage-products.component';
import { ProductsFormComponent } from './products/products-form/products-form.component';
import { ManageBrandsComponent } from './settings/brands/manage-brands/manage-brands.component';
import { BrandsFormComponent } from './settings/brands/brands-form/brands-form.component';
import { ManageTagsComponent } from './settings/tags/manage-tags/manage-tags.component';
import { TagsFormComponent } from './settings/tags/tags-form/tags-form.component';
import { ManageAppointmentTypeComponent } from './settings/appointment-type/manage-appointment-type/manage-appointment-type.component';
import { AppointmentTypeFormComponent } from './settings/appointment-type/appointment-type-form/appointment-type-form.component';
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
import { ManageTimesheetsComponent } from './timesheets/manage-timeheets/manage-timesheets.component';
import { TimesheetsFormComponent } from './timesheets/timesheets-form/timesheets-form.component';
import { EmployeesTasksComponent } from './employees/employees-tasks/employees-tasks.component';
import { EmployeesTimesheetsComponent } from './employees/employees-timeheets/employees-timesheets.component';
import { ProjectsProductivityComponent } from './projects/projects-productivity/projects-productivity.component';

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        children: [


          { path: "support", component: ManageSupportsComponent },
          { path: "support/create", component: SupportsFormComponent },
          { path: "support/:id",component: SupportsFormComponent,},

          { path: "products", component: ManageProductsComponent },
          { path: "products/create", component: ProductsFormComponent },
          { path: "products/edit/:id",component: ProductsFormComponent,},

          { path: "timesheets", component: ManageTimesheetsComponent },
          { path: "timesheets/create", component: TimesheetsFormComponent },
          { path: "timesheets/edit/:id",component: TimesheetsFormComponent,},


          { path: "projects", component: ManageProjectsComponent },
          { path: "projects/create", component: ProjectsFormComponent },
          { path: "projects/edit/:id",component: ProjectsFormComponent,},

          { path: "appointments", component: ManageAppointmentsComponent },
          { path: "appointments/create", component: AppointmentsFormComponent },
          { path: "appointments/edit/:id",component: AppointmentsFormComponent,},

          { path: "billings", component: ManageBillingsComponent },
          { path: "billings/edit/:id",component: BillingsFormComponent,},
          { path: "billings/create", component: BillingsFormComponent },

          { path: "employees", component: ManageEmployeesComponent },
          { path: "employees/edit/:id", component: EmployeesFormComponent },
          { path: "employees/create", component: EmployeesFormComponent },

          { path: "employee/timesheets/:id", component: EmployeesTimesheetsComponent },
          { path: "employee/task/:id", component: EmployeesTasksComponent },

          { path: "orders", component: ManageOrdersComponent },
          { path: "orders/edit/:id",component: OrdersFormComponent,},
          { path: "orders/create", component: OrdersFormComponent },

          { path: "quotes", component: ManageQuotesComponent },
          { path: "quotes/edit/:id",component: QuotesFormComponent,},
          { path: "quotes/create", component: QuotesFormComponent },

          { path: "clients", component: ManageClientsComponent },
          { path: "clients/create", component: ClientsFormComponent },
          { path: "clients/edit/:id", component: ClientsFormComponent },
          { path: "settings", component: SettingsComponent },

          { path: "settings/categories", component: ManageCategoriesComponent },
          { path: "settings/categories/edit/:id", component: CategoryFormComponent },
          { path: "settings/categories/create", component: CategoryFormComponent },

          { path: "settings/type", component: ManageTypeComponent },
          { path: "settings/type/edit/:id", component: TypeFormComponent },
          { path: "settings/type/create", component: TypeFormComponent },


          { path: "settings/brands", component: ManageBrandsComponent },
          { path: "settings/brands/edit/:id", component: BrandsFormComponent },
          { path: "settings/brands/create", component: BrandsFormComponent },

          { path: "settings/works", component: ManageWorksComponent },
          { path: "settings/works/edit/:id", component: WorksFormComponent },
          { path: "settings/works/create", component: WorksFormComponent },

          { path: "settings/tags", component: ManageTagsComponent },
          { path: "settings/tags/edit/:id", component: TagsFormComponent },
          { path: "settings/tags/create", component: TagsFormComponent },

          { path: "settings/locations", component: ManageLocationsComponent },
          { path: "settings/locations/edit/:id", component: LocationsFormComponent },
          { path: "settings/locations/create", component: LocationsFormComponent },

          { path: "settings/technical-data", component: ManageTechnicalDataComponent },
          { path: "settings/technical-data/edit/:id", component: TechnicalDataFormComponent },
          { path: "settings/technical-data/create", component: TechnicalDataFormComponent },

          { path: "settings/personal-data", component: ManagePersonalDataComponent },
          { path: "settings/personal-data/edit/:id", component: PersonalDataFormComponent },
          { path: "settings/personal-data/create", component: PersonalDataFormComponent },

          { path: "settings/appointment-type", component: ManageAppointmentTypeComponent },
          { path: "settings/appointment-type/edit/:id", component: AppointmentTypeFormComponent },
          { path: "settings/appointment-type/create", component: AppointmentTypeFormComponent },

          { path: "settings/company", component: CompanyFormComponent },
          
          { path: "pages", component: ManagePagesComponent },
          { path: "", component: AdminDashboardComponent },
          { path: "reports", component: ReportsDashboardComponent },

          { path: "tasks", component: TasksComponent },
          { path: "projects/task/:project_id", component: TasksComponent },
          { path: "projects/timesheet/:id", component: TasksComponent },
          { path: "projects/productivity/:id", component: ProjectsProductivityComponent },



        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

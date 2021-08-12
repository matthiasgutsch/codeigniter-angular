import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageCategoriesComponent } from './category/manage-categories/manage-categories.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';

import { CategoryFormComponent } from './category/category-form/category-form.component';
import { AdminCalendarComponent } from './calendar/calendar.component';
import { ManageClientsComponent } from './clients/manage-clients/manage-clients.component';
import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import { ManageAppointmentsComponent } from './appointments/manage-appointments/manage-appointments.component';
import { AppointmentsFormComponent } from './appointments/appointments-form/appointments-form.component';
import { ManageBillingsComponent } from './billings/manage-billings/manage-billings.component';
import { BillingsFormComponent } from './billings/billings-form/billings-form.component';
import { WorksFormComponent } from './works/works-form/works-form.component';
import { ManageWorksComponent } from './works/manage-works/manage-works.component';
import { SettingsComponent } from './settings/settings.component';
import { EmployeesFormComponent } from './employees/employees-form/employees-form.component';
import { ManageEmployeesComponent } from './employees/manage-employees/manage-employees.component';
import { LocationsFormComponent } from './locations/locations-form/locations-form.component';
import { ManageLocationsComponent } from './locations/manage-locations/manage-locations.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        children: [


          { path: "settings", component: SettingsComponent },
          { path: "statistics", component: StatisticsComponent },


          { path: "appointments", component: ManageAppointmentsComponent },
          { path: "appointments/create", component: AppointmentsFormComponent },
          { path: "appointments/edit/:id",component: AppointmentsFormComponent,},

          { path: "billings", component: ManageBillingsComponent },
          { path: "billings/create", component: BillingsFormComponent },
          { path: "billings/edit/:id",component: BillingsFormComponent,},

          
          { path: "clients", component: ManageClientsComponent },
          { path: "clients/create", component: ClientsFormComponent },
          { path: "clients/edit/:id", component: ClientsFormComponent },

          { path: "calendar", component: AdminCalendarComponent },

          { path: "categories", component: ManageCategoriesComponent },
          { path: "categories/edit/:id", component: CategoryFormComponent },
          { path: "categories/create", component: CategoryFormComponent },

          { path: "works", component: ManageWorksComponent },
          { path: "works/edit/:id", component: WorksFormComponent },
          { path: "works/create", component: WorksFormComponent },

          { path: "locations", component: ManageLocationsComponent },
          { path: "locations/edit/:id", component: LocationsFormComponent },
          { path: "locations/create", component: LocationsFormComponent },

          { path: "employees", component: ManageEmployeesComponent },
          { path: "employees/edit/:id", component: EmployeesFormComponent },
          { path: "employees/create", component: EmployeesFormComponent },
          
          { path: "pages", component: ManagePagesComponent },
          { path: "", component: AdminDashboardComponent },
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

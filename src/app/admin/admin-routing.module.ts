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
import { EmployeesFormComponent } from './settings/employees/employees-form/employees-form.component';
import { ManageEmployeesComponent } from './settings/employees/manage-employees/manage-employees.component';
import { LocationsFormComponent } from './settings/locations/locations-form/locations-form.component';
import { ManageLocationsComponent } from './settings/locations/manage-locations/manage-locations.component';
import { ManageTypeComponent } from './settings/type/manage-type/manage-type.component';
import { TypeFormComponent } from './settings/type/type-form/type-form.component';
import { CompanyFormComponent } from './settings/company/company-form/company-form.component';

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        children: [



          { path: "appointments", component: ManageAppointmentsComponent },
          { path: "appointments/create", component: AppointmentsFormComponent },
          { path: "appointments/edit/:id",component: AppointmentsFormComponent,},

          { path: "billings", component: ManageBillingsComponent },
          { path: "billings/edit/:id",component: BillingsFormComponent,},
          { path: "billings/create", component: BillingsFormComponent },

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


          { path: "settings/works", component: ManageWorksComponent },
          { path: "settings/works/edit/:id", component: WorksFormComponent },
          { path: "settings/works/create", component: WorksFormComponent },

          { path: "settings/locations", component: ManageLocationsComponent },
          { path: "settings/locations/edit/:id", component: LocationsFormComponent },
          { path: "settings/locations/create", component: LocationsFormComponent },

          { path: "settings/employees", component: ManageEmployeesComponent },
          { path: "settings/employees/edit/:id", component: EmployeesFormComponent },
          { path: "settings/employees/create", component: EmployeesFormComponent },


          { path: "settings/company", component: CompanyFormComponent },
          
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

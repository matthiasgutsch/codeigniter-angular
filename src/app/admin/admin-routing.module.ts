import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageBlogsComponent } from './blog/manage-blogs/manage-blogs.component';
import { ManageCategoriesComponent } from './category/manage-categories/manage-categories.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';
import { BlogFormComponent } from './blog/blog-form/blog-form.component';

import { AuthGuard } from '../auth/auth.guard';
import { CategoryFormComponent } from './category/category-form/category-form.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'blogs', component: ManageBlogsComponent },
          { path: 'blogs/create', component: BlogFormComponent },
          { path: 'blogs/edit/:id', component: BlogFormComponent },
          { path: 'categories', component: ManageCategoriesComponent },
          { path: 'categories/edit/:id', component: CategoryFormComponent },
          { path: 'categories/create', component: CategoryFormComponent },
          { path: 'pages', component: ManagePagesComponent },
          { path: '', component: AdminDashboardComponent }
        ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

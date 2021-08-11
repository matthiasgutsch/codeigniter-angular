import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog';
import { ConfirmationService } from 'primeng/api';
import { CategoryService } from '../../../services/categories.service';
import { Category } from '../../../models/category';
import { MessageService } from 'primeng/api';
import { Clients } from 'src/app/models/clients';
import { ClientsService } from 'src/app/services/clients.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { Employees } from 'src/app/models/employees';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html'
})
export class ManageEmployeesComponent implements OnInit {
  title = 'Dipendenti / Personale';
  employees: Employees;
  employee: Employees;
  categories: any = [];
  category: Category;
  error: string;
  private category_id: number;
  private id: number;
  clients: any = [];
  client: Clients;

  productDialog: boolean = false;
  showDialog() {
    this.productDialog = true;
  }


  trackByFn(index, item) {
    return item.id;
  }


  constructor(
    private clientsService: ClientsService,
    private employeesService: EmployeesService,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,) {

  }

  ngOnInit() {
    this.employeesService.getAllList().subscribe(
      (data: Employees) => this.employees = data,
      error => this.error = error
    );




  }

  getCategoryItem(category_id: string, id: string) {
    return this.clients.find(item => item.id === category_id);
  }

  editProduct(employee: Employees) {
    this.employee = { ...employee };
    this.productDialog = true;
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
        this.employeesService.delete(+id).subscribe(
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

import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/categories.service';
import { Category } from '../../../models/category';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html'
})
export class ManageCategoriesComponent implements OnInit {
  title = 'Manage Categories';
  categories: Category;
  category: Category;
  error: string;


  constructor(private categoryService: CategoryService, private confirmationService: ConfirmationService,) { }

  ngOnInit() {
    this.categoryService.getAllList().subscribe(
      (data: Category) => this.categories = data,
      error => this.error = error
    );
  }


  editProduct(category: Category) {
    this.category = {...category};
}


onDelete(id: number, category_name: string) {

  this.confirmationService.confirm({
    message: 'Are you sure want to delete it = ' + category_name,
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.categoryService.deleteCategory(+id).subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        error => this.error = error
        );
      },
     
  });

   
  }

}

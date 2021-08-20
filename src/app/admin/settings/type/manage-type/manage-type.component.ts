import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/categories.service';
import { Category } from '../../../../models/category';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-manage-type',
  templateUrl: './manage-type.component.html'
})
export class ManageTypeComponent implements OnInit {
  title = 'Tipo di Appuntamento';
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
    this.category = { ...category };
  }


  onDelete(id: number, category_name: string) {

    this.confirmationService.confirm({
      message: 'Are you sure want to delete it = ' + category_name,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.delete(+id).subscribe(
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

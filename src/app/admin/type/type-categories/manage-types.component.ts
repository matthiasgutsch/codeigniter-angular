import { Component, OnInit } from '@angular/core';
import { TypeService } from '../../../services/type.service';
import { Category } from '../../../models/category';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-manage-types',
  templateUrl: './manage-types.component.html'
})
export class ManageTypesComponent implements OnInit {
  title = 'Manage Types';
  categories: Category;
  category: Category;
  error: string;


  constructor(private typeService: TypeService, private confirmationService: ConfirmationService,) { }

  ngOnInit() {
    this.typeService.getCategories().subscribe(
      (data: Category) => this.categories = data,
      error => this.error = error
    );
  }


  editProduct(category: Category) {
    this.category = {...category};
}


onDelete(id: number) {

  this.confirmationService.confirm({
    message: 'Are you sure want to delete it = ' + id,
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.typeService.deleteCategory(+id).subscribe(
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

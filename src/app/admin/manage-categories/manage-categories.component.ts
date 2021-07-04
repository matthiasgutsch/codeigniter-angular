import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/categories.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
  title = 'Manage Categories';
  categories: Category;
  category: Category;
  error: string;


  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      (data: Category) => this.categories = data,
      error => this.error = error
    );
  }


  editProduct(category: Category) {
    this.category = {...category};
}


onDelete(id: number) {
  if (confirm('Are you sure want to delete it = ' + id)) {
    this.categoryService.deleteCategory(+id).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      error => this.error = error
    );
  }
}

}

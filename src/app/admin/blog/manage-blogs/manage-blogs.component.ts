import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog';
import {ConfirmationService} from 'primeng/api';
import { CategoryService } from '../../../services/categories.service';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-manage-blogs',
  templateUrl: './manage-blogs.component.html'
})
export class ManageBlogsComponent implements OnInit {
  title = 'Manage Blogs';
  blogs: Blog;
  blog: Blog;
  categories: any = [];
  category: Category;
  error: string;
  private category_id: number;
  private id: number;
  productDialog:boolean = false;
  showDialog() {
    this.productDialog = true;
}


trackByFn(index, item) {
  return item.id;
}


  constructor(private blogService: BlogService, private categoryService: CategoryService, private confirmationService: ConfirmationService,) { 

  }

  ngOnInit() {
    this.blogService.getBlogs().subscribe(
      (data: Blog) => this.blogs = data,
      error => this.error = error
    );


    this.categoryService.getCategories().subscribe(
      (data: Category) => this.categories = data,
      error => this.error = error
    );
  }

  getCategoryItem(category_id: string, id: string) {
    return this.categories.find(item => item.id === category_id);
  }
  
  editProduct(blog: Blog) {
    this.blog = {...blog};
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
        this.blogService.deleteBlog(+id).subscribe(
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

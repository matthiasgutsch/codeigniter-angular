import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-manage-blogs',
  templateUrl: './manage-blogs.component.html'
})
export class ManageBlogsComponent implements OnInit {
  title = 'Manage Blogs';
  blogs: Blog;
  blog: Blog;

  error: string;
  productDialog:boolean = false;
  showDialog() {
    this.productDialog = true;
}

  constructor(private blogService: BlogService, private confirmationService: ConfirmationService,) { }

  ngOnInit() {
    this.blogService.getBlogs().subscribe(
      (data: Blog) => this.blogs = data,
      error => this.error = error
    );
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

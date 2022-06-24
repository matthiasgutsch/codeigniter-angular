import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../../services/categories.service';
import { Category } from '../../../../models/category';
import { ConfirmationService } from 'primeng/api';
import { PARAM_CATEGORIES_PATH, PARAM_TAGS_PATH } from 'src/app/admin/constants/constants';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html'
})
export class ManageCategoriesComponent implements OnInit {
  title = 'Categorie';

  error: string;

  categories: any = [];
  category: Category;

  public cols: any[];
  public columnOptions: any[];
  public selectedColumns: any[];
  nameFilter: string;
  descriptionFilter: string;
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];
  public base_path: string;
  basePath: string;
  pageOfItems: Array<any>;
  searchWrapper: boolean = false;
  @ViewChild('dt', { static: true }) dt: Table;
  currentUser: any;
  
  constructor(private categoryService: CategoryService, private confirmationService: ConfirmationService,) { 


    this.cols = [
      { field: 'name', header: 'Nome', index: 1 },
      { field: 'description', header: 'Descrizione', index: 2 }
    ];

    this.columnOptions = [];
    this.selectedColumns = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
    }


    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    const userId = this.currentUser.user_id;


  }

  ngOnInit() {


    this.load();


  }




  getRequestParams(searchTitle, categoryTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let path = PARAM_CATEGORIES_PATH;
    const params = {};
    let adder = '?';
    if (page) {
      params[`page`] = page - 1;
      path += adder + 'page=' + (page - 1);
      adder = '&';
    }
    if (searchTitle) {
      params[`name`] = searchTitle;
      path += adder + 'name=' + searchTitle;
      adder = '&';
    }
    if (categoryTitle) {
      params[`description`] = categoryTitle;
      path += adder + 'description=' + categoryTitle;
      adder = '&';
    }
    if (pageSize) {
      params[`size`] = pageSize;
      path += adder + 'size=' + pageSize;
    }
    window.history.replaceState({}, '', path);

    return params;

  }


  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.load();
  }

  reset(): void {
    this.nameFilter = '';
    this.descriptionFilter = '';
    this.load();

  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  public handlePageChange(event): void {
    this.page = event;
    this.load();

  }


  load(): void {

    const params = this.getRequestParams(
      this.nameFilter,
      this.descriptionFilter,
      this.page,
      this.pageSize
    );
    this.categoryService.getAllListNew(params).subscribe((pData) => {
      this.categories = pData;
      this.count = this.categoryService.size;

    });
  }   


  editProduct(category: Category) {
    this.category = { ...category };
  }


  onDelete(id: number, category_name: string) {

    this.confirmationService.confirm({
      message: 'Sei sicuro di volerlo cancellare = ' + category_name,
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

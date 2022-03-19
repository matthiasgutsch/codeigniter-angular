import { Component, OnInit } from '@angular/core';
import { Works } from '../../../../models/works';
import {ConfirmationService} from 'primeng/api';
import { WorksService } from 'src/app/services/works.service';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brands.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAM_BRANDS_PATH, PARAM_TAGS_PATH } from 'src/app/admin/constants/constants';

@Component({
  selector: 'app-manage-brands',
  templateUrl: './manage-brands.component.html'
})
export class ManageBrandsComponent implements OnInit {
  title = 'Brands';
  brands: Array<any> = [];
  brand: Brand;
  error: string;
  public cols: any[];
  public columnOptions: any[];
  public selectedColumns: any[];
  currentUser: any;

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

  constructor(private brandsService: BrandService, 
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,) {

    this.cols = [
      { field: 'name', header: 'Nome', index: 1 },
      { field: 'description', header: 'Descrizione', index: 2 }

    ];

    this.columnOptions = [];
    this.selectedColumns = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
    }

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

   }

  ngOnInit() {
    const userId = this.currentUser.user_id;
    

    this.basePath = window.location.pathname;
    if (this.route.snapshot.queryParamMap.has('page')) {
      this.page = +this.route.snapshot.queryParamMap.get('page');
    }
    if (this.route.snapshot.queryParamMap.has('size')) {
      this.pageSize = +this.route.snapshot.queryParamMap.get('size');
    }
    if (this.route.snapshot.queryParamMap.has('name')) {
      this.nameFilter = this.route.snapshot.queryParamMap.get('name');
    }
    if (this.route.snapshot.queryParamMap.has('description')) {
      this.descriptionFilter = this.route.snapshot.queryParamMap.get('description');
    }

    this.load();


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



  getRequestParams(searchTitle, categoryTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let path = PARAM_BRANDS_PATH;
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


  load(): void {

    const params = this.getRequestParams(
      this.nameFilter,
      this.descriptionFilter,
      this.page,
      this.pageSize
    );
    this.brandsService.getAllListNew(params).subscribe((pData) => {
      this.brands = pData;
      this.count = this.brandsService.size;

    });
  }



  private onChange(item: string): void {
    this.load();

  }

  public selectionItemForFilter(e) {
    const colsTempor = e.value;
    colsTempor.sort(function (a, b) {
      return a.index - b.index;
    });
    this.cols = [];
    this.cols = colsTempor;
    if (e.value.length > 10) {
      e.value.pop();
    }
  }


  
  editProduct(brand: Brand) {
    this.brand = {...brand};
}



onDelete(id: number, category_name: string) {

  this.confirmationService.confirm({
    message: 'Sei sicuro di volerlo cancellare',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.brandsService.delete(+id).subscribe(
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { Works } from '../../../../models/works';
import {ConfirmationService} from 'primeng/api';
import { WorksService } from 'src/app/services/works.service';
import { Table } from 'primeng/table';
import {ActivatedRoute, Router} from '@angular/router';
import { PARAM_WORKS_PATH } from 'src/app/admin/constants/constants';
import jsPDF from "jspdf";
import "jspdf-autotable";
@Component({
  selector: 'app-manage-works',
  templateUrl: './manage-works.component.html'
})
export class ManageWorksComponent implements OnInit {
  title = 'Tipo di lavorazione';
  works: Array<any> = [];
  work: Works;
  error: string;
  loading: boolean;
  public cols: any[];
  public filters: any[];
  public columnOptions: any[];
  public selectedColumns: any[];
  nameFilter: string;
  descriptionFilter: string;
  exportColumns: any[];
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

  constructor(private worksService: WorksService,
    private router: Router,
    private route: ActivatedRoute,

    private confirmationService: ConfirmationService,) {
      const userId = this.currentUser.user_id;

    this.cols = [
      { field: 'name', header: 'Nome', index: 1 },
      { field: 'description', header: 'Descrizione', index: 2 }
    ];

    this.filters = [
      { field: this.nameFilter, header: 'Nome', index: 1 },
      { field: this.descriptionFilter, header: 'Descrizione', index: 2 }
    ];

    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
    
    this.columnOptions = [];
    this.selectedColumns = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
    }

    
   }

  ngOnInit() {

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

    // this.worksService.getAllListbyUser().subscribe(
    //   (data: Works) => this.works = data,
    //   error => this.error = error
    // );
  }

  

exportPdf() {
  // const doc = new jsPDF();
  const doc = new jsPDF('l','pt','A4');
  doc['autoTable'](this.exportColumns, this.works);
  // doc.autoTable(this.exportColumns, this.products);
  doc.save("prodotti.pdf");
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


getRequestParams(searchTitle, categoryTitle, page, pageSize): any {
  // tslint:disable-next-line:prefer-const
  let path = PARAM_WORKS_PATH;
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
  this.worksService.getAllListNew(params, this.currentUser.user_id).subscribe((pData) => {
    this.works = pData;
    this.count = this.worksService.size;
    
  });
}

private onChange(item: string): void {
  this.load();
  
}


onDelete(id: number, category_name: string) {

  this.confirmationService.confirm({
    message: 'Sei sicuro di volerlo cancellare',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.worksService.delete(+id).subscribe(
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

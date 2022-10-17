import { Component, OnInit, ViewChild } from '@angular/core';
import { Works } from '../../../../models/works';
import {ConfirmationService} from 'primeng/api';
import { WorksService } from 'src/app/services/works.service';
import { LocationsService } from 'src/app/services/locations.service';
import { Locations } from 'src/app/models/locations';
import { PARAM_APPOINTMENT_TYPE_PATH, PARAM_LOCATIONS_TYPE_PATH } from 'src/app/admin/constants/constants';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-locations',
  templateUrl: './manage-locations.component.html'
})
export class ManageLocationsComponent implements OnInit {
  title = 'Luogo di lavorazione';
  locations: Array<any> = [];
  location: Locations;
  error: string;
  totalRecords: string;
  public cols: any[];
  public columnOptions: any[];
  public selectedColumns: any[];
  currentUser: any;
  displayFilter: boolean;
  pageSize = 10;
  pageSizes = [5, 10, 15];
  public base_path: string;
  basePath: string;
  page = 1;
  count = 0;
  nameFilter: string;
  descriptionFilter: string;

  constructor(private locationsService: LocationsService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,) {

      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

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


    this.cols = [
      { field: 'name', header: 'Nome', index: 1 },
      { field: 'description', header: 'Descrizione', index: 2 }
    ];

    this.columnOptions = [];
    this.selectedColumns = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
    }
  }


  editProduct(location: Locations) {
    this.location = {...location};
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




getRequestParams(searchTitle, categoryTitle, page, pageSize): any {
  // tslint:disable-next-line:prefer-const
  let path = PARAM_LOCATIONS_TYPE_PATH;
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

  this.locationsService.getAllListNew(params).subscribe((pData) => {
    this.locations = pData;
    this.count = this.locationsService.size;

  });
}

private onChange(item: string): void {
  this.load();

}

onDelete(id: number, category_name: string) {

  this.confirmationService.confirm({
    message: 'Sei sicuro di volerlo cancellare = ' + category_name,
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.locationsService.delete(+id).subscribe(
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

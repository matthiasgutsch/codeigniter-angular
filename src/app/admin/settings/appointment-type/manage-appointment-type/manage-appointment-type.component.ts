import { Component, OnInit, ViewChild } from '@angular/core';
import { Tags } from '../../../../models/tags';
import {ConfirmationService} from 'primeng/api';
import { WorksService } from 'src/app/services/works.service';
import { Table } from 'primeng/table';
import { TagsService } from 'src/app/services/tags.service';
import { Appointment_type } from 'src/app/models/appointment_type';
import { AppointmentTypeService } from 'src/app/services/appointment_type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAM_APPOINTMENT_TYPE_PATH, PARAM_WORKS_PATH } from 'src/app/admin/constants/constants';

@Component({
  selector: 'app-manage-appointment-type',
  templateUrl: './manage-appointment-type.component.html'
})
export class ManageAppointmentTypeComponent implements OnInit {
  pageTitle = 'Tipo di Appuntamento';
  appointment_type: Array<any> = [];
  appointment_typ: Appointment_type;
  error: string;
  loading: boolean;
  public cols: any[];
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

  constructor(private appointmentTypeService: AppointmentTypeService, 
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
  let path = PARAM_APPOINTMENT_TYPE_PATH;
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
  this.appointmentTypeService.getAllListNew(params).subscribe((pData) => {
    this.appointment_type = pData;
    this.count = this.appointmentTypeService.size;
    
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


  
  editProduct(appointment_typ: Appointment_type) {
    this.appointment_typ = {...appointment_typ};
}



onDelete(id: number, category_name: string) {

  this.confirmationService.confirm({
    message: 'Sei sicuro di volerlo cancellare',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.appointmentTypeService.delete(+id).subscribe(
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

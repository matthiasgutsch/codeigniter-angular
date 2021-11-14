import { Component, OnInit, ViewChild } from '@angular/core';
import { Tags } from '../../../../models/tags';
import {ConfirmationService} from 'primeng/api';
import { Table } from 'primeng/table';
import { Technical_data } from 'src/app/models/technical_data';
import { TechnicalDataService } from 'src/app/services/technical_data.service';
import { Personal_data } from 'src/app/models/personal_data';
import { PersonalDataService } from 'src/app/services/personal_data.service';

@Component({
  selector: 'app-manage-personal-data',
  templateUrl: './manage-personal-data.component.html'
})
export class ManagePersonalDataComponent implements OnInit {
  title = 'Dati Personali aggiuntivi';
  personal_data: Personal_data;
  personal_dat: Personal_data;
  error: string;
  loading: boolean;
  public cols: any[];
  public columnOptions: any[];
  public selectedColumns: any[];

  @ViewChild('dt', { static: true }) dt: Table;

  constructor(private personalDataService: PersonalDataService, 
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
    this.personalDataService.getAllListbyUser().subscribe(
      (data: Personal_data) => this.personal_data = data,
      error => this.error = error
    );
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


  
  editProduct(personal_dat: Personal_data) {
    this.personal_dat = {...personal_dat};
}



onDelete(id: number, category_name: string) {

  this.confirmationService.confirm({
    message: 'Are you sure want to delete it',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.personalDataService.delete(+id).subscribe(
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

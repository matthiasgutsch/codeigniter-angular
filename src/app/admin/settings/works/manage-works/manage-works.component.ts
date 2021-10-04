import { Component, OnInit } from '@angular/core';
import { Works } from '../../../../models/works';
import {ConfirmationService} from 'primeng/api';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-manage-works',
  templateUrl: './manage-works.component.html'
})
export class ManageWorksComponent implements OnInit {
  title = 'Tipo di lavorazione';
  works: Works;
  work: Works;
  error: string;
  loading: boolean;
  public cols: any[];
  public columnOptions: any[];
  public selectedColumns: any[];


  constructor(private worksService: WorksService, private confirmationService: ConfirmationService,) {

    this.cols = [
      { field: 'name', header: 'Nome', index: 1 },
      { field: 'description', header: 'Prezzo/h', index: 2 }
    ];

    this.columnOptions = [];
    this.selectedColumns = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
    }

    
   }

  ngOnInit() {
    this.worksService.getAllListbyUser().subscribe(
      (data: Works) => this.works = data,
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


  
  editProduct(work: Works) {
    this.work = {...work};
}



onDelete(id: number, category_name: string) {

  this.confirmationService.confirm({
    message: 'Are you sure want to delete it',
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

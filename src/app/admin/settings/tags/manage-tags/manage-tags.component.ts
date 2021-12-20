import { Component, OnInit, ViewChild } from '@angular/core';
import { Tags } from '../../../../models/tags';
import {ConfirmationService} from 'primeng/api';
import { WorksService } from 'src/app/services/works.service';
import { Table } from 'primeng/table';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html'
})
export class ManageTagsComponent implements OnInit {
  title = 'Tags';
  tags: Tags;
  tag: Tags;
  error: string;
  loading: boolean;
  public cols: any[];
  public columnOptions: any[];
  public selectedColumns: any[];

  @ViewChild('dt', { static: true }) dt: Table;

  constructor(private tagsService: TagsService, private confirmationService: ConfirmationService,) {

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
    this.tagsService.getAllListbyUser().subscribe(
      (data: Tags) => this.tags = data,
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


  
  editProduct(tag: Tags) {
    this.tag = {...tag};
}



onDelete(id: number, category_name: string) {

  this.confirmationService.confirm({
    message: 'Are you sure want to delete it',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.tagsService.delete(+id).subscribe(
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

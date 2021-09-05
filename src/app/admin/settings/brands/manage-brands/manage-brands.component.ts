import { Component, OnInit } from '@angular/core';
import { Works } from '../../../../models/works';
import {ConfirmationService} from 'primeng/api';
import { WorksService } from 'src/app/services/works.service';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-manage-brands',
  templateUrl: './manage-brands.component.html'
})
export class ManageBrandsComponent implements OnInit {
  title = 'Tipo di lavorazione';
  brands: Brand;
  brand: Brand;
  error: string;
  public cols: any[];
  public columnOptions: any[];
  public selectedColumns: any[];


  constructor(private brandsService: BrandService, private confirmationService: ConfirmationService,) {

    this.cols = [
      { field: 'name', header: 'Nome', index: 1 },
      { field: 'description', header: 'Descrizione', index: 2 },
      { field: 'code', header: 'Codice', index: 2 }

    ];

    this.columnOptions = [];
    this.selectedColumns = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
    }

    
   }

  ngOnInit() {
    this.brandsService.getAllList().subscribe(
      (data: Brand) => this.brands = data,
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


  
  editProduct(brand: Brand) {
    this.brand = {...brand};
}



onDelete(id: number, category_name: string) {

  this.confirmationService.confirm({
    message: 'Are you sure want to delete it',
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

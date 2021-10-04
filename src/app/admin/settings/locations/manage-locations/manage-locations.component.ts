import { Component, OnInit } from '@angular/core';
import { Works } from '../../../../models/works';
import {ConfirmationService} from 'primeng/api';
import { WorksService } from 'src/app/services/works.service';
import { LocationsService } from 'src/app/services/locations.service';
import { Locations } from 'src/app/models/locations';

@Component({
  selector: 'app-manage-locations',
  templateUrl: './manage-locations.component.html'
})
export class ManageLocationsComponent implements OnInit {
  title = 'Luogo di lavorazione';
  locations: Locations;
  location: Locations;
  error: string;

  public cols: any[];
  public columnOptions: any[];
  public selectedColumns: any[];
  currentUser: any;
  
  constructor(private locationsService: LocationsService, 
    private confirmationService: ConfirmationService,) { 

      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

    }

  ngOnInit() {
    this.locationsService.getAllListbyUser().subscribe(
      (data: Locations) => this.locations = data,
      error => this.error = error
    );


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


onDelete(id: number, category_name: string) {

  this.confirmationService.confirm({
    message: 'Are you sure want to delete it = ' + category_name,
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

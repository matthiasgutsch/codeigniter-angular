import { Component, OnInit } from '@angular/core';
import { Works } from '../../../models/works';
import {ConfirmationService} from 'primeng/api';
import { WorksService } from 'src/app/services/works.service';
import { LocationsService } from 'src/app/services/locations.service';
import { Locations } from 'src/app/models/locations';

@Component({
  selector: 'app-manage-locations',
  templateUrl: './manage-locations.component.html'
})
export class ManageLocationsComponent implements OnInit {
  title = 'Tipo di lavorazione';
  locations: Locations;
  location: Locations;
  error: string;


  constructor(private locationsService: LocationsService, 
    private confirmationService: ConfirmationService,) { }

  ngOnInit() {
    this.locationsService.getAllList().subscribe(
      (data: Locations) => this.locations = data,
      error => this.error = error
    );
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

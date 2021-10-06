import { Component, OnInit, ViewChild } from '@angular/core';
import { Tags } from '../../../../models/tags';
import {ConfirmationService} from 'primeng/api';
import { WorksService } from 'src/app/services/works.service';
import { Table } from 'primeng/table';
import { TagsService } from 'src/app/services/tags.service';
import { Appointment_type } from 'src/app/models/appointment_type';
import { AppointmentTypeService } from 'src/app/services/appointment_type.service';

@Component({
  selector: 'app-manage-appointment-type',
  templateUrl: './manage-appointment-type.component.html'
})
export class ManageAppointmentTypeComponent implements OnInit {
  title = 'Tipo di Appuntamento';
  appointment_type: Appointment_type;
  appointment_typ: Appointment_type;
  error: string;
  loading: boolean;
  public cols: any[];
  public columnOptions: any[];
  public selectedColumns: any[];

  @ViewChild('dt', { static: true }) dt: Table;

  constructor(private appointmentTypeService: AppointmentTypeService, 
    private confirmationService: ConfirmationService,) {

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
    this.appointmentTypeService.getAllListbyUser().subscribe(
      (data: Appointment_type) => this.appointment_type = data,
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


  
  editProduct(appointment_typ: Appointment_type) {
    this.appointment_typ = {...appointment_typ};
}



onDelete(id: number, category_name: string) {

  this.confirmationService.confirm({
    message: 'Are you sure want to delete it',
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

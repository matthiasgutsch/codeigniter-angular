import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Appointment_type } from '../models/appointment_type';

@Injectable({
  providedIn: 'root'
})

export class AppointmentTypeService extends CrudService<Appointment_type, number> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/appointment_type`);
  }

}


import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Supports } from "../models/supports";
import { CrudService } from "./crud.service";

@Injectable({
  providedIn: "root",
})
export class SupportsService extends CrudService<Supports, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/supports`);
  }
}

import { Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpParams,
  HttpResponse,
  HttpRequest,
} from "@angular/common/http";
import { CrudOperations } from "./crud-operations.interface";
import { catchError, map } from "rxjs/operators";
import { Billings } from "../models/billings";
import { Task } from "../models/tasks";
import { Orders } from "../models/orders";
import { Quotes } from "../models/quotes";
import { User } from "../auth/auth.type";
import { Paginated } from "../models/generics/paginate";
import { plainToInstance } from "class-transformer";
import { Comuni } from "../models/comuni";

interface IPaginated<T> extends Paginated<T> {}

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {
  currentUser: User;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;
  username: string;
  user_id: number;
  size: number;

  password: string;
  first_name: string;
  last_name: string;
  pages: any[];

  constructor(protected _http: HttpClient, protected _base: string) {
    this.currentUser = plainToInstance(
      User,
      JSON.parse(localStorage.getItem("currentUser"))
    );
  }

  getParams(params: HttpParams, pars: any): HttpParams {
    if (pars.name) {
      params = params.append("name", pars.name);
    }
    if (pars.created_at_lte) {
      params = params.append("filter.created_at", `$lte:${pars.created_at_lte}T23:59:59.999Z`);
    }
    if (pars.created_at_gte) {
      params = params.append("filter.created_at", `$gte:${pars.created_at_gte}T00:00:00.000Z`);
    }
    if (pars.name_ilike) {
      params = params.append("filter.name", `$ilike:${pars.name_ilike}`);
    }
    if (pars.surname_ilike) {
      params = params.append("filter.surname", `$ilike:${pars.surname_ilike}`);
    }
    if (pars.description) {
      params = params.append("description", pars.description);
    }
    if (pars.code) {
      params = params.append("code", pars.code);
    }
    if (pars.code_int) {
      params = params.append("code_int", pars.code_int);
    }
    if (pars.brand) {
      params = params.append("brand", pars.brand);
    }
    if (pars.dateFrom) {
      params = params.append("date_from", pars.dateFrom);
    }
    if (pars.client) {
      params = params.append("client", pars.client);
    }
    if (pars.employee) {
      params = params.append("employee", pars.employee);
    }
    if (pars.project_id) {
      params = params.append("project_id", pars.project_id);
    }
    if (pars.type) {
      params = params.append("type", pars.type);
    }
    if (pars.dateTo) {
      params = params.append("date_to", pars.dateTo);
    }
    params = params.append("page", pars.page);
    if (pars.size) {
      params = params.append("limit", pars.size);
    }
    return params;
  }

  public find(id: string): Observable<T> {
    const userId = this.currentUser.id;
    return this._http.get<T>(this._base + "/find/" + id + "/" + userId).pipe(
      map((res) => {
        const t: any = res as any; // json();
        return t;
      }),
      catchError(this.handleError)
    );
  }

  getAllList() {
    return this._http
      .get<T[]>(this._base + "/")
      .pipe(catchError(this.handleError));
  }

  public warehouse_movement_by_product(pars: any, id: ID): Observable<T[]> {
    let params = new HttpParams();
    const userId = this.currentUser.id;
    params = this.getParams(params, pars);
    return this._http
      .get<HttpResponse<T[]>>(
        this._base + "/warehouse_movement_by_product/" + id + "/" + userId,
        {
          observe: "response",
          params,
        }
      )
      .pipe(
        map((res) => {
          this.size =
            res.headers.get("x-total-count") != null
              ? +res.headers.get("x-total-count")
              : 0;
          const ts: any = res.body;
          return ts;
        }),
        catchError(this.handleError)
      );
  }

  public getAllListNew(pars: any): Observable<T[]> {
    let params = new HttpParams();
    const userId = this.currentUser.id;
    params = this.getParams(params, pars);
    return this._http
      .get<HttpResponse<T[]>>(this._base + "/", {
        observe: "response",
        params,
      })
      .pipe(
        map((res) => {
          this.size =
            res.headers.get("x-total-count") != null
              ? +res.headers.get("x-total-count")
              : 0;
          const ts: any = res.body;
          return ts;
        }),
        catchError(this.handleError)
      );
  }

  public getAllListPaginated(pars: any): Observable<Paginated<T>> {
    let params = new HttpParams();
    params = this.getParams(params, pars);
    return this._http
      .get<HttpResponse<Paginated<T>>>(this._base + "/", {
        observe: "response",
        params,
      })
      .pipe(
        map((res) => plainToInstance(Paginated<T>, res.body)),
        catchError(this.handleError)
      );
  }

  public getAllListCalendar(pars: any): Observable<T[]> {
    let params = new HttpParams();
    const userId = this.currentUser.id;
    params = this.getParams(params, pars);
    return this._http
      .get<HttpResponse<T[]>>(this._base + "/calendar/" + userId, {
        observe: "response",
        params,
      })
      .pipe(
        map((res) => {
          this.size =
            res.headers.get("x-total-count") != null
              ? +res.headers.get("x-total-count")
              : 0;
          const ts: any = res.body;
          return ts;
        }),
        catchError(this.handleError)
      );
  }

  public getAllListDocuments(pars: any, id: ID): Observable<T[]> {
    let params = new HttpParams();
    const userId = this.currentUser.id;
    params = this.getParams(params, pars);
    return this._http
      .get<HttpResponse<T[]>>(this._base + "/list_user/" + id + "/" + userId, {
        observe: "response",
        params,
      })
      .pipe(
        map((res) => {
          this.size =
            res.headers.get("x-total-count") != null
              ? +res.headers.get("x-total-count")
              : 0;
          const ts: any = res.body;
          return ts;
        }),
        catchError(this.handleError)
      );
  }

  public find_timesheets_employee(pars: any, id: ID): Observable<T[]> {
    let params = new HttpParams();
    const userId = this.currentUser.id;
    params = this.getParams(params, pars);
    return this._http
      .get<HttpResponse<T[]>>(
        this._base + "/timesheets_by_employee/" + id + "/" + userId,
        {
          observe: "response",
          params,
        }
      )
      .pipe(
        map((res) => {
          this.size =
            res.headers.get("x-total-count") != null
              ? +res.headers.get("x-total-count")
              : 0;
          const ts: any = res.body;
          return ts;
        }),
        catchError(this.handleError)
      );
  }

  public find_documents(pars: any, id: ID): Observable<T[]> {
    let params = new HttpParams();
    const userId = this.currentUser.id;
    params = this.getParams(params, pars);
    return this._http
      .get<HttpResponse<T[]>>(
        this._base + "/timesheets_by_employee/" + id + "/" + userId,
        {
          observe: "response",
          params,
        }
      )
      .pipe(
        map((res) => {
          this.size =
            res.headers.get("x-total-count") != null
              ? +res.headers.get("x-total-count")
              : 0;
          const ts: any = res.body;
          return ts;
        }),
        catchError(this.handleError)
      );
  }

  public getAllTimesheetsbyProject(pars: any, id: ID): Observable<T[]> {
    let params = new HttpParams();
    const userId = this.currentUser.id;
    params = this.getParams(params, pars);
    return this._http
      .get<HttpResponse<T[]>>(
        this._base + "/timesheets_by_project/" + id + "/" + userId,
        {
          observe: "response",
          params,
        }
      )
      .pipe(
        map((res) => {
          this.size =
            res.headers.get("x-total-count") != null
              ? +res.headers.get("x-total-count")
              : 0;
          const ts: any = res.body;
          return ts;
        }),
        catchError(this.handleError)
      );
  }

  getAllListbyUser() {
    const userId = this.currentUser.id;
    return this._http
      .get<T>(this._base + "/user/" + userId)
      .pipe(catchError(this.handleError));
  }

  getAllTasksListbyUser(project_id: number) {
    const userId = this.currentUser.id;
    return this._http
      .get<T>(this._base + "/user_project/" + project_id + "/" + userId)
      .pipe(catchError(this.handleError));
  }

  count() {
    return this._http
      .get<T>(this._base + "/count")
      .pipe(catchError(this.handleError));
  }

  countCharts() {
    const userId = this.currentUser.id;
    return this._http
      .get<T>(this._base + "/user/" + userId)
      .pipe(catchError(this.handleError));
  }

  countChartsNone() {
    const userId = this.currentUser.id;
    return this._http
      .get<T>(this._base + "/user_none/" + userId)
      .pipe(catchError(this.handleError));
  }

  getToday(userId: number) {
    return this._http
      .get<T>(this._base + "/today/" + userId)
      .pipe(catchError(this.handleError));
  }

  getActive(userId: number) {
    return this._http
      .get<T>(this._base + "/active/" + userId)
      .pipe(catchError(this.handleError));
  }

  getProductsVariations(id: number) {
    const userId = this.currentUser.id;
    return this._http.get<Billings>(
      this._base + "/variations_by_product/" + id + "/" + userId
    );
  }

  search_client(name: string) {
    return this._http
      .get<T>(this._base + "/search/?name=" + name)
      .pipe(catchError(this.handleError));
  }

  find_client(id: ID) {
    return this._http
      .get<T>(this._base + "/appointments_by_client/id/" + id)
      .pipe(catchError(this.handleError));
  }

  find_billing_client(id: number) {
    return this._http.get<Billings>(this._base + "/billings_by_client/" + id);
  }

  find_tickets_support_id(id: number) {
    const userId = this.currentUser.id;
    return this._http.get<Billings>(this._base + "/tickets/" + id);
  }

  find_billings_by_appointments(id: number) {
    return this._http.get<Billings>(
      this._base + "/billings_by_appointments/" + id
    );
  }

  find_billings_by_appointment_id(id: number) {
    return this._http.get<Billings>(
      this._base + "/billings_by_appointment_id/" + id
    );
  }

  find_billings_by_order_id(id: number) {
    return this._http.get<Billings>(
      this._base + "/get_billings_by_order_id/" + id
    );
  }

  find_orders_by_quotes_id(id: number) {
    return this._http.get<Orders>(this._base + "/get_order_by_quotes_id/" + id);
  }

  find_tasks_employee(id: ID) {
    const userId = this.currentUser.id;
    return this._http
      .get<T>(this._base + "/tasks_by_employee/" + id + "/" + userId)
      .pipe(catchError(this.handleError));
  }

  timesheets_by_employee_calendar(id: ID) {
    const userId = this.currentUser.id;
    return this._http
      .get<T>(
        this._base + "/timesheets_by_employee_calendar/" + id + "/" + userId
      )
      .pipe(catchError(this.handleError));
  }

  count_total_permissions_timesheets_employee(id: ID) {
    const userId = this.currentUser.id;
    return this._http
      .get<T>(
        this._base +
          "/count_total_permissions_timesheets_employee/" +
          id +
          "/" +
          userId
      )
      .pipe(catchError(this.handleError));
  }

  count_total_vacations_timesheets_employee(id: ID) {
    const userId = this.currentUser.id;
    return this._http
      .get<T>(
        this._base +
          "/count_total_vacations_timesheets_employee/" +
          id +
          "/" +
          userId
      )
      .pipe(catchError(this.handleError));
  }

  count_total_timesheets_employee(id: ID) {
    const userId = this.currentUser.id;
    return this._http
      .get<T>(
        this._base + "/count_total_timesheets_employee/" + id + "/" + userId
      )
      .pipe(catchError(this.handleError));
  }

  timesheet_by_project_employee(id: ID) {
    const userId = this.currentUser.id;
    return this._http
      .get<T>(
        this._base + "/timesheet_by_project_employee/" + id + "/" + userId
      )
      .pipe(catchError(this.handleError));
  }

  skills(id: ID) {
    const userId = this.currentUser.id;
    return this._http
      .get<T>(this._base + "/skills/" + id + "/" + userId)
      .pipe(catchError(this.handleError));
  }

  countTotal(id: ID) {
    const userId = this.currentUser.id;
    return this._http
      .get<T>(this._base + "/count_total/" + userId)
      .pipe(catchError(this.handleError));
  }

  get_projects_timesheets_chart(id: ID) {
    const userId = this.currentUser.id;
    return this._http
      .get<T>(this._base + "/get_projects_timesheets_chart/" + id)
      .pipe(catchError(this.handleError));
  }

  countTotalNotPaid(id: ID) {
    const userId = this.currentUser.id;
    return this._http
      .get<T>(this._base + "/count_total_no_paid/" + userId)
      .pipe(catchError(this.handleError));
  }
  getId(id: ID) {
    return this._http
      .get<T>(this._base + "/" + id)
      .pipe(catchError(this.handleError));
  }

  getImages(id: ID): Observable<any> {
    const userId = this.currentUser.id;
    return this._http.get<T>(this._base + "/getimages/" + id + "/" + userId);
  }

  getFiles(id: ID): Observable<any> {
    const userId = this.currentUser.id;
    return this._http.get<T>(this._base + "/getfiles/" + id + "/" + userId);
  }

  upload(file: File, id): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const userId = this.currentUser.id;

    formData.append("product_id", id);
    formData.append("user_id", userId.toString());
    formData.append("image", file);

    const req = new HttpRequest(
      "POST",
      `${this._base}/upload/` + userId,
      formData,
      {
        reportProgress: true,
        responseType: "json",
      }
    );

    return this._http.request(req);
  }

  getAppointmentId(id: ID) {
    return this._http
      .get<T>(this._base + "/id/" + id)
      .pipe(catchError(this.handleError));
  }

  createTicket(blog, id?: number) {
    let url = this._base + "/create";
    if (id) {
      url += "/" + id;
    }
    return this._http.post<any>(url, blog).pipe(catchError(this.handleError));
  }
  create(blog) {
    return this._http
      .post<any>(this._base, blog)
      .pipe(catchError(this.handleError));
  }

  update(blog, id: number) {
    const userId = this.currentUser.id;
    return this._http
      .post<any>(this._base + "/update/" + id + "/" + userId, blog)
      .pipe(catchError(this.handleError));
  }

  close(id: number) {
    return this._http
      .post<any>(this._base + "/close/" + id, {})
      .pipe(catchError(this.handleError));
  }

  open(id: number) {
    return this._http
      .post<any>(this._base + "/open/" + id, {})
      .pipe(catchError(this.handleError));
  }

  update_skills(blog, id: number) {
    const userId = this.currentUser.id;
    return this._http
      .post<any>(this._base + "/update_skills/" + id + "/" + userId, blog)
      .pipe(catchError(this.handleError));
  }

  update_priority(blog, id: number) {
    const userId = this.currentUser.id;
    return this._http
      .post<any>(this._base + "/update_priority/" + id + "/" + userId, blog)
      .pipe(catchError(this.handleError));
  }

  update_quantity(blog, id: number) {
    const userId = this.currentUser.id;
    return this._http
      .post<any>(this._base + "/update_quantity/" + id + "/" + userId, blog)
      .pipe(catchError(this.handleError));
  }

  update_priority_employee(blog, id: number) {
    const userId = this.currentUser.id;
    return this._http
      .post<any>(
        this._base + "/update_priority_employee/" + id + "/" + userId,
        blog
      )
      .pipe(catchError(this.handleError));
  }

  billingStatus(blog, id: number) {
    const userId = this.currentUser.id;
    return this._http
      .post<any>(this._base + "/billing_status/" + id + "/" + userId, blog)
      .pipe(catchError(this.handleError));
  }

  delete(id: number) {
    const userId = this.currentUser.id;
    return this._http
      .delete(this._base + "/delete/" + id + "/" + userId)
      .pipe(catchError(this.handleError));
  }

  delete_image(id: number) {
    const userId = this.currentUser.id;
    return this._http
      .delete(this._base + "/delete_image/" + id + "/" + userId)
      .pipe(catchError(this.handleError));
  }

  save(t: T): Observable<T> {
    return this._http.post<T>(this._base, t);
  }

  update_new(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this._base + "/" + id, t, {});
  }

  findOne_new(id: ID): Observable<T> {
    return this._http.get<T>(this._base + "/" + id);
  }

  findAll_new(): Observable<T[]> {
    return this._http.get<T[]>(this._base);
  }

  delete_new(id: ID): Observable<T> {
    return this._http.delete<T>(this._base + "/" + id);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened. Please try again later.");
  }
}

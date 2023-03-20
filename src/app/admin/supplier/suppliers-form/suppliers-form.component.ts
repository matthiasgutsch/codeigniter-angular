import { Location } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ConfirmationService, MessageService } from "primeng/api";
import { Appointments } from "src/app/models/appointments";
import { Billings } from "src/app/models/billings";
import { Comuni } from "src/app/models/comuni";
import { Personal_data } from "src/app/models/personal_data";
import { Suppliers } from "src/app/models/suppliers";
import { AppointmentsService } from "src/app/services/appointments.service";
import { BillingsService } from "src/app/services/billings.service";
import { ComuniService } from "src/app/services/comuni.service";
import { PersonalDataService } from "src/app/services/personal_data.service";
import { SuppliersService } from "src/app/services/suppliers.service";
import { Category } from "../../../models/category";
import { CategoryService } from "../../../services/categories.service";
import {
  BUSINESS_STATE_LIST,
  FISCAL_CODE_VALIDATOR_REGEX,
  SEX_LIST,
  STATE_LIST,
} from "../../constants/constants";
import * as moment from "moment";

@Component({
  selector: "app-suppliers-form",
  templateUrl: "./suppliers-form.component.html",
})
export class SuppliersFormComponent implements OnInit {
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;

  clientsList: any = [];

  categories: any = [];
  category: Category;
  checked: boolean = true;
  selectedValue: string;
  comuni: Comuni[] = [];

  blogForm: UntypedFormGroup;
  typeList: any[];

  format1: string = "";
  format2: string = "";
  selectedCity: Suppliers;
  selectedCategories: Category;
  selectedDate: Date;
  date: Date;
  appointments: any = [];
  is_featured = "0";
  deleteButton: boolean;
  billings: any = [];
  billing: Billings;
  currentUser: any;
  addForm: UntypedFormGroup;
  rows: UntypedFormArray;
  itemForm: UntypedFormGroup;
  skillsForm: UntypedFormGroup;
  skillsValues: any = [];
  stateOptions: any[];
  cols: any[];
  exportColumns: any[];
  _selectedColumns: any[];
  businessStateOptions: any[];
  personal_datas: any = [];
  personal_data: Personal_data;
  personName: string;

  trackByFn(index, item) {
    return item.id;
  }

  constructor(
    private fb: UntypedFormBuilder,
    private suppliersService: SuppliersService,
    private messageService: MessageService,
    private personalDataService: PersonalDataService,
    private categoryService: CategoryService,
    private comuniService: ComuniService,
    private _location: Location,
    private appointmentsService: AppointmentsService,
    private billingsService: BillingsService,
    private spinner: NgxSpinnerService,

    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
    this.typeList = SEX_LIST;
    this.stateOptions = STATE_LIST;
    this.businessStateOptions = BUSINESS_STATE_LIST;

    this.route.paramMap.subscribe((params) => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.spinner.show();

    const userId = this.currentUser.id;
    this.getClientList();

    this.comuniService.getAllList().subscribe(
      (data) => (this.comuni = data),
      (error) => (this.error = error)
    );

    this.personalDataService.getAllListbyUser().subscribe(
      (data: Personal_data) => (this.personal_datas = data),
      (error) => (this.error = error)
    );

    const id = this.route.snapshot.paramMap.get("id");

    if (id) {
      this.pageTitle = "Modifica Fornitore";
      this.deleteButton = true;

      this.appointmentsService.find_client(+id).subscribe(
        (data: Appointments) => (this.appointments = data),
        (error) => (this.error = error)
      );

      this.billingsService.find_billing_client(+id).subscribe(
        (data: Billings) => (this.billings = data),
        (error) => (this.error = error)
      );

      this.suppliersService.getId(+id).subscribe((res) => {
        if (res.user_id == this.currentUser.id) {
          this.blogForm.patchValue({
            name: res.name,
            surname: res.surname,
            company_name: res.company_name,
            city: res.city,
            zip: res.zip,
            address: res.address,
            province: res.province,
            region: res.region,
            email: res.email,
            phone: res.phone,
            fiscalcode: res.fiscalcode,
            fiscalnumber: res.fiscalnumber,
            description: res.description,
            user_id: this.currentUser.id,
            category_id: res.category_id,
            is_featured: res.is_featured,
            is_active: res.is_active,
            date: res.date,
            id: res.id,
            skills: this.skillsValues,
          });
        } else {
          this.router.navigate(["/admin/suppliers"]);
        }
        this.imagePath = res.image;
        this.personName = res.name + " " + res.surname;
      });
    } else {
      this.deleteButton = false;
      this.pageTitle = "Aggiungi Fornitore";
    }

    this.blogForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      company_name: ["", Validators.required],
      city: ["", Validators.required],
      zip: ["", Validators.required],
      address: ["", Validators.required],
      province: ["", Validators.required],
      region: [""],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      fiscalcode: new UntypedFormControl("", Validators.compose([codFisc])),
      fiscalnumber: new UntypedFormControl(""),
      description: [""],
      is_featured: ["0"],
      user_id: [this.currentUser.id],
      category_id: ["", Validators.required],
      is_active: ["0"],
      image: [""],
      date: ["", Validators.required],
      skills: this.initSkill(),
    });

    this.spinner.hide();
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogForm.get("image").setValue(file);

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imagePath = reader.result;
      };
    }
  }

  getClientList() {
    this.suppliersService.getAllListbyUser().subscribe((data) => {
      this.clientsList = data;
      this.cols = [{ field: "username", header: "Nome" }];
      this._selectedColumns = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
    });
  }

  removeQuantity(i: number) {
    this.skills.removeAt(i);
  }

  getCategoryItem(category_id: string, id: string) {
    return this.categories.find((item) => item.id === category_id);
  }

  hasNoSelectedAppointments() {
    return (
      this.appointments.filter((appointment) => appointment.title).length === 0
    );
  }

  hasNoSelectedBillings() {
    return this.billings.filter((billing) => billing.title).length === 0;
  }

  onDelete(id: number, title: string) {
    this.confirmationService.confirm({
      message: "Sei sicuro di volerlo cancellare",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.suppliersService.delete(+id).subscribe(
          (res) => {
            console.log(res);
            this.messageService.add({
              key: "cancel",
              severity: "success",
              summary: "Attenzione",
              detail: "Cancellazione avvenuto con successo",
            });
            this._location.back();
          },
          (error) => {
            this.error = error;
            this.messageService.add({
              key: "cancel",
              severity: "warn",
              summary: "Attenzione",
              detail: "Errore backend",
            });
          }
        );
      },
    });
  }

  initSkill() {
    var formArray = this.fb.array([]);
    const id = this.route.snapshot.paramMap.get("id");

    this.suppliersService.skills(+id).subscribe((res) => {
      this.skillsValues = res;

      this.skillsValues.forEach((e) => {
        formArray.push(
          this.fb.group({
            qty: [e.qty],
            price: [e.price],
          })
        );
      });
    });

    /*formArray.push(this.fb.group({
      qty: [''],
      price: ['']
    })) */

    return formArray;
  }

  private createSkillFormGroup(skill: any): UntypedFormGroup {
    return new UntypedFormGroup({
      qty: new UntypedFormControl(skill.qty),
      price: new UntypedFormControl(skill.price),
    });
  }

  public addSkill(skill: any) {
    this.skills.push(this.createSkillFormGroup(skill));
  }

  get skills() {
    return this.blogForm.get("skills") as UntypedFormArray;
  }

  newQuantity(): UntypedFormGroup {
    return this.fb.group({
      qty: "",
      price: "",
    });
  }

  addQuantity() {
    this.skills.push(this.newQuantity());
  }

  removeImageFile() {
    this.imagePath = "";
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
  }

  get title() {
    return this.blogForm.get("title");
  }

  get id() {
    return this.blogForm.get("id").value;
  }

  get description() {
    return this.blogForm.get("description");
  }

  onSubmit() {
    const id = this.blogForm.get("id").value;
    const data = structuredClone(this.blogForm.value);
    data.date = moment(data.date, "DD/MM/YYYY").format("YYYY-MM-DD");
    data.is_active = data.is_active === "1" ? true : false;
    delete data.id;

    if (id) {
      this.suppliersService.update(data, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({
              key: "myKey1",
              severity: "success",
              summary: "Attenzione",
              detail: "Salvato con sucesso",
            });
            // this._location.back();
            this.getClientList();
          }
        },
        (error) => (this.error = error)
      );
    } else {
      this.suppliersService.create(data).subscribe(
        (res) => {
          if (res.status === "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({
              key: "myKey1",
              severity: "success",
              summary: "Attenzione",
              detail: "Salvato con sucesso",
            });
            this.router.navigate(["/admin/suppliers"]);
          }
        },
        (error) => (this.error = error)
      );
    }
  }
}

export function codFisc(c: UntypedFormControl): { [s: string]: boolean } {
  if (c.value && !c.value.match(FISCAL_CODE_VALIDATOR_REGEX)) {
    return { invalidCF: true };
  }
}

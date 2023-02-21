import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { CmspageService } from "src/app/cmspage/cmspage.service";
import { Billings } from "src/app/models/billings";
import { Contact } from "src/app/models/contact";
import { Supports } from "src/app/models/supports";
import { SupportsService } from "src/app/services/supports.service";

@Component({
  selector: "app-supports-form",
  templateUrl: "./supports-form.component.html",
})
export class SupportsFormComponent implements OnInit {
  title = "Support";
  model = new Contact();
  submitted = false;
  error = {};
  success: any;
  id: number;
  is_active: string;
  blogForm: UntypedFormGroup;
  currentUser: any;
  contactForm: UntypedFormGroup;
  uploadError: string;
  pageTitle: string;
  support: Supports;
  supports: Observable<Supports[]>;
  supportsList: any;
  supportsCount: Supports;

  constructor(
    private router: Router,
    private cmspageService: CmspageService,
    private titleService: Title,
    protected route: ActivatedRoute,
    private supportsService: SupportsService,
    private fb: UntypedFormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _location: Location
  ) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.id = +this.route.snapshot.paramMap.get("id");

    this.blogForm = this.fb.group({
      title: ["", Validators.required],
      phone: [""],
      message: ["", Validators.required],
      name: [this.currentUser.first_name + " " + this.currentUser.last_name],
      sender_id: [this.currentUser.id],
      email: [""],
      status: ["0"]
    });

    if (this.id) {
      this.supportsService.getId(this.id).subscribe((res) => {
        // TODO chiedere a Matthias
        // if (res.user_id == this.currentUser.id) {
          this.blogForm.patchValue({
            title: res.title,
            phone: res.phone,
            email: res.email,
            name: res.name,
            sender_id: res.sender_id ?? this.currentUser.id,
            is_active: res.is_active,
            data: res.data,
            status: res.status
          });

          this.support = res;
          // this.route.paramMap.subscribe((params) => {
          //   this.supportsService.getId(+id).subscribe(
          //     (data) => {
          //       this.support = data;
          //     },
          //     (error) => console.log(error)
          //   );
          // });
          this.supportsService.find_tickets_support_id(this.id).subscribe(
            (data: Billings) => (this.supportsList = data),
            (error) => (this.error = error)
          );
        // } else {
        //   // this.router.navigate(["/admin/products"]);
        // }

        this.is_active = res.is_active;
      });
    } else {
    }
  }

  onDelete(id: number, title: string) {
    this.confirmationService.confirm({
      message: "Sei sicuro di volerlo cancellare = " + id,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.supportsService.delete(+id).subscribe(
          (res) => {
            console.log(res);
            this.ngOnInit();
            this.messageService.add({
              key: "myKey1",
              severity: "warn",
              summary: "Attenzione",
              detail: "Cancellazione avvenuto con successo",
            });
          },
          (error) => (this.error = error)
        );
      },
    });
  }

  onSubmit() {
    const formData = new FormData();


    if (this.id) {
      this.supportsService.create(this.blogForm.value, this.id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.supportsService.find_tickets_support_id(this.id).subscribe(
              (data: Billings) => (this.supportsList = data),
              (error) => (this.error = error)
            );
            this.messageService.add({
              key: "myKey1",
              severity: "success",
              summary: "Informazioni",
              detail: "Richiesta inviata con sucesso",
            });
            this.blogForm.get("message").reset();
          }
        },
        (error) => (this.error = error)
      );
    } else {

      this.supportsService.create(this.blogForm.value).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({
              key: "myKey1",
              severity: "success",
              summary: "Informazioni",
              detail: "Richiesta inviata con sucesso",
            });
            this.router.navigate(["/admin/support"]);
            this.getSupportsCount();
          }
        },
        (error) => (this.error = error)
      );
    }
  }

  close() {
    const formData = new FormData();
    formData.set("is_active", "0");

    this.supportsService.update(formData, this.id).subscribe(
      (res) => {
        if (res.status == "error") {
          this.uploadError = res.message;
        } else {
          this.messageService.add({
            key: "myKey1",
            severity: "warn",
            summary: "Informazioni",
            detail: "Ticket chiuso con sucesso",
          });
          this.blogForm.get("message").reset();
          this.ngOnInit();
        }
      },
      (error) => (this.error = error)
    );
  }

  open() {
    const formData = new FormData();
    formData.set("is_active", "1");
    this.supportsService.update(formData, this.id).subscribe(
      (res) => {
        if (res.status == "error") {
          this.uploadError = res.message;
        } else {
          this.messageService.add({
            key: "myKey1",
            severity: "success",
            summary: "Informazioni",
            detail: "ticket aperto con sucesso",
          });
          this.blogForm.get("message").reset();
          this.ngOnInit();
        }
      },
      (error) => (this.error = error)
    );
  }

  onSubmit_old() {
    this.submitted = true;
    return this.cmspageService.contactForm(this.model).subscribe(
      (data) => (this.success = data),
      (error) => (this.error = error)
    );
    this.router.navigate(["/admin/support/"]);
  }

  getSupportsCount() {
    this.supportsService.count().subscribe((data) => {
      this.supportsCount = data;
      (error) => (this.error = error);
    });
  }

  gotoHome() {
    this.router.navigate(["/"]);
  }
}

import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });

    this.authService.logout().subscribe();

    this.spinner.hide();
  }

  get username() {
    return this.loginForm.get("username");
  }
  get password() {
    return this.loginForm.get("password");
  }

  onSubmit() {
    this.submitted = true;
    this.authService.login(this.username.value, this.password.value).subscribe(
      () => {
        if (this.authService.isLoggedIn()) {
          this.authService.getProfile().subscribe(() => {
            const redirect = this.authService.redirectUrl
              ? this.authService.redirectUrl
              : "/admin";
            this.router.navigate([redirect]);
          });
        } else {
          this.loginError = "Username or password is incorrect.";
        }
      },
      (error) => (this.error = error)
    );
  }
}

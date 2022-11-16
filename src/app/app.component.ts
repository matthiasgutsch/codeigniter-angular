import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { AuthService } from "./auth/auth.service";
import { EventBusService } from "./_shared/event-bus.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  flag = true;
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    public route: Router,
    private spinner: NgxSpinnerService,
    public translate: TranslateService,
    private readonly authService: AuthService,
    private readonly eventBusService: EventBusService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    if(this.isLoggedIn) {
      const user = this.authService.getUser();
      this.roles = [];
      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.authService.logout().subscribe();
    });
  }

  ngOnDestroy() {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }
}

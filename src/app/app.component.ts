import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

import { environment } from "../environments/environment";
import { AppConfig } from "./config/app_config";
import { CacheService } from "./services/cache_service";

// declare ga as a function to access the JS code in TS
declare let gtag;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "skydrm-portal";

  drawerOpened = false;

  public showCookieConsent = true;

  constructor(
    private router: Router,
    public cache: CacheService,
    private cookieService: CookieService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag("config", "UA-179982683-1", {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  ngOnInit(): void {
    let cookie = this.cookieService.get("skydrm.com-cookie");
    if (cookie != null && cookie != "") {
      this.showCookieConsent = false;
    }
  }

  updateCookieConsent(): void {
    this.cookieService.set("skydrm.com-cookie", "yes");
    let pane = document.getElementById("consent-pane");
    pane.remove();
  }

  gotoLogin(): boolean {
    this.drawerOpened = false;

    let href: string =
      location.protocol + "//" + location.host + environment.rmsLoginUrl;

    if (!environment.production) {
      href = AppConfig.rmsHost + environment.rmsLoginUrl;
    }

    gtag("event", "login", {
      event_category: "SkyDRM",
      event_label: "Login to SkyDRM",
    });

    const newWin = window.open(href, "_target");
    newWin.focus();

    return false;
  }

  gotoRegister(): void {
    this.drawerOpened = false;

    let href: string =
      location.protocol + "//" + location.host + environment.rmsRegisterUrl;
    if (!environment.production) {
      href = AppConfig.rmsHost + environment.rmsRegisterUrl;
    }

    gtag("event", "register", {
      event_category: "SkyDRM",
      event_label: "Register with SkyDRM",
    });

    const newWin = window.open(href, "_target");
    newWin.focus();
  }

  clickDrawer(): void {
    this.drawerOpened = !this.drawerOpened;
  }

  scrollTo(id: string): void {
    if (this.router.url !== "/home") {
      this.router.navigate(["home"]).then(() => {
        this.scrollToElement(id);
      });
    } else {
      this.scrollToElement(id);
    }
  }

  private scrollToElement(elementId: string): void {
    this.drawerOpened = false;
    setTimeout((): void => {
      const anchorElement = document.getElementById(elementId);
      anchorElement.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }
}

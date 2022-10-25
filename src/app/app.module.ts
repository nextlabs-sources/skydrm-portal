import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppMaterialModule } from "./app.material.module";
import { NgxCaptchaModule } from "ngx-captcha";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PageNotFoundComponent } from "./errors/page-not-found.component";
import { SendEmailComponent } from "./email/send_email.component";
import { TermsComponent } from "./licenses/terms.component";
import { WinDownloadComponent } from "./download/win_download.component";

import { HomeComponent } from "./home/home.component";
import { HomeSection1Component } from "./home/home_section1.component";
import { HomeSection2Component } from "./home/home_section2.component";
import { HomeSection3Component } from "./home/home_section3.component";
import { HomeSection4Component } from "./home/home_section4.component";
import { HomeSection5Component } from "./home/home_section5.component";
import { HomeSection6Component } from "./home/home_section6.component";

import { TutorialSectionComponent } from "./home/tutorial_section.component";

import { QuestionComponent } from "./questionnare/question.component";
import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { ResourcePanelComponent } from "./resources/resource-panel.component";
import { VideoBarComponent } from "./resources/video/widgets/video_bar.component";
import { VideoResourcesComponent } from "./resources/video/resources.component";
import { CookieService } from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SendEmailComponent,
    TermsComponent,
    WinDownloadComponent,
    PageNotFoundComponent,
    QuestionComponent,
    VideoBarComponent,
    VideoResourcesComponent,
    MaintenanceComponent,
    HomeSection1Component,
    HomeSection2Component,
    HomeSection3Component,
    HomeSection4Component,
    HomeSection5Component,
    HomeSection6Component,
    TutorialSectionComponent,
    ResourcePanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    NgxCaptchaModule,
  ],
  //providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

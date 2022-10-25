import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageNotFoundComponent } from "./errors/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { TermsComponent } from "./licenses/terms.component";
import { WinDownloadComponent } from "./download/win_download.component";
import { QuestionComponent } from "./questionnare/question.component";
import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { ResourcePanelComponent } from "./resources/resource-panel.component";

const routes: Routes = [
  // Home Page
  { path: "home", component: HomeComponent },

  // Redirect landing page to home
  { path: "", redirectTo: "/home", pathMatch: "full" },

  // Terms and Condition Page
  { path: "terms", component: TermsComponent },

  // Questionnaire
  { path: "questionnaire", component: QuestionComponent },

  // Maintenance
  { path: "maintenance", component: MaintenanceComponent },

  // Windows RMC Download Page
  { path: "win-download", component: WinDownloadComponent },

  // Resources Page
  { path: "resources", component: ResourcePanelComponent },

  // 404 Page
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

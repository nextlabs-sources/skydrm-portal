import { Component, OnInit, OnDestroy } from "@angular/core";
import { environment } from "../../environments/environment";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { GoogleAnalyticsService } from "../services/google-analytics.service";

@Component({
  selector: "win_download",
  templateUrl: "win_download.html",
  styleUrls: ["win_download.scss"],
})
export class WinDownloadComponent implements OnInit, OnDestroy {
  //downloadWinPart1URL = environment.RMD_WIN_PART1_DOWNLOAD_URL;
  //downloadWinPart2URL = environment.RMD_WIN_PART2_DOWNLOAD_URL;
  //winPart1File = environment.RMD_WIN_PART1_FILE;
  //winPart2File = environment.RMD_WIN_PART2_FILE;
  //winZipFile = environment.RMD_WIN_ZIP_FILE;

  downloadWinZipURL = environment.RMD_WIN_ZIP_DOWNLOAD_URL;
  winExe = environment.RMD_WIN_EXE;

  email: string = "";
  showEmailTab: string = "true";

  public downloadForm: FormGroup;

  public validation_messages = {
    email: [
      { type: "required", message: "Email is required" },
      {
        type: "maxlength",
        message: "Email cannot be more than 100 characters long",
      },
      { type: "pattern", message: "Enter a valid email" },
    ],
  };

  constructor(
    private apiService: ApiService,
    private gtagService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    //console.log("WinDownloadComponent initialised");

    this.downloadForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
      ]),
    });
  }

  ngOnDestroy() {
    //console.log("WinDownloadComponent destroyed");
  }

  public requestDownload = (downloadFormValue) => {
    if (this.downloadForm.invalid) {
      console.log("Form validation failed");
      return;
    }

    this.showEmailTab = "false";
  };

  downloadWinZip() {
    this.gtagService.eventEmitter(
      "Download",
      "RMD",
      "Downloading Windows Client"
    );

    window.open(
      this.downloadWinZipURL,
      "Downloading SkyDRM Protection Windows Client",
      ""
    );
  }
}

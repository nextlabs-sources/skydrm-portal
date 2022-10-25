import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import docResources from "../../assets/json/resources.json";
import { Link, WebResource } from "../models/resources";

@Component({
  selector: "resource-panel",
  templateUrl: "resource-panel.html",
  styleUrls: ["resource-panel.scss"],
})
export class ResourcePanelComponent implements OnInit {
  images: string[] = [
    "/assets/img/skydrm/home1_bg.svg",
    "/assets/img/skydrm/home2_bg.svg",
  ];

  white_paper_list: Link[];
  datasheet_list: Link[];

  webinar_title: string = "Webinars";
  webinar_background: string = this.images[0];
  webinar_desc: string =
    "A series of videos showing the key features and use cases of SkyDRM";

  showVideo: boolean = false;

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    let web_res: WebResource = new WebResource();
    web_res.fromJson(docResources);

    this.white_paper_list = web_res.whitePapers.list;
    this.updateDocDetail(this.white_paper_list);

    this.datasheet_list = web_res.datasheets.list;
    this.updateDocDetail(this.datasheet_list);
  }

  private updateDocDetail(list: any[]): void {
    list.forEach((val) => {
      const ran = Math.floor(Math.random() * 2);
      val.backgroundImage = this._sanitizer.bypassSecurityTrustStyle(
        `url(${this.images[ran]})`
      );
    });
  }

  openLink(item: { link: string }): void {
    window.open(item.link, "_blank");
  }

  openVideo(): void {
    console.log("Open video");
    this.showVideo = true;
  }

  closeVideo(): void {
    console.log("Close video");
    this.showVideo = false;
  }
}

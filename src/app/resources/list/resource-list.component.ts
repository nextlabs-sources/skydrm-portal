import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import resourcesDocsJson from "../../../assets/json/resources.json";

@Component({
  selector: "resource-list-panel",
  templateUrl: "resource-list.html",
  styleUrls: ["resource-list.scss"],
})
export class ResourceListComponent implements OnInit {
  selectedValue: string;
  iframeSrc: SafeResourceUrl;
  selectedTab;
  constructor(
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }
  list = [];
  showDialog = "";

  ngOnInit(): void {
    const images: string[] = [
      "/assets/img/skydrm/home1_bg.svg",
      "/assets/img/skydrm/home2_bg.svg",
    ];
    this.selectedValue = this.route.snapshot.paramMap.get("name");

    if (resourcesDocsJson[this.selectedValue]) {
      this.selectedTab = resourcesDocsJson[this.selectedValue].title;
      this.list = resourcesDocsJson[this.selectedValue].list;
      this.list.forEach((val) => {
        if (val.iframeSrc) {
          const youtube_video_id = val.iframeSrc
            .match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)
            .pop();
          val.thumbnail = this._sanitizer.bypassSecurityTrustStyle(
            `url(//img.youtube.com/vi/${youtube_video_id}/0.jpg)`
          );
        }
        const ran = Math.floor(Math.random() * 2);
        val.backgroundImage = this._sanitizer.bypassSecurityTrustStyle(
          `url(${images[ran]})`
        );
      });
    } else {
      this.router.navigate(["**"]);
    }
  }

  openDialog(item: { iframeSrc: string }): void {
    this.showDialog = "is-active";
    this.iframeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(
      item.iframeSrc
    );
  }

  closeDialog(): void {
    this.showDialog = " ";
  }

  openLink(item: { link: string }): void {
    window.open(item.link, "_blank");
  }
}

import { Component, Input } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { PlayList, Video } from "../../../models/resources";

@Component({
  selector: "app-video-bar",
  templateUrl: "video_bar.component.html",
  styleUrls: ["video_bar.component.scss"],
})
export class VideoBarComponent {
  @Input()
  videos: PlayList = new PlayList();

  startIndex = 0;
  endIndex = 3;
  maxItem = 4;

  popStartIndex = 0;
  popEndIndex = 4;
  popMaxItem = 5;

  showDialog = false;
  video_url: SafeResourceUrl = "";

  constructor(private _sanitizer: DomSanitizer) {}

  slideLeft() {
    if (this.startIndex > 0) {
      this.startIndex--;
      this.endIndex--;
    }
  }

  slideRight() {
    if (this.endIndex < this.videos.list.length - 1) {
      if (this.videos.list.length > this.maxItem) {
        this.startIndex++;
        this.endIndex++;
      }
    }
  }

  popSlideLeft() {
    if (this.popStartIndex > 0) {
      this.popStartIndex--;
      this.popEndIndex--;
    }
  }

  popSlideRight() {
    if (this.popEndIndex < this.videos.list.length - 1) {
      if (this.videos.list.length > this.popMaxItem) {
        this.popStartIndex++;
        this.popEndIndex++;
      }
    }
  }

  selectVideo(item: Video) {
    this.video_url = this._sanitizer.bypassSecurityTrustResourceUrl(
      item.video_url
    );
  }

  isVisible(index: number): boolean {
    if (index < this.startIndex || index > this.endIndex) {
      return false;
    }
    return true;
  }

  isPopVisible(index: number): boolean {
    if (index < this.popStartIndex || index > this.popEndIndex) {
      return false;
    }
    return true;
  }

  openDialog(item: any): void {
    //console.log(item.video_url);
    this.video_url = this._sanitizer.bypassSecurityTrustResourceUrl(
      item.video_url
    );

    this.showDialog = true; //"is-active";
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  dialogCss(): string {
    return this.showDialog ? "modal is-active" : "modal";
  }
}

import { Component, OnInit } from "@angular/core";
import { PlayList } from "../../models/resources";

import vidResources from "../../../assets/json/video/resources.json";

@Component({
  selector: "video-resources",
  templateUrl: "./resources.component.html",
  styleUrls: ["./resources.component.scss"],
})
export class VideoResourcesComponent implements OnInit {
  basicList: PlayList = new PlayList();
  demoList: PlayList = new PlayList();
  tutorialList: PlayList = new PlayList();

  ngOnInit(): void {
    var pList = vidResources["playlist"];

    this.basicList.fromJson(pList[0]);
    this.demoList.fromJson(pList[1]);
    this.tutorialList.fromJson(pList[2]);
  }
}

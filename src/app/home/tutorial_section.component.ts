import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'tutorial-section',
  templateUrl: 'tutorial_section.html',
  styleUrls: ['tutorial_section.scss']
})
export class TutorialSectionComponent implements OnInit, OnDestroy {

  videoUrl:string = environment.helpVideoUrl;

  ngOnInit() {
    //console.log("HomeTutorialComponent initialised");
  }

  ngOnDestroy() {
    //console.log("TutorialComponent destroyed");
  }

  gotoVideo() {

    window.open(this.videoUrl, '_target');
  }
}


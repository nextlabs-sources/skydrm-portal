import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'home-section1',
  templateUrl: 'home_section1.html',
  styleUrls: ['home_section1.scss']
})
export class HomeSection1Component implements OnInit, OnDestroy {

  public showAnnouncement :boolean = false;


  ngOnInit() {
      //console.log("HomeSection1Component initialised");
  }

  ngOnDestroy() {
    //console.log("HomeSection1Component destroyed");

  }

}


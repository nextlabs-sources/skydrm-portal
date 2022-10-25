import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'home-section3',
  templateUrl: 'home_section3.html',
  styleUrls: ['home_section3.scss']
})
export class HomeSection3Component implements OnInit, OnDestroy {

    ngOnInit() {
        //console.log("HomeSection3Component initialised");
    }

     ngOnDestroy() {
        //console.log("HomeSection3Component destroyed");

     }
}


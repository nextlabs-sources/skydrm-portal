import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  ngOnInit() {
    //console.log("HomeComponent initialised");
  }

  ngOnDestroy() {
    //console.log("HomeComponent destroyed");
  }
}


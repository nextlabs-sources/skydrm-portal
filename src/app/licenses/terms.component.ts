import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'terms-section',
  templateUrl: 'terms.html',
  styleUrls: ['terms.scss']
})
export class TermsComponent implements OnInit, OnDestroy {

    ngOnInit() {
        //console.log("TermsComponent initialised");
    }

     ngOnDestroy() {
        //console.log("TermsComponent destroyed");

     }

}
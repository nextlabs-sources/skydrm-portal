import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppConfig } from '../config/app_config';

@Component({
  selector: 'home-section2',
  templateUrl: 'home_section2.html',
  styleUrls: ['home_section2.scss']
})
export class HomeSection2Component {

    showPanel: string = "false";
    showTab1: string = "true";
    showTab2: string = "false";
    showTab3: string = "false";
    showTab4: string = "false";
    dot1Color: string = "dot-color-active";
    dot2Color: string = "dot-color";
    dot3Color: string = "dot-color";
    dot4Color: string = "dot-color";

    private currentTab: number = 1;

    public showIntegrationDetails() {

        this.showPanel = (this.showPanel == "false") ? "true": "false";
    }

    public nextTab():void {

        if(this.currentTab == 1) {
            this.showTab1 = "false";
            this.showTab2 = "true";
            this.currentTab++;

            this.dot1Color = "dot-color";
            this.dot2Color = "dot-color-active";
            this.dot3Color = "dot-color";
            this.dot4Color = "dot-color";

            return;
        }

        if(this.currentTab == 2) {
            this.showTab2 = "false";
            this.showTab3 = "true";
            this.currentTab++;

            this.dot1Color = "dot-color";
            this.dot2Color = "dot-color";
            this.dot3Color = "dot-color-active";
            this.dot4Color = "dot-color";

            return;
        }

        if(this.currentTab == 3) {
            this.showTab3 = "false";
            this.showTab4 = "true";
            this.currentTab++;

            this.dot1Color = "dot-color";
            this.dot2Color = "dot-color";
            this.dot3Color = "dot-color";
            this.dot4Color = "dot-color-active";

        }

    }

    public prevTab() {
        if(this.currentTab == 4) {
            this.showTab4 = "false";
            this.showTab3 = "true";
            this.currentTab--;

            this.dot1Color = "dot-color";
            this.dot2Color = "dot-color";
            this.dot3Color = "dot-color-active";
            this.dot4Color = "dot-color";

            return;
        }

        if(this.currentTab == 3) {
            this.showTab3 = "false";
            this.showTab2 = "true";
            this.currentTab--;

            this.dot1Color = "dot-color";
            this.dot2Color = "dot-color-active";
            this.dot3Color = "dot-color";
            this.dot4Color = "dot-color";

            return;
        }

        if(this.currentTab == 2) {
            this.showTab2 = "false";
            this.showTab1 = "true";
            this.currentTab--;

            this.dot1Color = "dot-color-active";
            this.dot2Color = "dot-color";
            this.dot3Color = "dot-color";
            this.dot4Color = "dot-color";

         }

    }

    public gotoTab1() {
        this.currentTab = 1;
        this.showTab1 = "true";
        this.showTab2 = "false";
        this.showTab3 = "false";
        this.showTab4 = "false";

        this.dot1Color = "dot-color-active";
        this.dot2Color = "dot-color";
        this.dot3Color = "dot-color";
        this.dot4Color = "dot-color";

   }

    public gotoTab2() {
        this.currentTab = 2;
        this.showTab1 = "false";
        this.showTab2 = "true";
        this.showTab3 = "false";
        this.showTab4 = "false";

        this.dot1Color = "dot-color";
        this.dot2Color = "dot-color-active";
        this.dot3Color = "dot-color";
        this.dot4Color = "dot-color";

    }

    public gotoTab3() {
        this.currentTab = 3;
        this.showTab1 = "false";
        this.showTab2 = "false";
        this.showTab3 = "true";
        this.showTab4 = "false";

        this.dot1Color = "dot-color";
        this.dot2Color = "dot-color";
        this.dot3Color = "dot-color-active";
        this.dot4Color = "dot-color";

    }

    public gotoTab4() {
        this.currentTab = 4;
        this.showTab1 = "false";
        this.showTab2 = "false";
        this.showTab3 = "false";
        this.showTab4 = "true";

        this.dot1Color = "dot-color";
        this.dot2Color = "dot-color";
        this.dot3Color = "dot-color";
        this.dot4Color = "dot-color-active";

  }

  gotoRegister() {
    let href:string = location.protocol + "//" + location.host + AppConfig.rmsRegisterUrl;
    if(!environment.production) {
      href = AppConfig.rmsHost + AppConfig.rmsRegisterUrl;
    }

    window.open(href, '_target');
  }

  loginURL():string {
    let href:string = location.protocol + "//" + location.host + AppConfig.rmsLoginUrl;
    if(!environment.production) {
      href = AppConfig.rmsHost + AppConfig.rmsLoginUrl;
    }

    return href;
  }

  developerURL():string {
    return environment.developerUrl;
  }

}


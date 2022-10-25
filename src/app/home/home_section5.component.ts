import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { GoogleAnalyticsService } from '../services/google-analytics.service';

@Component({
  selector: 'home-section5',
  templateUrl: 'home_section5.html',
  styleUrls: ['home_section5.scss']
})
export class HomeSection5Component implements OnInit, OnDestroy {

  downloadMacURL = environment.RMD_MAC_DOWNLOAD_URL;
  downloadIOSURL = environment.RMC_IOS_DOWNLOAD_URL;
  downloadAndroidURL = environment.RMC_ANDROID_DOWNLOAD_URL;

  constructor(private gtagService: GoogleAnalyticsService) { }

  ngOnInit() {
    //console.log("HomeSection5Component initialised");
  }

  ngOnDestroy() {
    //console.log("HomeSection5Component destroyed");

  }

  downloadAndroid() {
    this.gtagService.eventEmitter("Download", "Android", "Downloading Android Client");

    window.open(environment.RMC_ANDROID_DOWNLOAD_URL, 'Downloading SkyDRM');
    //return this.downloadAndroidURL;
  }

  downloadIOS() {
    this.gtagService.eventEmitter("Download", "IOS", "Downloading IOS Client");

    window.open(environment.RMC_IOS_DOWNLOAD_URL, 'Downloading SkyDRM', '');

  }

  downloadMAC() {
    this.gtagService.eventEmitter("Download", "MacOS", "Downloading MacOS Client");

    window.open(environment.RMD_MAC_DOWNLOAD_URL, 'Downloading SkyDRM', '');

  }

}


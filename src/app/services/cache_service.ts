import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CacheService {
  public isMenuVisible: boolean = true;
  public headless: boolean = false;
}

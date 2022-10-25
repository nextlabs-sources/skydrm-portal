import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  questionUrl = environment.questionUrl;
  apiKey = environment.apiKey;
  questionFormUrl = environment.questionFormUrl;

  constructor(private httpClient: HttpClient) {

  }

  public submitCustomerQueryAWS(record:any) {

    //let params:HttpParams = new HttpParams();
    //params = params.append("sourceType", "skydrm");
    //params = params.append("phone", record.phone);
    //params = params.append("message", record.message);
    //params = params.append("name", record.name);
    //params = params.append("email", record.email);
    //params = params.append("company", record.company);

    let date: Date = new Date();
    let dateInSec:number = date.getTime() / 1000 ;
    //params = params.append("registerDate", "" + dateInSec.toFixed());

    let jsonData = {
      "sourceType" : "skydrm",
      "phone" : record.phone,
      "message" : record.message,
      "name" : record.name,
      "email" : record.email,
      "company" : record.company,
      "registerDate" : dateInSec.toFixed()
    };

    let httpOptions = {
      headers: new HttpHeaders().set("x-api-key", this.apiKey).set('Content-Type', 'application/json')
    };

    return this.httpClient.post<any[]>(`${this.questionUrl}`, jsonData, httpOptions);
  }

  /**
   * 
   * @param Answer 
   */
  public submitAnswer(record:Answer) {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-api-key': this.apiKey
      })
    };

    let jsonData = JSON.stringify(record);

    //console.log("JSON:", jsonData);

    return this.httpClient.post(`${this.questionFormUrl}`, jsonData, httpOptions)

  }

}

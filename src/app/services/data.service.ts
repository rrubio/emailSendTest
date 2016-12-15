import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

  private data: any;
  // private primaryEmailProvider   = "http://localhost:3000/testPostSendgrid";
  // private secondaryEmailProvider = "http://localhost:3000/testMailGunPost";

  private primaryEmailProvider   = "https://emailsend-94395.onmodulus.net/testPostSendgrid";
  private secondaryEmailProvider = "https://emailsend-94395.onmodulus.net/testMailGunPost";

  constructor(private _http: Http) { }

  /**
   * Primary email provider
   */
  submitEmail(formData) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');    

    return new Promise(resolve => {
        this._http.post(this.primaryEmailProvider, formData, {
          headers: headers
          })
          .map(res => res.json())
          .subscribe(response => {

            this.data = response;
            resolve(this.data);

        }, error => {

            this.data = error;
            resolve(this.data);

        });    
    });
  }

  /**
   *  In case of error with primary email provider 
   *  try failOver (second provider).
   */
  failOver(formData) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');    

    return new Promise(resolve => {
        this._http.post(this.secondaryEmailProvider, formData, {
          headers: headers
          })
          .map(res => res.json())
          .subscribe(response => {

            this.data = response;
            resolve(this.data);

        }, error => {
            this.data = error;
            resolve(this.data);
        });    
    });
  }

}

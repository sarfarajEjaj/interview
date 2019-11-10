import { Injectable } from '@angular/core';
import { config } from '../../shared/config';
import { Observable, from, throwError } from 'rxjs';
import { Http, Headers } from '@angular/http'
import { Platform } from '@ionic/angular'
import { map, catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from '../processHttpmsg/process-httpmsg.service'

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  public headers: any;
  public params = {};

  constructor(
    private http: Http,
    public platform: Platform,
    private processHttpmsgService: ProcessHttpmsgService,
  ) { }

  initializeHeader() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Content-Language', 'en');
  }

  postRequest(url: any, request: any): Observable<any> {
    this.initializeHeader();
    return this.http.post(config["baseURL"] + url, request, { headers: this.headers })
      .pipe(map(res => {
        return this.processHttpmsgService.extractData(res)
      }),
        catchError((error) => {
          console.log(error);
          return throwError(error)
        }))

  }

  getRequest(url: any): Observable<any> {
    this.initializeHeader();
    return this.http.get(config["baseURL"] + url, { headers: this.headers })
      .pipe(map(res => {
        return this.processHttpmsgService.extractData(res)
      }),
        catchError((error) => {
          return throwError(error)
        }))

  }

  public setParams(key, data) {
    this.params[key] = data;
  }

  public getParams(key) {
    return this.params[key];
  }
}

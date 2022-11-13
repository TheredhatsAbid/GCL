import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { getAll } from '../Classes/all-classes';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  envData;
  objgetAll:getAll;
  constructor(private router: Router, private httpClient: HttpClient) {
    this.envData = environment;
    this.objgetAll = new getAll();
  }

  Redirect(url: string) {
    var myurl = `${url}/${''}`;
    const that = this;
    that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      that.router.navigate([myurl])
    );
  }


  put(value: any, UrlName: string): Observable<any> {
    var token = sessionStorage.getItem("token");
    const headers = {
      'content-type': 'application/json',
      apikey: this.envData.apiAccessKey,
      'Authorization': 'Bearer ' + token
    };
    var url = `${this.envData.apiConn}`;
    url = url + UrlName;

    return this.httpClient.put(url, value, { headers: headers })
  }

  post(value: any, UrlName: string): Observable<any> {
  
    var token = sessionStorage.getItem("token");
    const headers = {
      'content-type': 'application/json',
      apikey: this.envData.apiAccessKey,
      'Authorization': 'Bearer ' + token
    };
    var url = `${this.envData.apiConn}`;
    url = url + UrlName;


    console.log('header')
    console.log(headers)
    console.log('payload')
    console.log(value)
    return this.httpClient.post(url, value, { headers: headers })
  }
  get_noPagination(value: any, paramName: string, UrlName: string): Observable<any> {
    debugger;
    var token = sessionStorage.getItem("token");
    const headers = {
      'content-type': 'application/json',
      apikey: this.envData.apiAccessKey,
      'Authorization': 'Bearer ' + token
    };

    var url = `${this.envData.apiConn}`;
    url = url + UrlName;
    const Parameter = new HttpParams().set(paramName, value.toString())

    return this.httpClient.get(url, { params: Parameter, headers: headers })
  }
  GetDetails(UrlName: string): Observable<any> {
    var token = sessionStorage.getItem("token");
    const headers = {
      'content-type': 'application/json',
      apikey: this.envData.apiAccessKey,
      'Authorization': 'Bearer ' + token
    };

    var url = `${this.envData.apiConn}`;
    var Url = url + UrlName;
    return this.httpClient.get(Url, { headers: headers });
  }
  noParam_GetDetails_pagination(UrlName: string, PnoVariableName: string, PsizeVariableName: string, pageNo: number = 1, pagesize: number = 15): Observable<any> {
    var token = sessionStorage.getItem("token");
    const headers = {
      'content-type': 'application/json',
      apikey: this.envData.apiAccessKey,
      'Authorization': 'Bearer ' + token
    };
    const Parameter = new HttpParams().set(PnoVariableName, pageNo.toString())
      .set(PsizeVariableName, pagesize.toString())

    var url = `${this.envData.apiConn}`;
    var Url = url + UrlName;
    return this.httpClient.get(Url, { params: Parameter, headers: headers });
  }
  GetWithParam_ID_p(value: any, UrlName: string, pagenumber: number = 1, pagesize: number = 15): Observable<any> {
    debugger;
    var token = sessionStorage.getItem("token");
    const headers = {
      'content-type': 'application/json',
      apikey: this.envData.apiAccessKey,
      'Authorization': 'Bearer ' + token
    };

    var url = `${this.envData.apiConn}`;
    url = url + UrlName + "/" + value;

    const Parameter = new HttpParams()
      .set('pagenumber', pagenumber.toString())
      .set('pagesize', pagesize.toString())

    return this.httpClient.get(url, { params: Parameter, headers: headers })
  }


  GetWithParam_and_pagination(name:any ,value: any, UrlName: string,pNumnText:any,pagesizeText:any, pagenumber: number = 1, pagesize: number = 15): Observable<any> {
    debugger;
    var token = sessionStorage.getItem("token");
    const headers = {
      'content-type': 'application/json',
      apikey: this.envData.apiAccessKey,
      'Authorization': 'Bearer ' + token
    };

    var url = `${this.envData.apiConn}`;
    url = url + UrlName;

    const Parameter = new HttpParams()
      .set('pagenumber', pagenumber.toString())
      .set('pagesize', pagesize.toString())

    return this.httpClient.get(url, { params: Parameter, headers: headers })
  }
}

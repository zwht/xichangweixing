import { Injectable } from '@angular/core';
import { HttpData } from '../interfaces/httpData';
import { HttpConfig } from '../decorators/HttpConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(
    private httpClient: HttpClient
  ) { }
  private url = '/v1/reports/:params1/:params2/:params3/:params4/:params5';

  // addAndUpdate
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'addAndUpdate'
    },
    roles: []
  })
  addAndUpdate(data: HttpData): Observable<any> {
    return data.observable;
  }

}

import { Injectable } from '@angular/core';
import { HttpData } from '../interfaces/httpData';
import { HttpConfig } from '../decorators/HttpConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient
  ) { }
  private url = '/v1/auth/:params1/:params2/:params3/:params4/:params5';
  // login
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'login'
    },
    roles: [],
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
  })
  login(data: HttpData): Observable<any> {
    return data.observable;
  }
}

import { Injectable } from '@angular/core';
import { HttpData } from '../interfaces/httpData';
import { HttpConfig } from '../decorators/HttpConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(
    private httpClient: HttpClient
  ) { }
  private url = '/v1/file/:params1/:params2/:params3/:params4/:params5';

  // add
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'upload'
    },
    roles: [1001]
  })
  add(data: HttpData): Observable<any> {
    return data.observable;
  }

  // downloadHead
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'downloadHead'
    },
    roles: []
  })
  downloadHead(data: HttpData): Observable<any> {
    return data.observable;
  }

}

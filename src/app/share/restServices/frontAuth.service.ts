import { Injectable } from '@angular/core';
import { HttpData } from '../interfaces/httpData';
import { HttpConfig } from '../decorators/HttpConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FrontAuthService {
  constructor(
    private httpClient: HttpClient
  ) { }
  private url = '/v1/frontAuth/:params1/:params2/:params3/:params4/:params5';

  // 添加房屋预定
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'saveRoomReservation'
    },
    roles: []
  })
  saveRoomReservation(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 添加网上订餐
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'saveOrderingMeals'
    },
    roles: []
  })
  saveOrderingMeals(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 添加车辆接送
  @HttpConfig({
    method: 'post',
    params: {
      params1: 'saveVehiclePick'
    },
    roles: []
  })
  saveVehiclePick(data: HttpData): Observable<any> {
    return data.observable;
  }

}

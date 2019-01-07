import { Injectable } from '@angular/core';
import { HttpData } from '../interfaces/httpData';
import { HttpConfig } from '../decorators/HttpConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FrontService {
  constructor(
    private httpClient: HttpClient
  ) { }
  private url = '/v1/front/:params1/:params2/:params3/:params4/:params5';

  // 根据条件查询工作动态
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getWorkDynamics'
    },
    roles: []
  })
  getWorkDynamics(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 根据条件设备查询
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getAllEquipemt'
    },
    roles: []
  })
  getAllEquipemt(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 根据条件供应商查询
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getAllByQuery'
    },
    roles: []
  })
  getAllByQuery(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 根据条件查询招标机构
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getOrgatioByQuery'
    },
    roles: []
  })
  getOrgatioByQuery(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 根据条件查询市场信息
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getMarketInformation'
    },
    roles: []
  })
  getMarketInformation(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 根据条件查询质量公告
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getQualityNotice'
    },
    roles: []
  })
  getQualityNotice(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 根据条件查询质量事件
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getQualityEventByQuery'
    },
    roles: []
  })
  getQualityEventByQuery(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 根据条件查询质量问题处理
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getQualityDealByQuery'
    },
    roles: []
  })
  getQualityDealByQuery(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 根据条件查询质量问题处理
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getDataDownloadAll'
    },
    roles: []
  })
  getDataDownloadAll(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 党建要闻列表
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getAllPart'
    },
    roles: []
  })
  getAllPart(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 根据id查询党建要闻详情
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getPartById'
    },
    roles: []
  })
  getPartById(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 查询管理规定列表
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getAllManagement'
    },
    roles: []
  })
  getAllManagement(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 根据条件查询通知公告
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getAllNoticeByQuery'
    },
    roles: []
  })
  getAllNoticeByQuery(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 强军要闻列表
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getAllArm'
    },
    roles: []
  })
  getAllArm(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 根据id查询强军要闻详情
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getArmById'
    },
    roles: []
  })
  getArmById(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 根据id查询设备详情
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getEquipmentById'
    },
    roles: []
  })
  getEquipmentById(data: HttpData): Observable<any> {
    return data.observable;
  }

  // 根据id查询供应商
  @HttpConfig({
    method: 'get',
    params: {
      params1: 'getSupplierById'
    },
    roles: []
  })
  getSupplierById(data: HttpData): Observable<any> {
    return data.observable;
  }
}

import { Component, OnInit } from '@angular/core';
import { FrontAuthService } from '../../../share/restServices/frontAuth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.less']
})
export class CarComponent implements OnInit {

  name = '';
  address = '';
  flight = '';
  trainNumber = '';
  trainPersons = '';
  vehicleType = '';
  vehicleArea = '';
  phone = '';
  applicationReason = '';
  date = new Date;
  dateTime = '';

  constructor(
    private router: Router,
    private frontAuthService: FrontAuthService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.dateChange(this.date);
  }
  save() {
    if (this.jiancha() === 0) {
      return;
    }
    this.frontAuthService.saveVehiclePick({
      data: {
        name: this.name,
        address: this.address,
        flight: this.flight,
        trainNumber: this.trainNumber,
        trainPersons: this.trainPersons,
        vehicleType: this.vehicleType,
        vehicleArea: this.vehicleArea,
        phone: this.phone,
        applicationReason: this.applicationReason,
        applicationTime: this.dateTime
      }
    }).subscribe(
      data => {
        if (data.errorCode === 0) {
          this.message.create('success', '保存成功');
          this.jump('', '');
        } else {
          this.message.create('error', '保存失败,错误代码' + data.errorCode);
        }
      }, err => {
      }
    );
  }

  jiancha() {
    if (this.name === '') {
      this.message.create('error', '请输入用车单位/人员姓名');
      return 0;
    }
    if (this.applicationReason === '') {
      this.message.create('error', '请输入申请事由');
      return 0;
    }
    if (this.address === '') {
      this.message.create('error', '请输入接送站地点');
      return 0;
    }
    if (this.trainPersons === '') {
      this.message.create('error', '请输用车人数');
      return 0;
    }
    if (this.phone === '') {
      this.message.create('error', '请输联系电话');
      return 0;
    }
    return 1;
  }

  dateChange(e: Date) {
    this.dateTime = e.getFullYear() + '-' + ('00' + (e.getMonth() + 1)).substr(-2) + '-' + ('00' + e.getDate()).substr(-2);
    this.dateTime = this.dateTime + ' ' + ('00' + e.getHours()).substr(-2) + ':' + ('00' + e.getMinutes()).substr(-2);
  }

  jump(i, id) { // 跳转
    this.router.navigate(['/' + i + '/' + id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { FrontAuthService } from '../../../share/restServices/frontAuth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {

  name = '';
  idnum = '';
  phone = '';
  workers = '';
  eatsCount = '';
  date = new Date;
  dateTime = '';
  remark = '';

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
    this.frontAuthService.saveOrderingMeals({
      data: {
        name: this.name,
        idnum: this.idnum,
        phone: this.phone,
        workers: this.workers,
        eatsCount: this.eatsCount,
        eatTime: this.dateTime,
        remark: this.remark,
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
      this.message.create('error', '请输入用餐人姓名');
      return 0;
    }
    if (this.phone === '') {
      this.message.create('error', '请输入联系电话');
      return 0;
    }
    if (this.workers === '') {
      this.message.create('error', '请输入工作单位');
      return 0;
    }
    if (this.eatsCount === '') {
      this.message.create('error', '请输入用餐人数');
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

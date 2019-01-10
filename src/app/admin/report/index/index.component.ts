import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../share/restServices/reports.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  name = '';
  workers = '';
  phone = '';
  title = '';
  content = '';

  constructor(
    private router: Router,
    private reportsService: ReportsService,
    private message: NzMessageService
  ) { }

  ngOnInit() {

  }
  save() {
    if (this.jiancha() === 0) {
      return;
    }

    this.reportsService.addAndUpdate({
      data: {
        name: this.name,
        workers: this.workers,
        phone: this.phone,
        title: this.title,
        content: this.content,
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
      this.message.create('error', '请输入名字');
      return 0;
    }
    if (this.workers === '') {
      this.message.create('error', '请输入工作单位');
      return 0;
    }
    if (this.phone === '') {
      this.message.create('error', '请输入联系电话');
      return 0;
    }
    if (this.title === '') {
      this.message.create('error', '请输入举报标题');
      return 0;
    }
    return 1;
  }

  jump(i, id) { // 跳转
    this.router.navigate(['/' + i + '/' + id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { FrontAuthService } from '../../../share/restServices/frontAuth.service';
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
  arm = 0;
  armNum = '';
  withArm = '';
  idnum = '';
  livingTime = '';
  leavingDate = '';
  allotment = '';
  phone = '';
  rooms = [{ roomsType: 1, rooms: 1 }];

  constructor(
    private router: Router,
    private frontAuthService: FrontAuthService,
    private message: NzMessageService
  ) { }

  ngOnInit() {

  }
  save() {
    if (this.jiancha() === 0) {
      return;
    }
    const rooms = [];
    const roomsType = [];
    for (let index = 0; index < this.rooms.length; index++) {
      rooms.push(this.rooms[index].rooms);
      roomsType.push(this.rooms[index].roomsType);
    }
    this.frontAuthService.saveRoomReservation({
      data: {
        name: this.name,
        workers: this.workers,
        arm: this.arm,
        armNum: this.armNum,
        withArm: this.withArm,
        idnum: this.idnum,
        livingTime: this.livingTime,
        leavingDate: this.leavingDate,
        allotment: this.allotment,
        // phone: this.phone,
        rooms: rooms.join(','),
        roomsType: roomsType.join(',')
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
    if (this.arm === 1) {
      if (this.armNum === '') {
        this.message.create('error', '请输入军官证号');
        return 0;
      }
      if (this.withArm === '') {
        this.message.create('error', '请输入与军人关系');
        return 0;
      }
    }
    if (this.livingTime === '') {
      this.message.create('error', '请选择入住日期');
      return 0;
    }
    if (this.leavingDate === '') {
      this.message.create('error', '请选择离店日期');
      return 0;
    }
    if (this.rooms.length === 0) {
      this.message.create('error', '至少要订一套房间');
      return 0;
    }
    if (this.allotment === '') {
      this.message.create('error', '请输入留房时间');
      return 0;
    }
    if (this.phone === '') {
      this.message.create('error', '请输入联系电话');
      return 0;
    }
    return 1;
  }
  addDelRoom(a) {
    if (a === '') {
      this.rooms.push({ roomsType: 1, rooms: 1 });
    } else {
      this.rooms.splice(a, 1);
    }
  }
  jump(i, id) { // 跳转
    this.router.navigate(['/' + i + '/' + id]);
  }
}

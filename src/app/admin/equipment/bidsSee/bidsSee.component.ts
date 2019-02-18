import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrontService } from '../../../share/restServices/front.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bidssee',
  templateUrl: './bidsSee.component.html',
  styleUrls: ['./bidsSee.component.less']
})
export class BidsSeeComponent implements OnInit {
  id = 0;
  data = {
    code: '', // 机构编号
    name: '',
    address: '', // 详细地址
    socialCreditCode: '', // 统一社会信用代码
    registDate: '', // 注册日期
    legalPerson: '', // 法人姓名
    legalPersonName: '', // 请输入法人身份证号
    contactsUserName: '', // 联系人姓名
    contactsUseIdnum: '', // 联系人身份证号
    phone: '',
    remark: '', // 备注
    region: '',
    grade: '',
  };
  iiiiimg = '';


  constructor(
    public route: ActivatedRoute,
    private frontService: FrontService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getByID();
  }
  getByID() {
    this.frontService.getOrgationById({
      params: {
        params2: this.id
      },
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.data = response.data;
          const a = '/v1/file/downloadHead?fileUrl=';
          if (response.data.logo === '') {
            this.iiiiimg = './assets/images/moren.jpg';
          } else {
            this.iiiiimg = a + response.data.logo.replace(/\//, '%2f');
          }
        }
      });
  }

  jump(i, id) { // 跳转
    this.router.navigate(['/' + i + '/' + id]);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AutoSizeType } from 'ng-zorro-antd/input/nz-input.directive';
import { AuthService } from 'src/app/share/restServices/auth.service';
import { SessionService } from 'src/app/share/services/session.service';
import { LoginSubject } from 'src/app/share/services/loginSubject.service';
import { RxjsMessageService } from 'src/app/share/services/rxjsMessage.service';
import { WorkDynamicsService } from 'src/app/share/restServices/workDynamics.service';
import { EquipmentService } from 'src/app/share/restServices/equipment.service';
import { AdminDivisionService } from 'src/app/share/restServices/admin-division.service';
import { SupplierService } from 'src/app/share/restServices/supplier.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['../../common/style/list.less', './index.component.less']
})
export class IndexComponent implements OnInit, OnDestroy {
  titOption = [{ 'border-bottom': '2px solid #CF2323', 'margin': '0 3px' }, {}, {}, 0]; // 信息查询标题样式
  titOption2 = [{ 'border-bottom': '2px solid #CF2323', 'margin': '0 3px' }, {}, {}]; // 质量信息标题样式
  marketOption = [{ 'font-weight': 600 }, {}, {}, {}, {}, {}, {}, {}, {}]; // 市场信息样式

  EquipQuery = { // 设备资产查询
    name: '', // 设备名称
    status: '', // 状态
    supplierName: '', // 供应商
  };
  EquipData = []; // 设备资产数据

  supplierQuery = {
    name: '',
    status: '',
  }; // 供应商查询
  supplierData = []; // 供应商数据

  bidsQuery = {
    name: '',
    grade: '',
  }; // 投标机构查询
  bidsData = []; // 投标机构数据

  provinceNum: string;
  cityNum: string;
  province: Array<{ provinceCode: string, provinceName: string }> = [];
  city: Array<{ cityCode: string, cityName: string }> = []; // 城市信息

  workDynamicsData = [{ face: '', title: '' }]; // 工作动态数据
  workDynamicsImg = { now: 0, img: '../../../../assets/images/moren.jpg', tit: '' }; // 工作动态图片
  value = '';
  level = null;
  checked = false;
  loginName;
  password;
  userInfoVo = '';
  subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    private session: SessionService,
    private rxjsMessageService: RxjsMessageService,
    private workDynamicsService: WorkDynamicsService,
    private equipmentService: EquipmentService,
    private adminDivisionService: AdminDivisionService,
    private supplierService: SupplierService,
  ) { }

  ngOnInit() {
    const userInfo = this.session.getItem('userInfoVo');
    this.userInfoVo = userInfo ? JSON.parse(userInfo) : '';
    if (this.session.getItem('checked')) {
      this.loginName = this.session.getItem('userName');
      this.password = this.session.getItem('password');
      this.checked = true;
    }
    this.subscription = this.rxjsMessageService.getMessage()
      .subscribe(message => {
        if (message.type === 'exit') {
          this.userInfoVo = '';
        }
      });

    this.getWorkDynamicsList();
    this.equipmentList();
    this.getAdminDivision(1, '');
    this.supplierList();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getWorkDynamicsList() { // 工作动态
    this.workDynamicsService.list({
      params: {
        params2: 5,
        params3: 1,
        // status: 1
      }
    }).subscribe(
      data => {
        this.workDynamicsData = data.data.pageData;
        this.workDynamicsTP();
      }, err => {

      }
    );
  }

  workDynamicsTP() { // 工作动态图片
    const that = this;
    const a = '/v1/file/downloadHead?fileUrl=';
    setInterval(function () {
      if (that.workDynamicsData[that.workDynamicsImg.now].face === 'null') {
        that.workDynamicsImg.img = '../../../../assets/images/moren.jpg';
      } else {
        that.workDynamicsImg.img = a + that.workDynamicsData[that.workDynamicsImg.now].face.replace(/\//, '%2f');
      }
      that.workDynamicsImg.tit = that.workDynamicsData[that.workDynamicsImg.now].title;
      if (that.workDynamicsImg.now < that.workDynamicsData.length - 1) {
        that.workDynamicsImg.now++;
      } else {
        that.workDynamicsImg.now = 0;
      }
    }, 5000);
  }

  supplierList() {
    this.supplierService['getAllByQuery']({
      params: {
        pageNumber: 1,
        pageSize: 3,
        name: this.supplierQuery.name,
        status: this.supplierQuery.status,
      }
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.supplierData = response.data.pageData;
        }
      });
  }

  equipmentList() { // 设备资产查询
    this.equipmentService.getAllByQuery({
      params: {
        pageNumber: 1,
        pageSize: 3,
        name: this.EquipQuery.name,
        status: this.EquipQuery.status,
        supplierName: this.EquipQuery.supplierName,
      }
    }).subscribe(
      data => {
        this.EquipData = data.data.pageData;
      }, err => {

      }
    );
  }

  getAdminDivision(level, id) {
    if (id == null) {
      this.city = [];
      this.cityNum = null;
      return;
    }
    this.adminDivisionService.list({
      params: {
        params2: 1,
        params3: 9999
      },
      data: {
        provinceCode: id,
        level: level
      }
    }).subscribe(response => {
      if (response.errorCode === 0) {
        if (level === 1) {
          this.province = response.data.pageData;
        } else {
          this.city = [];
          this.cityNum = null;
          this.city = response.data.pageData;
        }
      }
    });
  }

  login() {
    this.authService.login({
      data: { userName: this.loginName, password: this.password }
    }).subscribe(
      data => {
        if (data.errorCode === 0) {
          this.userInfoVo = data.data.userInfoVO;
          this.session.setItem('token', data.data.token);
          this.session.setItem('userName', data.data.userInfoVO.userName);
          this.session.setItem('userId', data.data.userInfoVO.id);
          this.session.setItem('userInfoVo', JSON.stringify(data.data.userInfoVO));
          if (this.checked) {
            this.session.setItem('checked', 1);
            this.session.setItem('password', this.password, '2h');
          } else {
            this.session.removeItem('checked');
            this.session.removeItem('password');
          }
          this.rxjsMessageService.sendMessage({
            type: 'login',
            data: data.data
          });
        }
      },
      err => {
      }
    );
  }
  titOptionOK(i) {
    // 信息查询标题点击样式修改
    this.titOption = [{}, {}, {}, i];
    this.titOption[i] = { 'border-bottom': '2px solid #CF2323', 'margin': '0 3px' };
  }
  titOption2OK(i) {
    // 质量信息标题点击样式修改
    this.titOption2 = [{}, {}, {}];
    this.titOption2[i] = { 'border-bottom': '2px solid #CF2323', 'margin': '0 3px' };
  }
  marketOptionOK(i) {
    // 市场信息样式点击样式修改
    this.marketOption = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
    this.marketOption[i] = { 'font-weight': 600 };
  }
  jump(i, id) { // 跳转
    this.router.navigate(['/' + i + '/' + id]);
  }
}

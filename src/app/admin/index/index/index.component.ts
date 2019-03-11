import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AutoSizeType } from 'ng-zorro-antd/input/nz-input.directive';
import { AuthService } from 'src/app/share/restServices/auth.service';
import { SessionService } from 'src/app/share/services/session.service';
import { LoginSubject } from 'src/app/share/services/loginSubject.service';
import { RxjsMessageService } from 'src/app/share/services/rxjsMessage.service';
import { AdminDivisionService } from 'src/app/share/restServices/admin-division.service';
import { FrontService } from '../../../share/restServices/front.service';
import { NzModalService } from 'ng-zorro-antd';
import { OtherService } from 'src/app/share/restServices/other.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['../../common/style/list.less', './index.component.less']
})
export class IndexComponent implements OnInit, OnDestroy {
  titOption = [{ 'border-bottom': '2px solid #CF2323', 'margin': '0 3px' }, {}, {}, 0]; // 信息查询标题样式
  titOption2 = [{ 'border-bottom': '2px solid #CF2323', 'margin': '0 3px' }, {}, {}]; // 质量信息标题样式
  marketOption = [{ 'font-weight': 600 }, {}, {}, {}, {}, {}, {}, {}, {}]; // 市场信息样式

  loading = true;
  EquipQuery = { // 设备资产查询
    name: '', // 设备名称
    leadingPerson: '', // 状态
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

  marketData = []; // 市场信息数据
  industry = ''; // 市场信息行业

  qualityData = []; // 质量专栏数据
  DataDownloadData = []; // 资料下载数据

  newsData = []; // 党建要闻
  managementData = []; // 管理规定
  noticeData = []; // 通知公告

  provinceNum: string;
  cityNum: string;
  province: Array<{ provinceCode: string, provinceName: string }> = [];
  city: Array<{ cityCode: string, cityName: string }> = []; // 城市信息

  workDynamicsData = [{ face: '', title: '' }]; // 工作动态数据
  workDynamicsImg = {
    active: true,
    img: './assets/images/moren.jpg',
    tit: '',
    id: null
  }; // 工作动态图片
  value = '';
  level = null;
  checked = false;
  loginName;
  password;
  userInfoVo;
  subscription;
  token;
  industryList = [];
  imgList = [];
  time;

  constructor(
    private router: Router,
    private authService: AuthService,
    private session: SessionService,
    private rxjsMessageService: RxjsMessageService,
    private adminDivisionService: AdminDivisionService,
    private frontService: FrontService,
    private nzModalService: NzModalService,
    private otherService: OtherService,

  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.time) {
      clearTimeout(this.time);
    }
  }

  ngOnInit() {
    const userInfo = this.session.getItem('userInfoVo');
    this.userInfoVo = userInfo ? JSON.parse(userInfo) : '';
    this.token = this.session.getItem('token');
    if (this.session.getItem('checked')) {
      this.loginName = this.session.getItem('loginName');
      this.password = this.session.getItem('password');
      this.checked = true;
    }
    this.subscription = this.rxjsMessageService.getMessage()
      .subscribe(message => {
        if (message.type === 'exit') {
          if (!this.checked) {
            this.loginName = this.password = '';
          }
          this.token = '';
        }
      });
    this.loading = true;
    this.getWorkDynamicsList();
    this.equipmentList();
    this.getAdminDivision(1, '');
    this.supplierList();
    this.bidsList();
    this.marketList();
    this.qualityNoticeList();
    this.newsList();
    this.noticeList();
    this.managementList();
    this.dataDownloadList();
    this.otherService.industry({
    }).subscribe(res => {
      this.industryList = res.data;
    });
  }

  keydown(e) {
    if (e.keyCode === 13) {
      if (this.loginName && this.password) {
        this.login();
      }
    }
  }
  newsList() { // 党建要闻
    this.frontService.getAllPart({
      params: {
        params2: 5,
        params3: 1,
      }
    }).subscribe(
      data => {
        this.newsData = data.data.pageData;
      }, err => {
      }
    );
  }

  noticeList() { // 通知公告
    this.frontService.getAllNoticeByQuery({
      params: {
        pageSize: 5,
        pageNumber: 1,
      }
    }).subscribe(
      data => {
        this.noticeData = data.data.pageData;
      }, err => {
      }
    );
  }

  managementList() { // 管理规定
    this.frontService.getAllManagement({
      params: {
        params2: 5,
        params3: 1,
      }
    }).subscribe(
      data => {
        this.managementData = data.data.pageData;
      }, err => {
      }
    );
  }

  getWorkDynamicsList() { // 工作动态
    this.frontService.getWorkDynamics({
      params: {
        params2: 5,
        params3: 1,
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

    if (this.workDynamicsData.length === 0) {
      return;
    }
    this.loading = false;
    for (let i = 0; i < this.workDynamicsData.length; i++) {
      const item = this.workDynamicsData[i];
      if (item.face && item.face !== 'null' && item.face !== 'undefined') {
        this.imgList.push({
          img: '/v1/file/downloadHead?fileUrl=' + item.face.replace(/\//, '%2f'),
          tit: item['title'],
          id: item['id']
        });
      }
    }
    if (this.imgList.length) {
      this.workDynamicsImg = this.imgList[0];
      this.workDynamicsImg.active = true;
    }
    if (this.imgList.length > 1) {
      this.setTimeImg();
    }
  }

  setTimeImg() {
    this.time = setTimeout(() => {
      let key = 0;
      this.imgList.forEach((item, i) => {
        if (item.active) {
          item.active = false;
          key = i;
        }
      });
      if (key < this.imgList.length - 1) {
        this.imgList[key + 1].active = true;
        this.workDynamicsImg = this.imgList[key + 1];
      } else {
        this.imgList[0].active = true;
        this.workDynamicsImg = this.imgList[0];
      }
      this.setTimeImg();
    }, 6000);
  }

  supplierList() { // 供应商查询
    let region = '';
    if (this.cityNum) {
      const cityName = this.city.filter(x => x.cityCode === this.cityNum)[0].cityName;
      const provinceName = this.province.filter(x => x.provinceCode === this.provinceNum)[0].provinceName;
      region = this.cityNum + ',' + provinceName + cityName;
    }
    this.frontService['getAllByQuery']({
      params: {
        pageNumber: 1,
        pageSize: 3,
        region,
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
    this.frontService.getAllEquipemt({
      params: {
        pageNumber: 1,
        pageSize: 3,
        name: this.EquipQuery.name,
        leadingPerson: this.EquipQuery.leadingPerson,
        supplierName: this.EquipQuery.supplierName,
      }
    }).subscribe(
      data => {
        this.EquipData = data.data.pageData;
      }, err => {
      }
    );
  }

  bidsList() { // 投标商查询
    let region = '';
    if (this.cityNum) {
      const cityName = this.city.filter(x => x.cityCode === this.cityNum)[0].cityName;
      const provinceName = this.province.filter(x => x.provinceCode === this.provinceNum)[0].provinceName;
      region = this.cityNum + ',' + provinceName + cityName;
    }
    this.frontService.getOrgatioByQuery({
      params: {
        pageNumber: 1,
        pageSize: 3,
        region,
        name: this.bidsQuery.name,
        grade: this.bidsQuery.grade,
      }
    }).subscribe(
      data => {
        this.bidsData = data.data.pageData;
      }, err => {
      }
    );
  }

  marketList() { // 市场信息行业查询
    this.frontService.getMarketInformation({
      params: {
        params2: 6,
        params3: 1,
        industry: this.industry,
        status: 1
      }
    }).subscribe(
      data => {
        this.marketData = data.data.pageData;
      }, err => {
      }
    );
  }

  qualityNoticeList() { // 质量公告
    this.frontService.getQualityNotice({
      params: {
        pageNumber: 1,
        pageSize: 5,
      }
    }).subscribe(
      data => {
        this.qualityData = data.data.pageData;
      }, err => {
      }
    );
  }

  qualityEventList() { // 质量事件
    this.frontService.getQualityEventByQuery({
      params: {
        pageNumber: 1,
        pageSize: 5,
      }
    }).subscribe(
      data => {
        this.qualityData = data.data.pageData;
        for (let index = 0; index < this.qualityData.length; index++) {
          if (this.qualityData[index].name == null) {
            this.qualityData[index].name = '暂无名字';
          }
        }
      }, err => {
      }
    );
  }

  qualityDealList() { // 质量处理
    this.frontService.getQualityDealByQuery({
      params: {
        pageNumber: 1,
        pageSize: 5,
      }
    }).subscribe(
      data => {
        this.qualityData = data.data.pageData;
      }, err => {
      }
    );
  }

  dataDownloadList() { // 资料下载
    this.frontService.getDataDownloadAll({
      params: {
        params2: 5,
        params3: 1,
      }
    }).subscribe(data => {
      this.DataDownloadData = data.data.pageData;
    }, err => {
    }
    );
  }

  getAdminDivision(level, id) { // 位置信息查询
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
          this.token = data.data.token;
          this.session.setItem('loginName', this.loginName);
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
        } else {
          this.nzModalService.error({
            nzTitle: '错误',
            nzContent: '用户名或密码错误！',
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
    if (i === 0) {
      this.qualityNoticeList();
    }
    if (i === 1) {
      this.qualityEventList();
    }
    if (i === 2) {
      this.qualityDealList();
    }
  }
  marketOptionOK(item) {
    this.industryList.forEach(ee => {
      ee.active = false;
    });
    item.active = true;
    this.industry = item.id;
    this.marketList();
  }
  jump(i, id) { // 跳转
    if (id) {
      this.router.navigate(['/' + i + '/' + id]);
    } else {
      this.router.navigate(['/' + i]);
    }
  }
}

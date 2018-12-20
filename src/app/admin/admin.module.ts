import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';


import { MenuComponent } from './common/components/menu/menu.component';
import { PermissionGuardService } from '../share/services/permission-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'step',
        loadChildren: './step/step.module#StepModule',
        data: {
          name: 'Angular动态加载组件',
          // hideChild: true,
          roles: [1001],
          // menu: true
        },
        canActivate: [PermissionGuardService]
      },
      {
        path: 'index',
        loadChildren: './index/index.module#IndexModule',
        data: {
          name: '首页',
          // hideChild: true,
          roles: [1001],
          menu: true
        },
        canActivate: [PermissionGuardService]
      },
      {
        path: 'partyNews',
        loadChildren: './partyNews/partyNews.module#PartyNewsModule',
        data: {
          name: '党建要闻',
          // hideChild: true,
          roles: [1001],
          menu: true
        },
        canActivate: [PermissionGuardService]
      },
      {
        path: 'equipment',
        loadChildren: './equipment/equipment.module#EquipmentModule',
        data: {
          name: '信息查询',
          // hideChild: true,
          roles: [1001],
          menu: true
        },
        canActivate: [PermissionGuardService]
      },
      {
        path: 'work',
        loadChildren: './work/work.module#WorkModule',
        data: {
          name: '工作动态',
          // hideChild: true,
          roles: [1001],
          menu: true
        },
        canActivate: [PermissionGuardService]
      },
      {
        path: 'adminRegula',
        loadChildren: './adminRegula/adminRegula.module#AdminRegulaModule',
        data: {
          name: '管理规定',
          // hideChild: true,
          roles: [1001],
          menu: false
        },
        canActivate: [PermissionGuardService]
      },
      {
        path: 'notice',
        loadChildren: './notice/notice.module#NoticeModule',
        data: {
          name: '通知公告',
          // hideChild: true,
          roles: [1001],
          menu: false
        },
        canActivate: [PermissionGuardService]
      },
      {
        path: 'quality',
        loadChildren: './quality/quality.module#QualityModule',
        data: {
          name: '质量专栏',
          // hideChild: true,
          roles: [1001],
          menu: true
        },
        canActivate: [PermissionGuardService]
      },
      {
        path: 'logistics',
        loadChildren: './logistics/logistics.module#LogisticsModule',
        data: {
          name: '后勤保障',
          roles: [1001],
          menu: true,
        },
        canActivate: [PermissionGuardService]
      },
      {
        path: 'download',
        loadChildren: './download/download.module#DownloadModule',
        data: {
          name: '资料下载',
          // hideChild: true,
          roles: [1001],
          menu: true
        },
        canActivate: [PermissionGuardService]
      },
      {
        path: 'market',
        loadChildren: './market/market.module#MarketModule',
        data: {
          name: '市场信息',
          // hideChild: true,
          roles: [1001],
          menu: false
        },
        canActivate: [PermissionGuardService]
      },
      {
        path: 'self',
        loadChildren: './self/self.module#SelfModule',
        data: {
          name: '个人中心',
          // hideChild: true,
          roles: [1001],
          menu: false
        },
        canActivate: [PermissionGuardService]
      },
    ]
  }
];

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MenuComponent,
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../share/share.module';

import { IndexComponent } from './index/index.component';
import { PermissionGuardService } from '../../share/services/permission-guard.service';


export const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        data: {
            name: '首页',
            // menu: true
        },
        canActivate: [PermissionGuardService]
    },
];


@NgModule({
    imports: [
        ShareModule,
        RouterModule.forChild(routes)
    ],
    declarations: [IndexComponent],
    providers: [],
})
export class IndexModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../share/share.module';

import { IndexComponent } from './index/index.component';


export const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        data: {
            name: '市场信息',
        }
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
export class DownloadModule { }

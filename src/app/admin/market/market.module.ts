import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../share/share.module';

import { IndexComponent } from './index/index.component';
import { SeeComponent } from './see/see.component';


export const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        data: {
            name: '市场信息',
        }
    },
    {
        path: 'see/:id',
        component: SeeComponent,
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
    declarations: [IndexComponent, SeeComponent],
    providers: [],
})
export class MarketModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../share/share.module';

import { IndexComponent } from './index/index.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SeeComponent } from './see/see.component';
import { SupplierSeeComponent } from './supplierSee/supplierSee.component';
import { BidsComponent } from './bids/bids.component';
import { BidsSeeComponent } from './bidsSee/bidsSee.component';


export const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        data: {
            name: '信息查询',
        }
    },
    {
        path: 'see/:id',
        component: SeeComponent,
        data: {
            name: '信息查询',
        }
    },
    {
        path: 'supplier',
        component: SupplierComponent,
        data: {
            name: '信息查询',
        }
    },
    {
        path: 'supplier/see/:id',
        component: SupplierSeeComponent,
        data: {
            name: '信息查询',
        }
    },
    {
        path: 'bids',
        component: BidsComponent,
        data: {
            name: '信息查询',
        }
    },
    {
        path: 'bids/see/:id',
        component: BidsSeeComponent,
        data: {
            name: '信息查询',
        }
    },
];


@NgModule({
    imports: [
        ShareModule,
        RouterModule.forChild(routes)
    ],
    declarations: [IndexComponent, SeeComponent, SupplierComponent,
        SupplierSeeComponent, BidsComponent, BidsSeeComponent],
    providers: [],
})
export class EquipmentModule { }

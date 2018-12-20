import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../share/share.module';

import { IndexComponent } from './index/index.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SeeComponent } from './see/see.component';
import { SupplierSeeComponent } from './supplierSee/supplierSee.component';


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
        path: 'supplier/supplierSee/:id',
        component: SupplierSeeComponent,
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
    declarations: [IndexComponent, SeeComponent, SupplierComponent, SupplierSeeComponent],
    providers: [],
})
export class EquipmentModule { }

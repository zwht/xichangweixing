import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../share/share.module';


import { IndexComponent } from './index/index.component';
import { CarComponent } from './car/car.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        data: {
            name: '客房预订',
            menu: true
        }
    },
    {
        path: 'car',
        component: CarComponent,
        data: {
            name: '车辆接送',
            menu: true
        }
    },
    {
        path: 'order',
        component: OrderComponent,
        data: {
            name: '客房预订',
            menu: true
        }
    },
];


@NgModule({
    imports: [
        ShareModule,
        RouterModule.forChild(routes)
    ],
    declarations: [IndexComponent, CarComponent, OrderComponent],
    providers: [],
})
export class LogisticsModule { }

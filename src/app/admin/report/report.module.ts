import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../share/share.module';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        data: {
            name: '投诉举报',
            menu: true
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
export class ReportModule { }

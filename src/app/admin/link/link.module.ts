import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../share/share.module';

import { IndexComponent } from './link/index.component';


export const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        data: {
            name: '友情链接',
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
export class LinkModule { }

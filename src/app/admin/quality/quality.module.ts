import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../share/share.module';

import { IndexComponent } from './index/index.component';
import { EventComponent } from './event/event.component';
import { ListComponent } from './list/list.component';
import { SeeComponent } from './see/see.component';
import { EventSeeComponent } from './eventSee/eventSee.component';
import { ListSeeComponent } from './listSee/listSee.component';


export const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        data: {
            name: '质量专栏',
        }
    },
    {
        path: 'event',
        component: EventComponent,
        data: {
            name: '质量专栏',
        }
    },
    {
        path: 'list',
        component: ListComponent,
        data: {
            name: '质量专栏',
        }
    },
    {
        path: 'see/:id',
        component: SeeComponent,
        data: {
            name: '质量专栏',
        }
    },
    {
        path: 'event/see/:id',
        component: EventSeeComponent,
        data: {
            name: '质量专栏',
        }
    },
    {
        path: 'list/see/:id',
        component: ListSeeComponent,
        data: {
            name: '质量专栏',
        }
    },
];


@NgModule({
    imports: [
        ShareModule,
        RouterModule.forChild(routes)
    ],
    declarations: [IndexComponent, SeeComponent, EventComponent, EventSeeComponent, ListComponent, ListSeeComponent],
    providers: [],
})
export class QualityModule { }

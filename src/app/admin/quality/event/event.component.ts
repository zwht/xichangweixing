import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrontService } from '../../../share/restServices/front.service';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.less']
})
export class EventComponent implements OnInit {

    pageIndex = 1; // 当前页数
    total = 1; // 数据总数
    pageSize = 10; // 每页条数
    name = '';
    supplierID = '';
    eventLevel = '';
    occurrenceTime = '';
    supplier = [{
        id: '',
        name: ''
    }];

    data;

    constructor(
        private frontService: FrontService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getList();
        this.getAllByQuery();
    }

    getList() {
        this.frontService.getQualityEventByQuery({
            params: {
                pageSize: this.pageSize,
                pageNumber: this.pageIndex,
                name: this.name,
                eventLevel: this.eventLevel,
                occurrenceTime: this.occurrenceTime,
                supplierId: this.supplierID
            },
            data: {}
        })
            .subscribe(response => {
                if (response.errorCode === 0) {
                    this.total = response.data.totalCount;
                    this.data = response.data.pageData;
                }
            });
    }

    getAllByQuery() {
        this.frontService.getAllByQuery({
            params: {
                pageSize: 999,
                pageNumber: 1
            },
            data: {}
        })
            .subscribe(response => {
                if (response.errorCode === 0) {
                    this.supplier = response.data.pageData;
                }
            });
    }

    jump(i, id) { // 跳转
        this.router.navigate(['/' + i + '/' + id]);
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrontService } from '../../../share/restServices/front.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
    pageIndex = 1; // 当前页数
    total = 50; // 数据总数
    pageSize = 10; // 每页条数

    data1 = [];

    constructor(
        private frontService: FrontService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getList();
    }

    getList() {
        this.frontService.getAllPart({
            params: {
                params2: this.pageSize,
                params3: this.pageIndex,
            },
            data: {}
        })
            .subscribe(response => {
                if (response.errorCode === 0) {
                    this.total = response.data.totalCount;
                    this.data1 = response.data.pageData;
                }
            });
    }

    jump(i, id) { // 跳转
        this.router.navigate(['/' + i + '/' + id]);
    }
}

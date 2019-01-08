import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrontService } from '../../../share/restServices/front.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
    itleOption = [{ 'border-bottom': '2px solid rgba(207,35,35,1)', 'margin': '0 3px' },
    {}, {}, {}, {}, {}, {}, {}
    ];
    pageIndex = 1; // 当前页数
    total = 50; // 数据总数
    pageSize = 10; // 每页条数
    subjectId;

    data = [];
    constructor(
        private frontService: FrontService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getList();

    }

    getList() {
        this.frontService.getDataDownloadAll({
            params: {
                params2: this.pageSize,
                params3: this.pageIndex,
                subjectId: this.subjectId
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
    itleOptionOK(a) {
        this.itleOption = [{}, {}, {}, {}, {}, {}, {}, {}];
        this.itleOption[a] = { 'border-bottom': '2px solid rgba(207,35,35,1)', 'margin': '0 3px' };
        if (a === 0) {
            this.subjectId = '';
        } else {
            this.subjectId = a;
        }
        this.getList();
    }
    jump(i, id) { // 跳转
        this.router.navigate(['/' + i + '/' + id]);
    }
}

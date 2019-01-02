import { Component, OnInit } from '@angular/core';
import { WorkDynamicsService } from 'src/app/share/restServices/workDynamics.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
    workDynamicsData = []; // 工作动态数据
    pageIndex = 1; // 当前页数
    total = 0; // 总条数
    pageSize = 10; // 每页数目
    constructor(
        private workDynamicsService: WorkDynamicsService,
        private router: Router,

    ) { }

    ngOnInit() {
        this.getWorkDynamicsList();
    }
    getWorkDynamicsList() { // 工作动态
        this.workDynamicsService.list({
            params: {
                params2: this.pageSize,
                params3: this.pageIndex,
                // status: 1
            }
        }).subscribe(
            data => {
                this.workDynamicsData = data.data.pageData;
                this.total = data.data.totalCount;
            }, err => {
            }
        );
    }

    jump(i, id) { // 跳转
        this.router.navigate(['/' + i + '/' + id]);
    }
}

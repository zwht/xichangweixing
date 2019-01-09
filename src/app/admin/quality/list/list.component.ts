import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrontService } from '../../../share/restServices/front.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

    pageIndex = 1; // 当前页数
    total = 1; // 数据总数
    pageSize = 10; // 每页条数
    supplierID = '';
    materials = '';
    supplier = [{
        id: '',
        name: ''
    }];
    status = '';
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
        this.frontService.getQualityDealByQuery({
            params: {
                pageSize: this.pageSize,
                pageNumber: this.pageIndex,
                materials: this.materials,
                supplierId: this.supplierID,
                status: this.status
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

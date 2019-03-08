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
    total = 1; // 数据总数
    pageSize = 10; // 每页条数

    data: Array<{ name: string; code: string; supplierName: string; images: string }> = [];
    iiiiimg = [];

    name = '';
    supplierName = '';
    leadingPerson = '';

    constructor(
        private frontService: FrontService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getList();
    }

    getList() {
        this.frontService.getAllEquipemt({
            params: {
                pageSize: this.pageSize,
                pageNumber: this.pageIndex,
                name: this.name,
                supplierName: this.supplierName,
                leadingPerson: this.leadingPerson
            },
            data: {}
        })
            .subscribe(response => {
                if (response.errorCode === 0) {
                    this.total = response.data.totalCount;
                    this.data = response.data.pageData;
                    const a = '/v1/front/downloadHead?fileUrl=';
                    for (let index = 0; index < this.data.length; index++) {
                        if (!this.data[index].images || this.data[index].images === 'null') {
                            this.data[index]['imgUrl'] = './assets/images/moren.jpg';
                        } else {
                            this.data[index]['imgUrl'] = a + this.data[index].images.replace(/\//, '%2f');
                        }
                    }
                }
            });
    }

    jump(i, id) { // 跳转
        this.router.navigate(['/' + i + '/' + id]);
    }
}

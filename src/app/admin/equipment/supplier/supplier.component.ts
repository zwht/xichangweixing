import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrontService } from '../../../share/restServices/front.service';

@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.less']
})
export class SupplierComponent implements OnInit {

    pageIndex = 1; // 当前页数
    total = 1; // 数据总数
    pageSize = 10; // 每页条数
    data: Array<{ name: string; typeName: string; region: string; contactsUserName: string; phone: string; logo: string }> = [];
    iiiiimg = [];

    constructor(
        private frontService: FrontService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getList();
    }

    getList() {
        this.frontService.getAllByQuery({
            params: {
                pageSize: this.pageSize,
                pageNumber: this.pageIndex,
            },
            data: {}
        })
            .subscribe(response => {
                if (response.errorCode === 0) {
                    this.total = response.data.totalCount;
                    this.data = response.data.pageData;
                    const a = '/v1/file/downloadHead?fileUrl=';
                    for (let index = 0; index < this.data.length; index++) {
                        if (this.data[index].logo === '') {
                            this.iiiiimg.push('../../../../assets/images/moren.jpg');
                        } else {
                            this.iiiiimg.push(a + this.data[index].logo.replace(/\//, '%2f'));
                        }
                    }
                }
            });
    }

    jump(i, id) { // 跳转
        this.router.navigate(['/' + i + '/' + id]);
    }
}

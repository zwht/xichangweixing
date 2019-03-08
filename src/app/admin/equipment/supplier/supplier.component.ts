import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrontService } from '../../../share/restServices/front.service';
import { AdminDivisionService } from 'src/app/share/restServices/admin-division.service';

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

    provinceNum: string;
    cityNum: string;
    province: Array<{ provinceCode: string, provinceName: string }> = [];
    city: Array<{ cityCode: string, cityName: string }> = []; // 城市信息

    type = '';
    name = '';
    status = '';

    constructor(
        private frontService: FrontService,
        private adminDivisionService: AdminDivisionService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getList();
        this.getAdminDivision(1, '');
    }

    getList() {
        let region = '';
        if (this.cityNum) {
            const cityName = this.city.filter(x => x.cityCode === this.cityNum)[0].cityName;
            const provinceName = this.province.filter(x => x.provinceCode === this.provinceNum)[0].provinceName;
            region = this.cityNum + ',' + provinceName + cityName;
        }
        this.frontService.getAllByQuery({
            params: {
                pageSize: this.pageSize,
                pageNumber: this.pageIndex,
                type: this.type,
                name: this.name,
                region,
                status: this.status
            },
            data: {}
        }).subscribe(response => {
            if (response.errorCode === 0) {
                this.total = response.data.totalCount;
                this.data = response.data.pageData;
                const a = '/v1/file/downloadHead?fileUrl=';
                for (let index = 0; index < this.data.length; index++) {
                    if (this.data[index].logo === '') {
                        this.iiiiimg.push('./assets/images/moren.jpg');
                    } else {
                        this.iiiiimg.push(a + this.data[index].logo.replace(/\//, '%2f'));
                    }
                }
            }
        });
    }



    getAdminDivision(level, id) { // 位置信息查询
        if (id == null) {
            this.city = [];
            this.cityNum = null;
            return;
        }
        this.adminDivisionService.list({
            params: {
                params2: 1,
                params3: 9999
            },
            data: {
                provinceCode: id,
                level: level
            }
        }).subscribe(response => {
            if (response.errorCode === 0) {
                if (level === 1) {
                    this.province = response.data.pageData;
                } else {
                    this.city = [];
                    this.cityNum = null;
                    this.city = response.data.pageData;
                }
            }
        });
    }

    jump(i, id) { // 跳转
        this.router.navigate(['/' + i + '/' + id]);
    }
}

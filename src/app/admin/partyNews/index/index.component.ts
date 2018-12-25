import { Component, OnInit } from '@angular/core';
import { PartyNewsService } from '../../../share/restServices/partyNews.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
    pageIndex = 1; // 当前页数
    total = 1; // 数据总数
    pageSize = 10; // 每页条数

    data1 = [
        '我国成功发射两颗北斗三号全球组网卫星',
        '我国在西昌卫星发射中心15日成功发射两嘎嘎嘎嘎嘎嘎',
        '中国“一箭双星”成功发射两颗北斗全球导喵喵喵喵喵喵喵喵',
        '人造月亮”拟于2020年西昌发射升空：汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
        '我国成功发射两颗北斗三号全球组网卫星',
        '我国成功发射两颗北斗三号全球组网卫星',
        '我国在西昌卫星发射中心15日成功发射两嘎嘎嘎嘎嘎嘎',
        '中国“一箭双星”成功发射两颗北斗全球导喵喵喵喵喵喵喵喵',
        '人造月亮”拟于2020年西昌发射升空：汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
        '我国成功发射两颗北斗三号全球组网卫星',
    ];
    constructor(
        private partyNewsService: PartyNewsService
    ) { }

    ngOnInit() {
        this.getList();
    }
    gaga1(e) {
        this.pageSize = e;
        this.getList();
    }
    gaga2(e) {
        this.pageIndex = e;
        this.getList();
    }

    getList() {
        this.partyNewsService.getAll({
            params: {
                pageNumber: this.pageIndex,
                pageSize: this.pageSize,
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
}

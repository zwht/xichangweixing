import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
    itleOption = [{'border-bottom': '2px solid rgba(207,35,35,1)', 'margin': '0 3px'},
    {}, {}, {}, {}, {}, {}, {}
    ];
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

    ) { }

    ngOnInit() {

    }
    itleOptionOK(a) {
        this.itleOption = [{}, {}, {}, {}, {}, {}, {}, {}];
        this.itleOption[a] = {'border-bottom': '2px solid rgba(207,35,35,1)', 'margin': '0 3px'};
    }
}

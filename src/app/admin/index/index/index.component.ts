import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['../../common/style/list.less', './index.component.less']
})
export class IndexComponent implements OnInit {
    titOption = [{ 'border-bottom': '2px solid #CF2323', 'margin': '0 3px' }, {}, {}, 0]; // 信息查询标题样式
    titOption2 = [{ 'border-bottom': '2px solid #CF2323', 'margin': '0 3px' }, {}, {}]; // 质量信息标题样式
    marketOption = [{ 'font-weight': 600 }, {}, {}, {}, {}, {}, {}, {}, {}]; // 市场信息样式
    dataSet = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        }
    ];
    data1 = [
        '我国成功发射两颗北斗三号全球组网卫星',
        '我国在西昌卫星发射中心15日成功发射两嘎嘎嘎嘎嘎嘎',
        '中国“一箭双星”成功发射两颗北斗全球导喵喵喵喵喵喵喵喵',
        '人造月亮”拟于2020年西昌发射升空：汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
        '我国成功发射两颗北斗三号全球组网卫星'
    ];
    value = '';
    level = null;
    checked = true;
    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }
    titOptionOK(i) {
        // 信息查询标题点击样式修改
        this.titOption = [{}, {}, {}, i];
        this.titOption[i] = { 'border-bottom': '2px solid #CF2323', 'margin': '0 3px' };
    }
    titOption2OK(i) {
        // 质量信息标题点击样式修改
        this.titOption2 = [{}, {}, {}];
        this.titOption2[i] = { 'border-bottom': '2px solid #CF2323', 'margin': '0 3px' };
    }
    marketOptionOK(i) {
        // 市场信息样式点击样式修改
        this.marketOption = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
        this.marketOption[i] = {'font-weight': 600};

    }
    jump(i, id) { // 跳转
        this.router.navigate(['/admin/' + i + '/' + id]);
    }
}

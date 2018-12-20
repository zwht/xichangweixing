import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.less']
})
export class SeeComponent implements OnInit {
  id: 0;
  items = [
    { name: '全模块化的设计', data: '用户从16个端口可扩展至1024个端口，任意扩容，为您公司将来的发展与增容提供便利。' },
    { name: '丰富的各种接口', data: '有E1数字中继1#、R2、7#、PRI、ISDN等信令;有E/M、载波、磁石、环路中继等接口，能进行环路与环路的连接或E/M中继与数字中继之间的汇接，可任意组网。' },
    { name: '安全措施与防雷击保护', data: '任一用户端口不小心碰上220v电压时,机器都会迅速自动保护，故障排除后便自动恢复正常工作。该机经过国家交换机质量监督检验中心测试：1000V的高压强电直接进入用户端口而不起明火。' },
  ];

  constructor(
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-suppliersee',
  templateUrl: './supplierSee.component.html',
  styleUrls: ['./supplierSee.component.less']
})
export class SupplierSeeComponent implements OnInit {
  id: 0;
  jianjie = '华为技术有限公司是一家生产销售通信设备的民营通信科技公司，于1987年正式注册成立，总部位于中国深圳市龙岗区坂田华为基地。[1]  华为是全球领先';

  constructor(
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-suppliersee',
  templateUrl: './supplierSee.component.html',
  styleUrls: ['./supplierSee.component.less']
})
export class SupplierSeeComponent implements OnInit {
  id: 0;
  jianjie = '华为技术有限公司是一家生产销售通信设备的民营通信科技公司，于1987年正式注册成立，总部位于中国深圳市龙岗区坂田华为基地。[1]  华为是全球领先的信息与通信技术（ICT）解决方案供应商，专注于ICT领域，坚持稳健经营、持续创新、开放合作，在电信运营商、企业、终端和云计算等领域构筑了端到端的解决方案优势，为运营商客户、企业客户和消费者提供有竞争力的ICT解决方案、产品和服务，并致力于使能未来信息社会、构建更美好的全联接世界。2013年，华为首超全球第一大电信设备商爱立信，排名《财富》世界500强第315位。'

  constructor(
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }


}

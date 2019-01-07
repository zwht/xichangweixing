import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrontService } from '../../../share/restServices/front.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.less']
})
export class SeeComponent implements OnInit {
  id: 0;
  data = {
    name: '',
    code: '',
    supplierName: '',
    measurement: '',
    equipTypeName: '',
    standard: '',
    manufactureDate: '',
    format: '',
    packageFormat: '',
    validity: '',
    remark: '',
  };
  iiiiimg = '';

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private frontService: FrontService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getByID();
  }

  getByID() {
    this.frontService.getEquipmentById({
      params: {
        params2: this.id
      },
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.data = response.data;
          const a = '/v1/file/downloadHead?fileUrl=';
          if (response.data.images === '') {
            this.iiiiimg = '../../../../assets/images/moren.jpg';
          } else {
            this.iiiiimg = a + response.data.images.replace(/\//, '%2f');
          }
        }
      });
  }

  jump(i, id) { // 跳转
    this.router.navigate(['/' + i + '/' + id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrontService } from '../../../share/restServices/front.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suppliersee',
  templateUrl: './supplierSee.component.html',
  styleUrls: ['./supplierSee.component.less']
})
export class SupplierSeeComponent implements OnInit {
  id = 0;
  data = {
    name: '',
    typeName: '',
    region: '',
    address: '',
    socialCreditCode: '',
    registDate: '',
    legalPerson: '',
    legalPersonName: '',
    contactsUserName: '',
    contactsUseIdnum: '',
    phone: '',
    remark: ''
  };
  iiiiimg = '';

  constructor(
    public route: ActivatedRoute,
    private frontService: FrontService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getByID();
  }

  getByID() {
    this.frontService.getSupplierById({
      params: {
        params2: this.id
      },
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.data = response.data;
          const a = '/v1/file/downloadHead?fileUrl=';
          if (response.data.logo === '') {
            this.iiiiimg = './assets/images/moren.jpg';
          } else {
            this.iiiiimg = a + response.data.logo.replace(/\//, '%2f');
          }
        }
      });
  }

  jump(i, id) { // 跳转
    this.router.navigate(['/' + i + '/' + id]);
  }
}

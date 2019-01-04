import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrontService } from '../../../share/restServices/front.service';

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

  constructor(
    public route: ActivatedRoute,
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
        }
      });
  }

}

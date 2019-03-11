import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontService } from '../../../share/restServices/front.service';

@Component({
  selector: 'app-eventsee',
  templateUrl: './eventSee.component.html',
  styleUrls: ['./eventSee.component.less']
})
export class EventSeeComponent implements OnInit {
  id = 0;
  data = {
    name: '',
    departName: '',
    occurrenceTime: '',
    eventLevelName: '',
    supplierName: '',
    materials: '',
    remark: '',
  };
  fileList = [];
  constructor(
    public route: ActivatedRoute,
    private frontService: FrontService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getByID();
  }

  getByID() {
    this.frontService.getQualityEventById({
      params: {
        params2: this.id,
      },
      data: {}
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          // this.total = response.data.totalCount;
          this.data = response.data;
          if (this.data['fileUrl']) {
            const fl = [];
            this.data['fileUrl'].split('&*&*&').forEach(item => {
              if (item) {
                const bb = item.split('%#%$%');
                fl.push({
                  uid: bb[0],
                  name: bb[1],
                  url: bb[0],
                  status: 'done',
                });
              }
            });
            this.fileList = fl;
          }
        }
      });
  }

  jump(i, id) { // 跳转
    this.router.navigate(['/' + i + '/' + id]);
  }
}

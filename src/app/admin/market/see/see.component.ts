import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontService } from '../../../share/restServices/front.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.less']
})
export class SeeComponent implements OnInit {
  id = 0;
  data = {
    title: '',
    readCount: '',
    createTime: '',
  };
  content;
  constructor(
    public route: ActivatedRoute,
    private frontService: FrontService,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getByID();
  }

  getByID() {
    this.frontService.getMarketInformationById({
      params: {
        params2: this.id,
      },
      data: {}
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          // this.total = response.data.totalCount;
          this.data = response.data;
          this.content = this.sanitizer.bypassSecurityTrustHtml(response.data.content);
        }
      });
  }

  jump(i, id) { // 跳转
    this.router.navigate(['/' + i + '/' + id]);
  }
}

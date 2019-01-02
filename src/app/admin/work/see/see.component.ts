import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkDynamicsService } from 'src/app/share/restServices/workDynamics.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.less']
})
export class SeeComponent implements OnInit {
  id: 0;
  data = {
    title: '暂无',
    createUser: '暂无',
    updateTime: '0000-00-00 00:00',
  };
  content;
  readCount;

  constructor(
    public route: ActivatedRoute,
    private workDynamicsService: WorkDynamicsService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getById();
  }

  getById() { // 工作动态
    this.workDynamicsService.getById({
      params: {
        params2: this.id
      }
    }).subscribe(
      data => {
        this.data = data.data;
        if (data.data.readCount === 'null') {
          this.readCount = 0;
        } else {
          this.readCount = data.data.readCount;
        }
        this.content = this.sanitizer.bypassSecurityTrustHtml(data.data.content);

      }, err => {
      }
    );
  }
  jump(i, id) { // 跳转
    this.router.navigate(['/' + i + '/' + id]);
  }
}

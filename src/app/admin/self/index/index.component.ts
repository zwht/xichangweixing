import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { UserService } from '../../../share/restServices/user.service';
import { NzMessageService } from '../../../../../node_modules/ng-zorro-antd';
import { RegExpService } from '../../../share/services/reg-exp.service';
import { CodeDataService } from '../../../share/services/code-data.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
import { SessionService } from '../../../share/services/session.service';
import { FrontAuthService } from 'src/app/share/restServices/frontAuth.service';
import { FrontService } from 'src/app/share/restServices/front.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;

  email = null;
  loginName = null;
  name = null;
  phone = null;
  state = null;
  roles = [];
  codeObj = {};

  id = null;
  checkOptionsOne = [];
  constructor(
    private codeDataService: CodeDataService,
    private userService: UserService,
    public route: ActivatedRoute,
    private sessionService: SessionService,
    private frontService: FrontService,

  ) { }

  ngOnInit(): void {
    this.codeObj = this.codeDataService.codeObj;
    this.id = this.sessionService.getItem('userId');
    this.getById(this.id);
  }

  getById(id) {
    this.frontService.getUserById({
      params: {
        params2: id
      },
      data: {}
    })
      .subscribe(response => {
        if (response.errorCode === 0) {
          this.loginName = response.data.loginName;
          this.name = response.data.name;
          this.phone = response.data.phone;
          if (response.data.roles !== '') {
            this.roles = response.data.roles.split(',');
          }
        }
      });
  }
}

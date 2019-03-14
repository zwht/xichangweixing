import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { NzMessageService, NzModalRef } from '../../../../../../node_modules/ng-zorro-antd';
import { RegExpService } from '../../../../share/services/reg-exp.service';
import { FrontService } from 'src/app/share/restServices/front.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.less']
})

export class ReportsComponent implements OnInit {
  validateForm;
  constructor(
    private frontAuthService: FrontService,
    private _message: NzMessageService,
    private regExpService: RegExpService,
    private fb: FormBuilder,
    private modal: NzModalRef,
  ) { }

  ngOnInit() {

    this.validateForm = this.fb.group({
      content: [null, [Validators.required]],
      reportName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      works: [null, []],
    });
  }

  submitForm() {
    for (const i in this.validateForm.controls) {
      if ((this.validateForm as any).controls[i]) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.valid) {
      this.frontAuthService.reportsAdd({
        data: {
          content: this.validateForm.value.content,
          reportName: this.validateForm.value.reportName,
          phone: this.validateForm.value.phone,
          works: this.validateForm.value.works
        }
      })
        .subscribe(response => {
          this.modal.destroy();
          this._message.success('举报成功');
        });
    }
  }

}

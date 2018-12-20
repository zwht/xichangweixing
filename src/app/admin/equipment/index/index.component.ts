import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {

    }
    goto(a, b) {
        this.router.navigateByUrl(a + b);
    }
}

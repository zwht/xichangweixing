import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bids',
    templateUrl: './bids.component.html',
    styleUrls: ['./bids.component.less']
})
export class BidsComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {

    }
    goto(a, b) {
        this.router.navigateByUrl(a + b);
    }
}

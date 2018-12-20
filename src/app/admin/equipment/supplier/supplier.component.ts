import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.less']
})
export class SupplierComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {

    }
    goto(a, b) {
        this.router.navigateByUrl(a + b);
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.less']
})
export class SeeComponent implements OnInit {
  id: 0;

  constructor(
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }


}

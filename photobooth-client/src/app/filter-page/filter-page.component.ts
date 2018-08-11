import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss']
})
export class FilterPageComponent implements OnInit {

  image: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private location: Location) {}

  ngOnInit() {
    this.image = this.route.snapshot.queryParams['image'];
  }

}

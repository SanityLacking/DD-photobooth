import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss']
})
export class FilterPageComponent implements OnInit {
  // b64 encoded png
  image: string;

  constructor(private router: Router, private route: ActivatedRoute) {}


  ngOnInit() {
    this.image = this.route.snapshot.queryParams['image'];
  }
}

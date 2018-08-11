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

  // Dimensions of the captured webcam image. We use this to determine the size
  // of the canvas we create for image manipulation purposes.
  width: number;
  height: number;

  constructor(private router: Router, private route: ActivatedRoute) {}


  ngOnInit() {
    this.image = this.route.snapshot.queryParams['image'];

    this.width = this.route.snapshot.queryParams['width'];
    this.height = this.route.snapshot.queryParams['height'];
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

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

  constructor(private router: Router, private route: ActivatedRoute,
              private location: Location) {}


  ngOnInit() {
    this.image = this.route.snapshot.queryParams['image'];

    this.width = this.route.snapshot.queryParams['width'];
    this.height = this.route.snapshot.queryParams['height'];
  }

  //Forward filtered image to user
  confirmFilter() {
    this.router.navigate(['result'], { queryParams: { image: this.image } });
  }

  //Begin process again by redirecting to camera page
  startOver(){
    this.router.navigate(['camera']);
  }

  discardImage() {
    this.location.back();
  }

}

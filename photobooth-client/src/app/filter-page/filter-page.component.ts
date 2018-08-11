import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    this.image = sessionStorage.getItem('imageStorage');
    this.width = Number(sessionStorage.getItem('width'));
    this.height = Number(sessionStorage.getItem('height'));
  }


  discardImage() {
    // this.location.back();
    this.router.navigate(['result']);
  }

}

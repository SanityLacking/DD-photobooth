import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-confirm-shot-page',
  templateUrl: './confirm-shot-page.component.html',
  styleUrls: ['./confirm-shot-page.component.scss']
})
export class ConfirmShotPageComponent implements OnInit {
  // base64 encoded png image representing the webcam image captured
  image: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private location: Location) {}


  ngOnInit() {
    
    if(typeof(Storage) !== 'undefined'){
      let imgData = sessionStorage.getItem('imageStorage');
      this.image = imgData;
    }
  }

  discardImage() {
    this.location.back();

    // Clear session storage
    sessionStorage.clear();
  }
}

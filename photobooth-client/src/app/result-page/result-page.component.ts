import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-resultilter-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {
  // URL pointing to the final image hosted on the server. This should be
  // produced after performing post-processing operations below.
  resultLink: string | undefined = undefined;

  // Dimensions of the captured image, for creating a canvas for post-processing
  width: number;
  height: number;

  // Canvas used for post-processing (adding the hashtag watermark, etc)
  ppCanvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  // b64 encoded result after we finish post-processing
  image: string;

  constructor(private router: Router, private location: Location) {}


  ngOnInit() {
    // We don't know what the link to the resultant image is until we've
    // uploaded it....
    this.resultLink = undefined;

    this.prepareCanvas();
    this.addWatermark();

    this.image = this.ppCanvas.toDataURL('image/png');
  }


  /*
   * Loads the captured image into `this.ppCanvas`, ready to be manipulated
   */
  private prepareCanvas(): void {
    // Image dimensions
    this.width = Number(sessionStorage.getItem('width'));
    this.height = Number(sessionStorage.getItem('height'));

    // Create canvas
    this.ppCanvas = document.createElement('canvas');
    this.ppCanvas.width = this.width;
    this.ppCanvas.height = this.height;

    this.context = this.ppCanvas.getContext('2d');

    // Draw image to canvas
    const image: HTMLImageElement = new Image;
    image.src = sessionStorage.getItem('imageStorage');
    this.context.drawImage(image, 0, 0, this.width, this.height);
  }


  private addWatermark(): void {
    this.context.font = '18pt Roboto';
    this.context.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this.context.textAlign = 'right';
    this.context.fillText('#GriffithOpenDay', this.width - 32, this.height - 32);
  }

  startOver() {
    this.router.navigate(['camera']);
    sessionStorage.clear();
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera-page',
  templateUrl: './camera-page.component.html',
  styleUrls: ['./camera-page.component.scss']
})
export class CameraPageComponent implements OnInit {
  static IMG_WIDTH = 640;
  static IMG_HEIGHT = 480;

  captureCanvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  camConnected = false;

  constructor() {
    this.captureCanvas = document.createElement('canvas');
    this.captureCanvas.width = CameraPageComponent.IMG_WIDTH;
    this.captureCanvas.height = CameraPageComponent.IMG_HEIGHT;

    this.context = this.captureCanvas.getContext('2d');
  }

  ngOnInit() {
    this.startWebcam();
  }

  private startWebcam(): void {
    let video: HTMLVideoElement = document.querySelector('#webcam');

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true})
        .then((stream) => {
          video.srcObject = stream;
          this.camConnected = true;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  captureWebcam(): HTMLImageElement {
    const video: HTMLVideoElement = document.querySelector('#webcam');
    const image: HTMLImageElement = new Image;

    this.context.drawImage(video, 0, 0, 640, 480);
    image.src = this.captureCanvas.toDataURL('image/png');

    return image;
  }
}

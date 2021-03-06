import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera-page',
  templateUrl: './camera-page.component.html',
  styleUrls: ['./camera-page.component.scss']
})


export class CameraPageComponent implements OnInit {
  // Dimensions of images uploaded to server
  static IMG_WIDTH = 640;
  static IMG_HEIGHT = 480;

  // Canvas and context used for webcam stream frame capture
  captureCanvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  // Set to true if the user accepts the webcam permission request
  camConnected = false;


  constructor(private router: Router) {
    this.captureCanvas = document.createElement('canvas');
    this.captureCanvas.width = CameraPageComponent.IMG_WIDTH;
    this.captureCanvas.height = CameraPageComponent.IMG_HEIGHT;

    this.context = this.captureCanvas.getContext('2d');
  }

  ngOnInit() {
    this.startWebcam();
  }


  private startWebcam(): void {
    const video: HTMLVideoElement = document.querySelector('#webcam');

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


  private captureWebcam(): HTMLImageElement {
    const video: HTMLVideoElement = document.querySelector('#webcam');
    const image: HTMLImageElement = new Image;

    this.context.drawImage(video, 0, 0,
                           CameraPageComponent.IMG_WIDTH,
                           CameraPageComponent.IMG_HEIGHT);
    image.src = this.captureCanvas.toDataURL('image/png');

    // Save to session
    try {
      sessionStorage.setItem('imageStorage', image.src);
      sessionStorage.setItem('width', String(CameraPageComponent.IMG_WIDTH));
      sessionStorage.setItem('height', String(CameraPageComponent.IMG_HEIGHT));
      console.log('Storage successful');
    } catch (e) {
      console.log('Storage failed: ' + e);
    }
    return image;
  }


  private shotEffect(callback: () => void): void {
    setTimeout(() => {
      const captureFX: HTMLElement = document.querySelector('.capture-effect');
      captureFX.classList.remove('capture-clear');
      // Alter the display mode (the value of this makes no difference) in order
      // to force a redraw, allowing the opacity transition to work.
      captureFX.style.display = 'inline';

      setTimeout(function() {
        captureFX.classList.add('capture-clear');
        captureFX.style.display = 'block';

        setTimeout(callback, 1000);
      }, 10);
    }, 5000);
  }

  takePhoto(): void {
    this.shotEffect(() => {
      const img: HTMLImageElement = this.captureWebcam();

      this.router.navigate(['confirm-shot']);
    });
  }
}

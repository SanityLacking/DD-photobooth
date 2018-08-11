import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-shot-page',
  templateUrl: './confirm-shot-page.component.html',
  styleUrls: ['./confirm-shot-page.component.scss']
})
export class ConfirmShotPageComponent implements OnInit, OnDestroy {
  image: HTMLImageElement;

  private routeSub: any;

  constructor(private router: Router, private route: ActivatedRoute) {}


  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.image = params['image'];
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}

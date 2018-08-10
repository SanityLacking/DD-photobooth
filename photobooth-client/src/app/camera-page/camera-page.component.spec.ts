
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraPageComponent } from './camera-page.component';

describe('CameraPageComponent', () => {
  let component: CameraPageComponent;
  let fixture: ComponentFixture<CameraPageComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

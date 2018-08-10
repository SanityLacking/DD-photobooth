import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CameraPageComponent } from './camera-page/camera-page.component';
import { ConfirmShotPageComponent } from './confirm-shot-page/confirm-shot-page.component';
import { MatToolbarModule, MatCardModule, MatSidenavModule, MatButtonModule, MatIconModule } from '@angular/material';

const appRoutes: Routes = [
  { path: 'camera', component: CameraPageComponent },
  { path: 'confirm-shot', component: ConfirmShotPageComponent },
  { path: '',
    redirectTo: '/camera',
    pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    CameraPageComponent,
    ConfirmShotPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

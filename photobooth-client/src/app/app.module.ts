import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CameraPageComponent } from './camera-page/camera-page.component';
import { MatToolbarModule, MatCardModule, MatSidenavModule, MatButtonModule, MatIconModule } from '@angular/material';

const appRoutes: Routes = [
  { path: 'camera', component: CameraPageComponent },
  { path: '',
    redirectTo: '/camera',
    pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    CameraPageComponent
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

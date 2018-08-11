import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CameraPageComponent } from './camera-page/camera-page.component';
import { FilterPageComponent } from './filter-page/filter-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { ConfirmShotPageComponent } from './confirm-shot-page/confirm-shot-page.component';
import { MatToolbarModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatCardModule, MatSidenavModule, MatButtonModule, MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http'; 

const appRoutes: Routes = [
  { path: 'camera', component: CameraPageComponent },
  { path: 'filter', component: FilterPageComponent },
  { path: 'result', component: ResultPageComponent },
  { path: 'confirm-shot', component: ConfirmShotPageComponent },
  { path: '',
    redirectTo: '/camera',
    pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    CameraPageComponent,
    FilterPageComponent,
    ResultPageComponent,
    ConfirmShotPageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

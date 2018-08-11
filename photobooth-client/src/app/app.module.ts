import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CameraPageComponent } from './camera-page/camera-page.component';
import { FilterPageComponent } from './filter-page/filter-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { MatToolbarModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

const appRoutes: Routes = [
  { path: 'camera', component: CameraPageComponent },
  { path: 'filter', component: FilterPageComponent },
  { path: 'result', component: ResultPageComponent },
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

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

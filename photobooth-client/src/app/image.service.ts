import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import { HttpModule } from '@angular/http';
import {Observable, of} from 'rxjs';

// Define some HTTP headers for when we send the data to the Node API
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ImageService {

  constructor(private http:HttpClient) { }

  uploadImage(image, filter){
    let data = {
      'image': image,
      'filter': filter
    }
    let body = JSON.stringify(data);
    return this.http.post('/api/uploadphoto', body, httpOptions);
  }
}

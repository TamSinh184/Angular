import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  // public uploadImage(image: File): Observable<Response> {
  //   const formData = new FormData();
  //  // return this.http.post('/api/v1/image-upload', formData);

  // }
}

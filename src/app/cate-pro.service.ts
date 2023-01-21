import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryOption, Project } from './app.interface';

@Injectable({
  providedIn: 'root',
})
export class CateProService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<Project[]>('http://localhost:3000/cate-pro');
  }
}

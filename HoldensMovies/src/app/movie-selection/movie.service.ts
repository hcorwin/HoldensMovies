import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movie} from "./movie";
import {shareReplay, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(){
    const token = sessionStorage.getItem('token');

    return this.http.get<Movie[]>(`http://localhost:8001/api/Movies/movies`,
      {headers: {'Authorization': `Bearer ${token}`}, observe: 'body', responseType: 'json'})
  }
}

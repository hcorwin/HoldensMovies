import {Injectable, signal} from '@angular/core';
import {Movie} from "../movie-selection/movie";

@Injectable({
  providedIn: 'root'
})
export class InfoService {
selected = signal<Movie | null>(null);

  setSelectedMovie(movie: Movie){
    this.selected.set(movie);
  }
}

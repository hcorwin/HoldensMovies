import {Injectable, signal} from '@angular/core';
import {Movie} from "../movie-selection/movie";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<Movie[]>([]);
  constructor() { }

  addToCart(movie: Movie){
    this.cart.update(movies => [...movies, movie]);
  }

  removeFromCart(movie: Movie){
    this.cart.update(movies => movies.filter(m =>
      m.title !== movie.title));
  }
}

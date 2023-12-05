import {Component, OnInit, signal} from '@angular/core';
import {Movie} from "./movie";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {InfoService} from "../info/info.service";
import {Router} from "@angular/router";
import {CartService} from "../cart/cart.service";
import {MovieService} from "./movie.service";
import {DomSanitizer} from "@angular/platform-browser";
import {shareReplay} from "rxjs";


@Component({
  selector: 'app-movie-selection',
  standalone: true,
  templateUrl: './movie-selection.component.html',
  styleUrls: ['./movie-selection.component.css'],
  imports: [MatCardModule, MatButtonModule, CommonModule]
})
export class MovieSelectionComponent implements OnInit{
  movies = signal<Movie[] | undefined>(undefined);

  constructor(
    private infoService: InfoService,
    private router: Router,
    private cartService: CartService,
    private movieService: MovieService,
    private sanitizer: DomSanitizer) {
  }

  addToCart(movie: Movie){
    this.cartService.addToCart(movie);
  }

  viewMoreInfo(movie: Movie){
    this.infoService.setSelectedMovie(movie);
    this.router.navigate(['/info']);
  }

  getAllMovies(){
    this.movieService.getMovies()
    .subscribe(movies => {
      movies.map((movie) => {
        movie.image = `data:image/png;base64, ${movie.image}`
      })
        this.movies.set(movies);
      })
  }

  transform(imageUrl: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }

  ngOnInit(): void {
      this.getAllMovies()
  }
}

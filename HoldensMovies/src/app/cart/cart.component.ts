import {Component, computed} from '@angular/core';
import {CartService} from "./cart.service";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {Movie} from "../movie-selection/movie";

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  imports: [
    NgForOf,
    CurrencyPipe,
    NgIf
  ],
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart = this.cartService.cart;
  total = computed(() => this.cart().reduce((a, b) =>
    a + b.price, 0))
  constructor(
    private cartService: CartService
  ) {}

  removeFromCart(movie: Movie){
    this.cartService.removeFromCart(movie);
  }
}

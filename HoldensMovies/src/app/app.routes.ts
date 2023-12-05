import {Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {MovieSelectionComponent} from "./movie-selection/movie-selection.component";
import {NavComponent} from "./nav/nav.component";
import {authGuard} from "./auth.guard";

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: NavComponent, canActivate: [authGuard], children: [
      { path: '', component: MovieSelectionComponent},
      { path: 'about', loadComponent: () => import("./about/about.component")
          .then(c => c.AboutComponent)},
      { path: 'info', loadComponent: () => import("./info/info.component")
          .then(c => c.InfoComponent)},
      { path: 'cart', loadComponent: () => import("./cart/cart.component")
          .then(c => c.CartComponent)},
      { path: 'contact', loadComponent: () => import("./contact/contact.component")
          .then(c => c.ContactComponent)},
    ]},
  { path: '**', component: PageNotFoundComponent}
]

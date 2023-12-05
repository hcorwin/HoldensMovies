import {Component} from '@angular/core';
import {NavComponent} from "./nav/nav.component";
import {LoginComponent} from "./login/login.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    NavComponent,
    LoginComponent,
    RouterOutlet,
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HoldensMovies';

}

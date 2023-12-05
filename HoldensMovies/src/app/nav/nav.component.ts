import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  ngOnInit(): void {

  }

}
